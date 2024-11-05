<template>
  <main class="temp1">
    
    <div class="flex upperLayer">
      <img class="rainbow" src="public/menuPics/rainbow.png" alt="">
      <div class="flex menu">
        <img class="dog" src="public/menuPics/merzkiyDog.png" alt="">
        <div class="flex login-container">
          <div class="title-container">
            <h1 class="login-title">Welcome Back</h1>
            <h2 class="sub-title">To Your Pet</h2>
          </div>
          <div class="login-card">
            <div class="flex input-group">
              <div class="input-field">
                <label class="input-label">Pet Name</label>
                <input v-model="login" type="text" class="input-box" />
              </div>
              <div class="input-field">
                <label class="input-label">Password</label>
                <input v-model="pass" type="password" class="input-box" autocomplete="on"/>
              </div>
            </div>
            <button @click="btnClickEnter" class="btn enter-button">Enter</button>
            <p class="signup-prompt">Don’t have a pet yet?</p>
            <button  @click="btnClickCreate" class="btn create-button">Create</button>
          </div >
        </div>
        <img class="cat" src="public/menuPics/cringoviyCat.png" alt="">
      </div>
      <img class="star" src="public/menuPics/star.png" alt="">
    </div>
  </main>

</template>
<script setup lang="ts">
import { ref } from 'vue';
const route = useRoute()
const pass = defineModel("pass")
const login = defineModel("login")

onMounted(()=>{
  document.body.className = ''
})


const btnClickCreate = () =>{
  navigateTo('/creator')
}
const btnClickEnter = () =>{
  // let isReal = logsPasw.find(e=>e.login === login.value && e.pass === pass.value)
  // if(isReal){
    navigateTo('/pethouse')
  // }else{
  //   console.log('error')
  // }
}

const logsPasw = [
  {login:'damn', pass:'123'}
]
</script>
<style>
</style>



