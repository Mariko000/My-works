
<script setup>
/**
 * RutenVeil Portfolio - Works Component
 * Client Works & Graphic Production
 */

const clientWorks = [
  {
    id: 1,
    title: '新規コーポレートサイト制作',
    company: '株式会社トーシン様',
    url: 'https://toshin0828.com/',
    type: '新規制作 / WordPress実装',
    highlights: [
      '強みを引き出すためのインタビュー項目を作成し、コンテンツを整理・構成・ライティング',
      '運用を見据えたCMS設計：クライアント側で簡単に更新できるよう、ACF（Advanced Custom Fields）を用いた入力項目・カスタム投稿を設計',
      'ブログ投稿の際にユーザーに分かりやすいスタイルを付与するスタイルシートを追加',
      'レスポンシブ作成。'
    ],
    tech: [
      'WordPress',
      'PHP',
      'HTML',
      'CSS',
      'JavaScript',
      'Figma',
      'ACF',
      'Contact Form 7'
    ]
  },
  {
    id: 2,
    sectionTitle: '2. 既存Webサイト ページ追加・機能改修',
    items: [
      {
        company: '医療機関サイト（既存サイトの改修）',
        url: '',
        highlights: [
          'クライアント提供原稿に基づく新規ページの作成',
          '診療項目へのプラセンタ注射の追加',
          'WordPressでのページレイアウト調整'
        ],
        tech: ['WordPress', 'HTML', 'CSS']
      },
      {
        company: '教育施設サイト（既存サイトの改修）',
        url: '',
        highlights: [
          '入園案内などのテキスト差し替え',
          '既存ページの内容更新',
          'HTML/CSSによるボタンの実装・スタイル調整'
        ],
        tech: ['WordPress', 'HTML', 'CSS'],
        codeHtml: '<span class="chain-icon"></span>',
        codeCss: `.chain-icon {
  position: relative;
  display: inline-block;
  width: 42px;
  height: 42px;
}

.chain-icon::before,
.chain-icon::after {
  content: "";
  position: absolute;
  width: 19px;
  height: 29px;
  border: 6px solid #e65b2f;
  border-radius: 11px;
  box-sizing: border-box;
}

.chain-icon::before {
  top: 3px;
  left: 2px;
  transform: rotate(45deg);
}

.chain-icon::after {
  top: 10px;
  left: 14px;
  transform: rotate(45deg);
}`
      }
    ]
  }
];


const graphicWorks = {
  title: '3. Web・グラフィック制作',
  role: 'Webサイト用メインビジュアル（ヒーロービュー）制作',
  highlights: [
    'Webサイトに掲載するサービス紹介用メインビジュアルをPhotoshopで制作。',
    'サービスの特徴や料金プランが伝わりやすいよう、キャッチコピー・価格情報・機能アイコンを整理してレイアウト。',
    'PC・スマートフォンの画面イメージを組み合わせ、マルチデバイス対応を視覚的に表現。',
    '背景の配色や図形、文字の大きさ・配置を調整し、視認性と訴求力を意識したビジュアルを制作。'
  ],
  tech: ['Photoshop']
};

</script>

<template>
  <main class="works-container">

    <!-- Header Section -->
    <header class="works-header">
      <h1 class="page-title">Client Works & Production</h1>
      <p class="page-subtitle">実務制作・ディレクション実績一覧</p>
      <p class="notice-text">
        ※守秘義務・権利関係に配慮し、一部情報を限定公開およびパスワード管理を行っております。
      </p>
    </header>

    <!-- 1. 新規制作 & ディレクション実績 -->
    <section class="work-section">
      <h2 class="section-title">
        ■ 1. 新規Webサイト制作・ディレクション
      </h2>

      <article class="work-card highlight-card">
        <div class="card-header">
          <span class="badge badge-primary">新規サイト</span>
          <h3 class="card-title">{{ clientWorks[0].title }}</h3>
        </div>

        <div class="meta-info">
          <span class="meta-item">
            <strong>クライアント:</strong>
            {{ clientWorks[0].company }}
          </span>

          <span class="meta-item" v-if="clientWorks[0].url">
            <strong>URL:</strong>
            <a
              :href="clientWorks[0].url"
              target="_blank"
              rel="noopener"
            >
              {{ clientWorks[0].url }}
            </a>
          </span>
        </div>

        <div class="card-body">
          <h4 class="sub-label">対応内容・ディレクションの工夫</h4>
          <ul class="bullet-list">
            <li
              v-for="(point, idx) in clientWorks[0].highlights"
              :key="idx"
            >
              {{ point }}
            </li>
          </ul>
        </div>

        <div class="card-footer">
          <span class="tech-label">使用技術・ツール:</span>
          <div class="tech-tags">
            <span
              class="tag"
              v-for="t in clientWorks[0].tech"
              :key="t"
            >
              {{ t }}
            </span>
          </div>
        </div>
      </article>
    </section>

    <!-- 2. 既存Webサイト ページ追加・機能改修 -->
    <section class="work-section">
      <h2 class="section-title">
        ■ {{ clientWorks[1].sectionTitle }}
      </h2>

      <div class="sub-list">
        <article
          v-for="(subItem, index) in clientWorks[1].items"
          :key="index"
          class="work-card sub-card"
        >
          <div class="card-header">
            <span class="badge badge-secondary">
              改修・追加 #{{ index + 1 }}
            </span>

            <h3 class="card-title-sm">
              {{ subItem.company }}
            </h3>
          </div>

          <div class="meta-info" v-if="subItem.url">
            <strong>URL:</strong>
            <a
              :href="subItem.url"
              target="_blank"
              rel="noopener"
            >
              {{ subItem.url }}
            </a>
          </div>

          <div class="card-body">
            <ul class="bullet-list">
              <li
                v-for="(point, idx) in subItem.highlights"
                :key="idx"
              >
                {{ point }}
              </li>
            </ul>

            <!-- HTML / CSS Code Example -->
            <div class="code-example" v-if="subItem.codeHtml">
              <h4 class="sub-label">実装コード（HTML）</h4>
              <pre><code>{{ subItem.codeHtml }}</code></pre>

              <h4 class="sub-label">実装コード（CSS）</h4>
              <pre><code>{{ subItem.codeCss }}</code></pre>
            </div>
          </div>

          <div class="card-footer">
            <span class="tech-label">使用技術:</span>
            <div class="tech-tags">
              <span
                class="tag"
                v-for="t in subItem.tech"
                :key="t"
              >
                {{ t }}
              </span>
            </div>
          </div>
        </article>
      </div>
    </section>

    <!-- 3. Web・グラフィック制作 -->
    <section class="work-section">
      <h2 class="section-title">
        ■ {{ graphicWorks.title }}
      </h2>

      <article class="work-card graphic-card">
        <div class="card-header">
          <span class="badge badge-graphic">Graphic & Print</span>
          <h3 class="card-title-sm">{{ graphicWorks.role }}</h3>
        </div>

        <div class="card-body">
          <h4 class="sub-label">対応内容・工夫した点</h4>
          <ul class="bullet-list">
            <li
              v-for="(point, idx) in graphicWorks.highlights"
              :key="idx"
            >
              {{ point }}
            </li>
          </ul>
        </div>

        <div class="card-footer">
          <span class="tech-label">使用技術・ツール:</span>
          <div class="tech-tags">
            <span
              class="tag"
              v-for="t in graphicWorks.tech"
              :key="t"
            >
              {{ t }}
            </span>
          </div>
        </div>
      </article>
    </section>

  </main>
</template>

<style scoped>
/* 基本レイアウト調整 */
.works-container {
  max-width: 900px;
  margin: 0 auto;
  padding: 1.5rem 1rem 3rem;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
  color: #333333;
  line-height: 1.6;
}

/* ヘッダーデザイン */
.works-header {
  margin-bottom: 2rem;
  padding-bottom: 1rem;
  border-bottom: 2px solid #eaeaea;
}

.page-title {
  font-size: 1.75rem;
  font-weight: 700;
  margin: 0 0 0.25rem 0;
  color: #1a1a1a;
}

.page-subtitle {
  font-size: 0.95rem;
  color: #666666;
  margin: 0 0 0.5rem 0;
}

.notice-text {
  font-size: 0.8rem;
  color: #888888;
  margin: 0;
}

/* セクション設定 */
.work-section {
  margin-bottom: 2.5rem;
}

.section-title {
  font-size: 1.25rem;
  font-weight: 700;
  color: #222222;
  margin-bottom: 1rem;
  padding-left: 0.5rem;
  border-left: 4px solid #3b82f6;
}

/* カード共通パーツ */
.work-card {
  background: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 1.25rem;
  margin-bottom: 1rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.work-card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

.highlight-card {
  border-left: 4px solid #2563eb;
  background: #fafafa;
}

.card-header {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 0.75rem;
  flex-wrap: wrap;
}

.card-title {
  font-size: 1.15rem;
  font-weight: 700;
  margin: 0;
  color: #111827;
}

.card-title-sm {
  font-size: 1.05rem;
  font-weight: 600;
  margin: 0;
  color: #1f2937;
}

.url-text {
  font-size: 0.85rem;
  color: #6b7280;
  font-weight: normal;
}

/* バッジデザイン */
.badge {
  font-size: 0.75rem;
  font-weight: 600;
  padding: 0.2rem 0.6rem;
  border-radius: 9999px;
  white-space: nowrap;
}

.badge-primary {
  background-color: #dbeafe;
  color: #1e40af;
}

.badge-secondary {
  background-color: #f3f4f6;
  color: #374151;
}

.badge-graphic {
  background-color: #fce7f3;
  color: #9d174d;
}

/* メタ情報・本文 */
.meta-info {
  font-size: 0.875rem;
  color: #4b5563;
  margin-bottom: 1rem;
  display: flex;
  gap: 1.5rem;
  flex-wrap: wrap;
}

.sub-label {
  font-size: 0.875rem;
  font-weight: 600;
  color: #374151;
  margin: 0 0 0.4rem 0;
}

.bullet-list {
  margin: 0 0 1rem 0;
  padding-left: 1.25rem;
  font-size: 0.925rem;
  color: #374151;
}

.bullet-list li {
  margin-bottom: 0.35rem;
}

/* HTML / CSS コード表示 */
.code-example {
  margin-top: 1.25rem;
  padding: 1rem;
  background: #f8fafc;
  border: 1px solid #e5e7eb;
  border-radius: 6px;
}

.code-example pre {
  overflow-x: auto;
  padding: 1rem;
  background: #1f2937;
  color: #f9fafb;
  border-radius: 5px;
  font-size: 0.8rem;
  line-height: 1.6;
  white-space: pre;
  margin: 0 0 1rem;
}

.code-example code {
  font-family: monospace;
}

/* フッター・技術タグ */
.card-footer {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding-top: 0.75rem;
  border-top: 1px dashed #e5e7eb;
  flex-wrap: wrap;
}

.tech-label {
  font-size: 0.8rem;
  font-weight: 600;
  color: #6b7280;
}

.tech-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
}

.tag {
  font-size: 0.75rem;
  background-color: #f3f4f6;
  color: #4b5563;
  padding: 0.15rem 0.5rem;
  border-radius: 4px;
  border: 1px solid #e5e7eb;
}
</style>
