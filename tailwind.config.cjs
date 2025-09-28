/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      // 添加自定义的文本对齐工具类
      textAlign: {
        center: 'center',
      },
    },
  },
  // 确保动态类名可以被正确识别
  safelist: [
    'text-left',
    'text-center',
    'text-right',
    'items-start',
    'items-center',
    'items-end',
    'justify-start',
    'justify-center',
    'justify-end',
  ],
  plugins: [require('@tailwindcss/typography')],
};
