// src/data/apps.js
import imgRecipe from '@/assets/smartphone_recipe .png';
import imgSchedule from '@/assets/smartphone_schedule.png';
import imgTop from '@/assets/App_portfolio_top (1).png';

import iconTimeWheel from '@/assets/logo/icon-1024x1024.png';
import iconFitSpin from '@/assets/logo/icon-fitspin.png';
import iconMyTool from '@/assets/logo/icon-512 copy.png';
import iconClipCook from '@/assets/App_portfolio_top.png';

export const appsData = [
  {
    id: 'clipcook',
    name: 'ClipCook',
    category: 'レシピ管理・SNSプラットフォーム',
    tagline: 'Global Recipe Scaling SNS',
    desc: '日・英・米の単位を自動変換。計量のストレスをデザインで解決します。',
    tag: '',
    status: 'Prototype',
    stack: 'Python / Vue',
    note: 'サーバーコストの都合により未公開',
    url: 'https://www.behance.net/gallery/246820869/ClipCook-Full-Stack-Cooking-App',
    deviceImg: imgRecipe,
    iconImg: iconClipCook,
    isBehance: true // ClipCookだけカード型なので判定用
  },
  {
    id: 'timewheel',
    name: 'TimeWheel',
    category: 'スケジュール作成アプリ',
    tagline: 'Minimalist Scheduler',
    desc: '「がんばりすぎない」をコンセプトに、最小限の入力で一日を可視化。',
    tag: 'Popular',
    status: '公開中',
    stack: 'Vue.js',
    note: 'none',
    url: 'https://timewheel.vercel.app/',
    deviceImg: imgSchedule,
    iconImg: iconTimeWheel,
    isBehance: false
  },
  {
    id: 'fitspin',
    name: 'FitSpin',
    category: 'フィットネスアプリケーション',
    tagline: 'Fitness & UI Development',
    desc: '日常に溶け込むフィットネスアプリケーション。洗練されたUI/UXを追求。',
    tag: 'New',
    status: '公開中',
    stack: 'Vue.js',
    note: 'none',
    url: 'https://fit-spin.vercel.app/',
    deviceImg: imgTop, // 一旦既存のTop画像を割り当て
    iconImg: iconFitSpin,
    isBehance: false
  },
  {
    id: 'mytool',
    name: 'My tool',
    category: '開発補助ツール',
    tagline: 'Your Developer friend',
    desc: 'あなたの日常をサポートするアプリを制作します',
    tag: '',
    status: '公開中',
    stack: 'Vue.js',
    note: 'none',
    url: 'https://mariko000.github.io/portfolio/#/',
    deviceImg: imgTop,
    iconImg: iconMyTool,
    isBehance: false
  }
];