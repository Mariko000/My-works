// 画像をインポート
import chocoAd from '@/assets/ad/choco_ad.png'
import deckAd from '@/assets/ad/deck-ad.png'
import officialStore from '@/assets/ad/official_store.png'
import reelAd from '@/assets/ad/reel-ad.png'

export const ads = [
  {
    id: 1,
    title: 'Chocolate Online Store',
    src: chocoAd,
    link: '/store/chocolate',
    size: 'square' // レイアウト制御用のフラグを持たせる
  },
  {
    id: 2,
    title: 'Skateboard Deck Archive',
    src: deckAd,
    link: '/archive/deck',
    size: 'horizontal'
  },
  {
    id: 3,
    title: 'Official Store Open',
    src: officialStore,
    link: '/store',
    size: 'square'
  },
  {
    id: 4,
    title: 'Night Session Live',
    src: reelAd,
    link: '/events/live',
    size: 'vertical'
  }
]