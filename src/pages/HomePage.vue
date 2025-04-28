<script setup>
import { postsService } from '@/services/PostsService.js';
import { logger } from '@/utils/Logger.js';
import { Pop } from '@/utils/Pop.js';
import { onMounted } from 'vue';


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
      <div class="col-md-10">
        <div>Home Page</div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss"></style>
