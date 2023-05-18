import type { Config } from '@jest/types'

const config: Config.InitialOptions = {
  testEnvironment: 'node',
  preset: 'ts-jest',
  testRegex: '.*(test|spec)\\.tsx?$',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  transform: {
    '^.+\\.(ts|tsx)$': ['ts-jest', {
      tsconfig: '<rootDir>/test/tsconfig.json'
    }],
  },
  modulePaths: ['<rootDir>'],
  roots: ['<rootDir>/test/src'],
}

export default config
