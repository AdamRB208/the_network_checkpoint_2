<script setup>
import { AppState } from '@/AppState.js';
import PostCard from '@/components/PostCard.vue';
import { profileService } from '@/services/ProfileService.js';
import { logger } from '@/utils/Logger.js';
import { Pop } from '@/utils/Pop.js';
import { computed, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';


const route = useRoute()

const profile = computed(() => AppState.profile)

const account = computed(() => AppState.account)

const posts = computed(() => AppState.profilePosts)

onMounted(() => {
  getProfileById()
  getPostsByProfileId()
})

watch(route, () => {
  getProfileById()
  getPostsByProfileId()
})


async function getProfileById() {
  try {
    await profileService.getProfileById(route.params.profileId)
  }
  catch (error) {
    Pop.error(error, 'Could not get profile by ID');
    logger.log('COULD NOT GET PROFILE BY ID', error)
  }
}

async function getPostsByProfileId() {
  try {
    await profileService.getPostsByProfileId(route.params.profileId)
  }
  catch (error) {
    Pop.error(error, 'Could not get posts by profile Id');
    logger.log('COULD NOT GET POSTS BY PROFILE ID', error)
  }
}
</script>


<template>
  <section class="container">
    <div class="row justify-content-center">
      <div v-if="profile" class="col-md-8 mt-3 border border-3 rounded-3 p-0 profile-card shadow">
        <img :src="profile.coverImg" :alt="`${profile.name}'s cover image`" class="rounded-top-3 cover-img">
        <div>
          <span class="d-flex align-items-center flex-row-reverse mt-2 me-3">
            <a :href="profile.github"><i class="mdi mdi-github fs-3"></i></a>
            <a :href="profile.linkedin"><i class="mdi mdi-linkedin fs-3"></i></a>
            <a :href="profile.resume"><i class="mdi mdi-file-account fs-3"></i></a>
          </span>
          <div class="d-flex align-items-center">
            <img
              :src="profile.picture || 'https://em-content.zobj.net/source/apple/419/man-facepalming_1f926-200d-2642-fe0f.png'"
              :alt="`profile picture for ${profile.name}`" class="profile-img border border-3">
            <span class="ms-3 fs-3">{{ profile.name }}</span>
          </div>
          <div class="ms-4 mt-2">
            <small>{{ profile.class }}</small>
          </div>
          <div>
            <h5 class="m-3">{{ profile.bio }}</h5>
          </div>
          <div v-if="profile?.id == account?.id && account" class="d-flex flex-row-reverse me-3 mb-3">
            <button class="btn btn-outline-networkdark" type="button">edit</button>
          </div>
        </div>
      </div>
      <div v-for="Post in posts" :key="Post.id" class="col-md-8">
        <PostCard :postProp="Post" />
      </div>
    </div>
  </section>
</template>


<style lang="scss" scoped>
.cover-img {
  width: 100%;
  max-height: 40dvh;
  object-fit: cover;
}

.border {
  --bs-border-color: rgb(96, 96, 97);
}

.profile-card {
  border-color: rgb(96, 96, 97);
}

.profile-img:not(.cover-img) {
  height: 7em;
  aspect-ratio: 1/1;
  border-radius: 50%;
  margin-left: 1em;
  border-color: rgb(96, 96, 97);
  ;
}

span {
  color: rgb(96, 96, 97);
}

i {
  color: rgb(96, 96, 97);
}

small {
  color: rgb(96, 96, 97);
}

h5 {
  color: rgb(96, 96, 97);
}

button {
  color: rgb(96, 96, 97);
}
</style>