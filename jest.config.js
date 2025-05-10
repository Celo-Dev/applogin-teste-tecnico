module.exports = {
    preset: 'react-native',
    setupFilesAfterEnv: [
        '@testing-library/jest-native/extend-expect',
        './jest.setup.js',
    ],
    transformIgnorePatterns: [
        'node_modules/(?!(jest-)?react-native|@react-native|@react-navigation|native-base|@react-native-aria)',
    ],
    moduleNameMapper: {
        '^react-dom$': '<rootDir>/__mocks__/react-dom.js',
    },
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    testMatch: ['**/*.test.ts?(x)', '**/__tests__/**/*.ts?(x)'],
};
