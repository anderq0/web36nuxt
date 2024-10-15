<template>
  <nav>
    <a href="/">home </a>
    <a href="/about"> about</a>
  </nav>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<style>
@import url("~/assets/css/style.css");
@use url("~/assets/css/style.scss");
</style>