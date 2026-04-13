import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router' 
import './registerServiceWorker'

// 1. まずアプリのインスタンスを作成して、変数「app」に入れる
const app = createApp(App)

// 2. 作成した「app」に対してルーターを適用する
app.use(router)

// 3. 最後に画面（#app）に表示させる
app.mount('#app')