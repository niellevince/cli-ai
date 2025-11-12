#!/usr/bin/env node

import { Command } from 'commander';
import inquirer from 'inquirer';
import { generateCommand, validateCommand } from './generator';
import { detectShell, getShellInfo } from './shell';
import { copyToClipboardOrHistory } from './clipboard';
import { config } from './config';

const program = new Command();

program
  .name('clai')
  .description('Generate shell commands from natural language using AI')
  .version('1.0.0')
  .arguments('[query...]')
  .option('-m, --model <model>', 'AI model to use', config.defaultModel)
  .option('--shell <shell>', 'Target shell (bash, zsh, powershell, cmd, fish)', detectShell())
  .option('-y, --yes', 'Skip confirmation and automatically accept/copy command')
  .action(async (query: string[], options: any) => {
    try {
      const shell = options.shell;
      const model = options.model;
      const queryText = query.join(' ');

      console.log(`🤖 Generating ${getShellInfo(shell)} using ${model}...`);

      // Generate the initial command
      let command = await generateCommand({ query: queryText, shell, model });

      // Validate the generated command
      if (!validateCommand(command)) {
        throw new Error('Generated command failed validation. Please try rephrasing your query.');
      }

      // Skip confirmation if --yes flag is provided
      if (options.yes) {
        console.log(`\n${command}`);
        await copyToClipboardOrHistory({ command, shell });
        return;
      }

      // Interactive confirmation loop
      while (true) {
        console.log(`\n📝 Generated command:\n${command}`);

        const { action } = await inquirer.prompt([
          {
            type: 'list',
            name: 'action',
            message: 'What would you like to do?',
            choices: [
              { name: '✅ Accept and copy to clipboard/history', value: 'accept' },
              { name: '🔄 Regenerate command', value: 'regenerate' },
              { name: '❌ Cancel', value: 'cancel' },
            ],
          },
        ]);

        if (action === 'accept') {
          await copyToClipboardOrHistory({ command, shell });
          break;
        } else if (action === 'regenerate') {
          console.log('🔄 Regenerating command...');
          command = await generateCommand({ query: queryText, shell, model });

          if (!validateCommand(command)) {
            console.warn('⚠️  Regenerated command failed validation, but proceeding...');
          }

          continue;
        } else {
          console.log('❌ Operation cancelled.');
          break;
        }
      }

    } catch (error) {
      console.error('❌ Error:', error instanceof Error ? error.message : 'Unknown error occurred');

      // Provide helpful suggestions
      if (error instanceof Error && error.message.includes('API key')) {
        console.log('\n💡 Tip: Make sure your OPENROUTER_API_KEY is set in your .env file');
        console.log('   Get your API key from: https://openrouter.ai/keys');
      } else if (error instanceof Error && error.message.includes('model')) {
        console.log('\n💡 Tip: Try using a different model with --model flag');
        console.log('   Available models: https://openrouter.ai/models');
      }

      process.exit(1);
    }
  });

// Handle --help flag
program.on('--help', () => {
  console.log('\n📚 Examples:');
  console.log('  $ clai create a docker redis container');
  console.log('  $ clai list all files in current directory --shell powershell');
  console.log('  $ clai update nginx config -m anthropic/claude-3-haiku');
  console.log('  $ clai restart apache service -y');
  console.log('\n🔗 Learn more: https://openrouter.ai/docs');
});

program.parse();
