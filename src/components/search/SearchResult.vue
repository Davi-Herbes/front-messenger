<script setup lang="ts">
const { userName, userEmail } = defineProps<{
  userName: string;
  userEmail: string;
}>();
</script>

<template>
  <div class="search-result row q-py-md q-pr-xl">
    <div class="search-result-pic col-2 row items-center justify-center">
      <img src="/public/icons/favicon-32x32.png" class="col-6" alt="Favicon" />
    </div>
    <div class="search-result-info col column q-col-gutter-sm justify-center q-px-xl">
      <h2 class="text-body1 search-result-name text-weight-bold q-ma-none">{{ userName }}</h2>
      <div class="search-result-email row justify-between">
        <span class="latest-msg">{{ userEmail }}</span>
      </div>
    </div>
    <div class="col-1 add-user-icon-container row items-center">
      <img src="/public/icons/add-user.svg" class="add-user-icon" alt="add user icon" />
    </div>
  </div>
</template>

<style>
.add-user-icon-container {
}
.add-user-icon {
  height: 60%;
}
</style>
