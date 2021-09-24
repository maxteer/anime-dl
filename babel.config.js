module.exports = {
  presets: [
    [
      '@babel/env',
      {
        targets: {
          node: '14',
        },
      },
    ],
    ['@babel/preset-typescript'],
  ],
  plugins: [
    [
      '@babel/plugin-transform-modules-commonjs',
      {
        strictMode: false,
      },
    ],
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: ['.ts', '.js', '.json'],
        alias: {
          '~': './src',
        },
      },
    ],
  ],
}
