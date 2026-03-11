<script setup lang="ts">
import Conversations from "src/components/conversations/Conversations.vue";
import Profile from "src/components/Profile.vue";
import Search from "src/components/search/Search.vue";
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();

// import { QTabs, QTab, QTabPanel } from "quasar";

const tab = ref("conversations");
</script>

<template>
  <div class="fit row main-container">
    <div class="column col full-height rounded-borders overflow-hidden">
      <q-tabs class="bg-white col-auto" no-caps align="justify" v-model="tab" expand>
        <q-tab class="col-4" name="conversations" label="Conversas"></q-tab>
        <q-tab class="col-4" name="search" label="Buscar"></q-tab>
        <q-tab class="col-4" name="profile" label="Perfil"></q-tab>
      </q-tabs>
      <q-tab-panels class="col" v-model="tab" animated expand>
        <q-tab-panel name="conversations">
          <Conversations />
        </q-tab-panel>
        <q-tab-panel name="search">
          <Search />
        </q-tab-panel>
        <q-tab-panel name="profile">
          <Profile />
        </q-tab-panel>
      </q-tab-panels>
    </div>
    <div class="bg-white col rounded-borders">
      <q-chat-message :text="['OPA']" sent> </q-chat-message>
    </div>
  </div>
</template>

<style>
.main-container {
  padding: 5vh;
  gap: 4vw;
  background: rgb(225 236 237);
}

.q-tab-panel {
  padding: 0;
}
</style>
