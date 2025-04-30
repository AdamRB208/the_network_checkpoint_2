<script setup>
import { postsService } from '@/services/PostsService.js';
import { logger } from '@/utils/Logger.js';
import { Pop } from '@/utils/Pop.js';
import { ref } from 'vue';

const editablePostSearch = ref('')

const editableProfileSearch = ref('')

async function searchPosts() {
  try {
    logger.log('searching for', editablePostSearch.value)
    await postsService.searchPosts(editablePostSearch.value)
    editablePostSearch.value = ''
  }
  catch (error) {
    Pop.error(error, 'Could not search posts');
    logger.log('COULD NOT SEARCH POSTS', error)
  }
}

</script>


<template>
  <form @submit.prevent="searchPosts()">
    <div>
      <div class="mb-3">
        <label for="post">Search Posts</label>
        <input v-model="editablePostSearch" type="text" name="postData" id="postData" maxlength="100">
      </div>
      <div class="mb-3">
        <button class="btn btn-networkgrey" type="submit">Submit</button>
      </div>
    </div>
  </form>
  <form>
    <div class="mb-3">
      <label for="profile">Search Profiles</label>
      <input v-model="editableProfileSearch" type="text" name="profileData" id="profileData" maxlength="100">
    </div>
    <div class="mb-3">
      <button class="btn btn-networkgrey" type="submit">Submit</button>
    </div>
  </form>
</template>


<style lang="scss" scoped></style>