// jest.config.ts
import type {Config} from '@jest/types';
import * as path from 'path';

// Sync object
const config: Config.InitialOptions = {
  "moduleFileExtensions": [
    "js",
    "json",
    "ts"
  ],
  "moduleDirectories": ["node_modules", path.join(__dirname, "src")],
  "rootDir": "src",
  "testRegex": ".*\\.spec\\.ts$",
  "transform": {
    "^.+\\.(t|j)s$": "ts-jest"
  },
  "collectCoverageFrom": [
    "**/*.(t|j)s"
  ],
  "coverageDirectory": "../coverage",
  "testEnvironment": "node"
};
export default config;
