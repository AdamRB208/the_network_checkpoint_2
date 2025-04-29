<script setup>
import { AppState } from '@/AppState.js';
import { postsService } from '@/services/PostsService.js';
import { logger } from '@/utils/Logger.js';
import { Pop } from '@/utils/Pop.js';
import { computed, ref } from 'vue';

const account = computed(() => AppState.account)

const editablePostData = ref({
  body: '',
  imgUrl: ''
})

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
  <form @submit="createPost()" class="border border-3 border-networkgrey rounded-4 w-100 mt-5 mb-5 shadow">
    <div class="mb-2 p-3">
      <h3 class="d-flex justify-content-center">Post Something</h3>
      <label for="body" class="form-label"></label>
      <textarea v-model="editablePostData.body" class="form-control" id="body" name="body" rows="3" type="text"
        maxlength="5000" required placeholder="Post here..."></textarea>
    </div>
    <div class="mb-2 p-3">
      <label for="imgUrl" class="form-label"></label>
      <input v-model="editablePostData.imgUrl" type="url" class="form-control" id="imgUrl" name="imgUrl" maxlength="500"
        placeholder="Add an image...">
    </div>
    <div class="d-flex flex-row-reverse">
      <button class="btn btn-outline-networkdark rounded-3 shadow post-btn"><i class="mdi mdi-send-circle-outline"
          type="submit">Post</i></button>
    </div>
  </form>
</template>


<style lang="scss" scoped>
h3 {
  color: rgb(96, 96, 97);
}

form {
  background-color: rgba(3, 52, 137, 0.705);
}

.post-btn {
  margin-right: 3rem;
  margin-bottom: 1.5rem;
}
</style>