export default {
    preset: 'ts-jest',
    testEnvironment: 'node',
    testMatch: ['**/__tests__/**/*.ts', '**/?(*.)+(spec|test).ts'],
    testPathIgnorePatterns: ['<rootDir>/dist/', '<rootDir>/node_modules/', '\\.d\\.ts$'], // Ignore dist folder and .d.ts files
};
  