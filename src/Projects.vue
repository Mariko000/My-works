<script setup>
import { projects } from '@/data/projects'
</script>

<template>
  <main class="portfolio-container">
    <section class="works-grid">
      
      <template v-for="project in projects" :key="project.id">
        <div class="left">
          <div class="app-card">
            <a :href="project.link" target="_blank" rel="noopener" class="card-link">
              <img :src="project.image" :alt="project.title" />
              <div class="overlay">
                <span>View on Behance ↗</span>
              </div>
            </a>
          </div>
        </div>

        <div class="right">
          <p>{{ project.description }}</p>
          <p class="app-name">{{ project.title }}</p>
          <p class="meta">
            Stack: {{ project.stack }}<br>
            Note: none
          </p>
        </div>
      </template>

    </section>
  </main>
</template>

<style scoped>
.portfolio-container {
  max-width: 1000px;
  margin: 0 auto;
  padding: 40px 20px;
}

.works-grid {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 48px 40px; /* 上下の間隔を少し広めに設定 */
  align-items: start;
}

.left { width: auto; }
.right { padding-top: 4px; }

.app-name {
  font-size: 1.4rem;
  font-weight: bold;
  margin: 4px 0;
}

.meta {
  font-size: 0.9rem;
  color: #666;
  margin-top: 8px;
  line-height: 1.6;
}

/* ===== Behance Style Card ===== */
.app-card {
  width: 200px; /* サイズは以前のものに統一 */
  position: relative;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  transition: transform 0.3s;
}

.app-card:hover {
  transform: translateY(-5px);
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
  background: rgba(0,0,0,0.45); /* 少し暗めにして文字を見やすく */
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-weight: bold;
  opacity: 0;
  transition: .25s;
  pointer-events: none;
}

.app-card:hover .overlay {
  opacity: 1;
}
</style>