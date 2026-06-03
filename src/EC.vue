<script setup>
import { ref, onMounted, watch, computed } from 'vue';
import { shopItems } from './data/items.js';

const items = ref(shopItems);
const selectedCategory = ref('All');
const categories = ['All', 'Vinyl', 'LifeStyle', 'Apparel', 'Set Item'];

// 【新しく追加】microCMSから受け取る新商品専用の変数
const cmsItems = ref([]); 

onMounted(async () => {
  try {
    // fetch()を使って直接URLを叩いて通信している場合は、ライブラリがURLを組み立ててくれません。
    // URLとAPIキーを、環境変数（伏せ字）に変更
    const response = await fetch(import.meta.env.VITE_MICROCMS_URL, {
      headers: { 'X-MICROCMS-API-KEY': import.meta.env.VITE_MICROCMS_API_KEY }
    });

    console.log('--- 【検証1】通信ステータス ---');
    console.log('Status Code:', response.status); 
    console.log('Status Text:', response.statusText);

    const rawText = await response.text();
    console.log('--- 【検証2】サーバーから返ってきた生データ ---');
    console.log('Raw Text:', rawText);

    if (!response.ok) {
      throw new Error(`サーバーエラーが起きています (Status: ${response.status})`);
    }

    // 3. JSONに変換
    const data = JSON.parse(rawText);
    console.log('--- 【検証3】変換後のJSONデータ全体 ---');
    console.log(data);

    if (data.contents && data.contents.length > 0) {
      console.log('--- 【検証4】microCMSから届いた最初の1件目のデータ構造 ---');
      console.dir(data.contents[0]);
    } else {
      console.log('--- 【検証4】注意：contentsの中身が空っぽです ---');
    }

    // 💡【ここを修正！】そのまま代入せず、既存の items.js と同じ形に「翻訳」して代入します
    cmsItems.value = data.contents.map(cmsItem => {
      return {
        id: cmsItem.id,
        // microCMSのカテゴリ（['ALL', 'APPAREL']など）から文字列を抽出
        category: cmsItem.category && cmsItem.category[1] ? cmsItem.category[1] : 'Apparel',
        name: cmsItem.name,
        price: cmsItem.price,
        description: cmsItem.description,
        size: cmsItem.size || 'Free size',
        material: cmsItem.material || 'Premium Cotton',
        image: cmsItem.image ? cmsItem.image.url : '',
        originalImage: cmsItem.originalImage ? cmsItem.originalImage.url : null,
        url: cmsItem.url || ''
      };
    });
    
  } catch (error) {
    console.log('--- ❌ エラーの詳細ログ ---');
    console.error(error);
  }
});

const setCategory = (cat) => {
  selectedCategory.value = cat;
};

// フィルタリングロジック
const filteredItems = () => {
  if (selectedCategory.value === 'All') return items.value;
  return items.value.filter(item => item.category === selectedCategory.value);
};

// シークレットコード入力用のステート
const secretCode = ref('');

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
const addToCart = (item, isFromDetail = false) => {
  const target = cart.value.find(prev => prev.id === item.id);
  if (target) {
    target.quantity++;
  } else {
    cart.value.push({ ...item, quantity: 1 });
  }

  // 💡 もし詳細画面（モーダル）から押された場合は、詳細を閉じてカートドロワーを自動で開く！
  if (isFromDetail) {
    closeDetailModal(); // 詳細モーダルを閉じる
    isCartOpen.value = true; // カートドロワーを開く
  }
};

// 合計個数の計算
const cartCount = () => {
  return cart.value.reduce((acc, item) => acc + item.quantity, 0);
};

// カートの開閉
const isCartOpen = ref(false);
const toggleCart = () => {
  isCartOpen.value = !isCartOpen.value;
};

// 数量変更
const updateQuantity = (id, delta) => {
  const target = cart.value.find(item => item.id === id);
  if (target) {
    target.quantity += delta;
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

const shippingFee = computed(() => {
  //コード適用時はどの配送方法でも送料0円にする
  if (secretCode.value === 'Yummy!') {
    return 0;
  }
  
  if (demoShipping.value.method === 'standard') {
    return 500;
  }
  if (demoShipping.value.method === 'cat') {
    return 1000; // キャット・エクスプレスの本来の送料も反映
  }
  return 0;
});

// コード適用時の最終請求額と本体代の相殺ロジック
const finalTotalPrice = computed(() => {
  // 1. シークレットコードがある時は一律 0円
  if (secretCode.value === 'Yummy!') {
    return 0;
  }
  
  // 2. コードがなくても、メタバース配送なら (本体) + (送料) - (相殺分) で 0円！
  if (demoShipping.value.method === 'meta') {
    return totalPrice() + 0 - totalPrice(); // 結果: 0
  }
  
  // 3. 通常配送やキャット・エクスプレスは普通に合算
  return totalPrice() + shippingFee.value;
});
  

// --- チェックアウトデモモーダルの状態 ---
const isDemoModalOpen = ref(false);
const checkoutStep = ref('cart'); // 'cart' or 'surprise'
const demoShipping = ref({
  name: '',
  address: '',
  method: 'standard'
});

const openDemoModal = () => {
  checkoutStep.value = 'cart';
  isDemoModalOpen.value = true;
};

const closeDemoModal = () => {
  isDemoModalOpen.value = false;
};

// 「メタバース配送」が選ばれていたら自動ダウンロードを発火
const processOrder = () => {
  // 🌌 もし「メタバース配送」が選ばれていたら、カート内アイテムの元データを自動ダウンロード
  if (demoShipping.value.method === 'meta') {
    cart.value.forEach(async (item) => { // 💡 async を追加
      if (item.originalImage) {
        try {
          // 💡 外部URL（microCMS等）でも強制ダウンロードさせるため、一度Blobデータに変換する
          const response = await fetch(item.originalImage);
          const blob = await response.blob();
          const blobUrl = URL.createObjectURL(blob);

          const link = document.createElement('a');
          link.href = blobUrl; // BlobのローカルURLをセット
          
          // ファイル名を「商品名_artwork.png」の形に整形
          link.download = `${item.name.replace(/[:\/\\\*\?"<>\|]/g, '')}_artwork.png`;
          
          // DOMに一瞬だけ追加してクリックイベントを発生させる
          document.body.appendChild(link);
          link.click();
          
          // 後片付け
          document.body.removeChild(link);
          URL.revokeObjectURL(blobUrl);
        } catch (error) {
          console.error('画像のダウンロードに失敗しました:', error);
          
          // 万が一Blob変換が失敗した時のためのフォールバック（従来の挙動）
          const link = document.createElement('a');
          link.href = item.originalImage;
          link.target = '_blank';
          link.download = `${item.name.replace(/[:\/\\\*\?"<>\|]/g, '')}_artwork.png`;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        }
      }
    });
  }

  // 注文を確定したらサプライズ種明かし画面へ切り替える
  checkoutStep.value = 'surprise';
};
// ↑画像を一度ブラウザのメモリ上にバイナリデータ（Blob）として引っ張ってきてからダウンロード用リンクを生成

// --- 商品詳細モーダルの制御ロジック ---
const isDetailModalOpen = ref(false);
const selectedProduct = ref(null);

const openDetailModal = (item) => {
  selectedProduct.value = item;
  isDetailModalOpen.value = true;
};

const closeDetailModal = () => {
  isDetailModalOpen.value = false;
  selectedProduct.value = null;
};
</script>

<template>
  <main class="shop-container">
    
    <!-- 🛒 フローティングカートアイコン -->
    <div class="floating-cart" :class="{ 'has-items': cartCount() > 0 }" @click="toggleCart">
      <div class="cart-icon-wrapper">
        <span class="cart-svg">🛒</span>
        <span v-if="cartCount() > 0" class="cart-badge">{{ cartCount() }}</span>
      </div>
    </div>

    <!-- カートドロワー側から開くチェックアウト -->
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
            
            <button class="btn-checkout" @click="openDemoModal">
              注文手続きへ（Demo）
            </button>
            
            <button class="btn-continue" @click="toggleCart">お買い物を続ける</button>
          </div>
        </div>
      </div>
    </transition>

    <!-- チェックアウト ➔ サプライズ種明かしモーダル（一元化） -->
    <transition name="fade">
      <div v-if="isDemoModalOpen" class="modal-overlay" @click.self="closeDemoModal">
        <div class="demo-modal-container">
          
          <!-- ステップA: 簡易チェックアウト画面 -->
          <div v-if="checkoutStep === 'cart'" class="checkout-step-view">
            <h3>Checkout (Demo)</h3>
            <p class="checkout-intro">これは実装サンプルの架空ストアです。以下のフォームで擬似的なチェックアウトを体験できます。</p>
            
            <div class="demo-autofill-zone">
              <button type="button" class="btn-autofill" @click="demoShipping.name='猫山 ニャン太郎（ゲスト）'; demoShipping.address='東京都港区麻布にゃんこ町 2-2-2'">
               ⚡ デモ用データを自動入力する
              </button>
            </div>

            <form @submit.prevent="processOrder" class="checkout-form">
              <div class="form-group">
                <label>お名前（偽名でOK）</label>
                <input type="text" v-model="demoShipping.name" required placeholder="例：デザイン 太郎" />
              </div>
              <div class="form-group">
                <label>お届け先住所（架空でOK）</label>
                <input type="text" v-model="demoShipping.address" required placeholder="例：マタタビ県ネコ市..." />
              </div>

              <div class="form-group">
                <label>配送オプション</label>
                <div class="shipping-options">
                  <label class="shipping-radio">
                    <input type="radio" v-model="demoShipping.method" value="standard" name="shipping-method" />
                    <div class="radio-text">
                      <span class="option-title">通常配送 (¥500)</span>
                      <span class="option-sub">3〜5日でお届け</span>
                    </div>
                  </label>
                  <label class="shipping-radio">
                    <input type="radio" v-model="demoShipping.method" value="meta" name="shipping-method" />
                    <div class="radio-text">
                      <span class="option-title">メタバース配送 (¥0)</span>
                      <span class="option-sub">無料ダウンロード</span>
                    </div>
                  </label>
                  <label class="shipping-radio">
                    <input type="radio" v-model="demoShipping.method" value="cat" name="shipping-method" />
                    <div class="radio-text">
                      <span class="option-title">キャット・エクスプレス (¥1000)</span>
                      <span class="option-sub">猫たちが肉球スタンプを押して大切に優先的に梱包</span>
                    </div>
                  </label>
                </div>
              </div>

              <div class="form-group secret-code-zone">
                <label>シークレットコード</label>
                <input type="text" v-model="secretCode" placeholder="コードをお持ちの方は入力してください" />
              </div>

              <div class="checkout-summary">
                <div class="summary-row">
                  <span>商品合計</span>
                  <span v-if="demoShipping.method === 'meta'">
                    -¥{{ totalPrice().toLocaleString() }}
                  </span>
                  <span v-else>
                    ¥{{ totalPrice().toLocaleString() }}
                  </span>
                </div>
                
                <div class="summary-row">
                  <span>配送料</span>
                  <span>¥{{ shippingFee.toLocaleString() }}</span>
                </div>

                <div v-if="secretCode === 'Yummy!'" class="summary-row discount-row">
                  <span>シークレット割引 (Code: Yummy!)</span>
                  <span v-if="demoShipping.method === 'meta'">-¥0</span>
                  <span v-else>-¥{{ (totalPrice() + shippingFee).toLocaleString() }}</span>
                </div>
                
                <div class="summary-row total">
                  <span>最終請求額</span>
                  <span>¥{{ finalTotalPrice.toLocaleString() }}</span>
                </div>
              </div>
              <div class="modal-actions">
                <button type="submit" class="btn-order-submit">注文を確定する</button>
                <button type="button" class="btn-modal-close" @click="closeDemoModal">キャンセル</button>
              </div>
            </form>
          </div>

          <!-- ステップB: サプライズ種明かし画面 -->
          <div v-else class="surprise-notice-view">
            <span class="modal-icon"></span>
            <h3>体験していただきありがとうございます！</h3>
            
            <div v-if="demoShipping.method === 'meta'" class="meta-download-notice" style="background: #f9f9f9; padding: 16px; border-radius: 8px; margin-bottom: 24px; font-size: 0.85rem; border-left: 3px solid #1a1a1a; text-align: left; line-height: 1.6;">
              🌌 <strong>メタバース配送を完了しました</strong><br>
              あなたのアトリエ（端末）へ、モックアップのベースとなったオリジナルアートワークのデータをご用意しました。ブラウザのダウンロードをご確認ください。
            </div>

            <p class="surprise-highlight">
              これはポートフォリオ用に構築された<strong>「架空の実装サンプルストア」</strong>です。
            </p>
            <div class="surprise-card">
              <p>
                Vue.jsを用いた動的なカート状態管理、ローカルストレージ連携、およびチェックアウトのユーザー動線を体験していただくために、裏側のロジックまでフルスクラッチで実装しました。
              </p>
              <p class="story-teaser">
                今回体験していただいた商品の「ブランディングの裏話（パッケージデザインのこだわり）」や「使用した技術スタックの裏側」を、アーカイブ展示として別ページで詳しく解説しています。
              </p>
            </div>
            
            <div class="modal-actions">
              <a href="https://www.behance.net/gallery/246407685/Package-design-Chocolate" target="_blank" rel="noopener" class="btn-to-archive">
                この商品のデザイン・開発解説を見る ↗
              </a>
              <button class="btn-modal-close" @click="closeDemoModal">ストアに戻る</button>
            </div>
          </div>

        </div>
      </div>
    </transition>

    <!-- ショップヘッダー -->
    <header class="shop-header">
      <h2 class="section-tag">Online Store</h2>
      <h1 class="shop-title">Art into everyday</h1>
      <p class="shop-subtitle">日常のプロダクトをアートと共に</p>
    </header>

    <!-- カテゴリナビ -->
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

    <!--  商品グリッド一覧 -->
    <section class="items-grid">
      
      <div 
        v-for="item in filteredItems()" 
        :key="item.id" 
        class="item-card"
      >
        <div class="item-image-wrapper" @click="openDetailModal(item)">
          <img :src="item.image" :alt="item.name" class="item-image" />
          <div class="item-overlay">
            <template v-if="item.isApp">
              <a :href="item.link" target="_blank" class="btn-overlay-single" style="text-decoration: none;" @click.stop>Open App</a>
            </template>
            <template v-else>
              <div class="overlay-button-group">
                <button class="btn-overlay-action btn-add" @click.stop="addToCart(item)">Add to Cart</button>
                <a v-if="item.url" :href="item.url" target="_blank" rel="noopener" class="btn-overlay-action btn-behance" @click.stop>View on Behance ↗</a>
              </div>
            </template>
          </div>
        </div>
        
        <div class="item-info">
          <span class="item-category">{{ item.category }}</span>
          <h3 class="item-name" @click="openDetailModal(item)" style="cursor: pointer;">{{ item.name }}</h3>
          <p v-if="!item.isApp" class="item-price">¥{{ item.price.toLocaleString() }}</p>
          <p class="item-desc">{{ item.description }}</p>
        </div>
      </div> 
      
      <div 
        v-for="cmsItem in cmsItems" 
        :key="cmsItem.id" 
        class="item-card"
      >
        <div class="item-image-wrapper" @click="openDetailModal(cmsItem)">
          <img v-if="cmsItem.image" :src="cmsItem.image" :alt="cmsItem.name" class="item-image" />
          
          <div class="item-overlay">
            <div class="overlay-button-group">
              <button class="btn-overlay-action btn-add" @click.stop="addToCart(cmsItem)">
                Add to Cart
              </button>
              <a v-if="cmsItem.url" :href="cmsItem.url" target="_blank" rel="noopener" class="btn-overlay-action btn-behance" @click.stop>
                View on Behance ↗
              </a>
            </div>
          </div>
        </div>
        
        <div class="item-info">
          <span class="item-category">{{ cmsItem.category }}</span>
          <h3 class="item-name" @click="openDetailModal(cmsItem)" style="cursor: pointer;">{{ cmsItem.name }}</h3>
          <p class="item-price">¥{{ cmsItem.price.toLocaleString() }}</p>
          <p class="item-desc">{{ cmsItem.description }}</p>
        </div>
      </div>
    </section>

    <!-- 商品詳細モーダル（猫レビュー付き） -->
    <transition name="fade">
      <div v-if="isDetailModalOpen && selectedProduct" class="product-detail-overlay" @click.self="closeDetailModal">
        <div class="product-detail-modal">
          
          <button class="btn-detail-close" @click="closeDetailModal">✕</button>

          <div class="detail-container">
            <div class="detail-media">
              <div class="detail-image-wrapper">
                <img :src="selectedProduct.image" :alt="selectedProduct.name" class="detail-main-image" />
              </div>
            </div>

            <div class="detail-content-scroll">
              <span class="detail-category">{{ selectedProduct.category }}</span>
              <h2 class="detail-title">{{ selectedProduct.name }}</h2>
              <p class="detail-price" v-if="!selectedProduct.isApp">¥{{ selectedProduct.price.toLocaleString() }}</p>
              
              <p class="detail-desc-main">{{ selectedProduct.description }}</p>

              <div class="specs-box" v-if="!selectedProduct.isApp">
                <div class="spec-row">
                  <span class="spec-label">Size</span>
                  <span class="spec-value">{{ selectedProduct.size || 'Standard' }}</span>
                </div>
                <div class="spec-row">
                  <span class="spec-label">Material</span>
                  <span class="spec-value">{{ selectedProduct.material || 'Premium' }}</span>
                </div>
                <div class="spec-row">
                  <span class="spec-label">Edition</span>
                  <span class="spec-value">RVE-2026-ARCHIVE</span>
                </div>
              </div>

              <!-- 詳細画面の中でも、もちろんAdd to CartやBehanceジャンプが完璧に作動します -->
              <div class="detail-actions">
                <button v-if="!selectedProduct.isApp" class="btn-detail-add" @click="addToCart(selectedProduct, true)">
                 Add to Cart
                </button>
  
                <a v-if="selectedProduct.url" :href="selectedProduct.url" target="_blank" rel="noopener" class="btn-detail-behance">
                View on Behance Portfolio ↗
                 </a>
                <a v-if="selectedProduct.isApp" :href="selectedProduct.link" target="_blank" rel="noopener" class="btn-detail-add" style="text-align: center; text-decoration: none;">
                  Open App ↗
                </a>
              </div>

              <hr class="detail-divider" v-if="selectedProduct.reviews && selectedProduct.reviews.length" />

              <!-- レビューエリア -->
              <div class="reviews-section" v-if="selectedProduct.reviews && selectedProduct.reviews.length">
                <h3 class="reviews-heading">Customer Reviews ({{ selectedProduct.reviews.length }})</h3>
                <p class="review-notice" style="font-size: 0.75rem; color: #999; margin-bottom: 15px;">
                  ※デモ展示のため、一般のお客様によるレビューの新規投稿は制限されています。
                </p>
                
                <div class="reviews-list">
                  <div v-for="review in selectedProduct.reviews" :key="review.id" class="review-card">
                    <div class="review-header">
                      <span class="review-avatar">{{ review.avatar }}</span>
                      <div class="review-meta">
                        <span class="review-author">{{ review.name }}</span>
                        <div class="review-stars">
                          <span v-for="n in review.rating" :key="n">★</span>
                          <span v-for="n in (5 - review.rating)" :key="n" class="star-empty">☆</span>
                        </div>
                      </div>
                    </div>
                    <p class="review-comment">{{ review.comment }}</p>
                  </div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </transition>

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
/* --- カートドロワーの背景（黒い半透明の膜） --- */
.cart-drawer-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(4px);
  z-index: 1000;
  display: flex;
  justify-content: flex-end; /* 💡 これでドロワーを画面の「右端」にピッタリ寄せます */
}

/* --- カートドロワー本体（右側から出る白い板） --- */
.cart-drawer {
  width: 100%;
  max-width: 400px; /* 今まで通りのスタイリッシュな横幅 */
  background: white;
  height: 100vh;    /* 💡 高さを画面ぴったりに固定 */
  padding: 40px;
  display: flex;
  flex-direction: column; /* 中身（ヘッダー、リスト、フッター）を縦に並べる */
  box-shadow: -10px 0 30px rgba(0,0,0,0.1);
  position: relative;
}

/* --- 【ここが肝】アイテムが増えたら、このリスト内だけが綺麗に上下スクロールする --- */
.cart-items-list {
  flex: 1;            /* 💡 ヘッダーとフッター以外の残りの縦スペースをめいっぱい使う */
  overflow-y: auto;   /* 💡 アイテムが溢れたら、ここだけをスルスルと上下スクロールさせる */
  padding-right: 10px; /* スクロールバーと「削除」ボタンが被らないための余白 */
  margin-bottom: 20px;
}

/* --- 下部の合計金額・ボタンエリア（常に右下に固定される） --- */
.drawer-footer {
  margin-top: auto;   /* リストが短くても、常に一番下にドッキングさせる */
  padding-top: 20px;
  background: white;  /* スクロールしたアイテムが裏に回り込んでも透けないように */
  border-top: 1px solid #f0f0f0;
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

/* --- ホバーオーバーレイと2ボタンのスタイル --- */
.item-overlay {
  position: absolute;
  inset: 0;
  background: rgba(255, 255, 255, 0.4); /* 背景をほんのり白くボカす */
  backdrop-filter: blur(6px);
  display: flex;
  flex-direction: column;    /* 中身を縦並びに */
  align-items: center;       /* 縦並びにした中身を「横方向の中央」に揃える */
  justify-content: center;    /* 縦並びにした中身を「縦方向の中央」に揃える */
  
  opacity: 0;
  transition: opacity 0.3s cubic-bezier(0.165, 0.84, 0.44, 1);
  padding: 20px;
  box-sizing: border-box;    /* パディングが外にはみ出してズレるのを防ぐ */
}

.item-card:hover .item-overlay {
  opacity: 1;
}

/* ボタンを中央に綺麗に並べるコンテナも中央寄せを保証 */
.overlay-button-group {
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 85%;
  margin: 0 auto;            /* 💡 念のため外側のマージンでも中央寄せを担保 */
}

/* 共通のボタンベース */
.btn-overlay-action, .btn-overlay-single {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 12px 16px;
  border-radius: 30px;
  font-weight: 700;
  font-size: 0.8rem;
  text-align: center;
  cursor: pointer;
  transition: all 0.2s ease;
  border: none;
}

/* カートに入れるボタン（引き締まった黒） */
.btn-overlay-action.btn-add, .btn-overlay-single {
  background: #1a1a1a;
  color: #fff;
}

.btn-overlay-action.btn-add:hover, .btn-overlay-single:hover {
  background: #333;
  transform: translateY(-2px);
}

/* Behanceリンクボタン（背景白、シャドウ付きのスタイリッシュ枠線） */
.btn-overlay-action.btn-behance {
  background: #ffffff;
  color: #1a1a1a;
  border: 1px solid #e0e0e0;
  text-decoration: none;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
}

.btn-overlay-action.btn-behance:hover {
  background: #f9f9f9;
  border-color: #1a1a1a;
  transform: translateY(-2px);
}

/* 商品名のホバー時にアンダーラインを出す演出 */
.item-name:hover {
  text-decoration: underline;
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

/* --- 商品詳細モーダルのスタイル --- */
.product-detail-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(12px);
  z-index: 1500;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
}

.product-detail-modal {
  background: #ffffff;
  width: 100%;
  max-width: 1000px;
  height: 90vh;
  border-radius: 24px;
  position: relative;
  overflow: hidden;
  box-shadow: 0 30px 60px rgba(0, 0, 0, 0.2);
}

/* 右上の閉じるボタン */
.btn-detail-close {
  position: absolute;
  top: 24px;
  right: 24px;
  background: #f5f5f5;
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  font-size: 1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
  transition: all 0.2s ease;
}
.btn-detail-close:hover {
  background: #1a1a1a;
  color: #fff;
}

/* コンテナレイアウト */
.detail-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  height: 100%;
}

/* 左側：固定画像エリア */
.detail-media {
  background: #f9f9f9;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px;
  border-right: 1px solid #f0f0f0;
}
.detail-image-wrapper {
  width: 100%;
  aspect-ratio: 1 / 1;
  display: flex;
  align-items: center;
  justify-content: center;
}
.detail-main-image {
  max-width: 90%;
  max-height: 90%;
  object-fit: contain;
}

/* 右側：スクロール情報エリア */
.detail-content-scroll {
  padding: 50px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
}

.detail-category {
  font-size: 0.75rem;
  color: #999;
  text-transform: uppercase;
  letter-spacing: 0.15em;
  font-weight: 700;
}
.detail-title {
  font-size: 2rem;
  font-weight: 800;
  color: #1a1a1a;
  margin: 8px 0 12px;
  letter-spacing: -0.02em;
}
.detail-price {
  font-size: 1.3rem;
  font-weight: 600;
  color: #333;
  margin-bottom: 24px;
}
.detail-desc-main {
  font-size: 0.95rem;
  color: #555;
  line-height: 1.7;
  margin-bottom: 30px;
}

/* 📐 スペックボックス */
.specs-box {
  background: #f9f9f9;
  border-radius: 12px;
  padding: 16px 20px;
  margin-bottom: 30px;
}
.spec-row {
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
  font-size: 0.85rem;
}
.spec-row:not(:last-child) {
  border-bottom: 1px solid #eee;
}
.spec-label {
  color: #888;
  font-weight: 500;
}
.spec-value {
  color: #1a1a1a;
  font-weight: 700;
}

/* 🛒 モーダル内アクションボタン */
.detail-actions {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 40px;
}
.btn-detail-add {
  background: #1a1a1a;
  color: white;
  padding: 16px;
  border: none;
  border-radius: 30px;
  font-weight: 700;
  font-size: 0.9rem;
  cursor: pointer;
  transition: background 0.2s;
}
.btn-detail-add:hover {
  background: #333;
}
.btn-detail-behance {
  background: #fff;
  color: #1a1a1a;
  border: 1px solid #1a1a1a;
  padding: 15px;
  border-radius: 30px;
  font-weight: 700;
  font-size: 0.9rem;
  text-align: center;
  text-decoration: none;
  transition: all 0.2s;
}
.btn-detail-behance:hover {
  background: #f5f5f5;
}

.detail-divider {
  border: none;
  border-top: 1px solid #eee;
  margin-bottom: 35px;
}

/* 🐈 レビューセクション */
.reviews-heading {
  font-size: 1.1rem;
  font-weight: 800;
  margin-bottom: 20px;
  color: #1a1a1a;
}
.reviews-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
.review-card {
  border-bottom: 1px solid #f5f5f5;
  padding-bottom: 20px;
}
.review-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 10px;
}
.review-avatar {
  font-size: 1.5rem;
  background: #f5f5f5;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.review-meta {
  display: flex;
  flex-direction: column;
}
.review-author {
  font-size: 0.85rem;
  font-weight: 700;
  color: #1a1a1a;
}
.review-stars {
  color: #1a1a1a;
  font-size: 0.75rem;
  display: flex;
  gap: 2px;
}
.star-empty {
  color: #ddd;
}
.review-comment {
  font-size: 0.85rem;
  color: #555;
  line-height: 1.6;
}

/* レスポンシブ */
@media (max-width: 768px) {
  .detail-container {
    grid-template-columns: 1fr;
  }
  .product-detail-modal {
    height: 95vh;
  }
  .detail-media {
    padding: 20px;
    height: 250px;
  }
  .detail-content-scroll {
    padding: 24px;
  }
}

/* --- 📦 チェックアウトモーダル内のフォーム装飾 --- */
.checkout-step-view {
  text-align: left; /* 入力画面は左寄せが綺麗 */
}

.checkout-intro {
  font-size: 0.9rem;
  color: #666;
  margin-bottom: 24px;
}

/* 自動入力ボタン */
.demo-autofill-zone {
  margin-bottom: 24px;
}
.btn-autofill {
  background: #f5f5f5;
  border: 1px dashed #1a1a1a;
  color: #1a1a1a;
  padding: 10px 16px;
  border-radius: 6px;
  font-size: 0.8rem;
  font-weight: 700;
  cursor: pointer;
  width: 100%;
  transition: all 0.2s ease;
}
.btn-autofill:hover {
  background: #1a1a1a;
  color: #fff;
}

/* フォームグループ */
.checkout-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.form-group label {
  font-size: 0.8rem;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: #1a1a1a;
}

.form-group input[type="text"] {
  width: 100%;
  padding: 12px 16px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  font-size: 0.95rem;
  background: #fefefe;
  transition: border-color 0.2s ease;
}

.form-group input[type="text"]:focus {
  outline: none;
  border-color: #1a1a1a;
}

/* 配送方法のラジオボタン（スタイリッシュなカード型） */
.shipping-options {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.shipping-radio {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  padding: 14px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.shipping-radio:has(input:checked) {
  border-color: #1a1a1a;
  background: #f9f9f9;
}

.shipping-radio input[type="radio"] {
  margin-top: 4px;
  accent-color: #1a1a1a; /* ラジオボタンのポチを黒にする */
}

.radio-text {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.option-title {
  font-size: 0.85rem;
  font-weight: 700;
  color: #1a1a1a;
}

.option-sub {
  font-size: 0.75rem;
  color: #777;
}

/* チェックアウトの金額サマリー */
.checkout-summary {
  background: #f5f5f5;
  border-radius: 8px;
  padding: 16px;
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.summary-row {
  display: flex;
  justify-content: space-between;
  font-size: 0.85rem;
  color: #666;
}

.summary-row.total {
  font-size: 1.05rem;
  font-weight: 800;
  color: #1a1a1a;
  border-top: 1px dashed #ddd;
  padding-top: 10px;
}

/* 確定ボタン */
.btn-order-submit {
  width: 100%;
  padding: 16px;
  background: #1a1a1a;
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 700;
  font-size: 0.95rem;
  cursor: pointer;
  transition: opacity 0.2s;
}

.btn-order-submit:hover {
  opacity: 0.9;
}

/* 種明かし画面のBehanceリンクボタン */
.btn-to-archive {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 16px;
  background: #1a1a1a;
  color: white;
  text-decoration: none;
  border-radius: 8px;
  font-weight: 700;
  font-size: 0.95rem;
  transition: opacity 0.2s;
}
.btn-to-archive:hover {
  opacity: 0.9;
}

/* モーダルの全体コンテナサイズ調整（フォームが入るので少し縦長に対応） */
.demo-modal-container {
  background: white;
  width: 100%;
  max-width: 500px;
  max-height: 85vh;
  border-radius: 20px;
  padding: 40px;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
  overflow-y: auto; /* フォームがはみ出さないようにスクロール可能に */
}

/* 割引行のスタイル（少しだけ文字を細く、ネガティブマージンや色でメリハリを） */
.discount-row {
  color: #10b981; /* クリーンな印象のグリーン（モノトーンに徹するなら #666 や #000 でも映えます） */
  font-weight: 600;
  font-size: 0.9rem;
}

/* ラジオボタンが選択しやすくなるよう、一応ポインタを設定 */
.shipping-radio {
  cursor: pointer;
}
</style>