<script setup>
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

import Header from './components/Header.vue'
import Footer from './components/Footer.vue'

// GSAP本体とMotionPathプラグインをインポート
import { gsap } from 'gsap'
import { MotionPathPlugin } from 'gsap/MotionPathPlugin'

// 画像を明示的にインポート（パスの解決を確実にするため）
import birdIcon from '@/assets/logo/two-birds.png'

// プラグインを登録
gsap.registerPlugin(MotionPathPlugin)

const birdRef = ref(null)
const showBird = ref(false)

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

// クリック時のアクション（逃げた後も次の予約は忘れない）
// クリック時の「驚いて逃げる」アクションも、今のサイズ感に合わせて調整
const scareBird = () => {
  gsap.killTweensOf(birdRef.value)
  gsap.to(birdRef.value, {
    duration: 0.5,
    x: window.innerWidth + 600,
    y: "-=200",
    scale: 3.0, // 逃げる時はさらに巨大化して迫力を出す
    ease: "power2.in",
    onComplete: () => {
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
  <Header />
  <div 
    v-if="showBird" 
    ref="birdRef" 
    class="animated-bird"
    @click="scareBird"
  >
    <img :src="birdIcon" alt="flying birds" />
  </div>

  <router-view v-slot="{ Component }">
    <transition :name="transitionName" mode="out-in">
      <component :is="Component" />
    </transition>
  </router-view>

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
  /* 最初は透明にしておき、GSAP側で制御するのもアリ */
}

.animated-bird img {
  width: 100%;
  height: auto;
  /* 画像を左右反転させて、デフォルトで右向きにする */
  transform: scaleX(-1);
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