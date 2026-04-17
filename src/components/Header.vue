<script setup>
import { ref } from 'vue'

const isMenuOpen = ref(false)

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

// リンククリック時にメニューを閉じる
const closeMenu = () => {
  isMenuOpen.value = false
}
</script>

<template>
  <header class="site-header">
    <div class="logo">
      <h3>
        <router-link to='/' @click="closeMenu">RutenVeil</router-link>
      </h3>
    </div>

    <button class="menu-trigger" @click="toggleMenu" :class="{ 'is-active': isMenuOpen }">
      <span></span>
      <span></span>
      <span></span>
    </button>

    <nav class="nav-links" :class="{ 'is-open': isMenuOpen }">
      <router-link to='/' class="nav-item" @click="closeMenu">Art Projects</router-link>
      <router-link to='/Works' class="nav-item" @click="closeMenu">Art Pieces</router-link>
      <router-link to='/Featured' class="nav-item" @click="closeMenu">Featured</router-link>
      <router-link to="/about" class="nav-item" @click="closeMenu">About</router-link>
      <router-link to='/Apps' class="nav-item" @click="closeMenu">My Apps</router-link>
      <router-link to='/EC' class="nav-item" @click="closeMenu">Online shop</router-link>
      <router-link to='/Contact' class="nav-item" @click="closeMenu">Contact</router-link>
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

/* ハンバーガーメニュー */
.menu-trigger {
  display: none; /* デスクトップでは隠す */
  background: none;
  border: none;
  cursor: pointer;
  width: 30px;
  height: 24px;
  position: relative;
  z-index: 2000;
}

/* スマホ表示（1024px以下くらいから切り替えると余裕があります） */
@media (max-width: 1024px) {
  .site-header {
    padding: 20px 0;
  }

  .menu-trigger {
    display: block; /* スマホで表示 */
  }

  /* 三本線の線 */
  .menu-trigger span {
    display: block;
    width: 100%;
    height: 1px; /* 極細にして洗練さを出す */
    background: #1a1a1a;
    position: absolute;
    transition: all 0.3s ease;
  }
  .menu-trigger span:nth-child(1) { top: 0; }
  .menu-trigger span:nth-child(2) { top: 11px; }
  .menu-trigger span:nth-child(3) { bottom: 0; }

  /* ✕印のアニメーション */
  .menu-trigger.is-active span:nth-child(1) { transform: translateY(11px) rotate(45deg); }
  .menu-trigger.is-active span:nth-child(2) { opacity: 0; }
  .menu-trigger.is-active span:nth-child(3) { transform: translateY(-12px) rotate(-45deg); }

  .nav-links {
    position: fixed;
    top: 0;
    right: -100%; /* 最初は画面の外 */
    width: 100%;
    height: 100vh;
    background: rgba(255, 255, 255, 0.98);
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 40px;
    transition: right 0.4s cubic-bezier(0.3, 0, 0.2, 1);
    z-index: 1500;
  }

  .nav-links.is-open {
    right: 0; /* メニューを開く */
  }

  .nav-item {
    font-size: 1.2rem; /* スマホでは押しやすいように大きく */
  }
}
</style>