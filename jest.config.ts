import { pathsToModuleNameMapper } from 'ts-jest/utils'
import type { Config } from '@jest/types'
import * as ts from 'typescript'
import * as path from 'path'

const tsConfig = ts.readConfigFile(
  path.resolve(__dirname, 'test/tsconfig.json'),
  ts.sys.readFile
)

const config: Config.InitialOptions = {
  testEnvironment: 'node',
  preset: 'ts-jest',
  testRegex: '.*(test|spec)\\.tsx?$',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/test/tsconfig.json',
    },
    astTransformers: {
      before: ['ts-jest/dist/transformers/path-mapping'],
    },
  },
  moduleNameMapper: pathsToModuleNameMapper(
    tsConfig.config.compilerOptions.paths,
    { prefix: '<rootDir>/test' }
  ),
  modulePaths: ['<rootDir>'],
  roots: ['<rootDir>/test/tests'],
}

export default config
