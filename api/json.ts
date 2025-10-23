import { api } from './api';
import { getResponseTime } from './utils';
import fs from 'fs';
import path from 'path';

const DATA_DIR = 'src/lib/api-data';
const PRETTY_PATH = path.join(DATA_DIR, 'data.pretty.json');
const MIN_PATH = path.join(DATA_DIR, 'data.min.json');

// Ensure the data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// get data
const finish = getResponseTime();
const data = await api();
const humanizedTime = finish();
console.log(`\x1b[32m<<< API COMPLETED after ${humanizedTime}\x1b[0m`);

// save data to files
await Promise.all([
  fs.promises.writeFile(PRETTY_PATH, JSON.stringify(data, null, 2), { flag: 'w' }),
  fs.promises.writeFile(MIN_PATH, JSON.stringify(data), { flag: 'w' })
]);

// Calculate and log file sizes
const prettyStats = fs.statSync(PRETTY_PATH);
const minStats = fs.statSync(MIN_PATH);
const prettySizeKB = (prettyStats.size / 1024).toFixed(2);
const minSizeKB = (minStats.size / 1024).toFixed(2);

console.log(`Data saved to ${DATA_DIR}/`);
console.log(`📊 File sizes:`);
console.log(`  📄 data.pretty.json: ${prettySizeKB} KB`);
console.log(`  📄 data.min.json: ${minSizeKB} KB`);
