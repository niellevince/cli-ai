# CLAI (CLI-AI)

Generate shell commands from natural language using AI. Powered by OpenRouter API with support for multiple AI models.

## ✨ Features

- 🤖 **Natural Language Processing**: Convert plain English descriptions into executable shell commands
- 🎯 **Multi-Shell Support**: Generate commands for bash, zsh, PowerShell, cmd, and fish
- 📋 **Smart Clipboard Integration**: Automatically copies to clipboard or adds to shell history in headless environments (Linux/macOS servers)
- 🔄 **Interactive Confirmation**: Review, regenerate, or cancel generated commands
- 🚀 **Fast Execution**: Skip confirmation with `--yes` flag for automation
- 🛡️ **Command Validation**: Basic security checks on generated commands
- 🌍 **Cross-Platform**: Works on Windows, macOS, and Linux

## 🚀 Installation

### Global Installation (Recommended)

```bash
npm install -g clai
```

### Local Development

```bash
git clone <repository-url>
cd clai
npm install
npm run build
npm link  # For local testing
```

## ⚙️ Configuration

1. **Get OpenRouter API Key**: Visit [openrouter.ai/keys](https://openrouter.ai/keys) to create an API key

2. **Set Environment Variables**: Copy `.env.example` to `.env` and fill in your values:

```bash
cp .env.example .env
# Edit .env with your API key
```

Required environment variables:
- `OPENROUTER_API_KEY`: Your OpenRouter API key
- `DEFAULT_MODEL`: Default AI model (default: `google/gemini-2.5-flash-lite`)

## 📖 Usage

### Basic Usage

```bash
clai create a docker redis container with port mapping
clai find all .js files in current directory
clai update system packages on ubuntu
```

> **Note**: Quotes around queries are optional - both `clai "list files"` and `clai list files` work.

### Advanced Options

```bash
# Specify target shell
clai list directory contents --shell powershell

# Use different AI model (short: -m)
clai restart nginx service -m anthropic/claude-3-haiku

# Skip confirmation (short: -y, for scripts/automation)
clai create backup of current directory -y

# Combine options
clai install python dependencies --shell bash -m openai/gpt-4o-mini -y
```

### Interactive Mode

When you run `clai` without the `--yes` flag, you'll enter interactive mode:

```
🤖 Generating bash compatible command using google/gemini-2.5-flash-lite...

📝 Generated command:
docker run -d --name redis -p 6379:6379 redis:latest

What would you like to do?
❯ ✅ Accept and copy to clipboard/history
  🔄 Regenerate command
  ❌ Cancel
```

## 🛠️ Supported Shells

- **bash/zsh**: Full Unix shell support
- **fish**: Fish shell syntax
- **powershell**: Windows PowerShell commands
- **cmd**: Windows Command Prompt

Shell is auto-detected, but can be overridden with `--shell` flag.

## 🤖 Available Models

CLAI works with any OpenRouter model. Popular options:

- `google/gemini-2.5-flash-lite` (default - fast & cost-effective)
- `anthropic/claude-3-haiku` (balanced performance)
- `openai/gpt-4o-mini` (good general purpose)
- `meta-llama/llama-3.1-8b-instruct` (open source)

See [openrouter.ai/models](https://openrouter.ai/models) for all available models.

## 🏗️ Development

### Project Structure

```
clai/
├── bin/
│   └── clai.js          # CLI entry point
├── src/
│   ├── cli.ts           # Main CLI logic with commander & inquirer
│   ├── generator.ts     # OpenAI SDK integration for AI generation
│   ├── shell.ts         # Shell detection and formatting
│   ├── clipboard.ts     # Clipboard integration & headless fallback
│   └── config.ts        # Environment variable loading & validation
├── lib/                 # Compiled JavaScript output
├── .env.example         # Environment template
├── package.json
├── tsconfig.json
└── README.md
```

### Development Commands

```bash
# Install dependencies
npm install

# Run in development mode (with ts-node)
npm run dev create a docker container

# Build for production
npm run build

# Run built version
npm start list files

# Clean build artifacts
npm run clean
```

### Testing

```bash
# Test basic functionality
npm run dev list current directory

# Test with different shell
npm run dev show system info -- --shell powershell

# Test headless mode (simulate server environment)
unset DISPLAY && npm run dev update packages
```

## 🔒 Security

- Commands are validated before execution
- Dangerous patterns are flagged (e.g., `rm -rf /`)
- API keys are stored securely in environment variables
- No commands are executed automatically

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

MIT License - see LICENSE file for details.

## 🙏 Acknowledgments

- [OpenRouter](https://openrouter.ai/) for providing unified AI model access
- [OpenAI SDK](https://github.com/openai/openai-node) for the TypeScript client
- [Commander.js](https://github.com/tj/commander.js) for CLI argument parsing
- [Inquirer.js](https://github.com/SBoudrias/Inquirer.js) for interactive prompts

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/yourusername/clai/issues)
- **Discussions**: [GitHub Discussions](https://github.com/yourusername/clai/discussions)
- **OpenRouter Docs**: [openrouter.ai/docs](https://openrouter.ai/docs)
