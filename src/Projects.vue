<script setup>
import { ref } from 'vue'
import { projects } from '@/data/projects'
import { ads } from '@/data/ad' // 広告データをインポート

// 💡 追加：アプリ用の共通辞書データをインポート
import { appsData } from '@/data/apps.js'

const track = ref(null)
const viewMode = ref('slider') // 'slider' または 'grid'

const toggleView = (mode) => {
  viewMode.value = mode
}

// スクロール処理
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

      <div class="ec-text-gateway">
        <router-link to='/EC' class="gateway-link">
          <h2 class="gateway-title">Art into everyday</h2>
          <span class="gateway-sub">Shop all &rarr;</span>
        </router-link>
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

      <div class="apps-section-divider">
  <div class="ec-text-gateway">
    <router-link to="/Apps" class="gateway-link">
      <h2 class="gateway-title">Explore Applications</h2>
      <span class="gateway-sub">View all &rarr;</span>
    </router-link>
  </div>

  <div :class="['slider-wrapper', viewMode]">
    <div class="slider-track">
      <div v-for="app in appsData" :key="`app-a-${app.id}`" class="project-item">
        <div class="app-card-image-zone">
          <a :href="app.url" target="_blank" rel="noopener" class="card-link">
            <div class="app-icon-container">
              <img :src="app.iconImg" :alt="app.name" class="saturdays-style-icon" />
            </div>
            <div class="overlay"><span>Launch App ↗</span></div>
          </a>
        </div>
        <div class="project-info">
          <p class="description">{{ app.category }}</p>
          <p class="app-name">
            {{ app.name }}
            <span v-if="app.tag" class="app-glow-tag">{{ app.tag }}</span>
          </p>
        </div>
      </div>

      <template v-if="viewMode === 'slider'">
        <div v-for="app in appsData" :key="`app-b-${app.id}`" class="project-item">
          <div class="app-card-image-zone">
            <a :href="app.url" target="_blank" rel="noopener" class="card-link">
              <div class="app-icon-container">
                <img :src="app.iconImg" :alt="app.name" class="saturdays-style-icon" />
              </div>
              <div class="overlay"><span>Launch App ↗</span></div>
            </a>
          </div>
          <div class="project-info">
            <p class="description">{{ app.category }}</p>
            <p class="app-name">
              {{ app.name }}
              <span v-if="app.tag" class="app-glow-tag">{{ app.tag }}</span>
            </p>
          </div>
        </div>
      </template>
    </div>
  </div>
</div>

    </main>
  </div>
</template>

<style scoped>
/* --- 既存のスタイルはすべてそのまま維持 --- */
.promo-ribbon {
  width: 100%;
  background-color: rgba(255, 255, 255, 0.5); 
  backdrop-filter: blur(10px); 
  padding: 8px 20px; 
  border-bottom: 1px solid rgba(0, 0, 0, 0.05); 
  display: flex;
  justify-content: center;
  align-items: center;
}
.ribbon-content { font-size: 0.75rem; color: #666; letter-spacing: 0.02em; }
.ribbon-link { color: #0066cc; text-decoration: none; margin-left: 4px; }
.ribbon-link:hover { text-decoration: underline; }
@media (max-width: 640px) { .ribbon-content { font-size: 0.75rem; padding: 0 10px; } }
.portfolio-container { width: 100%; max-width: 100vw; overflow: hidden; padding: 60px 0; }
.view-controls { display: flex; justify-content: center; gap: 10px; margin-bottom: 30px; }
.view-controls button { background: none; border: 1px solid #ddd; padding: 6px 16px; border-radius: 20px; font-size: 0.8rem; cursor: pointer; transition: all 0.3s; color: #888; }
.view-controls button.active { background: #333; color: #fff; border-color: #333; }

/* Gridモード・Sliderモードの上書き制御 */
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
.slider-wrapper.grid .project-item { width: 100%; margin: 0; }
.slider-wrapper.slider .slider-track { display: flex; width: max-content; animation: scroll 50s linear infinite; }
.slider-wrapper { width: 100%; overflow: hidden; position: relative; }
.slider-track { display: flex; width: max-content; scroll-behavior: smooth; animation: scroll 50s linear infinite; }
.slider-track:hover { animation-play-state: paused; }
.project-item { width: 450px; margin: 0 20px; flex-shrink: 0; }
.project-image-zone { position: relative; width: 100%; aspect-ratio: 16 / 10; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.05); }
.card-link { display: block; width: 100%; height: 100%; position: relative; }
.project-image-zone img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.5s ease; }
.overlay { position: absolute; top: 0; left: 0; width: 100%; height: 100%; background-color: rgba(0, 0, 0, 0.4); display: flex; align-items: center; justify-content: center; opacity: 0; transition: opacity 0.3s ease; z-index: 1; }
.overlay span { color: #fff; font-size: 0.9rem; font-weight: 500; letter-spacing: 0.05em; transform: translateY(10px); transition: transform 0.3s ease; }
.card-link:hover .overlay { opacity: 1; }
.card-link:hover .overlay span { transform: translateY(0); }
.card-link:hover img { transform: scale(1.05); }
.nav-btn { position: absolute; top: 40%; transform: translateY(-50%); z-index: 10; background: rgba(255, 255, 255, 0.7); backdrop-filter: blur(4px); border: none; width: 44px; height: 44px; border-radius: 50%; cursor: pointer; font-size: 1.2rem; color: #333; box-shadow: 0 2px 10px rgba(0,0,0,0.1); opacity: 0; transition: opacity 0.3s, background 0.3s; font-family: -apple-system, BlinkMacSystemFont, sans-serif; font-weight: 100; display: flex; align-items: center; justify-content: center; }
.slider-wrapper:hover .nav-btn { opacity: 1; }
.nav-btn:hover { background: rgba(255, 255, 255, 1); }
.prev { left: 20px; }
.next { right: 20px; }
@keyframes scroll { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
.project-info { margin-top: 16px; padding: 0 10px; }
.description { font-size: 0.8rem; color: #666; }
.app-name { font-size: 1.1rem; font-weight: 600; }
.ad-grid-section { max-width: 1080px; margin: 80px auto 40px; padding: 0 20px; }
.section-title { font-size: 0.9rem; color: #888; letter-spacing: 0.1em; text-transform: uppercase; margin-bottom: 24px; text-align: center; }
.ad-grid { display: grid; grid-template-columns: repeat(3, 1fr); grid-auto-rows: auto; gap: 20px; grid-template-areas: "night choco official" "night archive archive"; }
.ad-item { background: none; display: flex; }
.ad-link { display: block; width: 100%; position: relative; overflow: hidden; border-radius: 8px; }
.ad-overlay { position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0, 0, 0, 0.6); display: flex; align-items: center; justify-content: center; opacity: 0; transition: opacity 0.3s ease; }
.ad-overlay span { color: #fff; font-size: 0.75rem; font-weight: 600; letter-spacing: 0.05em; padding: 8px 16px; border: 1px solid rgba(255, 255, 255, 0.4); text-transform: uppercase; }
.ad-link:hover .ad-overlay { opacity: 1; }
.ad-item img { transition: filter 0.3s ease; }
.ad-link:hover img { filter: blur(2px); }
.ad-item img { width: 100%; height: auto; display: block; }
.ad-item.vertical { grid-area: night; }
.ad-item.square:nth-of-type(1) { grid-area: choco; }
.ad-item.square:nth-of-type(3) { grid-area: official; }
.ad-item.horizontal { grid-area: archive; }
@media (max-width: 768px) { .ad-grid { grid-template-columns: 1fr; grid-template-areas: none; gap: 30px; } .ad-item { grid-area: auto !important; } }
.ec-text-gateway { margin: 0 0 10px 0; padding: 0 20px; text-align: left; }
.gateway-link { display: inline-block; text-decoration: none; color: #111; }
.gateway-title { font-family: "Futura", "Helvetica Neue", "Inter", sans-serif; font-size: 2.8rem; font-weight: 500; margin: 0 0 8px 0; line-height: 1.1; letter-spacing: 0.04em; }
.gateway-sub { font-family: -apple-system, BlinkMacSystemFont, sans-serif; font-size: 0.75rem; font-weight: 500; text-transform: uppercase; letter-spacing: 0.2em; display: flex; align-items: center; gap: 6px; color: #111; transition: opacity 0.3s ease, transform 0.3s ease; }
.gateway-link:hover .gateway-sub { opacity: 0.7; transform: translateX(4px); }
@media (max-width: 768px) { .ec-text-gateway { padding: 0 20px; margin-bottom: 10px; } .gateway-title { font-size: 2rem; } }

/* ==========================================================================
   📦 アプリ紹介セクション専用（スピード・構造完全シンクロ版）
   ========================================================================== */

   .apps-section-divider {
  margin-top: 60px;
}

/* 💡 ここがポイントです！
   上と同じループ構造にした上で、秒数を「20s」程度にギュッと縮めることで、
   上の50sで流れる長いレーンと、見た目の進むスピード（流れる速度）が完璧に同期します。 */
.apps-section-divider .slider-track {
  display: flex;
  width: max-content;
  scroll-behavior: smooth;
  animation: scroll 20s linear infinite !important; /* 💡 20秒前後で調整（遅くしたければ25s、早くしたければ15s） */
}

.apps-section-divider .slider-track:hover {
  animation-play-state: paused !important;
}

/* 枠・アイコンのサイズ（先ほどのいい感じのバランスを維持） */
.apps-section-divider .app-card-image-zone {
  position: relative;
  width: 72%;              
  aspect-ratio: 1.15 / 1;  
  background-color: #e8e8e8; 
  border-radius: 12px;
  overflow: hidden;
  margin: 0 auto;          
  
  display: flex !important;
  align-items: center !important;
  justify-content: center !important;
}

.apps-section-divider .card-link {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  text-decoration: none;
}

.apps-section-divider .app-icon-container {
  width: 45%; 
  aspect-ratio: 1 / 1;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  transition: transform 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
}

.apps-section-divider .saturdays-style-icon {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 22.5%; 
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.06); 
}

.apps-section-divider .card-link:hover .app-icon-container {
  transform: translateY(-4px);
}

.app-glow-tag {
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.12em;
  color: #888;
  margin-left: 6px;
  animation: appTagGlow 2.5s ease-in-out infinite;
}

@keyframes appTagGlow {
  0%, 100% { color: #999; text-shadow: none; }
  50% { color: #111; text-shadow: 0 0 6px rgba(0,0,0,0.15); }
}
</style>