import { readFileSync } from 'node:fs';

const checks = [
  {
    file: 'src/utils/functions.ts',
    pass: (content) =>
      content.includes('export const getFormattedDate') &&
      !content.includes('getFormatttedDate'),
    message:
      'Expected date formatter helper to be renamed to getFormattedDate and old typo removed.',
  },
  {
    file: 'src/App.tsx',
    pass: (content) =>
      content.includes('path="/login"') &&
      content.includes('!isLoggedIn ? (') &&
      !content.includes('!isLoading ? ('),
    message:
      'Expected /login route to be guarded by isLoggedIn state, not isLoading.',
  },
];

let hasFailures = false;

for (const check of checks) {
  const content = readFileSync(check.file, 'utf8');
  if (!check.pass(content)) {
    hasFailures = true;
    console.error(`FAIL: ${check.file} -> ${check.message}`);
  } else {
    console.log(`PASS: ${check.file}`);
  }
}

if (hasFailures) {
  process.exit(1);
}

console.log('All source checks passed.');
