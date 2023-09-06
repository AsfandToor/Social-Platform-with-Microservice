const { spawn } = require('child_process');

const useYarn = process.argv.includes('--yarn');
const scriptPrefix = useYarn ? 'yarn' : 'npm';

const scripts = [
  'dev:client',
  'dev:master',
  'dev:post',
  'dev:chat',
];

const runScript = (script) => {
  const child = spawn(`${scriptPrefix}`, ['run', script], {
    stdio: 'inherit',
    shell: true,
  });

  child.on('close', (code) => {
    if (code !== 0) {
      console.error(`Script "${script}" exited with code ${code}`);
    }
  });
};

scripts.forEach((script) => runScript(script));
