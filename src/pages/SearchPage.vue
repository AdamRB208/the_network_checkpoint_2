<script setup>
import { AppState } from '@/AppState.js';
import PostCard from '@/components/PostCard.vue';
import ProfileCard from '@/components/ProfileCard.vue';
import SearchForm from '@/components/SearchForm.vue';
import { postsService } from '@/services/PostsService.js';
import { logger } from '@/utils/Logger.js';
import { Pop } from '@/utils/Pop.js';
import { computed } from 'vue';

const posts = computed(() => AppState.post)

const profile = computed(() => AppState.profile)

const currentPage = computed(() => AppState.currentPage)

const totalPages = computed(() => AppState.totalPages)


async function getNextSearchedPage(pageNumber) {
  try {
    await postsService.getNextSearchedPage(pageNumber)
  }
  catch (error) {
    Pop.error(error, 'could not get next page');
    logger.log('COULD NOT GET NEXT PAGE', error)
  }
}

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
    <div class="row justify-content-center">
      <div v-for="Post in posts" :key="Post.id" class="col-md-6">
        <PostCard :postProp="Post" />
      </div>
      <div v-for="Profile in profile" :key="Profile.id" class="col-md-6">
        <ProfileCard :profileProp="Profile" />
      </div>
    </div>
    <div class="row justify-content-center">
      <button :disabled="currentPage == 1" @click="getNextSearchedPage(currentPage - 1)"
        class="col-md-2 btn btn-outline-networkgrey mb-2">Previous</button>
      <div class="col-md-2 text-center align-items-center mb-2">Page {{ currentPage }} of {{ totalPages }}</div>
      <button :disabled="currentPage == totalPages" @click="getNextSearchedPage(currentPage + 1)"
        class="col-md-2 btn btn-outline-networkgrey mb-2">Next</button>
    </div>
  </section>
</template>


<style lang="scss" scoped></style>