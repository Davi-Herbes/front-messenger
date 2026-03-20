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
      :conversation-name="conversation.participants[0]?.participant.name || '-'"
      :last-msg="conversation.participants[0]?.participant.messages[0]?.text || '-'"
      :last-msg-time="conversation.participants[0]?.participant.messages[0]?.createdAt"
    />
  </div>
</template>

<style>
.conversation {
  height: 15vh;
  border-bottom: var(--q-bg-2) 2px solid;
  background: #fff;
}

.conversation:hover {
  filter: brightness(0.95);
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
