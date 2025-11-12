import * as dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

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
