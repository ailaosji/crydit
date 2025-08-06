// Giscus 全局配置文件
// 配置来自 https://giscus.app/zh-CN

export const giscusConfig = {
  // GitHub 仓库配置
  repo: 'ailaosji/crydit', // GitHub 仓库
  repoId: 'R_kgDOPUb-ng', // 仓库 ID
  category: 'General', // 讨论分类
  categoryId: 'DIC_kwDOPUb-ns4Cty_B', // 分类 ID
  
  // 功能配置
  mapping: 'pathname', // 评论映射方式：使用页面路径
  strict: '0', // 严格模式：关闭
  reactionsEnabled: '1', // 启用表情反应
  emitMetadata: '0', // 发送元数据：关闭
  inputPosition: 'top', // 评论框位置：顶部
  theme: 'light', // 主题：亮色
  lang: 'zh-CN', // 语言：简体中文
  loading: 'lazy', // 加载方式：懒加载
};

export default giscusConfig;