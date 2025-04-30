<script setup>
import { AppState } from '@/AppState.js';
import PostCard from '@/components/PostCard.vue';
import SearchForm from '@/components/SearchForm.vue';
import { computed } from 'vue';

const posts = computed(() => AppState.post)

const profile = computed(() => AppState.profile)

</script>


<template>
  <section class="container">
    <div class="row justify-content-center">
      <div class="col-12 d-flex justify-content-center">
        <h2>Welcome to the search page!</h2>
      </div>
      <div class="col-md-6 d-flex justify-content-center">
        <SearchForm />
      </div>
    </div>
  </section>
  <section class="container">
    <div class="row">
      <div v-for="Post in posts" :key="Post.id" class="col-md-6">
        <PostCard :post="Post" />
      </div>
    </div>
  </section>
</template>


<style lang="scss" scoped></style>