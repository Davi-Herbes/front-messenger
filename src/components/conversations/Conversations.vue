<script setup lang="ts">
import { onMounted, toRaw } from "vue";
import { storeToRefs } from "pinia";
import Conversation from "./Conversation.vue";
import { useUserStore } from "src/stores/user-store";
import { useConversationsStore } from "src/stores/conversations-store";

const userStore = useUserStore();
const conversationsStore = useConversationsStore();
const { conversations } = storeToRefs(conversationsStore);

onMounted(async () => {
  const userId = userStore.id;

  await conversationsStore.loadConversations(userId);
});
</script>

<template>
  <div class="conversations-container fit column">
    <Conversation
      v-for="conversation in conversations"
      :key="conversation.id"
      :conversation-name="conversation.participants[0]?.participant.name || 'Erro'"
      :last-msg="conversation.participants[0]?.participant.messages[0]?.text || 'Erro'"
      :last-msg-time="conversation.participants[0]?.participant.messages[0]?.createdAt || 'Erro'"
    />
    <Conversation
      last-msg="Opa, bão?"
      class="selected"
      conversation-name="Amigo tal"
      last-msg-time="22:24"
    />
    <Conversation
      last-msg="Opa, bão?"
      class=""
      conversation-name="Amigo tal"
      last-msg-time="22:24"
    />
    <Conversation
      last-msg="Opa, bão?"
      class="unread"
      conversation-name="Amigo tal"
      last-msg-time="22:24"
    />
  </div>
</template>

<style>
.conversation {
  height: 15vh;
  border-bottom: var(--q-bg-2) 2px solid;
}

.conversation.unread {
  color: var(--q-primary);
  background: var(--q-bg-3);
}

.conversation.selected {
  color: var(--q-semi-dark);
  background: var(--q-bg-1);
}
</style>
