<script setup>
import { computed, onMounted } from 'vue';
import { AppState } from '../AppState.js';
import AccountForm from '@/components/AccountForm.vue';
import AdsCard from '@/components/AdsCard.vue';
import { adsService } from '@/services/AdsService.js';
import { Pop } from '@/utils/Pop.js';
import { logger } from '@/utils/Logger.js';

const account = computed(() => AppState.account)

const ad = computed(() => AppState.ad)

onMounted(() => {
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

</script>

<template>
  <section class="container-fluid">
    <div class="row">
      <div class="col">
        <div class="edit-btn">
          <button class="btn btn-outline-networkgrey" type="button">Edit</button>
        </div>
      </div>
    </div>
  </section>
  <section>
    <div class="row justify-content-center">
      <div class="col-md-10 about text-center border border-3 border-networkgrey rounded-4 mt-2 mb-4 shadow">
        <div v-if="account">
          <div>
            <span>
              <h1 class="m-3 text-networkgrey">Welcome {{ account.name }}</h1>
            </span>
            <img :src="account.coverImg" alt="" class="cover-img">
          </div>
          <div class="d-flex flex-row align-items-center justify-content-center account-card">
            <img class="account-img m-5 d-flex justify-content-start" :src="account.picture" alt="">
            <span class="text-networkgrey">
              <ul>Email: {{ account.email }}</ul>
              <ul>CodeWorks Class: {{ account.class }}</ul>
              <ul>Graduated: {{ account.graduated }}</ul>
              <ul>Links: <a :href:="account.github" class="mdi mdi-github fs-4" type="button"></a><a
                  :href:="account.linkedin"><i class="mdi mdi-linkedin fs-4" type="button"></i></a><a
                  :href:="account.resume"><i class="mdi mdi-file-account fs-4" type="button"></i></a></ul>
            </span>
          </div>
          <div class="mb-4 text-networkgrey">
            <h4>Bio</h4>
            <p>{{ account.bio }}</p>
          </div>
        </div>
        <div v-else>
          <h1>Loading... <i class="mdi mdi-loading mdi-spin"></i></h1>
        </div>
      </div>
    </div>
  </section>
  <section class="container-fluid d-flex justify-content-center">
    <div class="row col-md-8">
      <div v-if="account"
        class="col-md-6 d-flex justify-content-center border border-3 border-networkgrey rounded-4 mt-4 shadow">
        <AccountForm />
      </div>
      <div v-else>
        <h1>Loading... <i class="mdi mdi-loading mdi-spin"></i></h1>
      </div>
    </div>
    <div class="row col-md-2 d-block ">
      <div v-for="Ad in ad" :key="Ad.id" class="col-md-2 w-100 ads-card">
        <AdsCard :adProp="Ad" />
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.cover-img {
  max-width: 100dvh;
  width: 100%;
  height: 50dvh;
  object-fit: cover;
}

.account-img {
  height: 8em;
  aspect-ratio: 1/1;
  border-radius: 50%;
}

.edit-btn {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding-right: 3em;
  margin-top: 1em;
}
</style>
