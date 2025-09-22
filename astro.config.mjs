import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';

export default defineConfig({
  integrations: [
    tailwind(),
    react()
  ],
  
  site: 'https://your-project.pages.dev',
  
  // 添加性能优化配置
  build: {
    assets: 'assets',
    inlineStylesheets: 'auto', // 优化CSS内联策略
    format: 'file' // 使用文件格式而非目录格式
  },
  
  // 图片优化配置
  image: {
    service: {
      entrypoint: 'astro/assets/services/sharp'
    }
  },

  // 服务器配置（开发环境）
  server: {
    port: 4321,
    host: true
  },

  // 输出配置
  output: 'static',
  
  // 压缩配置
  vite: {
    build: {
      rollupOptions: {
        output: {
          assetFileNames: 'assets/[name].[hash][extname]',
          chunkFileNames: 'chunks/[name].[hash].js',
          entryFileNames: 'entry/[name].[hash].js',
        }
      },
      // 开启压缩
      minify: 'terser',
      terserOptions: {
        compress: {
          drop_console: true,
          drop_debugger: true
        }
      }
    }
  }
});