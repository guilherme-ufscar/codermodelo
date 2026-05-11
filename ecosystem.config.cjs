module.exports = {
  apps: [{
    name: 'axyr',
    script: 'server/index.ts',
    interpreter: '/opt/alt/alt-nodejs20/root/usr/bin/node',
    interpreter_args: '--import tsx/esm',
    cwd: '/home/u122272561/domains/axyrtecnologia.com.br/app',
    env: {
      NODE_ENV: 'production',
      PORT: 3001,
    },
  }],
};
