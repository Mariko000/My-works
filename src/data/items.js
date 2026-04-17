// src/data/items.js

import bottleImg from '@/assets/shopItem/Glass-Juice-Bottle.png';
import tshirtImg from '@/assets/shopItem/Hanging_T-Shirt.png';
import vinylAllImg from '@/assets/shopItem/Scene-5_all.png';
import vinylBerryImg from '@/assets/shopItem/Scene-1_Berry.png';
import vinylDarkImg from '@/assets/shopItem/Scene-1_Dark.png';
import vinylMintImg from '@/assets/shopItem/Scene-1_Mint.png';
import vinylStandardImg from '@/assets/shopItem/Vinyl Record PSD MockUp.png';
import vinylSpringImg from '@/assets/shopItem/Vinyl Record PSD MockUp_spring.png';
import vinylAutumnImg from '@/assets/shopItem/Vinyl Record _Autumn.png';
import vinylWinterImg from '@/assets/shopItem/Vinyl Record_winter.png';


export const shopItems = [
  {
    id: 1,
    name: "Fruit Juice",
    category: "LifeStyle",
    price: 240,
    image: bottleImg,
    description: "日常に彩りを添えるジュース"
  },
  {
    id: 2,
    name: "Studio Concept T-Shirt",
    category: "Apparel",
    price: 4800,
    image: tshirtImg,
    description: "和テイストの、高品質なコットンTシャツ。"
  },
  {
    id: 4,
    name: "Psychedelic Berry",
    category: "LifeStyle",
    price: 800,
    image: vinylBerryImg,
    description: "ベリーフレーバーのチョコレート"
  },
  {
    id: 3,
    name: "Dark Chocolate",
    category: "LifeStyle",
    price: 800,
    image: vinylDarkImg,
    description: "カカオ70%のダークチョコレート"
  },
  {
    id: 5,
    name: "Fresh Mint",
    category: "LifeStyle",
    price: 800,
    image: vinylMintImg,
    description: "爽やかなミント・チョコレート"
  },
  {
    id: 6,
    name: "Complete Set",
    category: "Set Item",
    price: 2400,
    image: vinylAllImg,
    description: "全フレーバーをコンプリートしたチョコレートセット。"
  },
  {
    id: 'app-ad-timewheel',
    name: 'TimeWheel (PWA)',
    category: 'App',
    price: 0,
    isApp: true,
    image: '/src/assets/shopItem/app-ad-1.png',
    description: '一日のスケジュールを自動最適化するPWA時間管理ツール。タスクを数珠つなぎに配置し、効率的な時間設計を支援します。',
    link: 'https://timewheel.vercel.app/', // アプリへのリンク
    isApp: true // アプリかどうかを判別するフラグを持たせると便利です
  },
  {
    id: 7,
    name: "Vinyl Collection: Spring",
    category: "Vinyl",
    price: 3500,
    image: vinylSpringImg,
    description: "春の息吹を抽象化したグラフィックジャケット"
  },
  
  {
    id: 9,
    name: "Vinyl Collection: Summer",
    category: "Vinyl",
    price: 3500,
    image: vinylStandardImg,
    description: "都会の夏を表現したグラフィックジャケット"
  },
  {
    id: 8,
    name: "Vinyl Collection: Autumn",
    category: "Vinyl",
    price: 3500,
    image: vinylAutumnImg,
    description: "秋の静寂と色彩を閉じ込めた、グラフィックジャケット"
  },

  {
    id: 10,
    name: "Vinyl Collection: Winter",
    category: "Vinyl",
    price: 3500,
    image: vinylWinterImg,
    description: "冬を表現したグラフィックジャケット"
  }
];