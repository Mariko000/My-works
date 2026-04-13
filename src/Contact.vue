<template>
    <section class="contact">
      <div class="contact-inner">
        <h2 class="contact-title">Contact</h2>
        <p class="contact-lead">制作のご相談などお気軽にご連絡ください。</p>
  
        <form class="contact-form" @submit.prevent="sendEmail">
          <div class="form-row">
            <input v-model="name" type="text" placeholder="お名前" required />
            <input v-model="email" type="email" placeholder="メールアドレス" required />
          </div>
  
          <textarea
            v-model="message"
            placeholder="お問い合わせ内容"
            rows="6"
            required
          ></textarea>
  
          <button type="submit">送信する</button>
        </form>
      </div>
    </section>
  </template>
  
  <script setup>
  import { ref } from "vue";
  import emailjs from "@emailjs/browser";
  
  const name = ref("");
  const email = ref("");
  const message = ref("");
  
  const sendEmail = () => {
    const templateParams = {
      from_name: name.value,
      reply_to: email.value,
      message: message.value
    };
  
    emailjs.send(
  import.meta.env.VITE_EMAILJS_SERVICE,
  import.meta.env.VITE_EMAILJS_TEMPLATE,
  templateParams,
  import.meta.env.VITE_EMAILJS_PUBLIC
)
    .then(() => {
      alert("送信しました！");
      name.value = "";
      email.value = "";
      message.value = "";
    })
    .catch((error) => {
      alert("送信失敗");
      console.error(error);
    });
  };
  </script>
  
  <style scoped>
  .contact {
    padding: 80px 20px;
  }
  
  .contact-inner {
    max-width: 720px;
    margin: 0 auto;
  }
  
  .contact-title {
    font-size: 28px;
    font-weight: 500;
    margin-bottom: 8px;
    letter-spacing: 0.05em;
  }
  
  .contact-lead {
    color: #666;
    margin-bottom: 32px;
    font-size: 14px;
  }
  
  .contact-form {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
  
  .form-row {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
  
  input,
  textarea {
    width: 100%;
    padding: 14px 16px;
    border: 1px solid #ddd;
    border-radius: 6px;
    font-size: 14px;
    transition: 0.2s;
    background: #fff;
  }
  
  input:focus,
  textarea:focus {
    outline: none;
    border-color: #000;
  }
  
  textarea {
    resize: vertical;
  }
  
  button {
    align-self: flex-end;
    padding: 12px 28px;
    background: #111;
    color: #fff;
    border: none;
    border-radius: 999px;
    font-size: 14px;
    cursor: pointer;
    transition: 0.25s;
  }
  
  button:hover {
    background: #333;
  }
  
  @media (max-width: 640px) {
    .form-row {
      grid-template-columns: 1fr;
    }
  }
  </style>