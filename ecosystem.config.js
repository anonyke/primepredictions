module.exports = {
  apps: [
    {
      name: 'primepredict-backend',
      cwd: './backend',
      script: 'npm',
      args: 'run start',
      env_production: {
        NODE_ENV: 'production',
      },
    },
    {
      name: 'primepredict-frontend',
      cwd: './frontend',
      script: 'npm',
      args: 'run start',
      env_production: {
        NODE_ENV: 'production',
        NEXT_PUBLIC_API_URL: 'http://localhost:4000',
      },
    },
  ],
};
