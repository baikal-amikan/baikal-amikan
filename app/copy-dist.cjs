const fs = require('fs-extra');
const path = require('path');

const distPath = path.resolve(__dirname, '..', 'app', 'dist');
const parentDir = path.resolve(__dirname, '..');

fs.copy(distPath, parentDir)
  .then(() => console.log('Files copied successfully!'))
  .catch(err => console.error('Error copying files:', err));