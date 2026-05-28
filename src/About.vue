<script setup>
/**
 * RutenVeil Portfolio - About Component
 * Concept and Contact sections are aligned at the top.
 * Minimized padding to bring content higher.
 */
</script>

<template>
  <main class="about-container">
    <div class="content-layout">
      <section class="concept-section">
        <h2 class="section-title">Concept</h2>
        
        <div class="lang-jp">
          <p class="catch-copy">
           洗練されたシンプルなデザインに、<span class="highlight">ストリートポップな遊び心</span>をプラス
           </p>
          <p>
            RutenVeil（ルーテンヴェイル）は、ロゴ・パッケージ・UIパーツなどのグラフィック制作から、アプリケーションのシステム開発までをすべて一人で手がけるフルスタックなクリエイターです。
          </p>
           <p>
            すっきりと見やすい画面設計をベースに、鮮やかな色彩の緩急や、触っていてワクワクするような「飽きさせない仕掛け」を組み込んだUI/UXデザインを得意としています。
           </p>
          <p>
            単に見栄えが良いだけではなく、Vue.jsやPythonを用いた実用的なシステム実装までを一気通貫で担当。グラフィック制作のノウハウと確かなエンジニアリングを組み合わせることで、使う人が楽しく、直感的に迷わず操作できるアプリケーションを提供します。
          </p>
        </div>

        <div class="lang-en">
          <p>Infusing refined, minimalist design with a street-pop playful edge.</p>
          <p>
            RutenVeil is a full-stack creator independently handling everything from graphic production—including logos, packaging, and UI components—to core application development.
          </p>
          <p>
            Building upon clean, highly readable layouts, I specialize in UI/UX design that utilizes dynamic color contrasts and engaging features to keep users hooked and entertained.
          </p>
          <p>
            My work goes beyond appearance—I deliver complete, robust implementations using modern technologies like Vue.js and Python. By combining graphic expertise with solid engineering, I create applications that are both highly functional and fun to navigate.
          </p>
        </div>

      </section>

      <aside class="contact-section">
        <h2 class="section-title">Link</h2>
        <ul class="contact-list">
          <li><a href="https://www.instagram.com/rutenveil/" target="_blank" rel="noopener noreferrer">Instagram</a></li>
          <li><a href="https://www.behance.net/rutenveil" target="_blank" rel="noopener noreferrer">Behance</a></li>
        </ul>
      </aside>
    </div>
  </main>
</template>

<style scoped>
.about-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 40px 100px;
}

.content-layout {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 80px;
}

.concept-section {
  flex: 1;
  max-width: 750px;
  
  /* 💡 日本語と英語を1つのグリッドセルに重ね合わせる魔法の設定 */
  display: grid;
  grid-template-columns: 1fr;
}

.section-title {
  font-size: 0.85rem;
  font-weight: 400;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: #888;
  margin-bottom: 30px;
  line-height: 1;
  grid-column: 1; /* タイトルも同じグリッドに所属させる */
}

/* ==========================================================================
   💡 日本語と英語をブロックごと完全に同一座標に重ねるCSS
   ========================================================================== */
.lang-jp, .lang-en {
  grid-column: 1;     /* 完全に同じカラムに重ねる */
  grid-row: 2;        /* section-title（row:1）のすぐ下に重ねて配置 */
  margin-bottom: 50px;
}

/* 前面：日本語の設定 */
.lang-jp {
  position: relative;
  z-index: 2;         /* 英語より手前に出す */
  mix-blend-mode: multiply; /* 💡 文字が重なった部分にグラフィック的な深みを出す（お好みで） */
}

.lang-jp p {
  font-size: 1.05rem;
  line-height: 2.2;   /* 💡 英語が下にずれて重なるため、行間を少しだけ広げて可読性を確保 */
  margin-bottom: 2.5rem;
  font-weight: 400;
  color: #111;
}

/* 日本語キャッチコピー単体のサイズ */
.lang-jp p.catch-copy {
  font-size: 1.5rem;
  font-weight: 700;
  line-height: 1.6;
}

/* 背面：英語の設定（日本語と同じサイズ感で大胆に大きく、半分下にずらす） */
.lang-en {
  position: relative;
  z-index: 1;         /* 日本語の後ろに回す */
  pointer-events: none; /* テキスト選択の邪魔をしない */
  
  /* （下へ0.6rem、右へ3px） */
  transform: translate(7px, 0.6rem);
}

.lang-en p {
  /* 💡 日本語の文字の大きさに合わせて大胆に大きく */
  font-size: 1.05rem; 
  line-height: 2.2;
  margin-bottom: 2.5rem;
  font-weight: 400;
  font-style: italic; /* 斜体 */
  letter-spacing: 0.05em; /* 英字の詰まり具合を調整 */
  
  /* 💡 薄めの蛍光マゼンタ指定 */
  color: #ff007f;
  opacity: 0.25;      /* 若干うすめに */
}

/* 英語キャッチコピー（日本語のサイズに連動して大きく） */
.lang-en p:first-child {
  font-size: 1.5rem;
  font-weight: 700;
  line-height: 1.6;
}
/* ========================================================================== */

.contact-list {
  list-style: none;
  padding: 0;
}

.contact-list li {
  margin-bottom: 15px;
}

.contact-list a {
  font-size: 1rem;
  color: #111;
  text-decoration: none;
  transition: opacity 0.3s;
}

.contact-list a:hover {
  opacity: 0.5;
}

@media (max-width: 900px) {
  .content-layout {
    flex-direction: column;
    gap: 50px;
  }
  .contact-section {
    width: 100%;
    border-left: none;
    border-top: 1px solid #eee;
    padding-left: 0;
    padding-top: 30px;
  }
  /* スマホ版でもグリッドの重なりを維持しつつ調整 */
  .lang-en {
    transform: translateY(0.4rem);
  }
}
</style>