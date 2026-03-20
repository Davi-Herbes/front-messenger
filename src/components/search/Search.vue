<script setup lang="ts">
import { useConversationsStore } from "src/stores/conversations-store";
import SearchForm from "./SearchForm.vue";
import SearchResult from "./SearchResult.vue";
import { useSearchStore } from "src/stores/search-store";
import { useUserStore } from "src/stores/user-store";
import { useQuasar } from "quasar";

const usersStore = useUserStore();
const searchStore = useSearchStore();
const conversationsStore = useConversationsStore();
const $q = useQuasar();

const addUser = async (secondUserId: string) => {
  $q.loading.show();
  const response = await conversationsStore.addUser(usersStore.id, secondUserId);
  $q.loading.hide();

  console.log(response);

  if (response.status === 400) {
    $q.notify({
      color: "red",
      message: "Ocorreu algum problema ao adicionar o usuário.",
    });

    return;
  }

  if (response.status === 409) {
    $q.notify({
      color: "blue",
      message: "Usuário já está nos contatos.",
    });

    return;
  }

  $q.notify({
    color: "green",
    message: "Usuário adicionado.",
  });

  await conversationsStore.loadConversations(usersStore.id);
};
</script>

<template>
  <div class="search-container fit column">
    <SearchForm class="col-auto" @search="searchStore.searchQuery" />
    <SearchResult
      v-for="result in searchStore.searchResults"
      :user-id="result.id"
      :user-name="result.name"
      :user-email="result.email"
      :key="result.id"
      @click="addUser(result.id)"
      class="search-result"
    />
  </div>
</template>

<style>
.search-result {
  background: #fff;
}

.search-result:hover {
  filter: brightness(0.95);
}
</style>
