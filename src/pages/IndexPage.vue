<script setup lang="ts">
import Conversations from "src/components/conversations/Conversations.vue";
import Profile from "src/components/Profile.vue";
import Search from "src/components/search/Search.vue";
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();

const messageInput = ref("");

// import { QTabs, QTab, QTabPanel } from "quasar";

const tab = ref("conversations");
</script>

<template>
  <div class="full-width window-height row main-container">
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
    <div class="bg-white col rounded-borders q-pa-xl column messages-container">
      <div class="messages col-11 q-px-md">
        <!-- PÕE O COMPONENTE DE CHAT-MESSAGE -->
      </div>
      <div class="message-form-container col-1">
        <q-form class="message-form">
          <q-input
            input-class="text-subtitle1"
            v-model="messageInput"
            type="text"
            name="message"
            outlined
          />
          <q-btn class="bg-green col-1"
            ><img src="/public/icons/send-icon.svg" alt="send icon"
          /></q-btn>
        </q-form>
      </div>
    </div>
  </div>
</template>
<!-- text-h6 text-weight-regular
text-h6 text-weight-regular -->
<style>
.main-container {
  padding: 5vh;
  gap: 4vw;
  background: rgb(225 236 237);
}

.message-form {
  display: grid;
  justify-content: space-between;
  grid-template-columns: 11fr 1fr;
  gap: 5%;
}

.messages {
  overflow-y: scroll;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.q-tab-panel {
  padding: 0;
}

.message-form-container .q-field__control {
  height: 100%;
}

.messages-container {
  height: 100%;
}
</style>
