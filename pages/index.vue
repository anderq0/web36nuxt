<template>
  <main class="temp1">
    <div class="flex upperLayer">
      <!-- картинка для компа -->
      <img v-if="!isMobile" class="rainbow" src="public/menuPics/rainbow.png" alt="">
      <div class="flex menu">
        <img v-if="!isMobile" class="dog" src="public/menuPics/merzkiyDog.png" alt="">
        <div class="flex login-container">
          <div class="title-container">
            <h1 class="login-title">Welcome Back</h1>
            <h2 class="sub-title">To Your Pet</h2>
          </div>
          <div class="login-card">
            <div class="input-group flex">
              <div class="input-field">
                <label class="input-label">Pet Name</label>
                <input v-model="login" type="text" class="input-box" />
              </div>
              <div class="input-field">
                <label class="input-label">Password</label>
                <input v-model="pass" type="password" class="input-box" autocomplete="on"/>
              </div>
            </div>
            <!-- кнопки для пк -->
            <div v-if="!isMobile">
              <button @click="btnClickEnter" class="btn enter-button">Enter</button>
              <p class="signup-prompt">Don’t have a pet yet?</p>
              <button @click="btnClickCreate" class="btn create-button">Create</button>
            </div>
            <!-- кнопки для телефонов -->
            <div v-if="isMobile">
              <button @click="btnClickEnter" class="btn enter-button-mobile">Enter</button>
              <p class="signup-prompt">Don’t have a pet yet?</p>
              <button @click="btnClickCreate" class="btn create-button-mobile">Create</button>
            </div>
          </div>
        </div>
        <img v-if="!isMobile" class="cat" src="public/menuPics/cringoviyCat.png" alt="">
      </div>
      <!-- картинки на пк -->
      <img v-if="!isMobile" class="star" src="public/menuPics/star.png" alt="">
    </div>
  </main>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';

const pass = defineModel("pass")
const login = defineModel("login")
const isMobile = ref(false);

// размер экранчика
onMounted(() => {
  isMobile.value = window.innerWidth <= 768;
});

watch(() => window.innerWidth, (newWidth) => {
  isMobile.value = newWidth <= 768;
  // console.log("isMobile after resize:", isMobile.value); 
});

useHead({
  bodyAttrs: {class:'ind'}
})

const btnClickCreate = () =>{
  navigateTo('/creator')
}

const btnClickEnter = () =>{
  let isReal = logsPasw.find(e=>e.login === login.value && e.pass === pass.value)
  if(isReal){
    navigateTo('/pethouse')
  }else{
    console.log('error')
  }
}

const logsPasw = [
  {login:'damn', pass:'123'}
]
</script>

<style>
</style>
