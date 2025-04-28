<script setup>
import { AppState } from '@/AppState.js';
import PostCard from '@/components/PostCard.vue';
import { postsService } from '@/services/PostsService.js';
import { logger } from '@/utils/Logger.js';
import { Pop } from '@/utils/Pop.js';
import { computed, onMounted, ref } from 'vue';

const posts = computed(() => AppState.post)


onMounted(() => {
  getPosts()
})

const editablePostData = ref({
  body: '',
  imgUrl: ''
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

async function createPost() {
  try {
    const postData = editablePostData.value
    await postsService.createPost(postData)
  }
  catch (error) {
    Pop.error(error, 'could not create post');
    logger.log('COULD NOT CREATE POST', error)
  }
}

</script>

<template>
  <section class="container">
    <div class="row justify-content-center">
      <div class="col-md-8">
        <form @submit.prevent="createPost()"
          class="border border-3 border-networkgrey rounded-4 w-100 mt-5 mb-5 shadow">
          <div class="mb-2 p-3">
            <h3 class="d-flex justify-content-center">Post Something</h3>
            <label for="body" class="form-label"></label>
            <textarea v-model="editablePostData.body" class="form-control" id="body" name="body" rows="3" type="text"
              maxlength="5000" required placeholder="Post here..."></textarea>
          </div>
          <div class="mb-2 p-3">
            <label for="imgUrl" class="form-label"></label>
            <input v-model="editablePostData.imgUrl" type="url" class="form-control" id="imgUrl" name="imgUrl"
              maxlength="500" placeholder="Add an image...">
          </div>
          <div class="d-flex flex-row-reverse">
            <button class="btn btn-outline-networkdark rounded-3 shadow"><i class="mdi mdi-send-circle-outline"
                type="submit">Post</i></button>
          </div>
        </form>
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
h3 {
  color: rgb(96, 96, 97);
}

form {
  background-color: rgba(3, 52, 137, 0.705);

}

button {
  margin-right: 3rem;
  margin-bottom: 1.5rem;
  ;
}
</style>
