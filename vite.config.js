import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import { copyFileSync, mkdirSync, existsSync } from 'fs';

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'copy-files',
      closeBundle: () => {
        // 复制类型定义文件
        copyFileSync(
          resolve(__dirname, 'src/index.d.ts'),
          resolve(__dirname, 'dist/index.d.ts')
        );
        
        // 确保 dist 目录存在
        if (!existsSync(resolve(__dirname, 'dist'))) {
          mkdirSync(resolve(__dirname, 'dist'));
        }
      }
    }
  ],
  build: {
    lib: {
      entry: {
        'index': resolve(__dirname, 'src/index.jsx'),
        'native-lazy': resolve(__dirname, 'src/native-lazy.js')
      },
      name: 'ReactLazyImage',
      fileName: (format, entryName) => `${entryName}.${format}.js`
    },
    rollupOptions: {
      external: ['react', 'react-dom'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM'
        }
      }
    },
    outDir: 'dist',
    emptyOutDir: true
  }
});
