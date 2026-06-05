<script setup>
import appBack from '@/assets/app-back.png';
import { onMounted, ref } from 'vue';
import imgRecipe from '@/assets/smartphone_recipe .png';
import imgSchedule from '@/assets/smartphone_schedule.png';
import imgTop from '@/assets/App_portfolio_top (1).png';

import { createClient } from 'microcms-js-sdk';

// ==========================================
// 🛠️ 設計図書（資料画像）のインポート定義
// ==========================================
import clipCook0 from '@/assets/Project_Overview/Clip-Cook-paper/ClipCook-1P 概要図.drawio.png';
import clipCook1 from '@/assets/Project_Overview/Clip-Cook-paper/ClipCook-4P Django バックエンド構成.drawio.png';
import clipCook2 from '@/assets/Project_Overview/Clip-Cook-paper/ClipCook-P2-材料連動型・自動倍率計算機能.drawio.png';
import clipCook3 from '@/assets/Project_Overview/Clip-Cook-paper/ClipCook-P3- フロント ↔︎ バック通信設計図.drawio.png';
import clipCook4 from '@/assets/Project_Overview/Clip-Cook-paper/ClipCook-P4-単位・食材換算ロジック.drawio.png';

import timeWheel0 from '@/assets/Project_Overview/Time Wheel_paper/TimeWheel-P1-全体構成図.drawio.png';
import timeWheel1 from '@/assets/Project_Overview/Time Wheel_paper/TimeWheel-P10-計算方法.drawio.png';
import timeWheel2 from '@/assets/Project_Overview/Time Wheel_paper/TimeWheel-P2-技術ポイント.drawio.png';
import timeWheel3 from '@/assets/Project_Overview/Time Wheel_paper/TimeWheel-P3-チュートリアル・アーキテクチャ.drawio.png';
import timeWheel4 from '@/assets/Project_Overview/Time Wheel_paper/TimeWheel-P4-全体フロー.drawio.png';
import timeWheel5 from '@/assets/Project_Overview/Time Wheel_paper/TimeWheel-P5-時間の正規化.drawio.png';
import timeWheel6 from '@/assets/Project_Overview/Time Wheel_paper/TimeWheel-P6-スケジュール自動作成プロセス①.drawio.png';
import timeWheel7 from '@/assets/Project_Overview/Time Wheel_paper/TimeWheel-P7表示方法.drawio.png';
import timeWheel8 from '@/assets/Project_Overview/Time Wheel_paper/TimeWheel-P8-連鎖同期.drawio.png';
import timeWheel9 from '@/assets/Project_Overview/Time Wheel_paper/TimeWheel-P9-アバター演出定義書.drawio.png';

const projectPapers = {
  ClipCook: [clipCook0, clipCook1, clipCook2, clipCook3, clipCook4],
  TimeWheel: [timeWheel0, timeWheel1, timeWheel2, timeWheel3, timeWheel4, timeWheel5, timeWheel6, timeWheel7, timeWheel8, timeWheel9]
};


// ==========================================
// 🛠️ ドロップダウン ＆ モーダル制御の状態管理
// ==========================================
const openDropdown = ref(null); // 現在開いているドロップダウンのアプリ名 ('TimeWheel' or 'ClipCook')
const isModalOpen = ref(false); // モーダルの開閉フラグ
const currentAppPapers = ref([]); // モーダルに表示する現在の画像配列
const currentPaperIndex = ref(0); // モーダル表示中の画像インデックス

// ドロップダウンの切り替えトグル
const toggleDropdown = (appName) => {
  if (openDropdown.value === appName) {
    openDropdown.value = null;
  } else {
    openDropdown.value = appName;
  }
};



// ズーム倍率の状態
const zoomLevel = ref(1);

// 🌟 ドラッグ移動用の新しい ref
const isDragging = ref(false);
const startX = ref(0);
const startY = ref(0);
const translateX = ref(0); // 横方向の移動距離
const translateY = ref(0); // 縦方向の移動距離

// ズーム操作
const zoomIn = () => { if (zoomLevel.value < 3) zoomLevel.value += 0.2; };
const zoomOut = () => { if (zoomLevel.value > 0.5) zoomLevel.value -= 0.2; };
const resetZoom = () => { zoomLevel.value = 1; };

// モーダルを開く（古い重複定義を削除し、ここに集約）
const openPaperModal = (appName) => {
  currentAppPapers.value = projectPapers[appName] || [];
  currentPaperIndex.value = 0;
  resetZoom(); // 開く時にズームリセット
  isModalOpen.value = true;
  openDropdown.value = null; // メニューは閉じる
};

// モーダルを閉じる
const closeModal = () => {
  isModalOpen.value = false;
};

// 画像めくりロジック（古い重複定義を削除し、ここに集約）
const nextPaper = () => {
  currentPaperIndex.value = (currentPaperIndex.value + 1) % currentAppPapers.value.length;
  resetZoom(); // ページを変えたらズームリセット
};
const prevPaper = () => {
  currentPaperIndex.value = (currentPaperIndex.value - 1 + currentAppPapers.value.length) % currentAppPapers.value.length;
  resetZoom(); // ページを変えたらズームリセット
};

// 一括ダウンロード処理
const downloadAllPapers = async (appName) => {
  const urls = projectPapers[appName];
  if (!urls) return;
  
  for (let i = 0; i < urls.length; i++) {
    try {
      const response = await fetch(urls[i]);
      const blob = await response.blob();
      const blobUrl = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = blobUrl;
      const fileName = urls[i].substring(urls[i].lastIndexOf('/') + 1).split('?')[0];
      a.download = fileName || `${appName}_document_${i + 1}.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(blobUrl);
      await new Promise(resolve => setTimeout(resolve, 200));
    } catch (e) {
      console.error("Download failed:", e);
    }
  }
};
// 🌟 マウスカーソルで画像を掴んで動かすためのイベント処理
const startDrag = (event) => {
  if (zoomLevel.value <= 1) return; // 1倍以下のときはドラッグしない
  isDragging.value = true;
  startX.value = event.clientX - translateX.value;
  startY.value = event.clientY - translateY.value;
  event.preventDefault();
};

const onDrag = (event) => {
  if (!isDragging.value) return;
  translateX.value = event.clientX - startX.value;
  translateY.value = event.clientY - startY.value;
};

const stopDrag = () => {
  isDragging.value = false;
};


// microCMSの通信設定
const client = createClient({
  serviceDomain: import.meta.env.VITE_MICROCMS_SERVICE_DOMAIN,
  apiKey: import.meta.env.VITE_MICROCMS_API_KEY
});

// 最新ニュース・コンテンツ用
const newsItems = ref([]);
const contentsItems = ref([]);

onMounted(async () => {
  try {
    const response = await client.get({
      endpoint: 'news',
      queries: { limit: 5 }
    });
    newsItems.value = response.contents;

    const contentsResponse = await client.get({ endpoint: 'contents' });
    contentsItems.value = contentsResponse.contents;
  } catch (error) {
    console.error('データ取得失敗:', error);
  }
});

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
    name: 'About Me', 
    src: imgTop,
    tagline: 'Your Developer friend',
    desc: 'あなたの日常をサポートするアプリを制作します',
    tag: '' 
  }
]);

const activeIndex = ref(0);

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
    <li v-if="newsItems.length === 0">Loading news...</li>
    
    <li v-for="item in newsItems" :key="item.id">
      <span class="date">{{ new Date(item.date).toLocaleDateString('ja-JP').replace(/\//g, '.') }}</span>
      <span class="news-text" v-html="item.content"></span>
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
        <p class="highlight-text">Exploring more ↓</p>
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
        <div class="card-icon"></div>
        <h4>UI/UXの刷新</h4>
        <p>複雑化した既存サービスの操作性を、直感的で美しいものに再構築します。</p>
      </div>
      <div class="solution-card">
        <div class="card-icon"></div>
        <h4>プロトタイプの高速開発</h4>
        <p>アイデアを即座に動く形にし、ビジネスの検証を加速させます。</p>
      </div>
      <div class="solution-card">
        <div class="card-icon"></div>
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

        <div class="action-area dropdown-container">
          <button @click="toggleDropdown('TimeWheel')" class="btn-download">
            Menu <span>▼</span>
          </button>
          
          <transition name="dropdown-fade">
            <div v-if="openDropdown === 'TimeWheel'" class="dropdown-menu">
              <a href="https://timewheel.vercel.app/" target="_blank" rel="noopener" class="dropdown-item">
                アプリを起動
              </a>
              <button @click="downloadAllPapers('TimeWheel')" class="dropdown-item">
                設計図書を一括DL
              </button>
              <button @click="openPaperModal('TimeWheel')" class="dropdown-item">
                設計図書を閲覧
              </button>
            </div>
          </transition>
        </div>
      </div>

      <div class="left">
        <a href="https://fit-spin.vercel.app/" target="_blank" rel="noopener" class="app-icon-link">
          <div class="app-icon-wrapper">
            <img src="@/assets/logo/icon-fitspin.png" alt="FitSpin Icon" class="app-icon" />
          </div>
        </a>
      </div>

      <div class="right">
        <p>日常に溶け込むフィットネスアプリケーション</p>
        <p class="app-name">
          FitSpin
          <span class="app-tag">New</span>
        </p>

        <p class="meta">
          Status: 公開中<br>
          Stack: Vue.js<br>
          Note: none
        </p>

        <div class="action-area">
          <a href="https://fit-spin.vercel.app/" target="_blank" rel="noopener" class="btn-download">
            Download App <span>→</span>
          </a>
        </div>
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

        <div class="action-area dropdown-container">
          <button @click="toggleDropdown('ClipCook')" class="btn-download">
            Menu <span>▼</span>
          </button>
          
          <transition name="dropdown-fade">
            <div v-if="openDropdown === 'ClipCook'" class="dropdown-menu">
              <a href="https://www.behance.net/gallery/246820869/ClipCook-Full-Stack-Cooking-App" target="_blank" rel="noopener" class="dropdown-item">
                Behanceへ
              </a>
              <button @click="downloadAllPapers('ClipCook')" class="dropdown-item">
                設計図書を一括DL
              </button>
              <button @click="openPaperModal('ClipCook')" class="dropdown-item">
                設計図書を閲覧
              </button>
            </div>
          </transition>
        </div>
      </div>


  <template v-for="item in contentsItems" :key="item.id">

<div class="left">
  <a :href="item.link_url.startsWith('http') ? item.link_url : 'https://' + item.link_url" target="_blank" rel="noopener" class="app-icon-link">
    
    <div v-if="item.image_type && item.image_type[0] === 'icon'" class="app-icon-wrapper">
      <img :src="item.image.url" :alt="item.App_name" class="app-icon" />
    </div>

    <div v-else-if="item.image_type && item.image_type[0] === 'card'" class="app-card">
      <div class="card-link">
        <img :src="item.image.url" :alt="item.App_name" />
        <div class="overlay">
          <span>View on Behance ↗</span>
        </div>
      </div>
    </div>

  </a>
</div>

<div class="right">
  <p>{{ item.description }}</p>
  
  <p class="app-name">
    {{ item.App_name }}
    <span v-if="item.tag" class="app-tag">{{ item.tag }}</span>
  </p>

  <p class="meta" style="white-space: pre-wrap;">{{ item.Meta }}</p>

  <div class="action-area">
    <a :href="item.link_url.startsWith('http') ? item.link_url : 'https://' + item.link_url" target="_blank" rel="noopener" class="btn-download">
      Download App <span>→</span>
    </a>
  </div>
</div>

</template>
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

<transition name="modal-fade">
  <div v-if="isModalOpen" class="modal-overlay" @click.self="closeModal">
    
    <button class="modal-close-global" @click="closeModal">✕</button>

    <div class="modal-viewer-container">
      
      <button class="nav-arrow prev" @click="prevPaper">＜</button>

      <div class="stage">
        
        <div class="zoom-controls">
          <button @click="zoomOut" class="zoom-btn" title="ズームアウト">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line></svg>
          </button>
          <span class="zoom-text">{{ Math.round(zoomLevel * 100) }}%</span>
          <button @click="zoomIn" class="zoom-btn" title="ズームイン">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
          </button>
          <button @click="resetZoom" class="zoom-btn reset">RESET</button>
        </div>

        <div 
           class="image-scroller"
           @mousedown="startDrag"
           @mousemove="onDrag"
           @mouseup="stopDrag"
          @mouseleave="stopDrag"
          :style="{ cursor: zoomLevel > 1 ? (isDragging ? 'grabbing' : 'grab') : 'default' }"
           >
          <img 
          :src="currentAppPapers[currentPaperIndex]" 
          :style="{ transform: `scale(${zoomLevel}) translate(${translateX / zoomLevel}px, ${translateY / zoomLevel}px)` }"
          class="target-image"
           />
          </div>
        
        <div class="page-counter" v-if="currentAppPapers.length">
          {{ currentPaperIndex + 1 }} / {{ currentAppPapers.length }}
        </div>
      </div>

      <button class="nav-arrow next" @click="nextPaper">＞</button>
    </div>

  </div>
</transition>
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

/* ドロップダウンの基準コンテナ */
.dropdown-container {
  position: relative;
  display: inline-block;
}

/* メニュー本体 */
.dropdown-menu {
  position: absolute;
  top: 110%;
  left: 0;
  background: #ffffff;
  border: 1px solid #eee;
  border-radius: 12px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.08);
  z-index: 100;
  min-width: 240px;
  overflow: hidden;
}

/* ドロップダウン項目 */
.dropdown-item {
  display: block;
  width: 100%;
  padding: 14px 20px;
  text-align: left;
  background: none;
  border: none;
  font-size: 0.9rem;
  font-weight: 500;
  color: #333;
  text-decoration: none;
  cursor: pointer;
  transition: background-color 0.2s ease, color 0.2s ease;
}

.dropdown-item:hover {
  background-color: #f5f5f5;
  color: #1a1a1a;
}

.dropdown-item:not(:last-child) {
  border-bottom: 1px solid #f9f9f9;
}

/* ドロップダウンのアニメーション */
.dropdown-fade-enter-active,
.dropdown-fade-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}
.dropdown-fade-enter-from,
.dropdown-fade-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}

/* --- モーダル (ライトボックス) スタイル --- */
.paper-modal-overlay {
  position: fixed;
  inset: 0;
  background-color: rgba(26, 26, 26, 0.85);
  backdrop-filter: blur(4px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 2000;
}

.paper-modal-window {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 90vw;
  max-width: 1100px;
  height: 85vh;
}

.modal-image-container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.modal-paper-img {
  max-width: 100%;
  max-height: 78vh;
  object-fit: contain;
  border-radius: 8px;
  box-shadow: 0 15px 40px rgba(0,0,0,0.3);
}

.modal-counter {
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.85rem;
  margin-top: 12px;
  letter-spacing: 0.1em;
}

/* ナビゲーションボタン (＜ ＞) */
.modal-nav-btn {
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.15);
  color: #ffffff;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  font-size: 1.2rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  position: absolute;
  z-index: 2010;
}

.modal-nav-btn:hover {
  background: #ffffff;
  color: #1a1a1a;
  transform: scale(1.05);
}

.modal-nav-btn.prev { left: -20px; }
.modal-nav-btn.next { right: -20px; }

/* 閉じるボタン */
.modal-close-btn {
  position: absolute;
  top: -40px;
  right: -10px;
  background: none;
  border: none;
  color: rgba(255, 255, 255, 0.6);
  font-size: 1.8rem;
  cursor: pointer;
  transition: color 0.2s;
}
.modal-close-btn:hover {
  color: #ffffff;
}

/* モーダルのフワッとアニメーション */
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.4s cubic-bezier(0.25, 1, 0.5, 1);
}
.modal-fade-enter-active .paper-modal-window,
.modal-fade-leave-active .paper-modal-window {
  transition: transform 0.4s cubic-bezier(0.25, 1, 0.5, 1);
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}
.modal-fade-enter-from .paper-modal-window {
  transform: scale(0.95) translateY(10px);
}
.modal-fade-leave-to .paper-modal-window {
  transform: scale(0.95);
}

/* 既存スタイルを維持しつつ、レスポンシブ時の調整を追加 */
@media (max-width: 768px) {
  .modal-nav-btn {
    width: 44px;
    height: 44px;
    font-size: 1rem;
  }
  .modal-nav-btn.prev { left: 0px; }
  .modal-nav-btn.next { right: 0px; }
  .modal-close-btn { top: -44px; right: 10px; }
  .dropdown-menu { width: 100%; min-width: unset; }
}

/* ==========================================
   🖼️ 完全画面収め・全画面モーダルビューア
   ========================================== */

/* 画面全体のオーバーレイ（背景を暗くして集中させる） */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.6); /* 暗めの透過背景 */
  backdrop-filter: blur(4px);
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px;
  box-sizing: border-box;
}

/* 右上の閉じるボタン */
.modal-close-global {
  position: absolute;
  top: 30px;
  right: 40px;
  background: none;
  border: none;
  color: #333;
  font-size: 2rem;
  cursor: pointer;
  opacity: 0.6;
  transition: opacity 0.2s;
  z-index: 10002;
}
.modal-close-global:hover {
  opacity: 1;
}

/* ビューア全体の横並びコンテナ */
.modal-viewer-container {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  max-width: 1200px; /* 必要以上に広がりすぎないように制限 */
  gap: 30px;
  position: relative;
}

/* 左右のナビゲーション矢印ボタン */
.nav-arrow {
  background: rgba(255, 255, 255, 0.8);
  border: 1px solid #ddd;
  color: #333;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  font-size: 1.2rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  flex-shrink: 0;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  z-index: 10001;
}
.nav-arrow:hover {
  background: #ffffff;
  transform: scale(1.05);
  box-shadow: 0 6px 16px rgba(0,0,0,0.15);
}

/* 🌟 白い画像表示ステージ（これが正常に映っている時の白い四角の正体です） */
.stage {
  flex-grow: 1;
  height: 80vh; /* 画面の縦80%に収める */
  background: #ffffff;
  border-radius: 24px;
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.15);
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 40px; /* 上下にカウンターとズーム用の余白を確保 */
  box-sizing: border-box;
  overflow: hidden; /* 初期状態でははみ出しをカット */
}

/* 🌟 画像スクローラー（初期倍率100%の時は絶対にはみ出さない） */
.image-scroller {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: auto; /* ズームしてステージをはみ出た時だけスクロールバーを出す */
}

/* 🌟 資料画像そのものの設定（コンテンツを1画面に収めるための最重要プロパティ） */
.target-image {
  max-width: 100%;    /* 🌟 ステージの横幅を絶対に超えない */
  max-height: 100%;   /* 🌟 ステージの縦幅を絶対に超えない */
  object-fit: contain; /* 縦横比を維持したまま、完全に枠内に収める */
  transition: transform 0.2s cubic-bezier(0.25, 1, 0.5, 1);
  background: #ffffff;
}

/* ズームコントローラー（白いステージの上部にひっそり配置） */
.zoom-controls {
  position: absolute;
  top: 20px;
  display: flex;
  align-items: center;
  background: rgba(0, 0, 0, 0.05);
  padding: 4px 12px;
  border-radius: 20px;
  gap: 8px;
}
.zoom-btn {
  background: none;
  border: none;
  color: #333;
  cursor: pointer;
  padding: 4px;
  opacity: 0.6;
  transition: opacity 0.2s;
  display: flex;
  align-items: center;
  justify-content: center;
}
.zoom-btn:hover {
  opacity: 1;
}
.zoom-btn svg {
  stroke: #333;
}
.zoom-btn.reset {
  font-size: 0.7rem;
  font-weight: bold;
  border-left: 1px solid rgba(0, 0, 0, 0.15);
  padding-left: 8px;
  margin-left: 2px;
}
.zoom-text {
  font-size: 0.8rem;
  font-family: monospace;
  color: #333;
  min-width: 40px;
  text-align: center;
}

/* ページカウンター（白いステージの下部に固定） */
.page-counter {
  position: absolute;
  bottom: 20px;
  color: #666;
  font-size: 0.9rem;
  font-family: 'Inter', monospace;
  letter-spacing: 0.05em;
  font-weight: 500;
}

/* フェードアニメーション */
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.25s ease;
}
.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}

/* モバイル対応 */
@media (max-width: 768px) {
  .modal-overlay {
    padding: 10px;
  }
  .modal-viewer-container {
    gap: 0;
  }
  .nav-arrow {
    position: absolute;
    width: 44px;
    height: 44px;
    background: rgba(255, 255, 255, 0.9);
  }
  .nav-arrow.prev { left: -10px; }
  .nav-arrow.next { right: -10px; }
  .stage {
    height: 70vh;
    padding: 50px 20px;
  }
}

</style>