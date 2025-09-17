export const CARD_NETWORKS = {
  VISA: 'visa',
  MASTERCARD: 'mastercard',
  UNIONPAY: 'unionpay'
} as const;

export const CARD_CATEGORIES = {
  NEWS: { value: 'news', label: '行业资讯', color: 'red', icon: '📰', bgColor: 'from-red-500 to-pink-600' },
  GUIDE: { value: 'guide', label: '使用指南', color: 'blue', icon: '📚', bgColor: 'from-blue-500 to-indigo-600' },
  REVIEW: { value: 'review', label: '深度评测', color: 'green', icon: '🔍', bgColor: 'from-green-500 to-emerald-600' },
  ANALYSIS: { value: 'analysis', label: '市场分析', color: 'purple', icon: '📊', bgColor: 'from-purple-500 to-indigo-600' },
  TUTORIAL: { value: 'tutorial', label: '教程', color: 'teal', icon: '🎓', bgColor: 'from-teal-500 to-cyan-600' },
} as const;

export const FEE_TYPES = {
  DEPOSIT: 'deposit',
  TRANSACTION: 'transaction',
  FOREIGN_EXCHANGE: 'foreignExchange',
  WITHDRAWAL: 'withdrawal'
} as const;
