<script setup>
import { computed } from 'vue'
import { featured } from '@/data/featured'

// グラフィック作品（上段用）
const graphics = computed(() => featured.filter(item => item.type === 'graphic'))

// アプリケーション（下段用）
const apps = computed(() => featured.filter(item => item.type === 'app'))
</script>

<template>
  <main class="portfolio-container">
    <h3>Pick up</h3>
    
    <div class="section-label">Graphic ArtWorks</div>
    <section class="featured-grid">
      <a 
        v-for="item in graphics" 
        :key="item.title" 
        :href="item.link" 
        class="featured-item"
      >
        <div class="image-wrapper">
          <img :src="item.image" :alt="item.title" />
        </div>
        <p class="featured-title">{{ item.title }}</p>
      </a>
    </section>

    <div class="section-label">Applications</div>
    <section class="featured-grid">
      <a 
        v-for="item in apps" 
        :key="item.title" 
        :href="item.link" 
        target="_blank" 
        rel="noopener"
        class="featured-item"
      >
        <div class="image-wrapper">
          <img :src="item.image" :alt="item.title" />
        </div>
        <p class="featured-title">{{ item.title }}</p>
      </a>
    </section>

  </main>
</template>

<style scoped>
.portfolio-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
}

/* Featuredグリッド */
.featured-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 40px;
}

.featured-item {
  text-decoration: none;
  color: inherit;
  /* display: block; ← これをやめる */
  display: flex;
  flex-direction: column;
  align-items: center; /* 中身（画像と文字）を中央に寄せる */
  width: 100%;         /* 親のグリッド幅には合わせる */
  transition: transform 0.3s;
}

.featured-item:hover {
  transform: translateY(-5px);
}

/* さらに、画像ラッパーの幅を制限するとより安全 */
.image-wrapper {
  width: 100%;
  max-width: 250px; /* 画像の最大サイズを固定したい場合はここを調整 */
  aspect-ratio: 1/1;
  overflow: hidden;
  border-radius: 24px; /* Dockのアイコンに合わせた角丸にする */
}

.image-wrapper img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.featured-title {
  margin-top: 12px;
  text-align: center;
  font-weight: 500;
  font-size: 0.95rem;
}
/* セクションごとのラベル（ArtWorks / Applications） */
.section-label {
  font-size: 0.8rem;
  color: #999;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  margin: 40px 0 20px 0;
  border-bottom: 1px solid #f0f0f0;
  padding-bottom: 5px;
}

/* 既存のグリッド設定 */
.featured-grid {
  display: grid;
  /* 列の幅を安定させる（1frだと隙間まで反応しやすいため、max-widthを指定） */
  grid-template-columns: repeat(auto-fill, minmax(200px, 250px)); 
  gap: 40px;
}

.featured-item {
  text-decoration: none;
  color: inherit;
  display: flex; /* blockから変更 */
  flex-direction: column;
  align-items: center;
  transition: transform 0.3s;
}

.featured-item:hover {
  transform: translateY(-5px);
}

.image-wrapper {
  width: 100%;
  aspect-ratio: 1/1;
  overflow: hidden;
  border-radius: 20px; /* 少し丸みを強くするとアプリ感が出ます */
  box-shadow: 0 4px 12px rgba(0,0,0,0.08);
}

.image-wrapper img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.featured-title {
  margin-top: 12px;
  text-align: center;
  font-weight: 500;
  font-size: 0.9rem;
}
</style>