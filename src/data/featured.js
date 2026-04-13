// インポートしてから渡す
import { works } from './works'
import timeWheelImg from '@/assets/logo/icon-1024x1024.png'
// import clipCookImg from '@/assets/App_portfolio_top.png'

// Graphic作品は辞書から参照
const graphicLake = works.find(w => w.title === 'The Invisible Lake')
const graphicSummer = works.find(w => w.title === 'Summer')
const graphicDark = works.find(w => w.title === 'Dark') // 追加
const graphicSpring = works.find(w => w.title === 'Spring') // 追加

// Apps作品は /Apps で使っている情報を直接
export const featured = [
  {
    type: 'app',
    title: 'TimeWheel',
    link: 'https://timewheel.vercel.app/',
    image: timeWheelImg
  },
  // {
    // type: 'app',
    // title: 'ClipCook',
    // link: 'https://www.behance.net/gallery/246820869/ClipCook-Full-Stack-Cooking-App',
    // image:  clipCookImg
  // },
  {
    type: 'graphic',
    title: graphicLake.title,
    link: `/works/${graphicLake.id}`,
    image: graphicLake.image
  },
  {
    type: 'graphic',
    title: graphicSummer.title,
    link: `/works/${graphicSummer.id}`,
    image: graphicSummer.image
  },
  {
    type: 'graphic',
    title: graphicDark.title, // Darkを追加
    link: `/works/${graphicDark.id}`,
    image: graphicDark.image
  },
  {
    type: 'graphic',
    title: graphicSpring.title, // Springを追加
    link: `/works/${graphicSpring.id}`,
    image: graphicSpring.image
  }
]