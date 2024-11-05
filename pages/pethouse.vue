<template></template>
<script setup lang="ts">
import { ref } from 'vue';
const route = useRoute()

const btnClick = () => {
    navigateTo('/creator')
}
onMounted(()=>{
    document.body.className = 'pthsbg'
})


</script>
<style></style>
  
  