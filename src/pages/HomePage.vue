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
      <div class="col-md-8 p-0">
        <div class="border border-3 border-networkgrey rounded-4 m-3 w-100 post-form">
          <div class="mb-3 p-3">
            <label for="exampleFormControlTextarea1" class="form-label">Content</label>
            <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
          </div>
          <div class="mb-3 p-3">
            <label for="exampleFormControlInput1" class="form-label">Image URL</label>
            <input type="url" class="form-control" id="exampleFormControlInput1" placeholder="image url here...">
          </div>
        </div>
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

.post-form {
  background-color: rgba(3, 52, 137, 0.705);
}
</style>
