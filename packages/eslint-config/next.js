import { defineConfig } from 'eslint/config';

import nextTs from 'eslint-config-next/typescript';
import nextVitals from 'eslint-config-next/core-web-vitals';

import baseConfig from './base.js';

export default defineConfig([
    ...baseConfig,
    ...nextVitals,
    // ...nextTs,
]);
