<template>
  <!-- <nav>
    <NuxtLink to="/">home </NuxtLink>
    <NuxtLink to="/about"> about</NuxtLink>
  </nav> -->
  <!-- <NuxtLayout> -->
  <NuxtPage />
  <!-- </NuxtLayout> -->
</template>

<script setup lang="ts">

const setbg = (path:string)=>{
  console.log(path)
  if (path=='/') {
  } else if (path=='/creator') {
    document.body.className = 'crbg'
  } else if(path=='/pethouse'){
    document.body.className = 'pthsbg'
  }
}

</script>

<style> 
@import url("~/assets/css/style.css");
@use url("~/assets/css/style.scss");
</style>