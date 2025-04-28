<script setup>
import { AppState } from '@/AppState.js';
import PostCard from '@/components/PostCard.vue';
import { postsService } from '@/services/PostsService.js';
import { logger } from '@/utils/Logger.js';
import { Pop } from '@/utils/Pop.js';
import { computed, onMounted } from 'vue';

const posts = computed(() => AppState.post)


onMounted(() => {
  getPosts()
})


async function getPosts() {
  try {
    await postsService.getPosts()
  }
  catch (error) {
    Pop.error(error, 'could not get posts');
    logger.log('COULD NOT GET POSTS', error)
  }
}

</script>

<template>
  <section class="container">
    <div class="row justify-content-center">
      <div class="col-12">
        <h2 class="d-flex justify-content-center m-2">Posts</h2>
      </div>
    </div>
    <div class="row justify-content-center">
      <div v-for="Post in posts" :key="Post.id" class="col-md-8">
        <PostCard :postProp="Post" />
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
h2 {
  color: rgb(134, 134, 135);
}
</style>
