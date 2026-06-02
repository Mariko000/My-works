<script setup>
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

import ChatWindow from './components/ChatWindow.vue';
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'

// GSAP本体とMotionPathプラグインをインポート
import { gsap } from 'gsap'
import { MotionPathPlugin } from 'gsap/MotionPathPlugin'

// 画像を明示的にインポート（パスの解決を確実にするため）
import birdIcon from '@/assets/logo/two-birds.png'
// 🐾 自作のツヤあり肉球画像をインポート！
import pawIcon from '@/assets/logo/cat_foot_print.png'

// 🎵 追加：猫の鳴き声SEをアセットとしてインポート
import meowSound from '@/assets/sound/猫の鳴き声2.mp3'

// プラグインを登録
gsap.registerPlugin(MotionPathPlugin)

const birdRef = ref(null)
const showBird = ref(false)


// 🐾 肉球を表示する座標を管理する変数
const pawStyle = ref({ top: '0px', left: '0px' })

// 🐾 肉球スタンプとシークレットモーダルの状態管理
const isPawStamping = ref(false)
const showSecretModal = ref(false)


// セッション中、30秒〜1分（30,000ミリ秒〜60,000ミリ秒）の間でランダム に設定
// 鳥を飛ばすメイン関数
const spawnBird = () => {
  if (showBird.value) return 
  
  showBird.value = true
  
  setTimeout(() => {
    if (!birdRef.value) return

    // 1. スタート位置を path の最初の点と一致させる
    gsap.set(birdRef.value, { x: -500, y: 150, rotation: 0, scale: 2.5 })

    gsap.to(birdRef.value, {
      duration: 18,
      ease: "none", // 波の動きを一定に保つため ease を none に変更
      motionPath: {
        path: [
          // 画面全体を均等に割って、2〜3回の波（上下）を作ります
          { x: -200, y: 100 }, // 上 1
          { x: 150, y: 200 },  // 下 1
          { x: 500, y: 100 },  // 上 2
          { x: 850, y: 200 },  // 下 2
          { x: 1200, y: 100 }, // 上 3
          { x: window.innerWidth + 500, y: 150 } // ゴール
        ],
        curviness: 1.5,
        autoRotate: true
      },
      onComplete: () => {
        showBird.value = false
        scheduleNextBird()
      }
    })
  }, 100)
}



// 次の出現を予約する関数
const scheduleNextBird = () => {
  const minDelay = 30000; // 30秒
  const maxDelay = 60000; // 60秒
  const delay = Math.floor(Math.random() * (maxDelay - minDelay + 1)) + minDelay;
  
  setTimeout(spawnBird, delay);
}

onMounted(() => {
  // 初回は3秒後くらいに一度飛ばす
  setTimeout(spawnBird, 3000);
})

// 🕊️ 鳥をキャッチ＝クリックしたときのアクション
const scareBird = (event) => {
  // 🎵 【にゃお！】クリックされた瞬間にSEをトリガー
  const audio = new Audio(meowSound)
  audio.volume = 0.4  // サイトの雰囲気を壊さないように心地よい音量（40%）に調整。お好みで変えてね！
  audio.play().catch(err => {
    console.log("Audio play blocked or failed:", err)
  })

  // まずはその場に鳥をピタッと静止させる
  gsap.killTweensOf(birdRef.value)
  
  if (birdRef.value) {
    // 鳥の画面上の見かけの正確な位置（幅・高さ含む）を取得
    const rect = birdRef.value.getBoundingClientRect()
    
    // 鳥の変形状態（GSAPのscaleなど）に影響されない、完全な「中心点（X, Y）」を算出
    const birdCenterX = rect.left + (rect.width / 2)
    const birdCenterY = rect.top + (rect.height / 2)
    
    // 肉球のサイズ（300px）のちょうど半分（150px）を引くことで、
    // 肉球の「中心」が鳥の「中心」と完璧に一致する座標（左上基準）を割り出す
    const pawLeft = birdCenterX - 150
    const pawTop = birdCenterY - 150
    
    // 計算した絶対座標をインラインスタイル用に叩き込む
    pawStyle.value = {
      left: `${pawLeft}px`,
      top: `${pawTop}px`
    }
  }
  
  // 1. 🐾 肉球スタンプを表示フラグをONにする
  isPawStamping.value = true
  
  // 2. スタンプが着地してワンテンポ置いてから、シークレットポップアップを出す
  setTimeout(() => {
    showSecretModal.value = true
    isPawStamping.value = false 
  }, 600)
}


// モーダルを閉じてアトリエに戻る時の関数
const closeSecretModal = () => {
  showSecretModal.value = false
  
  // モーダルが閉じた瞬間に、鳥が驚いて上空へ巨大化しながら消え去る
  gsap.to(birdRef.value, {
    duration: 0.5,
    x: window.innerWidth + 600,
    y: "-=200",
    scale: 3.0, 
    ease: "power2.in",
    onComplete: () => {
      // 💡 完全に画面外に逃げ切ったこのタイミングでフラグを落とし、次の予約を呼び出す！
      showBird.value = false
      scheduleNextBird()
    }
  })
}



// アニメーション名を保持するリアクティブ変数
const transitionName = ref('slide-left')
const router = useRouter()

// ページ遷移のたびに実行されるフック
router.beforeEach((to, from) => {
  const toIndex = to.meta.index || 0
  const fromIndex = from.meta.index || 0

  if (toIndex > fromIndex) {
    // 右側のメニューへ行く時
    transitionName.value = 'slide-left'
  } else {
    // 左側のメニューへ戻る時
    transitionName.value = 'slide-right'
  }
})

</script>

<template>
  <div class="page-wrapper">
  <Header />
  <div 
    v-if="showBird" 
    ref="birdRef" 
    class="animated-bird"
    @click="scareBird"
  >
    <img :src="birdIcon" alt="flying birds" />
  </div>

  <div v-if="isPawStamping" class="paw-stamp-overlay">
    <img :src="pawIcon" alt="Cat Paw Stamp" class="paw-stamp-img" />
  </div>

  <div v-if="showSecretModal" class="secret-modal-overlay">
    <div class="secret-modal-card">
      <div class="modal-paw-icon">🐾</div>
      <h3 class="modal-title">シークレットコードを発見！</h3>
      <div class="code-box">Yummy!</div>
      <p class="code-hint">※Hint: Online Storeで使うので覚えておいてね</p>
      <button @click="closeSecretModal" class="btn-back-to-studio">アトリエに戻る</button>
    </div>
  </div>

  <router-view v-slot="{ Component }">
    <transition :name="transitionName" mode="out-in">
      <component :is="Component" />
    </transition>
  </router-view>
  <ChatWindow />
</div>
  <Footer />
</template>

<style scoped>
html {
  overflow-y: scroll; /* 常にスクロールバーの溝を確保しておく */
}

.animated-bird {
  position: fixed;
  z-index: 10000;
  cursor: pointer;
  width: 100px; /* サイズを少し控えめに */
  user-select: none;
}

.animated-bird img {
  width: 100%;
  height: auto;
  /* 画像を左右反転させて、デフォルトで右向きにする */
  transform: scaleX(-1);
}

/*肉球スタンプの枠を鳥の座標 */
.paw-stamp-overlay {
  position: fixed;
  z-index: 99999; /* 鳥（10000）を完全に上回る最前面 */
  pointer-events: none; /* 下の要素のクリックを邪魔しない */
  width: 300px;  /* スクリプトの計算の基準となる固定サイズ */
  height: 300px;
  /* 肉球スタンプを35度傾けて、少し斜めから「ペタッ」と勢いよく押されたような*/
  top: v-bind('pawStyle.top');
  left: v-bind('pawStyle.left');
}

/* 🐾 アニメーションは「位置（XY座標）」を1ピクセルも動かさず、
   その場での「拡大縮小」と「つぶれ感」、そして「35度の傾き」だけで表現する */
   .paw-stamp-img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  /* 💡 座標を一切狂わせずに上空から降臨させるアニメーション */
  animation: pawPopImpact 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.2) forwards;
}

@keyframes pawPopImpact {
  0% {
    /* 最初は3倍のサイズ ＋ 透明 ＋ すでに35度傾いた状態で待機 */
    transform: scale(3.0) rotate(35deg);
    opacity: 0;
  }
  70% {
    /* 💡 鳥の真上に着地した瞬間：35度を保ったまま、ぷにっと縦方向につぶれる演出を加える */
    /* scaleの第2引数を少し小さくすることで、斜めのまま床に押し付けられたリアルな弾力感が出ます */
    transform: scale(0.85, 0.8) rotate(35deg);
    opacity: 1;
  }
  100% {
    /* 💡 完璧に35度傾いた状態で、等倍で鳥の上にロックされる */
    transform: scale(1) rotate(35deg);
    opacity: 1;
  }
}


/* シークレットポップアップ全体の背景（ボカシ入りで高級感をキープ） */
.secret-modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10010;
}

/* ポップアップの白いカード部分 */
.secret-modal-card {
  background: white;
  color: #111;
  padding: 40px;
  border-radius: 24px;
  text-align: center;
  max-width: 400px;
  width: 85%;
  box-shadow: 0 20px 50px rgba(0,0,0,0.15);
}

.modal-paw-icon {
  font-size: 36px;
  margin-bottom: 10px;
  animation: heartbeat 1.5s infinite ease-in-out;
}

.modal-title {
  font-family: 'Urbanist', 'Noto Sans JP', sans-serif;
  font-size: 22px;
  font-weight: 700;
  letter-spacing: -0.5px;
  margin-bottom: 5px;
}

/* 🎫 コードの表示ボックス。マリコさんの描いた肉球のピンクに合わせたデザイン */
.code-box {
  font-family: 'Courier New', Courier, monospace;
  font-size: 38px;
  font-weight: 700;
  color: #ff527b; 
  background: #fff0f3;
  padding: 15px 20px;
  border-radius: 14px;
  margin: 24px 0 16px 0;
  letter-spacing: 2px;
  border: 2px dashed #ff527b;
}

.code-hint {
  font-size: 13px;
  color: #666;
  font-weight: 500;
  margin-bottom: 30px;
}

/* アトリエに戻るボタン（ホバーで肉球ピンクに） */
.btn-back-to-studio {
  background: #111;
  color: white;
  border: none;
  padding: 14px 32px;
  border-radius: 30px;
  font-size: 15px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.2s ease;
  width: 100%;
}
.btn-back-to-studio:hover {
  background: #ff527b;
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(255, 82, 123, 0.3);
}

/* 🐾 肉球アイコンの可愛い鼓動アニメーション */
@keyframes heartbeat {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.15); }
}

/* 余計な背景や線は入れず、ただ内側に寄せる */
.page-wrapper {
  padding: 2% 4%; /* 上下 2% / 左右 4% ほど空けると「じゃっかん」小さく見えます */
  box-sizing: border-box;
  min-height: 100vh;
}

/* モバイルでは余白が邪魔になるので、少し狭める調整 */
@media (max-width: 768px) {
  .page-wrapper {
    padding: 10px;
  }
}

/* スライドのアニメーション定義 */

/* --- 共通の動き --- */
.slide-left-enter-active, .slide-left-leave-active,
.slide-right-enter-active, .slide-right-leave-active {
  transition: all 0.5s cubic-bezier(0.3, 0, 0.2, 1);
}

/* --- 右に進む時のアニメーション (slide-left) --- */
.slide-left-enter-from {
  opacity: 0;
  transform: translateX(40px); /* 右から来る */
}
.slide-left-leave-to {
  opacity: 0;
  transform: translateX(-40px); /* 左へ消える */
}

/* --- 左に戻る時のアニメーション (slide-right) --- */
.slide-right-enter-from {
  opacity: 0;
  transform: translateX(-40px); /* 左から来る */
}
.slide-right-leave-to {
  opacity: 0;
  transform: translateX(40px); /* 右へ消える */
}
</style>