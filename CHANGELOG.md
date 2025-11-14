# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.3.1] - 2025-01-XX

### Fixed

- **Environment variable loading**: `.env` file is now loaded from the project root directory instead of the current working directory, ensuring consistent configuration regardless of where the CLI is executed from

### Technical

- Modified `src/config.ts` to resolve project root using `__dirname` and explicitly load `.env` from project root
- Added fallback to default dotenv behavior if `.env` doesn't exist in project root

## [1.3.0] - 2025-01-XX

### Added

- **Beautiful command display**: Generated commands are now displayed in a visually appealing box with Unicode borders for better readability

### Technical

- Added `formatCommandBox()` function in `src/cli.ts` to wrap commands in formatted boxes
- Updated command display in both interactive and non-interactive modes

## [1.2.0] - 2025-01-XX

### Added

- **PowerShell history support**: Commands are now automatically added to PowerShell history using `Add-History` cmdlet
- **Dual operation mode**: Commands are now copied to clipboard AND added to shell history simultaneously (when supported)

### Changed

- **Improved clipboard/history behavior**: Removed headless environment detection - now always attempts both clipboard copy and history addition
- **Enhanced error handling**: Operations fail silently with independent error handling for clipboard and history operations
- Better user experience: Users get commands in both clipboard and shell history for maximum convenience

### Technical

- Modified `src/clipboard.ts` to always attempt both clipboard and history operations
- Added PowerShell history support via `Add-History` cmdlet
- Removed `isHeadless()` function as it's no longer needed
- Simplified error handling with "run and forget" approach

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
