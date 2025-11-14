import * as dotenv from 'dotenv';
import * as path from 'path';
import * as fs from 'fs';

// Get the project root directory (one level up from lib/ or src/)
const projectRoot = path.resolve(__dirname, '..');

// Load environment variables from .env file in project root
const envPath = path.join(projectRoot, '.env');
if (fs.existsSync(envPath)) {
  dotenv.config({ path: envPath });
} else {
  // Fallback to default behavior if .env doesn't exist in project root
  dotenv.config();
}

export interface Config {
  openRouterApiKey: string;
  defaultModel: string;
}

// Validate required environment variables
function validateConfig(): Config {
  const openRouterApiKey = process.env.OPENROUTER_API_KEY;
  const defaultModel = process.env.DEFAULT_MODEL || 'google/gemini-2.5-flash-lite';

  if (!openRouterApiKey) {
    throw new Error(
      'OPENROUTER_API_KEY environment variable is required. ' +
      'Please create a .env file with your OpenRouter API key.'
    );
  }

  return {
    openRouterApiKey,
    defaultModel,
  };
}

// Export validated configuration
export const config = validateConfig();
