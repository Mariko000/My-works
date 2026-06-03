<!-- 技術スタック -->
<script setup>
import { Icon } from '@iconify/vue'

</script>
<!-- 技術スタック -->
<template>
  <main class="portfolio-container">
    <section class="skills-section">
      <h2 class="section-title">Skills</h2>
      <div class="skills-grid">

        <div class="skill-card card-frontend">
          <h3 class="card-title">Frontend Development</h3>
          <div class="card-content">
            <div class="skill-item">
              <Icon icon="logos:vue" class="skill-icon" />
              <span class="skill-label">Vue 3</span>
            </div>
            <div class="skill-item">
              <Icon icon="logos:javascript" class="skill-icon" />
              <span class="skill-label">JavaScript</span>
            </div>
            <div class="skill-item">
              <Icon icon="logos:pinia" class="skill-icon" />
              <span class="skill-label">Pinia</span>
            </div>
            <div class="skill-item">
            <Icon icon="carbon:network-4" class="skill-icon" style="color: #42b883;" />
             <span class="skill-label">Vue Router</span>
             </div>
            <div class="skill-item">
              <Icon icon="logos:pwa" class="skill-icon" />
              <span class="skill-label">PWA</span>
            </div>
            <div class="skill-item">
              <Icon icon="logos:chartjs" class="skill-icon" />
              <span class="skill-label">Chart.js</span>
            </div>
          </div>
        </div>

        <div class="skill-card card-backend">
          <h3 class="card-title">Backend Development</h3>
          <div class="card-content">
            <div class="skill-item">
              <Icon icon="logos:python" class="skill-icon" />
              <span class="skill-label">Python</span>
            </div>
            <div class="skill-item">
              <Icon icon="logos:django-icon" class="skill-icon" />
              <span class="skill-label">Django</span>
            </div>
            <div class="skill-item">
              <Icon icon="mdi:shield-lock" class="skill-icon" style="color: #444;" />
              <span class="skill-label">Authentication</span>
            </div>
            <div class="skill-item">
              <Icon icon="mdi:database" class="skill-icon" style="color: #444;" />
              <span class="skill-label">Database Design</span>
            </div>
            <div class="skill-item">
              <Icon icon="mdi:code-braces" class="skill-icon" style="color: #444;" />
              <span class="skill-label">CRUD Applications</span>
            </div>
          </div>
        </div>

        <div class="skill-card card-api">
          <h3 class="card-title">API & Data</h3>
          <div class="card-content">
            <div class="skill-item">
              <Icon icon="eos-icons:api" class="skill-icon" style="color: #444;" />
              <span class="skill-label">REST API Integration</span>
            </div>
            <div class="skill-item">
              <Icon icon="logos:axios" class="skill-icon" />
              <span class="skill-label">Axios</span>
            </div>
            <div class="skill-item">
           <Icon icon="fluent-color:weather-sunny-low-24" class="skill-icon" />
            <span class="skill-label">Open-Meteo API</span>
            </div>
            <div class="skill-item">
              <Icon icon="mdi:vector-combine" class="skill-icon" style="color: #444;" />
              <span class="skill-label">Data Transformation Logic</span>
            </div>
            <div class="skill-item">
              <Icon icon="mdi:engine" class="skill-icon" style="color: #444;" />
              <span class="skill-label">Weather / Geolocation / Conversion Engine</span>
            </div>
          </div>
        </div>

        <div class="skill-card card-cms">
          <h3 class="card-title">CMS & Deployment</h3>
          <div class="card-content">
            <div class="skill-item">
            <Icon icon="carbon:document-view" class="skill-icon" style="color: #444;" />
             <span class="skill-label">microCMS</span>
            </div>
            <div class="skill-item">
              <Icon icon="logos:vercel-icon" class="skill-icon" />
              <span class="skill-label">Vercel</span>
            </div>
            <div class="skill-item">
              <Icon icon="logos:github-icon" class="skill-icon" />
              <span class="skill-label">GitHub</span>
            </div>
            <div class="skill-item">
              <Icon icon="mdi:file-key" class="skill-icon" style="color: #444;" />
              <span class="skill-label">Environment Variables</span>
            </div>
          </div>
        </div>

        <div class="skill-card card-design">
          <h3 class="card-title">UI / UX & Graphic Design</h3>
          <div class="card-content">
            <div class="skill-item">
              <Icon icon="mdi:palette-outline" class="skill-icon" style="color: #444;" />
              <span class="skill-label">UI Design</span>
            </div>
            <div class="skill-item">
              <Icon icon="mdi:account-group-outline" class="skill-icon" style="color: #444;" />
              <span class="skill-label">UX Design</span>
            </div>
            <div class="skill-item">
              <Icon icon="mdi:vector-square" class="skill-icon" style="color: #444;" />
              <span class="skill-label">Graphic Design</span>
            </div>
            <div class="skill-item">
              <Icon icon="logos:adobe-photoshop" class="skill-icon" />
              <span class="skill-label">Adobe Photoshop</span>
            </div>
          </div>
        </div>

        

      </div>

   <div class="skills-notes">
        <p>※ これらの技術を使い、アプリを作成しています</p>
        <p>※ Open-Meteo APIやいくつかのロゴはイメージを使用しています</p>
      </div>

    </section>
  </main>
</template>


<style scoped>
/* セクション全体のベース */
.skills-section {
  padding: 60px 20px;
  max-width: 1200px;
  margin: 0 auto;
}

/* セクションのタイトル */
.section-title {
  font-size: 1.8rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  margin-bottom: 40px;
  text-transform: uppercase;
  border-left: 4px solid var(--accent-color, #a0c4ff);
  padding-left: 15px;
}

/* グリッドコンテナ：デフォルト（スマホ等）は縦1列 */
.skills-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 24px;
}

/* シンプルでエッジの効いたカードスタイル */
.skill-card {
  background: #ffffff;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  padding: 30px;
  box-sizing: border-box;
  min-height: 260px; /* アイコンが加わった分、最小の高さを少し広げました */
  text-align: center;
  transition: transform 0.2s ease, border-color 0.2s ease;
}

/* ホバーエフェクト */
.skill-card:hover {
  transform: translateY(-2px);
  border-color: var(--accent-color, #a0c4ff);
}

/* カード内のタイトル */
.card-title {
  font-size: 1.25rem;
  font-weight: 600;
  margin-top: 0;
  margin-bottom: 32px; /* アイコン群との間にゆとりを持たせる */
  letter-spacing: 0.05em;
  color: #111111;
  display: inline-block;
}

/* カードの中身：アイテムを横並びにして中央寄せ、溢れたら折り返し */
.card-content {
  display: flex;
  flex-wrap: wrap;
  justify-content: center; /* 横方向の中央揃え */
  gap: 24px 32px;          /* チップ同士の間隔（上下に24px、左右に32px空ける） */
  margin: 0;
  padding: 0;
}

/* 各スキルアイテム（縦並びのチップ） */
.skill-item {
  display: flex;
  flex-direction: column;  /* 【重要】上アイコン、下文字にする設定 */
  align-items: center;     /* アイコンと文字のセンターを揃える */
  gap: 8px;                /* アイコンと文字の間の隙間 */
  min-width: 80px;         /* 横並びの列が綺麗に揃いやすくなるよう最小幅を設定 */
}

/* アイコン自体のサイズ調整 */
.skill-icon {
  font-size: 2rem;         /* アイコンを読みやすい適度な大きさに指定（約32px） */
  width: 2rem;
  height: 2rem;
}

/* スキル名テキスト */
.skill-label {
  font-size: 0.9rem;
  line-height: 1.2;
  color: #555555;
  letter-spacing: 0.02em;
  white-space: nowrap;     /* 文字列がチップ内で変に改行されるのを防ぐ */
}

/* ==========================================================
   PC・タブレット用：2-1-2のひし形配置（画面幅768px以上で適用）
   ========================================================== */
@media (min-width: 768px) {
  .skills-grid {
    grid-template-columns: repeat(4, 1fr);
    gap: 32px;
  }

  .card-frontend {
    grid-column: 1 / 3;
  }

  .card-backend {
    grid-column: 3 / 5;
  }

  .card-api {
    grid-column: 2 / 4;
  }

  .card-cms {
    grid-column: 1 / 3;
  }

  .card-design {
    grid-column: 3 / 5;
  }
}
</style>