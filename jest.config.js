module.exports = {
  modulePaths: ['src/'],
  testMatch: ['<rootDir>/src/**/*.test.js'],
  verbose: true,
  cache: false,
  moduleFileExtensions: ['js', 'tsx'],
  moduleDirectories: ['node_modules'],
  collectCoverage: true,
  coverageDirectory: '<rootDir>/coverage/jest',
  collectCoverageFrom: ['src/**/*.js'],
  coveragePathIgnorePatterns: [
    '/node_modules/',
    'src/components/',
    'src/App.js',
    'src/BootstrapApp.js',
    'src/constants/',
    'src/contexts/',
    'src/store',
    'src/utilities/conversions.utils.js',
    'src/utilities/device.js',
    'src/utilities/easing.js',
    'src/utilities/api/',
    'src/tests/',
    'src/modules/Auth/utils/recoveryPhrase.js',
    'src/utilities/api/account.js',
    'utilities/tests/mock-react-i18next.js',
    'src/assets',
    'src/modules',
    'src/navigation',
    'src/modules/Auth/utils/recoveryPhrase.mock.js',
    'src/modules/Auth/utils/documentPicker.mock.js',
    'src/hooks/useDownloadFile.mock.js',
    'src/hooks/useModal.js',
  ],
  coverageThreshold: {
    global: {
      branches: 65,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
  setupFiles: [
    './testenv.js',
    // necessary file for react-native-netinfo
    // src: https://github.com/react-native-community/react-native-netinfo#errors-while-running-jest-tests
    './jest.setup.js',
  ],
  testEnvironmentOptions: {
    url: 'http://localhost',
  },
  globals: {
    PRODUCTION: true,
    TEST: true,
  },
  preset: 'react-native',
  setupFilesAfterEnv: [
    '@testing-library/jest-native/extend-expect',
    './scripts/setupJestAfterEnv.js',
  ],
  resetModules: true,
  coverageReporters: ['text', 'html', 'lcov', 'cobertura'],
  transformIgnorePatterns: [
    'node_modules/(?!(jest-)?react-native|@react-native-community|@react-native|@react-navigation)',
  ],
  reporters: [
    'default',
    ['jest-junit', { suiteName: 'jest tests', outputDirectory: '<rootDir>/coverage/jest' }],
  ],
  moduleNameMapper: {
    'react-i18next': '<rootDir>/src/tests/i18nextWrapper.js',
  },
};
