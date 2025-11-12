# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.1.0] - 2025-11-12

### Added

- **Query syntax without quotes**: Commands can now be written without requiring quotes around multi-word queries (e.g., `clai create a docker container --yes`)
- Backward compatibility maintained - quoted queries still work

### Changed

- Updated CLI argument parsing to support variadic positional arguments
- Updated README.md examples to demonstrate the new syntax
- Updated help text examples to show quote-free syntax

### Technical

- Modified `src/cli.ts` to use `.arguments('[query...]')` instead of `.argument('<query>')`
- Updated action handler to join query arguments with spaces

## [1.0.0] - 2025-11-12

### Added

- Initial release of CLAI (CLI-AI)
- Natural language to shell command generation using AI
- Support for multiple AI models via OpenRouter API
- Multi-shell support (bash, zsh, PowerShell, cmd, fish)
- Interactive confirmation mode with regenerate/cancel options
- Automatic clipboard integration and headless server support
- Command validation and security checks
- Cross-platform compatibility (Windows, macOS, Linux)
