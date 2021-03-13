module.exports = {
  moduleFileExtensions: ['json', 'js', 'jsx', 'ts', 'tsx'],
  modulePaths: ['<rootDir>'],
  moduleDirectories: ['node_modules', 'src'],
  moduleNameMapper: {
    '^.+\\.(css|less|scss)$': 'babel-jest'
  },
  transform: {
    '^.+\\.(js|jsx)?$': 'babel-jest',
    '^.+\\.(ts|tsx)?$': 'ts-jest',
  },
  testEnvironment: 'jsdom',
  testMatch: [
    '<rootDir>/**/Card.test.(js|jsx|ts|tsx)'
  ],
  transformIgnorePatterns: ['<rootDir>/node_modules/'],
  setupFilesAfterEnv: ['./jest.setup.js'],
};