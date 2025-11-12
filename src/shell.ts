export type ShellType = 'bash' | 'zsh' | 'powershell' | 'cmd' | 'fish' | 'unknown';

/**
 * Detects the current shell environment
 * @returns The detected shell type
 */
export function detectShell(): ShellType {
  // Check SHELL environment variable (Unix-like systems)
  const shellEnv = process.env.SHELL?.toLowerCase();

  if (shellEnv) {
    if (shellEnv.includes('bash')) return 'bash';
    if (shellEnv.includes('zsh')) return 'zsh';
    if (shellEnv.includes('fish')) return 'fish';
  }

  // Check ComSpec for Windows Command Prompt
  const comSpec = process.env.ComSpec?.toLowerCase();
  if (comSpec) {
    if (comSpec.includes('powershell')) return 'powershell';
    if (comSpec.includes('cmd')) return 'cmd';
  }

  // Check if we're running in PowerShell
  if (process.env.PSModulePath) return 'powershell';

  // Default to bash for Unix-like systems, cmd for Windows
  return process.platform === 'win32' ? 'cmd' : 'bash';
}

/**
 * Get shell-specific command formatting hints
 * @param shell The shell type
 * @returns Description of shell-specific considerations
 */
export function getShellInfo(shell: ShellType): string {
  switch (shell) {
    case 'bash':
    case 'zsh':
      return 'bash/zsh compatible command';
    case 'powershell':
      return 'PowerShell compatible command';
    case 'cmd':
      return 'Windows Command Prompt compatible command';
    case 'fish':
      return 'Fish shell compatible command';
    default:
      return 'cross-platform command';
  }
}
