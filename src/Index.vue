<script setup>
//全体俯瞰（メインの縮小・全体が見える）
</script>

<template>
  <main class="portfolio-container">
    
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
        <p class="app-name">TimeWheel</p>

        <p class="meta">
          Status: 公開中<br>
          Stack: Vue.js<br>
          Note: none
        </p>
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

/* 2列レイアウト */
.works-grid {
  display: grid;
  grid-template-columns: auto 1fr; /* ← 固定やめる */
  gap: 32px 40px;
  align-items: start;
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

</style>