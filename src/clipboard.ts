import clipboardy from 'clipboardy';
import { execSync } from 'child_process';
import { ShellType } from './shell';

export interface ClipboardOptions {
  command: string;
  shell: ShellType;
}

/**
 * Determines if the environment is headless (no GUI display)
 * @returns True if running in a headless environment
 */
export function isHeadless(): boolean {
  // Windows always has GUI/clipboard support, so it's never headless
  if (process.platform === 'win32') {
    return false;
  }

  // Check for display environment variables (Unix-like systems)
  const hasDisplay = process.env.DISPLAY || process.env.WAYLAND_DISPLAY;

  // Additional checks for headless environments
  const isSsh = process.env.SSH_CLIENT || process.env.SSH_TTY;
  const isDocker = process.env.DOCKER_CONTAINER || process.env.DOCKER_CONTAINER_ID;

  return !hasDisplay || !!isSsh || !!isDocker;
}

/**
 * Copies command to clipboard or adds to shell history based on environment
 * @param options The clipboard operation options
 */
export async function copyToClipboardOrHistory(options: ClipboardOptions): Promise<void> {
  const { command, shell } = options;

  if (isHeadless()) {
    // In headless environments, add to shell history
    addToShellHistory(command, shell);
    console.log(`✓ Command added to shell history: ${command}`);
  } else {
    // In GUI environments, copy to clipboard
    try {
      await clipboardy.write(command);
      console.log(`✓ Command copied to clipboard: ${command}`);
    } catch (error) {
      // Fallback to history if clipboard fails
      console.warn('Clipboard not available, falling back to shell history');
      addToShellHistory(command, shell);
      console.log(`✓ Command added to shell history: ${command}`);
    }
  }
}

/**
 * Adds a command to the shell history
 * @param command The command to add
 * @param shell The shell type
 */
function addToShellHistory(command: string, shell: ShellType): void {
  try {
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
        // PowerShell doesn't have a direct equivalent, but we can suggest it
        console.log(`💡 Run this command: ${command}`);
        break;

      case 'cmd':
        // Windows CMD doesn't have persistent history like Unix shells
        console.log(`💡 Run this command: ${command}`);
        break;

      default:
        console.log(`💡 Generated command: ${command}`);
    }
  } catch (error) {
    // If history command fails, just show the command
    console.log(`💡 Generated command: ${command}`);
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
