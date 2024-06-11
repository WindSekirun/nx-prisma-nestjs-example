const { NxAppWebpackPlugin } = require('@nx/webpack/app-plugin');
const { join } = require('path');

module.exports = {
  output: {
    path: join(__dirname, '../../dist/apps/nx-prisma-nestjs-example'),
  },
  plugins: [
    new NxAppWebpackPlugin({
      target: 'node',
      compiler: 'tsc',
      main: './src/main.ts',
      tsConfig: './tsconfig.app.json',
      additionalEntryPoints: [
        {
          entryName: 'worker',
          entryPath: './apps/api/src/worker.ts'
        }
      ],
      optimization: false,
      outputHashing: 'none',
    }),
  ],
};
