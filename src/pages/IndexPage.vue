<script setup lang="ts">
import { useQuasar } from "quasar";
import ChatMessage from "src/components/ChatMessage.vue";
import Conversations from "src/components/conversations/Conversations.vue";
import Profile from "src/components/Profile.vue";
import Search from "src/components/search/Search.vue";

import { v4 as uuid } from "uuid";

import { useConversationsStore } from "src/stores/conversations-store";
import { useUserStore } from "src/stores/user-store";
import { ref, watch } from "vue";
import { onMounted } from "vue";
import { socket } from "src/boot/socket";
import z from "zod";
import { useRouter } from "vue-router";
import { onUnmounted } from "vue";

const conversationsStore = useConversationsStore();
const userStore = useUserStore();
const $q = useQuasar();

const messageInput = ref("");
const tab = ref("conversations");

const router = useRouter();

const ReceivedMessageSchema = z.object({
  sender: z.object({
    email: z.email(),
  }),
  text: z.string(),
  conversationId: z.string(),
});

onMounted(() => {
  socket.connect();

  socket.on("receive_message", (data) => {
    try {
      const {
        conversationId,
        text,
        sender: { email },
      } = ReceivedMessageSchema.parse(data);

      conversationsStore.currentConversation?.messages.unshift({
        createdAt: new Date(),
        id: uuid(),
        sender: {
          email,
        },
        text,
      });
    } catch (e) {
      console.log(e);
      $q.notify({
        color: "yellow",
        message: "Falha de sincronia entre cliente e servidor",
      });

      // location.reload();
    }
  });
});

onUnmounted(() => {
  socket.disconnect();

  conversationsStore.currentConversation = null;
});

const submitMessage = async () => {
  if (!conversationsStore.currentConversation || !messageInput.value) {
    return;
  }

  $q.loading.show();

  await conversationsStore.sendMessage(
    messageInput.value,
    conversationsStore.currentConversation.id,
  );

  $q.loading.hide();

  messageInput.value = "";
};
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
    <div class="bg-white col rounded-borders q-px-xl q-py-md column messages-container">
      <div v-if="conversationsStore.currentConversation" class="messages col-10 q-px-md">
        <template v-if="conversationsStore.currentConversation.messages.length > 0">
          <ChatMessage
            v-for="message in conversationsStore.currentConversation.messages"
            :key="message.id"
            :sended="message.sender.email === userStore.email"
          >
            {{ message.text }}
          </ChatMessage>
        </template>

        <template v-else>
          <span class="text-center text-h5 text-blue-grey-3 q-mt-xl">
            Nenhuma mensagem enviada</span
          >
        </template>
      </div>
      <div v-else class="messages col-10 q-px-md">
        <span class="text-center text-h5 text-blue-grey-3 q-mt-xl"
          >Nenhuma conversa selecionada</span
        >
      </div>
      <div class="message-form-container col-2">
        <q-form @submit.prevent="submitMessage" class="message-form">
          <q-input
            input-class="text-subtitle1"
            v-model="messageInput"
            type="text"
            name="message"
            color="green"
            outlined
          />
          <q-btn
            type="submit"
            class="bg-green send-btn"
            icon="img:/public/icons/send-icon.svg"
          ></q-btn>
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

.message-form-container {
  align-content: center;
}

.message-form {
  display: grid;
  justify-content: space-between;
  grid-template-columns: 11fr 1fr;
  height: 100%;
  max-height: 50px;
  gap: 5%;
}

.messages {
  overflow-y: scroll;
  overflow-x: hidden;
  display: flex;
  flex-direction: column-reverse;
  justify-content: flex-start;
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
