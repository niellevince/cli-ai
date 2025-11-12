#!/usr/bin/env node

// Check if this is a development environment (has src directory)
const fs = require('fs');
const path = require('path');

const isDev = fs.existsSync(path.join(__dirname, '..', 'src'));

if (isDev) {
  // Development mode: use ts-node to run TypeScript directly
  try {
    require('ts-node').register({
      project: path.join(__dirname, '..', 'tsconfig.json'),
      transpileOnly: true,
    });
    require('../src/cli.ts');
  } catch (error) {
    console.error('❌ Failed to run in development mode:', error.message);
    console.log('💡 Try running: npm run build && npm start');
    process.exit(1);
  }
} else {
  // Production mode: require compiled JavaScript
  try {
    require('../lib/cli.js');
  } catch (error) {
    console.error('❌ CLI not built. Please run: npm run build');
    console.log('💡 Or run in development mode: npm run dev');
    process.exit(1);
  }
}
