<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { works } from '@/data/works.js' // 辞書データのパスを確認してください

const route = useRoute()
const router = useRouter()

// URLのパラメータからIDを取得し、辞書から該当する作品を検索
const workId = Number(route.params.id)
const work = computed(() => {
  return works.find(w => w.id === workId)
})

// 作品が見つからない場合に一覧へ戻す処理（安全策）
if (!work.value) {
  router.push('/works')
}

const goBack = () => {
  router.back()
}
</script>

<template>
  <main class="portfolio-container" v-if="work">
    <!-- 戻るボタン -->
    <nav class="detail-nav">
      <button @click="goBack" class="back-button">← Back to Works</button>
    </nav>

    <section class="work-detail-content">
      <!-- メイン画像 -->
      <div class="work-visual">
        <img :src="work.image" :alt="work.title" />
      </div>

      <!-- 作品情報 -->
      <div class="work-info-section">
        <div class="info-header">
          <p class="category">{{ work.category }}</p>
          <h1 class="work-title">{{ work.title }}</h1>
          <p v-if="work.date" class="work-date">{{ work.date }}</p>
        </div>

        <div class="description-box">
          <p class="description-text">
            {{ work.description || '作品の解説準備中...' }}
          </p>
        </div>
      </div>
    </section>
  </main>
</template>

<style scoped>
.portfolio-container {
  max-width: 1000px;
  margin: 0 auto;
  padding: 40px 20px;
}

.detail-nav {
  margin-bottom: 30px;
}

.back-button {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 0.9rem;
  color: #666;
  padding: 0;
  transition: color 0.3s;
}

.back-button:hover {
  color: #000;
}

.work-detail-content {
  display: grid;
  grid-template-columns: 1fr;
  gap: 40px;
}

/* デスクトップ表示では横並びに（お好みで調整） */
@media (min-width: 768px) {
  .work-detail-content {
    grid-template-columns: 1.5fr 1fr;
    align-items: start;
  }
}

.work-visual img {
  width: 100%;
  height: auto;
  display: block;
  object-fit: contain;
  background-color: #f9f9f9;
}

.info-header {
  margin-bottom: 24px;
  border-bottom: 1px solid #eee;
  padding-bottom: 16px;
}

.category {
  font-size: 0.8rem;
  color: #888;
  text-transform: uppercase;
  margin-bottom: 8px;
}

.work-title {
  font-size: 2rem;
  font-weight: 500;
  margin: 0 0 8px 0;
  letter-spacing: 0.02em;
}

.work-date {
  font-size: 0.9rem;
  color: #666;
}

.description-box {
  line-height: 1.8;
}

.description-text {
  font-size: 1rem;
  color: #333;
  white-space: pre-wrap; /* 改行を反映させる */
}
</style>