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
  <div>{{ adProp }}</div>
</template>


<style lang="scss" scoped></style>