<script setup lang="ts">
import { useUserStore } from "src/stores/user-store";

const usersStore = useUserStore();
</script>

<template>
  <div class="profile-container fit column q-pa-xl q-gutter-xl">
    <div class="profile-pic col-2 q-pa-md">
      <img src="/public/icons/user-icon.svg" class="fit" alt="user-icon" />
    </div>
    <div class="profile-name text-h4">{{ usersStore.name }}</div>
    <div class="profile-email text-subtitle1 text-blue-grey-6">{{ usersStore.email }}</div>
    <span class="text-red text-subtitle1 logout-text" @click="usersStore.logout">Logout</span>
  </div>
</template>

<style>
.profile-container {
  align-items: center;
}

.profile-pic {
  border-radius: 50%;
  background-color: var(--q-bg-2);
  aspect-ratio: 1/1;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.logout-text:hover {
  text-decoration: underline;
  cursor: pointer;
}
</style>
