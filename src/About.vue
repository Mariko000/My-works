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
      <!-- Left: Concept Section -->
      <section class="concept-section">
        <h2 class="section-title">Concept</h2>
        
        <div class="lang-jp">
          <p>生命を図形へと変換し、その境界に宿る感情を写し出す。</p>
          <p>
            ビジュアルアーティスト RutenVeilは、生き物を無機質な図形へと再構築し、その物質が内包する熱量を「有機的な温度」として表現することを探求しています。
          </p>
          <p>
            線と色が重なり合うことで生まれる「心地よい緊張感」。それは冷たいデジタルの中にある、生々しい鼓動の視覚化でもあります。
          </p>
          <p>
            また、この視覚的探求はグラフィックに留まらず、コードを用いたアプリケーション開発においても、機能と感性が共鳴するインターフェースの構築へと繋がっています。
緻密なビジュアル設計とモダンな実装技術。その両面から、新たなデジタル体験の輪郭を描き出します。
            </p>
        </div>

        <div class="lang-en">
          <p>Converting life into geometry, capturing the emotions that reside within their boundaries.</p>
          <p>
            Visual artist RutenVeil explores the deconstruction of living beings into inorganic forms, 
            seeking to express the latent thermal energy of matter as "organic warmth."
          </p>
          <p>
            The "calm tension" born from the layering of lines and colors is a visualization 
            of a raw, vivid pulse hidden within the cold digital realm.
          </p>
        </div>
      </section>

      <!-- Right: Contact Section -->
      <aside class="contact-section">
        <h2 class="section-title">Portfolio</h2>
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
  padding: 40px 40px 100px; /* 上の余白(120px)を40pxに縮小して位置を上げました */
}

.content-layout {
  display: flex;
  justify-content: space-between;
  align-items: flex-start; /* これで左右のタイトルの高さをピタリと合わせます */
  gap: 80px;
}

.concept-section {
  flex: 1;
  max-width: 750px;
}

.contact-section {
  width: 250px;
  border-left: 1px solid #eee;
  padding-left: 30px;
}

.section-title {
  font-size: 0.85rem;
  font-weight: 400; /* 少しだけ太くして視認性を回復 */
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: #888;
  margin-bottom: 30px; /* 見出し下の余白を微調整 */
  line-height: 1;
}

.lang-jp, .lang-en {
  margin-bottom: 50px;
}

.lang-jp p {
  font-size: 1.05rem; /* 文字サイズを元（1rem以上）に戻しました */
  line-height: 2; /* 読みやすさを確保 */
  margin-bottom: 1.8rem;
  font-weight: 400;
  color: #111;
}

.lang-en p {
  font-size: 0.95rem; /* 英語はバランスを見て調整 */
  line-height: 1.8;
  margin-bottom: 1.2rem;
  font-weight: 300;
  color: #444;
}

.lang-en {
  opacity: 0.6;
}

.contact-list {
  list-style: none;
  padding: 0;
}

.contact-list li {
  margin-bottom: 15px;
}

.contact-list a {
  font-size: 1rem; /* コンタクトの文字サイズも戻しました */
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
}
</style>