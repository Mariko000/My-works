<script setup>
import { ref, onMounted, watch } from 'vue';
import { shopItems } from './data/items.js';

const items = ref(shopItems);
const selectedCategory = ref('All');
const categories = ['All', 'Vinyl', 'LifeStyle', 'Apparel', 'Set Item'];

const setCategory = (cat) => {
  selectedCategory.value = cat;
};

// フィルタリングロジック
const filteredItems = () => {
  if (selectedCategory.value === 'All') return items.value;
  return items.value.filter(item => item.category === selectedCategory.value);
};

// --- カート機能のロジック ---
const cart = ref([]);

// 初期化時にローカルストレージから読み込む
onMounted(() => {
  const savedCart = localStorage.getItem('rutenveil-cart');
  if (savedCart) {
    cart.value = JSON.parse(savedCart);
  }
});

// カートの中身が変わるたびに保存する
watch(cart, (newCart) => {
  localStorage.setItem('rutenveil-cart', JSON.stringify(newCart));
}, { deep: true });

// カートに追加
const addToCart = (item) => {
  const target = cart.value.find(prev => prev.id === item.id);
  if (target) {
    target.quantity++;
  } else {
    cart.value.push({ ...item, quantity: 1 });
  }
  // ここでアイコンを揺らすなどのアニメーションを発火させると最高です
};

// 合計個数の計算
const cartCount = () => {
  return cart.value.reduce((acc, item) => acc + item.quantity, 0);
};

// --- カートの開閉状態を管理する変数と、修正・削除の関数 ---
const isCartOpen = ref(false);

const toggleCart = () => {
  isCartOpen.value = !isCartOpen.value;
};

// 数量変更
const updateQuantity = (id, delta) => {
  const target = cart.value.find(item => item.id === id);
  if (target) {
    target.quantity += delta;
    // 0以下になったら削除
    if (target.quantity <= 0) {
      removeFromCart(id);
    }
  }
};

// 削除
const removeFromCart = (id) => {
  cart.value = cart.value.filter(item => item.id !== id);
};

// 合計金額の計算
const totalPrice = () => {
  return cart.value.reduce((acc, item) => acc + (item.price * item.quantity), 0);
};

// --- demoページへの移動・モーダルの開閉状態を管理 ---
const isDemoModalOpen = ref(false);

const openDemoModal = () => {
  isDemoModalOpen.value = true;
};

const closeDemoModal = () => {
  isDemoModalOpen.value = false;
};


</script>

<template>
  <main class="shop-container">
    <!-- shopping cart   -->
    <div class="floating-cart" :class="{ 'has-items': cartCount() > 0 }" @click="toggleCart">
  <div class="cart-icon-wrapper">
    <span class="cart-svg">🛒</span>
    <span v-if="cartCount() > 0" class="cart-badge">{{ cartCount() }}</span>
  </div>
</div>

<transition name="slide">
  <div v-if="isCartOpen" class="cart-drawer-overlay" @click.self="toggleCart">
    <div class="cart-drawer">
      <div class="drawer-header">
        <h3>Shopping Cart</h3>
        <button class="btn-close" @click="toggleCart">✕</button>
      </div>

      <div v-if="cart.length === 0" class="empty-message">
        <p>カートは空です</p>
        <button class="btn-back" @click="toggleCart">お店に戻る</button>
      </div>

      <div v-else class="cart-items-list">
        <div v-for="item in cart" :key="item.id" class="cart-item">
          <img :src="item.image" class="cart-item-thumb" />
          <div class="cart-item-details">
            <h4>{{ item.name }}</h4>
            <p>¥{{ item.price.toLocaleString() }}</p>
            <div class="quantity-controls">
              <button @click="updateQuantity(item.id, -1)">-</button>
              <span>{{ item.quantity }}</span>
              <button @click="updateQuantity(item.id, 1)">+</button>
            </div>
          </div>
          <button class="btn-remove" @click="removeFromCart(item.id)">削除</button>
        </div>
      </div>

      <div v-if="cart.length > 0" class="drawer-footer">
        <div class="total-row">
          <span>合計金額</span>
          <span>¥{{ totalPrice().toLocaleString() }}</span>
        </div>
        <button class="btn-checkout" @click="openDemoModal">注文手続きへ（Demo）</button>

        <transition name="fade">
  <div v-if="isDemoModalOpen" class="modal-overlay" @click.self="closeDemoModal">
    <div class="demo-modal">
      <div class="modal-content">
        <span class="modal-icon">✦</span>
        <h3>Notice: Demo Store</h3>
        <p>
          このサイトはポートフォリオ用のデモショップです。実際の商品は購入できませんが、
          <strong>Shopify</strong> や <strong>Stripe</strong> を用いたセキュアな決済システムの実装、
          およびブランドの世界観を反映したECサイトの構築が可能です。
        </p>
        <p class="modal-sub">
          EC機能の導入やデザインのご相談は、Contactページよりお気軽にお問い合わせください。
        </p>
        <div class="modal-actions">
          <router-link to="/contact" class="btn-to-contact">Contactへ</router-link>
          <button class="btn-modal-close" @click="closeDemoModal">閉じる</button>
        </div>
      </div>
    </div>
  </div>
</transition>

        <button class="btn-continue" @click="toggleCart">お買い物を続ける</button>
      </div>
    </div>
  </div>
</transition>

    <header class="shop-header">
      <h2 class="section-tag">Online Store</h2>
      <h1 class="shop-title">RutenVeil Editions</h1>
      <p class="shop-subtitle">アートを、日常のプロダクトへ。</p>
    </header>

    <nav class="category-nav">
      <button 
        v-for="cat in categories" 
        :key="cat"
        :class="['cat-btn', { active: selectedCategory === cat }]"
        @click="setCategory(cat)"
      >
        {{ cat }}
      </button>
    </nav>

    <section class="items-grid">
      <div 
        v-for="item in filteredItems()" 
        :key="item.id" 
        class="item-card"
      >
        <div class="item-image-wrapper">
          <img :src="item.image" :alt="item.name" class="item-image" />
          <div class="item-overlay">
            <!-- v-for で回している商品データ item を引数として渡す -->
            <button class="btn-add-cart" @click="addToCart(item)">Add to Cart</button>
          </div>
        </div>
        
        <div class="item-info">
          <span class="item-category">{{ item.category }}</span>
          <h3 class="item-name">{{ item.name }}</h3>
          <p class="item-price">¥{{ item.price.toLocaleString() }}</p>
          <p class="item-desc">{{ item.description }}</p>
        </div>
      </div>
    </section>
  </main>
</template>

<style scoped>
.shop-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 80px 20px;
}
/* shopping cart /カートに商品が入った時の「ぷるん」とした動き */

/* 右上のフローティングカート */
.floating-cart {
  position: fixed;
  top: 100px; /* ヘッダーとの干渉を避ける位置 */
  right: 40px;
  z-index: 100;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.cart-icon-wrapper {
  position: relative;
  background: #fff;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 10px 30px rgba(0,0,0,0.1);
  border: 1px solid #eee;
  font-size: 1.5rem;
}

.cart-badge {
  position: absolute;
  top: -5px;
  right: -5px;
  background: #1a1a1a;
  color: #fff;
  font-size: 0.7rem;
  font-weight: 800;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: popIn 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

/* カートに商品が入った時のアニメーション */
.floating-cart.has-items:active {
  transform: scale(0.9);
}

@keyframes popIn {
  0% { transform: scale(0); }
  100% { transform: scale(1); }
}

/* モバイル対応：カートの位置を調整 */
@media (max-width: 768px) {
  .floating-cart {
    top: auto;
    bottom: 30px;
    right: 20px;
  }
}

/* カートドロワーのスタイル */
.cart-drawer-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(4px);
  z-index: 1000;
  display: flex;
  justify-content: flex-end;
}

.cart-drawer {
  width: 100%;
  max-width: 400px;
  background: white;
  height: 100%;
  padding: 40px;
  display: flex;
  flex-direction: column;
  box-shadow: -10px 0 30px rgba(0,0,0,0.1);
}

.drawer-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 40px;
}

/* --- 削除ボタンのブラッシュアップ --- */
.btn-remove {
  padding: 8px 16px;
  background-color: transparent;
  color: #ff4d4d; /* 削除は少し色を変えるか、グレーにするのが定石 */
  border: 1px solid #eee;
  border-radius: 6px;
  font-size: 0.75rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-remove:hover {
  background-color: #fff0f0;
  border-color: #ff4d4d;
}

/* --- 数量調整ボタン（- / +）のスタイル --- */
.quantity-controls button {
  width: 28px;
  height: 28px;
  border: 1px solid #1a1a1a; /* 枠線を黒に */
  background: white;
  color: #1a1a1a;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.2s ease;
}

.quantity-controls button:hover {
  background: #1a1a1a;
  color: white;
}

.quantity-controls span {
  font-weight: 700;
  min-width: 20px;
  text-align: center;
}

/* --- 閉じるボタン（✕） --- */
.btn-close {
  background: none;
  border: none;
  font-size: 1.2rem;
  cursor: pointer;
  padding: 10px;
  color: #999;
  transition: color 0.2s ease;
}

.btn-close:hover {
  color: #1a1a1a;
}

/* --- カート内アイテムのレイアウト微調整 --- */
.cart-item {
  display: flex;
  gap: 20px;
  padding: 24px 0;
  border-bottom: 1px solid #f0f0f0;
  align-items: flex-start; /* 上揃えにするとプロっぽい */
}

.cart-item-details h4 {
  font-size: 1rem;
  margin-bottom: 4px;
  line-height: 1.3;
}

.cart-item-thumb {
  width: 70px;
  height: 70px;
  object-fit: contain;
  background: #f9f9f9;
  border-radius: 8px;
}

.quantity-controls {
  display: flex;
  align-items: center;
  gap: 15px;
  margin-top: 10px;
}

.quantity-controls button {
  width: 24px;
  height: 24px;
  border: 1px solid #ddd;
  background: none;
  border-radius: 4px;
  cursor: pointer;
}

.drawer-footer {
  margin-top: auto;
  padding-top: 40px;
}

.total-row {
  display: flex;
  justify-content: space-between;
  font-weight: 800;
  font-size: 1.2rem;
  margin-bottom: 20px;
}

.btn-checkout {
  width: 100%;
  padding: 16px;
  background: #1a1a1a;
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 700;
  margin-bottom: 10px;
  cursor: pointer;
}

.btn-continue {
  width: 100%;
  padding: 12px;
  background: none;
  border: 1px solid #ddd;
  border-radius: 8px;
  cursor: pointer;
}

/* アニメーション */
.slide-enter-active, .slide-leave-active {
  transition: transform 0.4s ease;
}
.slide-enter-from, .slide-leave-to {
  transform: translateX(100%);
}

.shop-header {
  text-align: center;
  margin-bottom: 60px;
}

.shop-title {
  font-size: 2.5rem;
  font-weight: 800;
  margin: 10px 0;
  letter-spacing: -0.02em;
}

.shop-subtitle {
  font-size: 1rem;
  color: #666;
  letter-spacing: 0.1em;
}

/* フィルター */
.category-nav {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-bottom: 80px;
}

.cat-btn {
  background: none;
  border: none;
  font-size: 0.8rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  color: #999;
  cursor: pointer;
  padding: 10px 0;
  border-bottom: 2px solid transparent;
  transition: all 0.3s ease;
}

.cat-btn.active, .cat-btn:hover {
  color: #1a1a1a;
  border-bottom: 2px solid #1a1a1a;
}

/* グリッド */
.items-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 60px 30px;
}

.item-card {
  display: flex;
  flex-direction: column;
}

.item-image-wrapper {
  position: relative;
  background-color: #f9f9f9;
  border-radius: 12px;
  overflow: hidden;
  aspect-ratio: 1 / 1;
  display: flex;
  align-items: center;
  justify-content: center;
}

.item-image {
  width: 90%;
  height: 90%;
  object-fit: contain;
  transition: transform 0.6s cubic-bezier(0.165, 0.84, 0.44, 1);
}

.item-card:hover .item-image {
  transform: scale(1.1);
}

/* ホバーオーバーレイ */
.item-overlay {
  position: absolute;
  inset: 0;
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.item-card:hover .item-overlay {
  opacity: 1;
}

.btn-add-cart {
  padding: 12px 24px;
  background: #1a1a1a;
  color: #fff;
  border: none;
  border-radius: 30px;
  font-weight: 700;
  font-size: 0.8rem;
  cursor: pointer;
}

/* 商品情報 */
.item-info {
  padding-top: 20px;
}

.item-category {
  font-size: 0.7rem;
  color: #999;
  text-transform: uppercase;
  letter-spacing: 0.1em;
}

.item-name {
  font-size: 1.1rem;
  font-weight: 700;
  margin: 5px 0;
  color: #1a1a1a;
}

.item-price {
  font-size: 0.95rem;
  font-weight: 500;
  color: #333;
  margin-bottom: 10px;
}

.item-desc {
  font-size: 0.85rem;
  color: #777;
  line-height: 1.6;
}

/* モバイル対応 */
@media (max-width: 768px) {
  .items-grid {
    grid-template-columns: 1fr 1fr;
    gap: 30px 15px;
  }
  .item-name { font-size: 0.9rem; }
  .item-desc { display: none; } /* モバイルでは説明を隠してスッキリさせる */
}

/* デモページ */
/* --- デモモーダルのスタイル --- */
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(8px);
  z-index: 2000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.demo-modal {
  background: white;
  width: 100%;
  max-width: 500px;
  border-radius: 20px;
  padding: 40px;
  text-align: center;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
}

.modal-icon {
  font-size: 2rem;
  display: block;
  margin-bottom: 20px;
}

.demo-modal h3 {
  font-size: 1.5rem;
  font-weight: 800;
  margin-bottom: 20px;
  letter-spacing: -0.02em;
}

.demo-modal p {
  font-size: 0.95rem;
  line-height: 1.8;
  color: #444;
  margin-bottom: 15px;
}

.modal-sub {
  font-size: 0.85rem !important;
  color: #888 !important;
}

.modal-actions {
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.btn-to-contact {
  display: block;
  width: 100%;
  padding: 16px;
  background: #1a1a1a;
  color: white;
  text-decoration: none;
  border-radius: 8px;
  font-weight: 700;
  transition: opacity 0.2s;
}

.btn-modal-close {
  background: none;
  border: none;
  color: #999;
  font-size: 0.9rem;
  cursor: pointer;
  text-decoration: underline;
}

/* フェードアニメーション */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>