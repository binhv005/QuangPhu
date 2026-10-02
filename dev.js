const { spawn } = require('child_process');
const path = require('path');

console.log('🚀 Đang khởi động Full-stack MERN (React + Node.js + MongoDB)...');

// Start Express Backend
const server = spawn('node', ['server.js'], {
  cwd: path.join(__dirname, 'server'),
  stdio: 'inherit',
  shell: true
});

// Start React Vite Frontend
const client = spawn('npm', ['run', 'dev'], {
  cwd: path.join(__dirname, 'client'),
  stdio: 'inherit',
  shell: true
});

process.on('SIGINT', () => {
  console.log('\n🛑 Đang dừng server và client...');
  server.kill();
  client.kill();
  process.exit();
});
