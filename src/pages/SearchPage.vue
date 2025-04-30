<script setup>
import { AppState } from '@/AppState.js';
import { computed } from 'vue';


const profile = computed(() => AppState.profile)
</script>


<template>
  <div>Search Page</div>
</template>


<style lang="scss" scoped></style>