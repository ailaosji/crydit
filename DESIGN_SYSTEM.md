# Crydit 设计系统规范

> 版本: 1.0.0 | 更新日期: 2025-12-10

## 🎨 颜色系统

### 品牌色

#### 主品牌色 - Indigo
用于主要CTA、链接、重要按钮
```css
Primary: #4F46E5 (indigo-600)
Primary Hover: #4338CA (indigo-700)
Primary Light: #818CF8 (indigo-400)
```

#### 辅助品牌色 - Orange
用于优惠信息、促销标签、次要CTA
```css
Secondary: #F97316 (orange-500)
Secondary Hover: #EA580C (orange-600)
Secondary Light: #FB923C (orange-400)
```

### 功能色

```css
成功 Success: #10B981 (green-500)
警告 Warning: #F59E0B (yellow-500)
错误 Error: #EF4444 (red-500)
信息 Info: #3B82F6 (blue-500)
```

### 中性色

```css
背景色:
- bg-[#F5F9ED]: #F5F9ED (页面主背景 - Kindle护眼色)
- bg-white: #FFFFFF (模块背景)
- bg-gray-50: #F9FAFB (备选背景)
- bg-gray-100: #F3F4F6 (边框、分隔)

文字色:
- text-gray-900: #111827 (主要文字)
- text-gray-700: #374151 (次要文字)
- text-gray-600: #4B5563 (辅助文字)
- text-gray-500: #6B7280 (提示文字)

边框色:
- border-gray-200: #E5E7EB
- border-gray-300: #D1D5DB
```

### 页面背景色方案（Kindle护眼主题）

```css
页面主背景: bg-[#F5F9ED] (极浅护眼色，温暖黄绿调)
所有模块背景: bg-white (统一白色模块)
表格背景: bg-[#E3EDCD] (Kindle标准护眼色)
```

**设计理念**:
- 采用Kindle阅读器护眼色作为页面底色，减少视觉疲劳
- 白色模块在护眼色背景上对比清晰
- 统一简洁的配色方案，专业感强

### 表格配色（Kindle护眼色主题）

```css
表格容器: bg-[#E3EDCD] - Kindle浅黄绿护眼色
表格表头: bg-[#D4E4BC] - 稍深的黄绿色
表格边框: border-[#C5D5A8] - 黄绿色边框
行分隔线: divide-[#D4E4BC] - 黄绿色分隔
悬停效果: hover:bg-[#D4E4BC] - 黄绿色悬停
```

**设计理念**: 采用Kindle阅读器护眼色，温暖的黄绿色调减少眼睛疲劳，长时间查看数据更舒适

---

## 📝 排版规范

### 字体

```css
Font Family: 系统默认字体栈
font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
```

### 字号层级

```css
/* 标题 */
h1: text-4xl lg:text-5xl (36px-48px) - 页面主标题
h2: text-2xl lg:text-3xl (24px-30px) - 模块标题
h3: text-xl (20px) - 卡片标题

/* 正文 */
Body Large: text-lg (18px) - 引导文字
Body: text-base (16px) - 正文
Body Small: text-sm (14px) - 辅助信息
Caption: text-xs (12px) - 标签、提示
```

### 字重

```css
font-extrabold: 800 - 主标题
font-bold: 700 - 副标题、强调
font-semibold: 600 - 按钮、卡片标题
font-medium: 500 - 导航、标签
font-normal: 400 - 正文
```

### 行高

```css
leading-tight: 1.25 - 标题
leading-normal: 1.5 - 正文
leading-relaxed: 1.625 - 长文本
```

---

## 📏 间距系统

### 基础单位
基于 4px 网格系统

```css
/* Tailwind 间距对照 */
1: 4px
2: 8px
3: 12px
4: 16px
5: 20px
6: 24px
8: 32px
10: 40px
12: 48px
16: 64px
20: 80px
```

### 常用间距场景

```css
/* 模块间距 */
Section Padding: py-12 lg:py-16 (48px-64px)
Section Margin: mb-12 lg:mb-16

/* 卡片间距 */
Card Padding: p-5 p-6 (20px-24px)
Card Gap: gap-4 (16px)

/* 内容间距 */
Title Margin: mb-8 (32px)
Paragraph Margin: mb-4 (16px)
Item Gap: gap-1.5 gap-2 (6px-8px)
```

---

## 🧩 组件规范

### 按钮

#### 主要按钮（Primary）
```tsx
<button className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-xl font-semibold hover:bg-indigo-700 transition-all transform hover:scale-105 shadow-lg">
  按钮文字
</button>
```

#### 次要按钮（Secondary）
```tsx
<button className="inline-flex items-center gap-2 px-6 py-3 bg-orange-500 text-white rounded-xl font-semibold hover:bg-orange-600 transition-all transform hover:scale-105 shadow-lg">
  按钮文字
</button>
```

#### 文字按钮（Ghost）
```tsx
<button className="inline-flex items-center gap-2 px-4 py-2 text-indigo-600 font-semibold hover:text-indigo-700 transition-colors">
  按钮文字
</button>
```

### 卡片

#### 标准卡片
```tsx
<div className="group relative block overflow-hidden rounded-2xl bg-white p-5 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
  {/* 内容 */}
</div>
```

**卡片规范**:
- 圆角: `rounded-2xl` (16px)
- 阴影: `shadow-md` 默认, `shadow-xl` 悬停
- 悬停效果: `-translate-y-1` 上移
- 过渡时间: `duration-300`

### 标签

#### 高亮标签
```tsx
<span className="inline-block px-2.5 py-1 rounded-full bg-orange-500 text-white text-xs font-semibold">
  热门推荐
</span>
```

#### 功能标签
```tsx
<span className="inline-flex items-center rounded-lg bg-gray-50 px-2.5 py-1 text-xs text-gray-700">
  <CheckCircle className="mr-1 h-3 w-3 text-green-500" />
  特性描述
</span>
```

### 优惠券样式

```tsx
<div className="relative overflow-hidden rounded-lg border-2 border-dashed border-orange-300 bg-gradient-to-r from-orange-50 to-red-50 px-3 py-2 flex items-center justify-between">
  <span className="text-xs font-bold text-orange-700">优惠信息</span>

  {/* 右侧箭头 */}
  <div className="flex-shrink-0 ml-2 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-full p-1">
    <ArrowRightIcon className="w-3 h-3" />
  </div>

  {/* 左侧装饰圆点 */}
  <div className="absolute left-0 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white"></div>
</div>
```

### 邀请码显示

```tsx
<div className="relative cursor-pointer rounded-lg border-2 border-dashed border-blue-300 bg-gradient-to-r from-blue-50 to-indigo-50 px-3 py-2.5 hover:from-blue-100 hover:to-indigo-100 transition-all">
  <div className="flex items-center justify-between">
    <div className="flex-1">
      <div className="text-[10px] text-blue-600 font-medium mb-0.5">邀请码</div>
      <span className="text-sm font-bold text-blue-700 tracking-wider">CODE123</span>
    </div>
    <div className="flex-shrink-0 ml-2 bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-lg p-1.5">
      <CopyIcon className="w-3 h-3" />
    </div>
  </div>

  {/* 装饰圆点 */}
  <div className="absolute left-0 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white"></div>
</div>
```

---

## 🎯 图标规范

### 图标库
使用 `lucide-react`

### 图标尺寸

```css
h-3 w-3: 12px - 小图标（标签内）
h-4 w-4: 16px - 常规图标（按钮、列表）
h-5 w-5: 20px - 中等图标（功能图标）
h-6 w-6: 24px - 大图标（标题图标）
h-10 w-10: 40px - 装饰图标（模块标题）
```

### 图标颜色

```tsx
// 根据模块主题色
<Globe className="h-6 w-6 text-indigo-600" />  // 银行
<Wallet className="h-6 w-6 text-purple-600" /> // 钱包
<Send className="h-6 w-6 text-orange-600" />   // 汇款
```

### 图标容器

```tsx
<div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/80 backdrop-blur-sm">
  <IconComponent className="h-6 w-6 text-indigo-600" />
</div>
```

---

## 🌈 渐变应用

### 标题渐变

```tsx
<span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
  渐变文字
</span>
```

### 按钮渐变

```tsx
<button className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700">
  渐变按钮
</button>
```

### 背景渐变

```tsx
<div className="bg-gradient-to-r from-orange-50 to-red-50">
  背景渐变
</div>
```

---

## 📱 响应式设计

### 断点

```css
sm: 640px
md: 768px
lg: 1024px
xl: 1280px
2xl: 1536px
```

### 网格布局

```tsx
// 2列布局（汇款）
<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-2">

// 3列布局（钱包）
<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">

// 4列布局（银行）
<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
```

---

## ⚡ 动画与过渡

### 标准过渡

```css
transition-all duration-300
```

### 悬停效果

```css
/* 卡片悬停 */
hover:-translate-y-1 hover:shadow-xl

/* 按钮悬停 */
hover:scale-105

/* 颜色过渡 */
hover:bg-indigo-700 transition-colors
```

### 加载动画

```tsx
<div className="animate-bounce">...</div>
<div className="animate-pulse">...</div>
```

---

## 🎭 阴影系统

```css
shadow-sm: 微阴影 - 输入框
shadow-md: 标准阴影 - 卡片默认
shadow-lg: 大阴影 - 按钮、浮层
shadow-xl: 超大阴影 - 卡片悬停
shadow-2xl: 最大阴影 - 模态框
```

---

## ✅ 设计检查清单

### 新组件开发时检查：

- [ ] 是否使用了品牌色系统（Indigo/Orange）
- [ ] 是否遵循4px网格间距
- [ ] 是否使用了标准圆角（rounded-xl/rounded-2xl）
- [ ] 是否添加了悬停效果
- [ ] 是否适配了移动端（sm:/lg:）
- [ ] 是否使用了统一的字体大小和字重
- [ ] 是否添加了适当的阴影
- [ ] 是否使用了标准过渡时间（300ms）
- [ ] 图标尺寸是否合适
- [ ] 是否考虑了可访问性（对比度、语义化）

---

## 📚 示例参考

查看以下文件了解实际应用：

- **卡片组件**: `src/components/BankRecommendationModule.tsx`
- **优惠样式**: `src/components/FeaturedCardsSection.tsx`
- **邀请码**: `src/pages/banks/[slug].astro`
- **按钮样式**: `src/pages/index.astro`

---

## 🔄 版本历史

### v1.0.0 (2025-12-10)
- 建立初始设计系统
- 定义品牌色系统（Indigo + Orange）
- 制定白灰交替背景方案
- 规范组件库标准

---

**维护者**: Claude Code
**最后更新**: 2025-12-10
