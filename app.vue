<template>
  <!-- <nav>
    <NuxtLink to="/">home </NuxtLink>
    <NuxtLink to="/about"> about</NuxtLink>
  </nav> -->
  <div>
    <!-- <NuxtLayout> -->
      <NuxtPage />
    <!-- </NuxtLayout> -->
  </div>
</template>

<script setup lang="ts">
const router = useRoute()

const setbg = (path:string)=>{
  if (path=='/') {
    document.body.className = ''
  } else if (path=='/creator') {
    document.body.className = 'crbg'
  } else {
    document.body.className = ''
  }
}

watch(()=>router.path,(newval)=>{
  setbg(newval)
})

</script>

<style> 
@import url("~/assets/css/style.css");
@use url("~/assets/css/style.scss");
</style>