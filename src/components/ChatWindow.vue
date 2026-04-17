<script setup>
import { ref, onMounted, computed } from 'vue'; // computedを追加
import { chatAd } from '@/data/chat-ad.js'; // 広告データをインポート

const isOpen = ref(false);
const messages = ref([]);
const showOptions = ref(false);

// 現在表示する広告のIDを管理 (デフォルトは 1: 食品アプリ)
const currentAdId = ref(1);

// 現在の広告オブジェクトを計算
const currentAd = computed(() => {
  return chatAd.find(ad => ad.id === currentAdId.value) || chatAd[0];
});

// 初期メッセージの送信
const startChat = () => {
  messages.value = [];
  // チャットを開き直したときは広告をデフォルトに戻す設定にしてもOK
  currentAdId.value = 1; 
  addMessage('bot', 'こんにちは！RutenVeilへようこそ。何かお手伝いしましょうか？');
  setTimeout(() => {
    showOptions.value = true;
  }, 800);
};

const addMessage = (sender, text, links = []) => {
  messages.value.push({ sender, text, links });
};

const handleOption = (option) => {
  showOptions.value = false;
  addMessage('user', option.label);

  setTimeout(() => {
    if (option.value === 'works') {
      currentAdId.value = 1; // 実績の時はデフォルト広告
      addMessage('bot', '制作実績ですね。アプリ開発とグラフィックデザイン、どちらをご覧になりますか？', [
        { name: 'Apps (アプリ開発)', path: '/Apps' },
        { name: 'Art Projects (デザイン)', path: '/' }
      ]);
    } else if (option.value === 'cats') {
      // ここで猫の広告(ID: 2)に切り替え！
      currentAdId.value = 2;
      addMessage('bot', 'わが家には5匹の猫がいます。彼らとの日常がデザインのインスピレーションの源なんです（笑）');
    } else if (option.value === 'contact') {
      currentAdId.value = 1;
      addMessage('bot', 'ご相談ありがとうございます！Contactページからメッセージをいただければ、すぐにお返事いたします。', [
        { name: 'Contact ➔', path: '/Contact' }
      ]);
    }
    
    setTimeout(() => { showOptions.value = true; }, 1000);
  }, 800);
};

const toggleChat = () => {
  isOpen.value = !isOpen.value;
  if (isOpen.value && messages.value.length === 0) {
    startChat();
  }
};
</script>

<template>
  <div class="chat-container" :class="{ 'is-open': isOpen }">
    <div v-if="isOpen" class="chat-window">
      <div class="chat-header">
        <span class="bot-name">RutenVeil Assistant</span>
        <button @click="toggleChat" class="close-btn">✕</button>
      </div>

      <div class="chat-body" ref="chatBody">
        <div v-for="(msg, idx) in messages" :key="idx" :class="['msg-bubble', msg.sender]">
          {{ msg.text }}
          <div v-if="msg.links && msg.links.length > 0" class="msg-link-wrapper">
            <router-link 
              v-for="link in msg.links" 
              :key="link.path"
              :to="link.path" 
              class="chat-inline-link" 
              @click="toggleChat"
            >
              {{ link.name }}
            </router-link>
          </div>
        </div>
        
        <div v-if="showOptions" class="options-container">
          <button @click="handleOption({label: '実績を見たい', value: 'works'})">実績を見たい</button>
          <button @click="handleOption({label: '猫について', value: 'cats'})">猫について</button>
          <button @click="handleOption({label: '仕事の相談', value: 'contact'})">仕事の相談</button>
        </div>
      </div>

      <div class="chat-ad-footer">
        <transition name="fade-ad" mode="out-in">
          <img 
            :key="currentAd.id" 
            :src="currentAd.image" 
            :alt="currentAd.name" 
            class="ad-banner"
          />
        </transition>
      </div>
    </div>

    <button class="chat-trigger" @click="toggleChat">
      <span v-if="!isOpen">💬</span>
      <span v-else>✕</span>
    </button>
  </div>
</template>

<style scoped>
.chat-container {
  position: fixed;
  bottom: 30px;
  right: 30px;
  z-index: 3000;
  font-family: sans-serif;
}

.chat-trigger {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: #1a1a1a;
  color: white;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  box-shadow: 0 10px 30px rgba(0,0,0,0.2);
  transition: transform 0.3s;
}

.chat-trigger:hover { transform: scale(1.1); }

.chat-window {
  width: 320px;
  height: 450px;
  background: white;
  border-radius: 20px;
  box-shadow: 0 15px 50px rgba(0,0,0,0.15);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  margin-bottom: 15px;
  animation: slideIn 0.3s ease-out;
}

.chat-header {
  background: #1a1a1a;
  color: white;
  padding: 15px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.bot-name { font-weight: 700; font-size: 0.9rem; }

.chat-body {
  flex: 1;
  padding: 20px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.msg-bubble {
  max-width: 85%;
  padding: 10px 15px;
  border-radius: 15px;
  font-size: 0.85rem;
  line-height: 1.4;
}

.msg-bubble.bot {
  background: #f0f0f0;
  color: #333;
  align-self: flex-start;
  border-bottom-left-radius: 2px;
}

.msg-bubble.user {
  background: #1a1a1a;
  color: white;
  align-self: flex-end;
  border-bottom-right-radius: 2px;
}

.options-container {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 10px;
}

.options-container button {
  background: white;
  border: 1px solid #1a1a1a;
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 0.75rem;
  cursor: pointer;
  transition: all 0.2s;
}

.options-container button:hover {
  background: #1a1a1a;
  color: white;
}

/* 吹き出し内のリンクスタイル */
.msg-link-wrapper {
  margin-top: 10px;
  display: flex;
  flex-wrap: wrap; /* ボタンが長い時に折り返せるように */
  gap: 8px;
}

.chat-inline-link {
  display: inline-block;
  background: #1a1a1a;
  color: white;
  padding: 6px 14px;
  border-radius: 8px;
  text-decoration: none;
  font-size: 0.75rem; /* 少し小さくして並びやすく */
  font-weight: 600;
  transition: all 0.2s ease;
  border: 1px solid #1a1a1a;
}

.chat-inline-link:hover {
  background: white;
  color: #1a1a1a;
}

/* botの吹き出しの中にあるときは白黒反転させてもオシャレです */
.msg-bubble.bot .chat-inline-link {
  background: #1a1a1a;
  color: #fff;
}

/* 広告 */
/* 広告エリアのコンテナ：高さを固定して、はみ出さないように制御 */
.chat-ad-footer {
  width: 100%;
  /* 高さは今のままでOK（120pxくらいかな？） */
  height: 120px; 
  padding: 10px 15px;
  background: white;
  border-top: 1px solid #f0f0f0;
  box-sizing: border-box;
}

/* 広告画像自体の制御 */
.ad-banner {
  width: 100%;
  height: 100%;
  object-fit: contain; /* アスペクト比を維持して枠内に収める */
  border-radius: 8px;
  cursor: pointer;
  display: block;
}

/* フェードアニメーションをスムーズに */
.fade-ad-enter-active,
.fade-ad-leave-active {
  transition: opacity 0.3s ease;
}

.fade-ad-enter-from,
.fade-ad-leave-to {
  opacity: 0;
}

@keyframes slideIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

@media (max-width: 768px) {
  .chat-container { right: 20px; bottom: 20px; }
  .chat-window { width: calc(100vw - 40px); height: 400px; }
}
</style>