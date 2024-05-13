module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: ['.ios.js', '.android.js', '.ts', '.tsx', '.js', '.json'],
        alias: {
          '@components': './src/components',
          '@constants': './src/constants',
          '@hook': './src/hook',
          '@navigation': './src/navigation',
          '@store': './src/store',
          '@themes': './src/themes',
          '@utilities': './src/utilities',
          '@screens': './src/screens',
          '@assets': './src/assets',
          '@common': './src/common',
        },
      },
    ],
    'react-native-reanimated/plugin',
  ],
};
