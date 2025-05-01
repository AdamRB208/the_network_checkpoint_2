<script setup>
import { AppState } from '@/AppState.js';
import AdsCard from '@/components/AdsCard.vue';
import PostCard from '@/components/PostCard.vue';
import PostForm from '@/components/PostForm.vue';
import { adsService } from '@/services/AdsService.js';
import { postsService } from '@/services/PostsService.js';
import { logger } from '@/utils/Logger.js';
import { Pop } from '@/utils/Pop.js';
import { computed, onMounted } from 'vue';

const posts = computed(() => AppState.post)

const currentPage = computed(() => AppState.currentPage)

const account = computed(() => AppState.account)

const ad = computed(() => AppState.ad)

onMounted(() => {
  getPosts()
  getAds()
})



async function getAds() {
  try {
    await adsService.getAds()
  }
  catch (error) {
    Pop.error(error, 'Could not get adds');
    logger.log('COULD NOT GET ADDS', error)
  }
}

async function getPosts() {
  try {
    await postsService.getPosts()
  }
  catch (error) {
    Pop.error(error, 'could not get posts');
    logger.log('COULD NOT GET POSTS', error)
  }
}

async function getNextPage(pageNumber) {
  try {
    await postsService.getNextPage(pageNumber)
  }
  catch (error) {
    Pop.error(error, 'could not get next page');
    logger.log('COULD NOT GET NEXT PAGE', error)
  }
}

</script>

<template>
  <section class="container-fluid">
    <div class="row justify-content-start ms-5">
      <div class="col-md-8">
        <PostForm v-if="account" />
      </div>
    </div>
  </section>
  <section class="container-fluid d-flex justify-content-between">
    <div class="row col-md-8 w-75 ms-5">
      <div v-for="Post in posts" :key="Post.id" class="col-md-8 w-100">
        <PostCard :postProp="Post" />
      </div>
    </div>
    <div class="row col-md-2 d-block ">
      <div v-for="Ad in ad" :key="Ad.id" class="col-md-2 w-100 ads-card">
        <AdsCard :adProp="Ad" />
      </div>
    </div>
  </section>
  <section class="container-fluid">
    <div class="row justify-content-center">
      <button :disabled="currentPage == 1" @click="getNextPage(currentPage - 1)"
        class="col-md-2 btn btn-outline-networkgrey mb-2">Previous</button>
      <div class="col-md-2 text-center align-items-center mb-2">Page {{ currentPage }}</div>
      <button :disabled="currentPage == 11" @click="getNextPage(currentPage + 1)"
        class="col-md-2 btn btn-outline-networkgrey mb-2">Next</button>
    </div>
  </section>
</template>

<style scoped lang="scss">
button:not(.post-btn) {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
