<script setup>
// 共通フッター
</script>

<template>
    <footer class="site-footer">
      <p>2026-rutenVeil</p>
      <p><a href="#" target="_blank">Instagram</a></p>
      <p><a href="https://www.behance.net/" target="_blank">Behance</a></p>
    </footer>
</template>

<style scoped>
.site-footer {
  display: flex;             /* 横並びにする */
  justify-content: center;   /* 中央寄せ */
  gap: 40px;                 /* 項目間の距離 */
  padding: 60px 0;
  margin-top: 100px;
  border-top: 1px solid rgba(0, 0, 0, 0.05);
}

.site-footer p {
  font-size: 0.75rem;
  letter-spacing: 0.05em;
  color: #888;
  margin: 0;
}

/* リンクの色と装飾をリセット */
.site-footer a {
  color: inherit;
  text-decoration: none;
  transition: opacity 0.3s ease;
}

.site-footer a:hover {
  opacity: 0.5;
}

/* レスポンシブ：画面が狭いときは縦並びにする場合 */
@media (max-width: 600px) {
  .site-footer {
    flex-direction: column;
    gap: 15px;
    align-items: center;
  }
}
</style>