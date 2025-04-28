<script setup>
import { AppState } from '@/AppState.js';
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
    <div class="row">
      <div v-for="Post in posts" :key="Post.id" class="col-md-10">
        <div>{{ posts }}</div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss"></style>
