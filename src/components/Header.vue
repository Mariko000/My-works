<script setup>
// 共通ヘッダー
</script>

<template>
  <header class="site-header">
    <div class="logo">
      <h3>
        <router-link to='/'>RutenVeil</router-link>
      </h3>
    </div>

    <nav class="nav-links">
      <router-link to='/' class="nav-item">Art Projects</router-link>
      <router-link to='/Works' class="nav-item">Art Pieces</router-link>
      <router-link to='/Featured' class="nav-item">Featured</router-link>
      <router-link to="/about" class="nav-item">About</router-link>
      <router-link to='/Apps' class="nav-item">My Apps</router-link>
      <router-link to='/Contact' class="nav-item">Contact</router-link>
      
      <!-- 準備中のアイテム: data-tooltip属性でメッセージを指定 
      <span class="nav-item disabled-item" data-tooltip="準備中">
        
      </span>-->
    </nav>
  </header>
</template>

<style scoped>
.site-header {
  font-weight: 200;
  letter-spacing: 0.1em;
  margin-bottom: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 40px 0;
  max-width: 1200px;
  margin: 0 auto;
}

.logo h3 {
  margin: 0;
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-weight: 300;
  font-size: 1.5rem;
  letter-spacing: 0.15em;
  text-transform: uppercase;
}

.logo a {
  text-decoration: none;
  color: var(--text-color);
  transition: opacity 0.3s ease;
}

.logo a:hover {
  opacity: 0.6;
}

.nav-links {
  display: flex;
  gap: 30px;
}

.nav-item {
  text-decoration: none;
  color: var(--text-color);
  font-size: 0.9rem;
  font-weight: 400;
  letter-spacing: 0.1em;
  transition: opacity 0.3s ease;
  position: relative; /* ツールチップの基準点 */
}

.nav-item:hover {
  opacity: 0.5;
}

/* --- 無効化されたアイテムのスタイル --- */
.disabled-item {
  color: #999; /* グレーアウト */
  cursor: not-allowed;
}

/* --- ツールチップ（準備中）の実装 --- */
.disabled-item::after {
  content: attr(data-tooltip); /* data-tooltip属性の値を表示 */
  position: absolute;
  bottom: -30px; /* 下側に表示 */
  left: 50%;
  transform: translateX(-50%);
  background-color: rgba(0, 0, 0, 0.7);
  color: #fff;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 0.7rem;
  white-space: nowrap;
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s ease;
  z-index: 10;
  letter-spacing: normal; /* 日本語が見やすいように調整 */
}

/* ホバー時にツールチップを表示 */
.disabled-item:hover::after {
  opacity: 1;
  visibility: visible;
  bottom: -35px; /* 少し浮き上がるアニメーション */
}

/* （オプション）小さな矢印を作る場合 */
.disabled-item::before {
  content: '';
  position: absolute;
  bottom: -10px;
  left: 50%;
  transform: translateX(-50%);
  border-width: 5px;
  border-style: solid;
  border-color: transparent transparent rgba(0, 0, 0, 0.7) transparent;
  opacity: 0;
  visibility: hidden;
  transition: all 0.3s ease;
}

.disabled-item:hover::before {
  opacity: 1;
  visibility: visible;
}
</style>