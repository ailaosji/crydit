import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), react()],

  // Cloudflare Pages 部署不需要 base 路径
  // base 路径已完全移除

  // 网站 URL，替换为您的 Cloudflare Pages 域名
  // 例如：'https://your-project.pages.dev' 或您的自定义域名
  site: 'https://your-project.pages.dev',

  // 构建配置
  build: {
    // 静态文件输出目录
    assets: 'assets',
  },

  // 服务器配置（开发环境）
  server: {
    port: 4321,
    host: true,
  },

  // 输出配置
  output: 'static',

  // Vite 配置
  vite: {
    build: {
      rollupOptions: {
        output: {
          // 资源文件命名
          assetFileNames: 'assets/[name].[hash][extname]',
        },
      },
    },
  },
});
