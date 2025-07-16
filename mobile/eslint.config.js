// https://docs.expo.dev/guides/using-eslint/
import expoConfig from 'eslint-config-expo/flat';

export default [
  ...expoConfig,
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    rules: {
      // Expo-specific overrides
      'no-console': 'off', // Console is useful in mobile development
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          ignoreRestSiblings: true,
        },
      ],
      // React Native specific
      'react-hooks/exhaustive-deps': 'warn',
      'react/display-name': 'off',
    },
  },
  {
    ignores: [
      'dist/*',
      '.expo/*',
      'node_modules/*',
      'expo-router/*',
      '**/*.generated.*',
    ],
  },
];
