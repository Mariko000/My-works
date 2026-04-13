// --- Life & Energy カテゴリ ---
import lifeApple from '@/assets/life_apple.png'
import lifeBirth from '@/assets/life_birth.PNG'
// import lifeCell from '@/assets/life_cell.png'
import lifeEnergy from '@/assets/life_energy.png'
// import lifeFish from '@/assets/life_Fish.PNG' // 今回ブラッシュアップした魚
import lifeHuman from '@/assets/life_human.png'
import lifeMagazineCover from '@/assets/life_magazine-cover.png'
import lifeReincarnation from '@/assets/life_reincarnation.PNG'

// --- Abstract カテゴリ ---
import abstBlue from '@/assets/abst_blue.png'
// import abstBreeze from '@/assets/abst_Breeze.PNG'
// import abstGreenSingularity from '@/assets/abst_Green_Singularity.PNG'
import abstOverhead from '@/assets/abst_Overhead.jpg'
// import abstSilentBlade from '@/assets/abst_SILENT_BLADE.png'
import abstSun from '@/assets/abst_Sun.PNG'
import Spring from '@/assets/Spring.PNG'

// --- Graphic カテゴリ ---
import gfxBirds from '@/assets/gfx_birds.png'
import gfxEye from '@/assets/gfx_eye.png'
import gfxFlowers from '@/assets/gfx_Flowers.png'
// import gfxLighthouse from '@/assets/gfx_lighthouse.png'
import gfxMandara from '@/assets/gfx_mandara.png'
import gfxTypo1 from '@/assets/gfx_typo_1.png'
import gfxlabyrinth from '@/assets/gfx_labyrinth.png'
import gfxThe_Invisible_Lake from '@/assets/gfx_The_Invisible_Lake.PNG'
import lifeSummer from '@/assets/life_Summer.png'
import Dark from '@/assets/Original_Dark.PNG'

export const works = [
  // Life & Energy
  { 
    id: 1, 
    title: 'The Invisible Lake', 
    category: 'Graphic', 
    image: gfxThe_Invisible_Lake,
    description: `ずらした二重のドットが、水の流れや日本の流水紋のような動きを生み出し、遠くから見た時に「菱形の穴」が現れ、それは、視線を表面から「湖の奥（深淵）」へと引き込みます。
  
Offset layers of dots create the illusion of flowing water, reminiscent of traditional Japanese water patterns. A small yellow bird is quietly hidden within the dots.`,
date: '2026.Mar' 
  },

  { id: 2, title: 'Summer', category: 'Graphic', image: lifeSummer,
  description: `夏の早朝の都市のビルの隙間から登る太陽と差し込む光を描きました。
  太陽の縁をピクセル的に表現することでガラスや建物の反射の光を表現しました。

  The moment when the sun rises between buildings.
  A quiet morning light in the humid air.`,
  date: '2026.Mar' 
  },

  { id: 3, title: 'Apple', category: 'Life & Energy', image: lifeApple,
  description: '生命の根源としての果実。おいしそうな断面をイメージして描きました。',
  date: '2026.Mar' },

  { id: 4, title: 'Birth', category: 'Life & Energy', image: lifeBirth },
  { id: 5, title: 'Dark', category: 'Graphic', image: Dark,
  description: 'チョコレートパッケージのプロジェクトのグラフィック、周りを弾けるフレーバーを表しています。',
  date: '2026.Jan' },
  { id: 6, title: 'Spring', category: 'Abstract', image: Spring,
  description: '春はお花と日差しと生命の活動の始まりの季節',
  date: '2026.Apr' },
  // { id: 7, title: 'Cell', category: 'Life & Energy', image: lifeCell },
  { id: 8, title: 'Energy', category: 'Life & Energy', image: lifeEnergy },
  // { id: 9, title: 'Fish Voyage', category: 'Life & Energy', image: lifeFish },
  { id: 10, title: 'Human', category: 'Life & Energy', image: lifeHuman },
  { id: 11, title: 'Magazine Cover Project', category: 'Life & Energy', image: lifeMagazineCover },
  { id: 12, title: 'Reincarnation', category: 'Life & Energy', image: lifeReincarnation },

  // Abstract
  { id: 13, title: 'Blue', category: 'Abstract', image: abstBlue,
  description: '深層心理の中に沈む、静かな青。見る人の心境によって、穏やかにも孤独にも感じられる抽象表現を追求',
  date: '2026.Jan' },
  // { id: 14, title: 'Breeze', category: 'Abstract', image: abstBreeze },
  // { id: 15, title: 'Green Singularity', category: 'Abstract', image: abstGreenSingularity },
  { id: 16, title: 'Overhead', category: 'Abstract', image: abstOverhead },
  // { id: 17, title: 'SILENT BLADE', category: 'Abstract', image: abstSilentBlade },
  { id: 18, title: 'Sun', category: 'Abstract', image: abstSun },

  // Graphic

  { id: 19, title: 'Birds', category: 'Graphic', image: gfxBirds },
  { id: 20, title: 'Eye', category: 'Graphic', image: gfxEye },
  { id: 21, title: 'Flowers', category: 'Graphic', image: gfxFlowers },
  // { id: 22, title: 'Lighthouse', category: 'Graphic', image: gfxLighthouse },
  { id: 23, title: 'Mandara', category: 'Graphic', image: gfxMandara },
  { id: 24, title: 'Typography 01', category: 'Graphic', image: gfxTypo1 },
  { id: 25, title: 'Labyrinth', category: 'Graphic', image: gfxlabyrinth }
]