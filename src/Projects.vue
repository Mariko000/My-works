<script setup>
import { ref } from 'vue'
import { projects } from '@/data/projects'
import { ads } from '@/data/ad' // 広告データをインポート

const track = ref(null)
const viewMode = ref('slider') // 'slider' または 'grid'

const toggleView = (mode) => {
  viewMode.value = mode
}


// スクロール処理
// スライドさせる距離（アイテム1個分 + 余白）
const scrollAmount = 510 // project-itemの480px + marginの30px

const scrollPrev = () => {
  if (track.value) {
    track.value.scrollBy({ left: -scrollAmount, behavior: 'smooth' })
  }
}

const scrollNext = () => {
  if (track.value) {
    track.value.scrollBy({ left: scrollAmount, behavior: 'smooth' })
  }
}

</script>

<template>
  <!-- divで包んで安全設計 -->
  <div class="projects-page-root">
  <aside class="promo-ribbon">
    <div class="ribbon-content">
      RutenVeilについて... 
      <router-link to="/about" class="ribbon-link">詳細はこちら</router-link>
    </div>
  </aside>
  
  <main class="portfolio-container">

    <div class="view-controls">
      <button :class="{ active: viewMode === 'slider' }" @click="toggleView('slider')">Slider</button>
      <button :class="{ active: viewMode === 'grid' }" @click="toggleView('grid')">Grid</button>
    </div>

    <div :class="['slider-wrapper', viewMode]">
      <button v-if="viewMode === 'slider'" class="nav-btn prev" @click="scrollPrev">＜</button>
      <button v-if="viewMode === 'slider'" class="nav-btn next" @click="scrollNext">＞</button>

      <div class="slider-track" ref="track">
        <div v-for="project in projects" :key="`a-${project.id}`" class="project-item">
          <div class="project-image-zone">
            <a :href="project.link" target="_blank" rel="noopener" class="card-link">
              <img :src="project.image" :alt="project.title" />
              <div class="overlay"><span>View on Behance ↗</span></div>
            </a>
          </div>
          <div class="project-info">
            <p class="description">{{ project.description }}</p>
            <p class="app-name">{{ project.title }}</p>
          </div>
        </div>

        <template v-if="viewMode === 'slider'">
          <div v-for="project in projects" :key="`b-${project.id}`" class="project-item">
            <div class="project-image-zone">
              <a :href="project.link" target="_blank" rel="noopener" class="card-link">
                <img :src="project.image" :alt="project.title" />
                <div class="overlay"><span>View on Behance ↗</span></div>
              </a>
            </div>
            <div class="project-info">
              <p class="description">{{ project.description }}</p>
              <p class="app-name">{{ project.title }}</p>
            </div>
          </div>
        </template>
      </div>
    </div>

    <section class="ad-grid-section">
  <h2 class="section-title">Latest Updates</h2>
  <div class="ad-grid">
    <div 
      v-for="ad in ads" 
      :key="ad.id" 
      :class="['ad-item', ad.size]"
    >
      <a :href="ad.link" class="ad-link">
        <img :src="ad.src" :alt="ad.title" />
        
        <div class="ad-overlay">
          <span v-if="ad.size === 'square'">Instagram Feed Size</span>
          <span v-if="ad.size === 'vertical'">Stories / TikTok Size</span>
          <span v-if="ad.size === 'horizontal'">Google Display Size</span>
        </div>
      </a>
    </div>
  </div>
</section>

  </main>
</div>
</template>

<style scoped>

/* Appleスタイルのリボン帯 */
.promo-ribbon {
  width: 100%;
  /* 背景を白にするのではなく、今のサイトのクリーム色より
     ほんの少しだけ明るい（または暗い）色にして透過させる */
  background-color: rgba(255, 255, 255, 0.5); 
  backdrop-filter: blur(10px); /* 後ろを少しぼかすとプロっぽくなります */
  
  /* 上下のパディングを極限まで絞る（12px → 8px） */
  padding: 8px 20px; 
  
  /* 境界線をさらに薄く */
  border-bottom: 1px solid rgba(0, 0, 0, 0.05); 
  display: flex;
  justify-content: center;
  align-items: center;
}

.ribbon-content {
  font-size: 0.75rem; /* さらに一回り小さく */
  color: #666; /* 真っ黒ではなく、少しグレーに落として馴染ませる */
  letter-spacing: 0.02em;
}

.ribbon-link {
  color: #0066cc; /* Apple標準のリンクブルー */
  text-decoration: none;
  margin-left: 4px;
}

.ribbon-link:hover {
  text-decoration: underline;
}

/* モバイル対応：さらに小さく */
@media (max-width: 640px) {
  .ribbon-content {
    font-size: 0.75rem;
    padding: 0 10px;
  }
}

.portfolio-container {
  width: 100%;
  max-width: 100vw; /* 画面端まで広げる */
  overflow: hidden; /* はみ出た分を隠す */
  padding: 60px 0;
}

/* モード切り替えボタンのスタイル */
.view-controls {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-bottom: 30px;
}

.view-controls button {
  background: none;
  border: 1px solid #ddd;
  padding: 6px 16px;
  border-radius: 20px;
  font-size: 0.8rem;
  cursor: pointer;
  transition: all 0.3s;
  color: #888;
}

.view-controls button.active {
  background: #333;
  color: #fff;
  border-color: #333;
}

/* --- Gridモード用のスタイル上書き --- */

/* Gridモード時はアニメーションを止める */
.slider-wrapper.grid .slider-track {
  animation: none;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  gap: 40px;
  padding: 0 20px;
}

.slider-wrapper.grid .project-item {
  width: 100%;
  margin: 0;
}

/* Sliderモード時は既存の横並び設定を維持 */
.slider-wrapper.slider .slider-track {
  display: flex;
  width: max-content;
  animation: scroll 50s linear infinite;
}

.slider-wrapper {
  width: 100%;
  overflow: hidden;
  position: relative;
}

.slider-track {
  display: flex;
  width: max-content;
  /* スムーズなスクロールを有効にする */
  scroll-behavior: smooth; 
  /* 自動アニメーション：操作中は止まるよう hover:paused が効く設定 */
  animation: scroll 50s linear infinite;
}

/* マウスホバーで一時停止（ビジネスサイトでよく使われる親切設計） */
.slider-track:hover {
  animation-play-state: paused;
}

.project-item {
  width: 450px; /* 無印風の「大きめ」サイズ */
  margin: 0 20px; /* アイテム間の余白 */
  flex-shrink: 0;
}

/* 画像エリアのベース */
.project-image-zone {
  position: relative; /* オーバーレイを絶対配置するために必要 */
  width: 100%;
  aspect-ratio: 16 / 10;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0,0,0,0.05);
}

.card-link {
  display: block;
  width: 100%;
  height: 100%;
  position: relative;
}

.project-image-zone img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease; /* ホバー時に少しズームさせると綺麗です */
}

/* ホバー時のオーバーレイ設定 */
.overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4); /* 暗くする度合い */
  display: flex;
  align-items: center;
  justify-content: center;
  
  /* 最初は透明にして隠しておく */
  opacity: 0;
  transition: opacity 0.3s ease;
  z-index: 1;
}

.overlay span {
  color: #fff;
  font-size: 0.9rem;
  font-weight: 500;
  letter-spacing: 0.05em;
  /* 少し下から浮き上がるようなアニメーション */
  transform: translateY(10px);
  transition: transform 0.3s ease;
}

/* --------------------------------
   ホバーした時の動き
   -------------------------------- */

.card-link:hover .overlay {
  opacity: 1; /* 暗くする */
}

.card-link:hover .overlay span {
  transform: translateY(0); /* テキストを定位置に */
}

.card-link:hover img {
  transform: scale(1.05); /* ほんの少しだけ画像を拡大 */
}

/* <> */
.slider-wrapper {
  position: relative; /* ボタンを絶対配置するために必要 */
}

.nav-btn {
  position: absolute;
  top: 40%; /* 画像の中央付近に配置 */
  transform: translateY(-50%);
  z-index: 10;
  background: rgba(255, 255, 255, 0.7); /* 透過させて馴染ませる */
  backdrop-filter: blur(4px);
  border: none;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  cursor: pointer;
  font-size: 1.2rem;
  color: #333;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  opacity: 0; /* 最初は隠しておく */
  transition: opacity 0.3s, background 0.3s;
  font-family: -apple-system, BlinkMacSystemFont, sans-serif;
  font-weight: 100;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* スライダー全体にマウスが乗ったらボタンを表示 */
.slider-wrapper:hover .nav-btn {
  opacity: 1;
}

.nav-btn:hover {
  background: rgba(255, 255, 255, 1);
}

.prev { left: 20px; }
.next { right: 20px; }

/* アニメーションの定義 */
@keyframes scroll {
  0% {
    transform: translateX(0);
  }
  100% {
    /* 1組分の幅（全体の半分）だけ左に動いたら、瞬時に0に戻る */
    transform: translateX(-50%);
  }
}

.project-info {
  margin-top: 16px;
  padding: 0 10px;
}
.description { font-size: 0.8rem; color: #666; }
.app-name { font-size: 1.1rem; font-weight: 600; }


/* 広告セクション全体のスタイル */
.ad-grid-section {
  /* ここで全体のサイズ感を決めます。1200pxから1080px程度に微調整 */
  max-width: 1080px; 
  margin: 80px auto 40px;
  padding: 0 20px;
}

.section-title {
  font-size: 0.9rem;
  color: #888;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  margin-bottom: 24px;
  text-align: center;
}

/* 魔法のCSS Grid設定 */
.ad-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  /* 高さを固定せず、中身（画像）に合わせることで余計な空白を消します */
  grid-auto-rows: auto; 
  gap: 20px; 
  grid-template-areas:
    "night choco official"
    "night archive archive";
}

.ad-item {
  background: none; 
  /* 画像が枠からはみ出さないように、かつ隙間を作らない設定 */
  display: flex;
}

/* 広告用のベース設定（画像が親になるよう relative を追加） */
.ad-link {
  display: block;
  width: 100%;
  position: relative; /* オーバーレイの基準点 */
  overflow: hidden;
  border-radius: 8px; /* 広告の角を少し丸めると今風です */
}

/* 広告用オーバーレイのスタイル */
.ad-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6); /* プロジェクト用より少し濃いめ */
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.ad-overlay span {
  color: #fff;
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.05em;
  padding: 8px 16px;
  border: 1px solid rgba(255, 255, 255, 0.4); /* 枠線をつけるとより広告資料っぽくなります */
  text-transform: uppercase;
}

/* ホバー時の挙動 */
.ad-link:hover .ad-overlay {
  opacity: 1;
}

.ad-item img {
  transition: filter 0.3s ease;
}

.ad-link:hover img {
  filter: blur(2px); /* 広告は文字を読みやすくするために少しぼかすのもアリ */
}

.ad-item img {
  width: 100%;
  height: auto; /* 高さを自動にすることで比率を維持 */
  display: block;
}

/* --------------------------------
   配置の指定（ここは維持）
   -------------------------------- */

.ad-item.vertical {
  grid-area: night;
}

.ad-item.square:nth-of-type(1) { 
  grid-area: choco;
}

.ad-item.square:nth-of-type(3) { 
  grid-area: official;
}

.ad-item.horizontal {
  grid-area: archive;
}

/* モバイル対応 */
@media (max-width: 768px) {
  .ad-grid {
    grid-template-columns: 1fr;
    grid-template-areas: none;
    gap: 30px;
  }
  .ad-item {
    grid-area: auto !important;
  }
}
</style>