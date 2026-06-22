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

//オリジナル画像（ダウンロードできる用）
import springGfx from '@/assets/gfx_The_Invisible_Lake.png';
import lifeSummerGfx from '@/assets/life_Summer.png';
import autumnGfx from '@/assets/Autumn.png';
import winterGfx from '@/assets/Winter.png';

import lifeAppleGfx from '@/assets/life_apple.png';
import gfxTheInvisibleLake from '@/assets/gfx_The_Invisible_Lake.png';
import originalDarkGfx from '@/assets/Original_Dark.png';
import berryPsychedelicGfx from '@/assets/Berry Psychedelic.png';
import mintFreshGfx from '@/assets/Mint_Fresh.png';


export const shopItems = [
  {
    id: 1,
    name: "Fruit Juice",
    category: "LifeStyle",
    price: 240,
    image: bottleImg,
    description: "日常に彩りを添えるジュース",
    originalImage: lifeAppleGfx,
    size: "350ml",
    url: "https://www.vivivit.com/works/1052825"
  },
  {
    id: 2,
    name: "Studio Concept T-Shirt",
    category: "Apparel",
    price: 4800,
    image: tshirtImg,
    size: "Free",
    description: "和テイストの、高品質なコットンTシャツ。",
    originalImage: gfxTheInvisibleLake,
    url: "https://www.behance.net/" // Tシャツ用のBehance等があればここにURLを入れてください
  },
  {
    id: 4,
    name: "Psychedelic Berry",
    category: "LifeStyle",
    price: 800,
    image: vinylBerryImg,
    description: "ベリーフレーバーのチョコレート",
    originalImage: berryPsychedelicGfx,
    size: "100g",
    url: "https://www.behance.net/gallery/246407685/Package-design-Chocolate"
  },
  {
    id: 3,
    name: "Dark Chocolate",
    category: "LifeStyle",
    price: 800,
    image: vinylDarkImg,
    description: "カカオ70%のダークチョコレート",
    originalImage: originalDarkGfx,
    size: "100g",
    url: "https://www.behance.net/gallery/246407685/Package-design-Chocolate"
  },
  {
    id: 5,
    name: "Fresh Mint",
    category: "LifeStyle",
    price: 800,
    image: vinylMintImg,
    description: "爽やかなミント・チョコレート",
    originalImage: mintFreshGfx,
    size: "100g",
    url: "https://www.behance.net/gallery/246407685/Package-design-Chocolate"
  },
  {
    id: 6,
    name: "Complete Set",
    category: "Set Item",
    price: 2400,
    image: vinylAllImg,
    description: "全フレーバーをコンプリートしたチョコレートセット。",
    originalImage: originalDarkGfx,
    size: "300g (100g × 3)",
    url: "https://www.behance.net/gallery/246407685/Package-design-Chocolate"
  },
  {
    id: 7,
    name: "Vinyl Collection: Spring",
    category: "Vinyl",
    price: 3500,
    image: vinylSpringImg,
    description: "春の息吹を抽象化したグラフィックジャケット",
    originalImage: springGfx,
    size: "12 inch Record",
    url: "https://www.behance.net/gallery/247233997/Spring-Vibe-Music-cover-Art"
  },
  {
    id: 9,
    name: "Vinyl Collection: Summer",
    category: "Vinyl",
    price: 3500,
    image: vinylStandardImg,
    description: "都会の夏を表現したグラフィックジャケット",
    originalImage: lifeSummerGfx,
    size: "12 inch Record",
    url: "https://www.behance.net/gallery/246212729/Summer-Vibe-Music-cover-Art"
  },
  {
    id: 8,
    name: "Vinyl Collection: Autumn",
    category: "Vinyl",
    price: 3500,
    image: vinylAutumnImg,
    description: "秋の静寂と色彩を閉じ込めた、グラフィックジャケット",
    originalImage: autumnGfx,
    size: "12 inch Record",
    url: "https://www.behance.net/gallery/247458655/Autumn-Vibe-Music-cover-Art"
  },
  {
    id: 10,
    name: "Vinyl Collection: Winter",
    category: "Vinyl",
    price: 3500,
    image: vinylWinterImg,
    description: "冬を表現したグラフィックジャケット",
    originalImage: winterGfx,
    size: "12 inch Record",
    url: "https://www.behance.net/gallery/247477111/Winter-Vibe-Music-cover-Art"
  }
];