<script setup>
import { computed } from 'vue';
import { AppState } from '../AppState.js';

const account = computed(() => AppState.account)

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
      <div class="col-md-10 about text-center">
        <div v-if="account">
          <div>
            <span>
              <h1 class="m-3">Welcome {{ account.name }}</h1>
            </span>
            <img :src="account.coverImg" alt="" class="cover-img">
          </div>
          <div class="d-flex flex-row align-items-center justify-content-center account-card">
            <img class="account-img m-5 d-flex justify-content-start" :src="account.picture" alt="">
            <span>
              <ul>Email: {{ account.email }}</ul>
              <ul>CodeWorks Class: {{ account.class }}</ul>
              <ul>Graduated: {{ account.graduated }}</ul>
              <ul>Links: <i class="mdi mdi-github" type="button"></i><i class="mdi mdi-linkedin" type="button"></i><i
                  class="mdi mdi-file-account" type="button"></i></ul>
            </span>
          </div>
          <div>
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
