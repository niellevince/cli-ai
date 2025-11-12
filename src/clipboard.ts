import clipboardy from 'clipboardy';
import { execSync } from 'child_process';
import { ShellType } from './shell';

export interface ClipboardOptions {
  command: string;
  shell: ShellType;
}


/**
 * Copies command to clipboard and adds to shell history
 * @param options The clipboard operation options
 */
export async function copyToClipboardOrHistory(options: ClipboardOptions): Promise<void> {
  const { command, shell } = options;
  let clipboardSuccess = false;
  let historySuccess = false;

  // Try to copy to clipboard
  try {
    await clipboardy.write(command);
    clipboardSuccess = true;
    console.log(`✓ Command copied to clipboard: ${command}`);
  } catch (error) {
    // Ignore clipboard errors
  }

  // Try to add to shell history
  try {
    addToShellHistory(command, shell);
    historySuccess = true;
    console.log(`✓ Command added to shell history: ${command}`);
  } catch (error) {
    // Ignore history errors
  }

  // If both failed, show a message
  if (!clipboardSuccess && !historySuccess) {
    console.log(`💡 Generated command: ${command}`);
  }
}

/**
 * Adds a command to the shell history
 * @param command The command to add
 * @param shell The shell type
 * @throws Error if the shell history operation fails
 */
function addToShellHistory(command: string, shell: ShellType): void {
  // Escape single quotes for shell safety
  const escapedCommand = command.replace(/'/g, "\\'");

  switch (shell) {
    case 'bash':
    case 'zsh':
    case 'fish':
      // Use history -s to add to history without executing
      execSync(`history -s '${escapedCommand}'`, { stdio: 'ignore' });
      break;

    case 'powershell':
      // Use Add-History cmdlet to add to PowerShell history
      execSync(`powershell -Command "Add-History -InputObject '${escapedCommand}'"`, { stdio: 'ignore' });
      break;

    case 'cmd':
      // Windows CMD doesn't have persistent history like Unix shells
      throw new Error('CMD does not support persistent history');

    default:
      throw new Error(`Unsupported shell type: ${shell}`);
  }
}

/**
 * Direct clipboard copy (for cases where we specifically want clipboard)
 * @param text The text to copy
 */
export async function copyToClipboard(text: string): Promise<void> {
  try {
    await clipboardy.write(text);
  } catch (error) {
    throw new Error(`Failed to copy to clipboard: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}
