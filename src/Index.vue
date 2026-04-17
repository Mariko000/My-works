<script setup>
import appBack from '@/assets/app-back.png';
import { ref } from 'vue';
import imgRecipe from '@/assets/smartphone_recipe .png';
import imgSchedule from '@/assets/smartphone_schedule.png';
import imgTop from '@/assets/App_portfolio_top (1).png';

// スライド用データの拡張
const devices = ref([
  { 
    name: 'ClipCook', 
    src: imgRecipe,
    tagline: 'Global Recipe Scaling SNS',
    desc: '日・英・米の単位を自動変換。計量のストレスをデザインで解決します。',
    tag: '' 
  },
  { 
    name: 'TimeWheel', 
    src: imgSchedule,
    tagline: 'Minimalist Scheduler',
    desc: '「がんばりすぎない」をコンセプトに、最小限の入力で一日を可視化。',
    tag: 'Popular'
  },
  { 
    name: 'Product Suite', 
    src: imgTop,
    tagline: 'Art and Logic Solution',
    desc: '開発補助からライフスタイルまで、多角的なアプローチで日常をサポート。',
    tag: '' 
  }
]);

const activeIndex = ref(0);

// 前へ・次へのロジック
const nextDevice = () => {
  activeIndex.value = (activeIndex.value + 1) % devices.value.length;
};

const prevDevice = () => {
  activeIndex.value = (activeIndex.value - 1 + devices.value.length) % devices.value.length;
};

const getPositionClass = (index) => {
  const diff = (index - activeIndex.value + 3) % 3;
  if (diff === 0) return 'pos-front';
  if (diff === 1) return 'pos-right';
  return 'pos-left';
};


</script>

<template>
  <main class="portfolio-container">

    <div class="hero-apps">
    <div class="hero-overlay"></div>
    
    <div class="hero-content">
      <h1 class="hero-title">Supporting your daily life with creativity.</h1>
      <p class="hero-subtitle">Web Design & Frontend Development</p>
      <p class="hero-subtitle">あなたの日常に、そっと寄り添うテクノロジーを。</p>
      <span class="arrow">↓</span>
      
    </div>
  </div>

  <div class="studio-status-area">
  <div class="status-indicators">
    <div class="status-item">
      <span class="status-dot pulse"></span>
      <span class="status-label">Service Status:</span>
      <span class="status-value">All Systems Operational</span>
    </div>
    <div class="status-item">
      <span class="status-label">Project Availability:</span>
      <span class="status-value highlight">Accepting New Projects</span>
    </div>
  </div>

  <section class="studio-news">
    <h2 class="section-tag">Latest News</h2>
    <ul class="news-list">
      <li>
        <span class="date">2026.04.16</span>
        <span class="content">New App "FitSpin" UI development in progress.</span>
      </li>
      <li>
        <span class="date">2026.04.01</span>
        <span class="content">Portfolio redesigned with new Hero visual.</span>
      </li>
    </ul>
  </section>
</div>

<section class="studio-about">
  <div class="about-inner">
    <h2 class="section-tag">About</h2>
    
    <div class="about-interactive-grid">
      <div class="about-text-area">
        <h3 class="vision-title">{{ devices[activeIndex].name }}</h3>
        <p class="tagline">{{ devices[activeIndex].tagline }}</p>
        <p class="description">{{ devices[activeIndex].desc }}</p>
        <p class="highlight-text">Exploring Art and Logic through products.</p>
      </div>

      <div class="device-selector-container">
        <div class="device-triangle">
          <div 
            v-for="(device, index) in devices" 
            :key="index"
            :class="['device-node', getPositionClass(index)]"
          >
            <img :src="device.src" :alt="device.name" />
          </div>
        </div>

        <div class="slider-controls">
          <button @click="prevDevice" class="control-btn">＜</button>
          <div class="indicator">
            <span v-for="(_, i) in devices" :key="i" :class="{ active: i === activeIndex }"></span>
          </div>
          <button @click="nextDevice" class="control-btn">＞</button>
        </div>
      </div>
    </div>
  </div>
</section>

<section class="studio-solutions">
  <div class="solutions-inner">
    <div class="solutions-header">
      <h2 class="section-tag">Our Solutions</h2>
      <h3 class="solution-main-title">Bridging Human and Technology</h3>
      <p class="solution-lead">
        複雑な技術を、誰もが心地よく使える「カタチ」へ。<br>
        私たちは、単にアプリを開発するだけでなく、その先にある<strong>「ストレスのない日常」</strong>を設計します。
      </p>
    </div>

    <div class="solutions-grid">
      <div class="solution-card">
        <div class="card-icon">✦</div>
        <h4>UI/UXの刷新</h4>
        <p>複雑化した既存サービスの操作性を、直感的で美しいものに再構築します。</p>
      </div>
      <div class="solution-card">
        <div class="card-icon">✦</div>
        <h4>プロトタイプの高速開発</h4>
        <p>アイデアを即座に動く形にし、ビジネスの検証を加速させます。</p>
      </div>
      <div class="solution-card">
        <div class="card-icon">✦</div>
        <h4>「がんばりすぎない」設計</h4>
        <p>ユーザーに負担をかけない、最小限のインターフェースを提供します。</p>
      </div>
    </div>

    <div class="solution-footer">
      <p class="closing-phrase">「そのアイデアを、心地よい体験に変えませんか？」</p>

      <div class="try-it-now">
    <p class="try-text">ぜひその手でお試しください</p>
    <div class="scroll-arrow-container">
      <a href="#app-list" class="down-arrow">↓</a>
    </div>
  </div>
    </div>
  </div>
</section>

<h2 class="section-tag">Contents</h2>
    <section class="works-grid">
     

      <!-- Row 1 : TimeWheel -->
      <div class="left">
        <a href="https://timewheel.vercel.app/" target="_blank" rel="noopener" class="app-icon-link">
          <div class="app-icon-wrapper">
            <img src="@/assets/logo/icon-1024x1024.png" alt="TimeWheel Icon" class="app-icon" />
          </div>
        </a>
      </div>

      <div class="right">
        <p>「がんばりすぎない」ための最小限入力スケジュール作成アプリ</p>
        <p class="app-name">
          TimeWheel
          <span class="app-tag">Popular</span>
        </p>
       
       


        <p class="meta">
          Status: 公開中<br>
          Stack: Vue.js<br>
          Note: none
        </p>

        <div class="action-area">
    <a href="https://timewheel.vercel.app/" target="_blank" rel="noopener" class="btn-download">
      Download App <span>→</span>
    </a>
  </div>
      </div>


      <!-- Row 2 : Behance -->
      <div class="left">
        <div class="app-card">
          <a 
            href="https://www.behance.net/gallery/246820869/ClipCook-Full-Stack-Cooking-App" 
            target="_blank" 
            rel="noopener"
            class="card-link"
          >
            <img src="@/assets/App_portfolio_top.png" alt="app thumbnail" />
            <div class="overlay">
              <span>View on Behance ↗</span>
            </div>
          </a>
        </div>
      </div>

      <div class="right">
        <p>「計量の壁」を解決する 日・英・米対応レシピSNS</p>
        <p class="app-name">ClipCook</p>
        <p class="meta">
          Status: Prototype<br>
          Stack: Python / Vue<br>
          ClipCookは、海外レシピ特有の単位（cup, oz, lb等）や、地域による容量差（US/UK/JP）を誰でも正確に調理できるようにサポートするレシピ管理・SNSプラットフォームです。<br>
          Note: サーバーコストの都合により未公開
        </p>
      </div>

      <div class="left">
        <a href="https://mariko000.github.io/portfolio/#/" target="_blank" rel="noopener" class="app-icon-link">
          <div class="app-icon-wrapper">
            <img src="@/assets/logo/icon-512 copy.png" alt="My Tool Icon" class="app-icon" />
          </div>
        </a>
      </div>

      <div class="right">
        <p>WEBサイト制作・開発補助ツール</p>
        <p class="app-name">My tool</p>

        <p class="meta">
          Status: 公開中<br>
          Stack: Vue.js<br>
          Note: none
        </p>

        <div class="action-area">
    <a href="https://mariko000.github.io/portfolio/#/" target="_blank" rel="noopener" class="btn-download">
      Download App <span>→</span>
    </a>
  </div>
      </div>

    </section>

    <section class="studio-contact-lead">
  <div class="contact-inner">
    <h2 class="section-tag">Start a Project</h2>
    <h3 class="contact-title">あなたのアイデアを、<br>共にカタチにしませんか？</h3>
    <p class="contact-text">
      アプリ開発、UI/UXデザイン、ウェブサイト制作など、<br>
      課題解決のための最適なテクノロジーをご提案します。
    </p>
    
    <div class="contact-action">
      <router-link to="/Contact" class="btn-contact-main">
        お仕事のご相談はこちら <span>→</span>
      </router-link>
    </div>
  </div>
</section>

<footer class="portfolio-footer">
  <div class="footer-line"></div>
  <p class="studio-name">RutenVeil</p>
  <p class="copyright">© 2026 RutenVeil. All rights reserved.</p>
</footer>
  </main>
</template>



<style scoped>

.portfolio-container {
  max-width: 1000px;
  margin: 0 auto;
  padding: 40px 20px;
}

.hero-apps {
  /* 親要素に左右パディングがある場合でも端まで広げる */
  width: 100vw; 
  position: relative;
  left: 50%;
  right: 50%;
  margin-left: -50vw;
  margin-right: -50vw;

  /* 背景の設定 */
  height: 80vh;
  background-image: v-bind('"url(" + appBack + ")"');
  background-size: cover; /* 画像を隙間なく敷き詰める */
  background-position: center;
  background-repeat: no-repeat;
  
  display: flex;
  justify-content: center;
  align-items: center;
  /* 下のコンテンツとの間に大きな余白を作る */
  margin-bottom: 120px;
}
.hero-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  /* グラフィックの質感を見せつつ視認性を確保するオーバーレイ */
  /* サイトのベースカラーが白系なら、白の半透明を重ねる */
  background-color: rgba(255, 255, 255, 0.5); 
  backdrop-filter: blur(2px); /* 軽くぼかすと文字がより浮き出ます */
  z-index: 1;
}

.hero-content {
  position: relative;
  z-index: 2; /* オーバーレイより上に配置 */
  text-align: center;
  padding: 0 20px;
}

.hero-title {
  font-family: 'Inter', 'Helvetica Neue', Arial, sans-serif;
  font-size: clamp(2rem, 6vw, 4rem); 
  font-weight: 800; /* 思い切り太くして「力強さ」を出す */
  letter-spacing: -0.02em; /* 逆に少し字間を詰めると、ロゴっぽく見えます */
  color: #1a1a1a;
  text-transform: uppercase; /* 全部大文字にしてもカッコいいかもしれません */
}

.hero-subtitle {
  font-weight: 300; /* サブタイトルは細くして、メインとのコントラストをつける */
  letter-spacing: 0.3em; /* 日本語は逆に思い切り広げると「余白の美」が出ます */
}

.scroll-down {
  display: inline-block;
  text-decoration: none;
  color: #1a1a1a;
  font-size: 0.9rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  transition: transform 0.3s ease;
}

.scroll-down:hover {
  transform: translateY(5px); /* ホバーで少し沈むアニメーション */
}

.arrow {
  display: block;
  margin-top: 8px;
  animation: bounce 2s infinite; /* 矢印をぴょこぴょこさせて視線誘導 */
}

@keyframes bounce {
  0%, 20%, 50%, 80%, 100% {transform: translateY(0);}
  40% {transform: translateY(-5px);}
  60% {transform: translateY(-3px);}
}

/* モバイル対応 */
@media (max-width: 768px) {
  .hero-apps {
    height: 60vh;
    background-attachment: scroll; /* モバイルでは固定を解除して負荷軽減 */
  }
}

/* 2列レイアウト */
.works-grid {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 60px 40px; /* ★縦の隙間を 32px -> 60px に広げてゆとりを出す */
  align-items: start;
  
  /* ヒーローの下にIDで飛ばした時の位置調整用 */
  scroll-margin-top: 40px; 
}

/* 左側コンテナ：中身を右側に寄せる */
.left {
  display: flex;
  flex-direction: column;
  align-items: flex-end; /* これで右端が揃う */
  width: auto;
}

/* 右側テキスト */
.right {
  padding-top: 4px;
}

.meta {
  font-size: 0.9rem;
  color: #666;
  margin-top: 8px;
}


/* ===== TimeWheel ===== */

.app-icon-wrapper {
  width: 140px;
  height: 140px;
}

.app-icon {
  width: 100%;
  height: 100%;
  border-radius: 22.5%;
  object-fit: cover;
  box-shadow: 0 10px 20px rgba(0,0,0,0.1);
}




/* ===== Behance (ClipCook) ===== */
.app-card {
  width: 200px; 
  position: relative;
  border-radius: 16px;
  overflow: hidden;
}


.app-card img {
  width: 100%;
  height: auto;
  display: block;
}

.card-link {
  display: block;
  position: relative;
}

.overlay {
  position: absolute;
  inset: 0;
  background: rgba(0,0,0,0.35);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  opacity: 0;
  transition: .25s;
  pointer-events: none;
}

.app-card:hover .overlay {
  opacity: 1;
}

/* モバイル対応時の余白調整 */
@media (max-width: 768px) {
  .hero-apps {
    height: 60vh;
    margin-bottom: 60px; /* モバイルでは余白を少し詰める */
  }
  .works-grid {
    grid-template-columns: 1fr; /* モバイルでは1列に */
    gap: 40px;
  }
  .left {
    align-items: center; /* モバイルでは中央寄せに */
  }
}

/* --- アプリ名の強調 --- */
.app-name {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 8px;
  color: #1a1a1a;
}

.app-tag {
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.12em;
  color: #888;
  
  /* 光るアニメーション */
  animation: tagGlow 2.5s ease-in-out infinite;
}

/* やさしく光る */
@keyframes tagGlow {
  0% {
    color: #999;
    text-shadow: none;
  }
  50% {
    color: #111;
    text-shadow: 0 0 6px rgba(0,0,0,0.25);
  }
  100% {
    color: #999;
    text-shadow: none;
  }
}

/* --- ボタンエリア --- */
.action-area {
  margin-top: 20px;
}

.btn-download {
  display: inline-flex;
  align-items: center;
  padding: 10px 24px;
  background-color: #1a1a1a; /* 黒背景 */
  color: #fff; /* 白文字 */
  text-decoration: none;
  font-size: 0.9rem;
  font-weight: 600;
  border-radius: 30px; /* 丸みを持たせて「日常の優しさ」を表現 */
  transition: all 0.3s ease;
  letter-spacing: 0.05em;
}

.btn-download span {
  margin-left: 8px;
  transition: transform 0.3s ease;
}

.btn-download:hover {
  background-color: #444; /* 少し明るく */
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  transform: translateY(-2px);
}

.btn-download:hover span {
  transform: translateX(4px); /* ホバーで矢印が少し右に動く */
}

/* モバイル対応：ボタンを中央寄せに（メディアクエリ内に追加） */
@media (max-width: 768px) {
  /* 既存のコード... */
  .right {
    text-align: center;
  }
  .btn-download {
    width: 80%;
    justify-content: center;
  }
}

/* --- ステータス・ニュース全体のコンテナ --- */
.studio-status-area {
  margin-bottom: 80px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

/* --- インジケーター --- */
.status-indicators {
  display: flex;
  gap: 30px;
  margin-bottom: 40px;
  font-size: 0.75rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #666;
}

.status-item {
  display: flex;
  align-items: center;
}

.status-dot.pulse {
  width: 8px;
  height: 8px;
  background-color: #2ecc71;
  border-radius: 50%;
  margin-right: 10px;
  box-shadow: 0 0 8px rgba(46, 204, 113, 0.6);
  animation: status-pulse 2s infinite;
}

@keyframes status-pulse {
  0% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.2); opacity: 0.5; }
  100% { transform: scale(1); opacity: 1; }
}

.status-value.highlight {
  color: #1a1a1a;
  font-weight: 700;
  margin-left: 8px;
}

/* --- 最新情報セクション --- */
.studio-news {
  width: 100%;
  max-width: 600px;
  border-top: 1px solid #eee;
  padding-top: 30px;
}

.section-tag {
  font-size: 0.7rem;
  color: #999;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  margin-bottom: 20px;
  text-align: center;
}

.news-list {
  list-style: none;
  padding: 0;
}

.news-list li {
  display: flex;
  margin-bottom: 12px;
  font-size: 0.9rem;
  color: #444;
  line-height: 1.6;
}

.news-list .date {
  font-weight: 700;
  color: #1a1a1a;
  min-width: 100px;
}

/* モバイル対応 */
@media (max-width: 768px) {
  .status-indicators {
    flex-direction: column;
    gap: 15px;
    align-items: center;
  }
  .studio-news {
    padding: 20px;
  }
}
/* about */
.studio-about {
  margin-bottom: 120px;
  padding: 80px 40px;
  background-color: #fcfcfc; /* わずかに背景色を変えてセクションを際立たせる */
  border-radius: 24px;
}

.about-inner {
  max-width: 800px;
  margin: 0 auto;
}

.about-grid {
  display: grid;
  grid-template-columns: 1fr 200px;
  gap: 40px;
  align-items: center;
}

.vision-title {
  font-size: 1.8rem;
  font-weight: 700;
  margin-bottom: 20px;
  color: #1a1a1a;
  letter-spacing: -0.02em;
}

.about-text p {
  font-size: 1rem;
  line-height: 1.8;
  color: #555;
  margin-bottom: 15px;
}

.highlight-text {
  font-weight: 700;
  color: #1a1a1a !important;
  margin-top: 20px;
}

.profile-icon-placeholder {
  width: 160px;
  height: 160px;
  background: white;
  border-radius: 50%;
  padding: 20px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.05);
}

.profile-icon-placeholder img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

/* モバイル対応 */
@media (max-width: 768px) {
  .about-grid {
    grid-template-columns: 1fr;
    text-align: center;
  }
  .about-profile {
    order: -1; /* モバイルでは画像を上に */
    margin: 0 auto;
  }
}

/* about */
.about-interactive-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
  align-items: center;
  min-height: 400px;
}

.device-selector-container {
  position: relative;
  height: 400px;
  perspective: 1000px; /* 3D感の演出 */
}

.device-triangle {
  position: relative;
  width: 100%;
  height: 100%;
  transform-style: preserve-3d;
}

/* --- 筐体サイズのベースアップ --- */
.device-node {
  position: absolute;
  /* サイズを200pxから260px〜300pxへアップ */
  width: 280px; 
  transition: all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
  cursor: pointer;
  /* 影も少し強くして浮遊感を出す */
  filter: drop-shadow(0 20px 40px rgba(0,0,0,0.15));
}

/* ポジションごとのスタイル調整 */
.pos-front {
  z-index: 10;
  /* translate3dで中央に寄せつつ、scaleを1.4倍に */
  transform: translate3d(15%, 5%, 150px) scale(1.4);
  filter: grayscale(0%) blur(0);
  opacity: 1;
}

.pos-right {
  z-index: 5;
  /* 右奥へ逃がす距離を調整 */
  transform: translate3d(75%, -5%, -100px) scale(0.9);
  filter: grayscale(40%) blur(3px);
  opacity: 0.5;
}

.pos-left {
  z-index: 5;
  /* 左奥へ逃がす距離を調整 */
  transform: translate3d(-45%, -5%, -100px) scale(0.9);
  filter: grayscale(40%) blur(3px);
  opacity: 0.5;
}

/* 画像自体のフィット感 */
.device-node img {
  width: 100%;
  height: auto;
  object-fit: contain;
  pointer-events: none;
}

/* コンテナ自体の高さも少し余裕を持たせる */
.device-selector-container {
  position: relative;
  height: 450px; /* 画像に合わせて少し高く */
  perspective: 1200px;
}


/* 浮遊感のあるアニメーション */
@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
}

.pos-front {
  animation: float 4s ease-in-out infinite;
}

/* aboutの＜＞ */
/* --- テキストの切り替えアニメーションを滑らかにするなら --- */
.about-text-area {
  min-height: 200px;
}

.tagline {
  font-weight: 700;
  color: #1a1a1a;
  margin-bottom: 10px;
}

/* --- スライダーコントローラー --- */
.slider-controls {
  position: absolute;
  bottom: -40px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  gap: 20px;
  z-index: 20;
}

.control-btn {
  background: none;
  border: 1px solid #ddd;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  transition: all 0.3s ease;
  color: #666;
}

.control-btn:hover {
  background-color: #1a1a1a;
  color: white;
  border-color: #1a1a1a;
}

/* インジケーター（点々） */
.indicator {
  display: flex;
  gap: 8px;
}

.indicator span {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: #ddd;
  transition: all 0.3s ease;
}

.indicator span.active {
  background-color: #1a1a1a;
  transform: scale(1.5);
}

/* モバイル対応時のボタン位置調整 */
@media (max-width: 768px) {
  .about-interactive-grid {
    grid-template-columns: 1fr;
    text-align: center;
  }
  .device-selector-container {
    height: 350px;
  }
  .slider-controls {
    bottom: 20px;
  }
}

/* about２ */
.studio-solutions {
  padding: 100px 20px;
  background-color: #ffffff;
  margin-bottom: 80px;
}

.solutions-inner {
  max-width: 900px;
  margin: 0 auto;
}

.solutions-header {
  text-align: center;
  margin-bottom: 60px;
}

.solution-main-title {
  font-size: 2.2rem;
  font-weight: 800;
  margin: 20px 0;
  letter-spacing: -0.01em;
}

.solution-lead {
  font-size: 1.1rem;
  line-height: 1.8;
  color: #444;
}

.solution-lead strong {
  color: #1a1a1a;
  background: linear-gradient(transparent 70%, #e0e0e0 70%); /* さりげないマーカー線 */
}

/* 解決策のグリッド */
.solutions-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
  margin-bottom: 60px;
}

.solution-card {
  padding: 40px 30px;
  background: #f9f9f9;
  border-radius: 20px;
  transition: all 0.3s ease;
  border: 1px solid transparent;
}

.solution-card:hover {
  background: #ffffff;
  border-color: #eee;
  transform: translateY(-10px);
  box-shadow: 0 20px 40px rgba(0,0,0,0.05);
}

.card-icon {
  font-size: 1.5rem;
  margin-bottom: 20px;
  color: #1a1a1a;
}

.solution-card h4 {
  font-size: 1.2rem;
  font-weight: 700;
  margin-bottom: 15px;
}

.solution-card p {
  font-size: 0.9rem;
  line-height: 1.6;
  color: #666;
}

.solution-footer {
  text-align: center;
}

.closing-phrase {
  font-size: 1.4rem;
  font-weight: 700;
  color: #1a1a1a;
  letter-spacing: 0.05em;
}

/* モバイル対応 */
@media (max-width: 768px) {
  .solutions-grid {
    grid-template-columns: 1fr;
  }
  .solution-main-title {
    font-size: 1.8rem;
  }
}

/* スクロール */
.try-it-now {
  margin-top: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
}

.try-text {
  font-size: 0.9rem;
  font-weight: 600;
  letter-spacing: 0.2em;
  color: #888;
  /* 少しフェードインさせるような空気感を出す */
  animation: fadeIn 2s ease-in-out;
}

.scroll-arrow-container {
  font-size: 1.5rem;
  color: #1a1a1a;
}

.down-arrow {
  display: inline-block;
  text-decoration: none;
  color: inherit;
  /* ぴょこぴょこと動かして「ここだよ」と教える */
  animation: bounce-soft 2s infinite;
}

/* 柔らかいバウンドアニメーション */
@keyframes bounce-soft {
  0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
  40% { transform: translateY(-10px); }
  60% { transform: translateY(-5px); }
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

/* アプリリストの開始位置に ID を忘れずにつけておきましょう */
.works-grid {
  scroll-margin-top: 100px; /* スクロールした時に少し余白を残す */
}

/* リンク */
.studio-contact-lead {
  margin: 150px 0 100px;
  text-align: center;
  padding: 80px 20px;
  background: linear-gradient(to bottom, #ffffff, #f9f9f9); /* 緩やかなグラデーション */
  border-radius: 40px;
}



.contact-title {
  font-size: 2rem;
  font-weight: 800;
  margin-bottom: 24px;
  color: #1a1a1a;
  line-height: 1.4;
}

.contact-text {
  font-size: 1rem;
  color: #666;
  line-height: 1.8;
  margin-bottom: 40px;
}

/* メインのコンタクトボタン */
.btn-contact-main {
  display: inline-flex;
  align-items: center;
  padding: 20px 48px;
  background-color: #1a1a1a;
  color: #fff;
  text-decoration: none;
  font-size: 1.1rem;
  font-weight: 700;
  border-radius: 50px;
  transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
  box-shadow: 0 10px 30px rgba(0,0,0,0.1);
}

.btn-contact-main span {
  margin-left: 15px;
  transition: transform 0.3s ease;
}

.btn-contact-main:hover {
  transform: translateY(-5px);
  background-color: #333;
  box-shadow: 0 20px 40px rgba(0,0,0,0.2);
}

.btn-contact-main:hover span {
  transform: translateX(8px);
}

/* フッターの微調整 */
.portfolio-footer {
  padding-bottom: 60px;
  text-align: center;
}

.footer-line {
  width: 50px;
  height: 1px;
  background-color: #eee;
  margin: 0 auto 30px;
}

</style>