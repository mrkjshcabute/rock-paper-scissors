<script setup>
 
</script>

<template>
  <div class="bg-blue-100">
    <router-link to="/"></router-link>
    <router-link to="/main"></router-link>
  </div>
  <transition name="fade">
    <router-view />
  </transition>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
