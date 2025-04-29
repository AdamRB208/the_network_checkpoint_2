<script setup>
import { AppState } from '@/AppState.js';
import { profileService } from '@/services/ProfileService.js';
import { logger } from '@/utils/Logger.js';
import { Pop } from '@/utils/Pop.js';
import { computed, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';


const route = useRoute()

const profile = computed(() => AppState.profile)

onMounted(() => {
  getProfileById()
})

watch(route, () => {
  getProfileById()
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
</script>


<template>
  <div>{{ profile }}</div>
</template>


<style lang="scss" scoped></style>