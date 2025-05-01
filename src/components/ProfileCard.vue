<script setup>
import { Profile } from '@/models/Profile.js'
import { profileService } from '@/services/ProfileService.js'
import { logger } from '@/utils/Logger.js'
import { Pop } from '@/utils/Pop.js'



defineProps({
  profileProp: { type: Profile, required: true }
})


async function getNextProfilePage(pageNumber) {
  try {
    await profileService.getNextProfilePage(pageNumber)
  }
  catch (error) {
    Pop.error(error, 'could not get next page');
    logger.log('COULD NOT GET NEXT PAGE', error)
  }
}

</script>


<template>
  <div class="mt-3 border border-3 rounded-3 p-0 profile-card shadow">
    <img :src="profileProp.coverImg" :alt="`${profileProp.name}'s cover image`" class="rounded-top-3 cover-img">
    <div>
      <span class="d-flex align-items-center flex-row-reverse mt-2 me-3">
        <a :href="profileProp.github"><i class="mdi mdi-github fs-3"></i></a>
        <a :href="profileProp.linkedin"><i class="mdi mdi-linkedin fs-3"></i></a>
        <a :href="profileProp.resume"><i class="mdi mdi-file-account fs-3"></i></a>
      </span>
      <div class="d-flex align-items-center">
        <img
          :src="profileProp.picture || 'https://em-content.zobj.net/source/apple/419/man-facepalming_1f926-200d-2642-fe0f.png'"
          :alt="`profile picture for ${profileProp.name}`" class="profile-img border border-3">
        <span class="ms-3 fs-3">{{ profileProp.name }}</span>
      </div>
      <div class="ms-4 mt-2">
        <small>{{ profileProp.class }}</small>
        <span v-if="profileProp.graduated" class="mdi mdi-account-school-outline ms-2 fs-4"></span>
      </div>
      <div>
        <h5 class="m-3">{{ profileProp.bio }}</h5>
      </div>
    </div>
  </div>
  <!-- <button :disabled="currentPage == 1" @click="getNextProfilePage(currentPage - 1)"
    class="col-md-2 btn btn-outline-networkgrey mb-2">Previous</button>
  <div class="col-md-2 text-center align-items-center mb-2">Page {{ currentPage }} of {{ totalPages }}
  </div>
  <button :disabled="currentPage == totalPages" @click="getNextProfilePage(currentPage + 1)"
    class="col-md-2 btn btn-outline-networkgrey mb-2">Next</button> -->
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