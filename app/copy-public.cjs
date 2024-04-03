const fs = require('fs-extra');
const path = require('path');

const distPath = path.resolve(__dirname, '..', 'app', 'public');
const parentDir = path.resolve(__dirname, '..', 'dist', 'public');

fs.copy(distPath, parentDir)
  .then(() => console.log('Files copied successfully!'))
  .catch(err => console.error('Error copying files:', err));