<script setup>
import { AppState } from '@/AppState.js';
import { Post } from '@/models/Post.js';
import { postsService } from '@/services/PostsService.js';
import { logger } from '@/utils/Logger.js';
import { Pop } from '@/utils/Pop.js';
import { computed } from 'vue';

const account = computed(() => AppState.account)

defineProps({
  postProp: { type: Post, required: true }
})

async function likePost(postId) {
  try {
    await postsService.likePost(postId)
  }
  catch (error) {
    Pop.error(error, 'could not like post');
    logger.log('COULD NOT LIKE POST', error)
  }
}

async function deletePost(postId) {
  try {
    const confirmed = await Pop.confirm('Are you sure you want to delete this post?', 'It will be gone forever!', 'Yes I am sure', 'Ive changed my mind')
    if (!confirmed) {
      return
    }
    await postsService.deletePost(postId)
  }
  catch (error) {
    Pop.error(error, 'could not delete post');
    logger.log('COULD NOT DELETE POST', error)
  }
}

</script>


<template>
  <div class="post-card border border-3 border-networkgrey rounded-4 p-3 mb-4 mt-4">
    <div class="d-flex">
      <img
        :src="postProp.creator.picture || 'https://em-content.zobj.net/source/apple/419/man-facepalming_1f926-200d-2642-fe0f.png'"
        alt="user image for `{{ postProp.creator.name }}`" class="creator-img mb-4 border border-3 border-networkgrey">
      <span class="d-flex align-items-center mb-4 ms-3">{{ postProp.creator.name }}</span>
    </div>
    <img
      :src="postProp.imgUrl || 'https://media.istockphoto.com/id/2185543591/photo/metallic-broken-chain-symbol-illuminated-by-blue-and-magenta-lights-on-blue-and-magenta.webp?a=1&b=1&s=612x612&w=0&k=20&c=LYp_95t7cM7uAO8jGR6EAS72-rGIz1lZnWq09qV9FbA='"
      class="w-100 rounded-4 post-img" alt="image for post created by `{{ postProp.creator.name }}`">
    <div class="card-body">
      <p class="card-text mt-3 d-flex justify-content-center">{{ postProp.body }}</p>
      <hr>
      <button v-if="postProp?.creatorId == account?.id && account" @click="deletePost(postProp.id)"
        class="btn btn-outline-networkdark" type="button"><i class="mdi mdi-trash-can-outline"></i>delete</button>
    </div>
    <div class="d-flex flex-row justify-content-between mt-3">
      <small class="">Posted {{ postProp.createdAt.toLocaleDateString() }}</small>
      <p v-if="account" @click="likePost(postProp.id)" class="mb-0 mdi mdi-heart likes-text" type="button">{{
        postProp.likes.length }}
      </p>
    </div>
  </div>
</template>


<style lang="scss" scoped>
.post-img {
  object-fit: cover;
}

.post-card {
  background-color: rgba(3, 52, 137, 0.705);
}

hr {
  border: 1px solid rgb(134, 134, 135);
  opacity: 100;
}

.likes-text {
  color: rgb(96, 96, 97);
  flex-direction: row-reverse;
}

small {
  font-size: smaller;
  color: rgb(96, 96, 97)
}

.creator-img {
  height: 4em;
  aspect-ratio: 1/1;
  border-radius: 50%;
}
</style>
