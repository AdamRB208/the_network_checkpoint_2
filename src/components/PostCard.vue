<script setup>
import { Post } from '@/models/Post.js';


defineProps({
  postProp: { type: Post, required: true }
})


</script>


<template>
  <div class="post-card border border-3 border-networkgrey rounded-4 p-3 mb-4">
    <img
      :src="postProp.imgUrl || 'https://media.istockphoto.com/id/2185543591/photo/metallic-broken-chain-symbol-illuminated-by-blue-and-magenta-lights-on-blue-and-magenta.webp?a=1&b=1&s=612x612&w=0&k=20&c=LYp_95t7cM7uAO8jGR6EAS72-rGIz1lZnWq09qV9FbA='"
      class="w-100 rounded-4 post-img" alt="image for post created by {{ postProp.creator.name }}">
    <div class="card-body">
      <hr>
      <p class="card-text mt-3 d-flex justify-content-center">{{ postProp.body }}</p>
      <hr>
      <p class="mb-0 mdi mdi-heart likes-text">{{ postProp.likes.length }}</p>
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
  // color: rgb(106, 106, 108), ;
  border: 2px solid rgb(134, 134, 135);
  opacity: 100;
}

.likes-text {
  color: rgb(96, 96, 97);
}
</style>