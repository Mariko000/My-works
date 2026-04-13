<script setup>

import { ref, computed, onMounted, onUnmounted } from 'vue'
import { works } from './data/works'

// カテゴリー一覧（Allを追加）
const categories = ['All', 'Life & Energy', 'Abstract', 'Graphic']
const currentCategory = ref('All')

// フィルタリングされた作品リスト
const filteredWorks = computed(() => {
  if (currentCategory.value === 'All') return works
  return works.filter(work => work.category === currentCategory.value)
})

// カテゴリー変更時の処理
const changeCategory = (cat) => {
  currentCategory.value = cat
}

// --- 上に戻るボタンのロジック ---
const isVisible = ref(false)

const toggleVisibility = () => {
  // 300px以上スクロールしたらボタンを表示
  isVisible.value = window.scrollY > 300
}

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth' // 滑らかにスクロール
  })
}

onMounted(() => {
  window.addEventListener('scroll', toggleVisibility)
})

onUnmounted(() => {
  window.removeEventListener('scroll', toggleVisibility)
})
</script>

<template>
  <main class="portfolio-container">
    <div class="intro-text">
      <!-- <p>無機質な図形に、有機的な温度を宿す。 — 生命の鼓動を描く視覚的探求。</p> -->
      <!-- <p>Converting life into geometry — Drawing the pulse.</p> -->
    </div>

    <!-- フィルタースライダー -->
    <nav class="filter-slider">
      <div class="slider-inner">
        <button 
          v-for="cat in categories" 
          :key="cat"
          :class="['filter-item', { active: currentCategory === cat }]"
          @click="changeCategory(cat)"
        >
          {{ cat }}
        </button>
      </div>
    </nav>

    <!-- グリッドエリア -->
    <div class="grid-wrapper">
      <transition name="slide-fade" mode="out-in">
        <section :key="currentCategory" class="works-grid">
          <!-- 
            作品アイテム全体を router-link に変更。
            :to で詳細ページのパスを指定します。 
          -->
          <router-link 
            v-for="(work, index) in filteredWorks" 
            :key="work.id" 
            :to="`/works/${work.id}`"
            class="work-item"
            :class="{ 
              'main': index % 3 === 0, 
              'vertical': index % 3 === 1, 
              'fit': index % 3 === 2 
            }"
          >
            <div class="image-wrapper">
              <img :src="work.image" :alt="work.title" loading="lazy" />
            </div>
            <div class="work-info">
              <span class="work-category">{{ work.category }}</span>
              <h2 class="work-title">{{ work.title }}</h2>
            </div>
          </router-link>
        </section>
      </transition>

      <transition name="fade">
      <button 
        v-if="isVisible" 
        class="back-to-top" 
        @click="scrollToTop"
        aria-label="Back to top"
      >
        <span class="arrow"></span>
      </button>
    </transition>
    </div>
    
  </main>
</template>

<style scoped>
.portfolio-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px 80px;
}

.intro-text {
  margin-bottom: 40px;
  line-height: 1.6;
}

/* フィルタースライダー */
.filter-slider {
  margin-bottom: 60px;
  position: sticky;
  top: 0;
  backdrop-filter: blur(10px);
  z-index: 100;
  padding: 20px 0;
}

.slider-inner {
  display: flex;
  overflow-x: auto;
  gap: 30px;
  scrollbar-width: none;
}

.slider-inner::-webkit-scrollbar {
  display: none;
}

.filter-item {
  background: none;
  border: none;
  padding: 8px 16px;
  cursor: pointer;
  font-size: 0.9rem;
  opacity: 0.3;
  transition: opacity 0.4s ease;
}

.filter-item.active {
  opacity: 1;
  font-weight: 500;
}

/* グリッドレイアウト */
.works-grid {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 60px 30px;
  align-items: start;
}

/* router-link はデフォルトで <a> タグになるため、スタイルをリセット */
.work-item {
  text-decoration: none;
  color: inherit;
  display: block;
  transition: transform 0.4s ease;
}

/* ホバー時に少し浮き上がらせる演出（任意） */
.work-item:hover {
  transform: translateY(-5px);
}

.work-item img {
  width: 100%;
  height: auto;
  display: block;
  object-fit: contain;
}

.work-item.fit {
  grid-column: 1 / -1;
}

.work-info {
  margin-top: 16px;
  text-align: left;
}

.work-category {
  display: block;
  font-size: 0.7rem;
  color: #888;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin-bottom: 4px;
}

.work-title {
  font-size: 0.95rem;
  font-weight: 400;
  letter-spacing: 0.05em;
  color: #333;
}

/* アニメーション */
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.5s cubic-bezier(0.25, 1, 0.5, 1);
}

.slide-fade-enter-from {
  opacity: 0;
  transform: translateX(40px);
}

.slide-fade-leave-to {
  opacity: 0;
  transform: translateX(-40px);
}


/* router-link (.work-item) の中にある 
  div.image-wrapper に対して余白を設定します。
*/
.image-wrapper {
  /* 上下 0、左右 15% の余白を作ることで、
     今の 2fr 1fr という比率を保ったまま、
     画像の実質的な表示サイズを一回り小さくします。
  */
  margin: 0 15%; 
  overflow: hidden;
}

/* ホバー時に少しグレーに沈める */
.work-item:hover .image-wrapper {
  background-color: #f7f7f7;
}
@media (max-width: 768px) {
  .works-grid {
    grid-template-columns: 1fr;
  }
  .work-item.fit {
    grid-column: auto;
  }
}

/* 上に戻るボタンのスタイル */
.back-to-top {
  position: fixed;
  bottom: 40px;
  right: 40px;
  width: 50px;
  height: 50px;
  background-color: #fff;
  border: 1px solid #eee; /* 薄い境界線 */
  border-radius: 50%;
  cursor: pointer;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05); /* ほんのり影 */
}

.back-to-top:hover {
  transform: translateY(-5px);
  background-color: #333;
  border-color: #333;
}

/* 矢印のデザイン（CSSで作成） */
.arrow {
  width: 10px;
  height: 10px;
  border-top: 2px solid #333;
  border-left: 2px solid #333;
  transform: rotate(45deg);
  margin-top: 4px;
  transition: border-color 0.3s ease;
}

.back-to-top:hover .arrow {
  border-color: #fff;
}

/* フェードアニメーション */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s ease, transform 0.4s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(20px);
}

@media (max-width: 768px) {
  .back-to-top {
    bottom: 20px;
    right: 20px;
    width: 40px;
    height: 40px;
  }
}
</style>