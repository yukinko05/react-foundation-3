import { defineConfig } from 'vite';
import { configDefaults } from 'vitest/config';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  base: process.env.GITHUB_ACTIONS ? '/react-foundation-3' : '/',
  plugins: [react()],
  test: {
    // テストに関するAPIをグローバルに設定
    globals: true,
    // テスト環境の設定
    environment: 'jsdom',
    // テストの設定ファイル
    setupFiles: './tests/unit/setup.ts', // CSSファイルを処理する
    css: true,
    // テストのカバレッジを出力する設定
    coverage: {
      // @vitest/coverage-v8を設定
      provider: 'v8',
      exclude: [...(configDefaults.coverage.exclude as string[]), 'src/test', 'src/main.tsx'],
    },
  },
});
