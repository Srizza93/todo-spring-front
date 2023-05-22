import path from 'path';
import { defineConfig } from 'vitest/config';
import Vue from '@vitejs/plugin-vue';

export default defineConfig({
  test: {
    reporters: ['default', 'json'],
    outputFile: 'tests/sonar-report.json',
    coverage: {
      reportsDirectory: 'tests/coverage',
      provider: 'c8',
      reporter: ['text', 'lcov'],
    },
    environment: 'jsdom',
    setupFiles: ['./tests/setupComponents.ts'],
  },
  plugins: [Vue()],
  root: '.',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@/': path.resolve(__dirname, './src/'),
      '~': path.resolve(__dirname, '.'),
      '~/': path.resolve(__dirname, './'),
    },
  },
});
