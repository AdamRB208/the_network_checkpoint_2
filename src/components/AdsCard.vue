<script setup>
import { AppState } from '@/AppState.js';
import { Ad } from '@/models/Ads.js';
import { adsService } from '@/services/AdsService.js';
import { logger } from '@/utils/Logger.js';
import { Pop } from '@/utils/Pop.js';
import { computed } from 'vue';

const ad = computed(() => AppState.ad)

defineProps({
  adProp: { type: Ad, required: true }
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
  <div class="d-flex flex-column align-items-center mt-3 border rounded border-networkgrey bg-networkgrey shadow">
    <h3>{{ adProp.title }}</h3>
    <img :src="adProp.tall" alt="" class="w-100">
    <img :src="adProp.linkUrl" alt="" class="w-100">
  </div>
</template>


<style lang="scss" scoped></style>