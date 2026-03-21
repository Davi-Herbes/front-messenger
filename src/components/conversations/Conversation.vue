<script setup lang="ts">
import type { Conversation } from "src/stores/conversations-store";
import { useUserStore } from "src/stores/user-store";
import { computed } from "vue";

const { conversation, lastMsg, lastMsgTime } = defineProps<{
  conversation: Conversation;
  lastMsg: string;
  lastMsgTime: Date | undefined;
}>();

const userStore = useUserStore();

const conversationName =
  conversation.participants.find((val) => val.participant.email !== userStore.email)?.participant
    .name || "-";

const lastMsgTimeFormatted = computed(() => {
  return lastMsgTime
    ? lastMsgTime.toLocaleTimeString("pt-BR", {
        hour: "2-digit",
        minute: "2-digit",
      })
    : "-";
});
</script>

<template>
  <div class="conversation row">
    <div class="conversation-pic col-2 row items-center justify-center">
      <img src="/public/icons/user-icon.svg" class="bg-blue-grey-2 q-pa-sm col-6" alt="Favicon" />
    </div>
    <div class="conversation-info col column q-col-gutter-sm justify-center q-px-xl">
      <h2 class="text-body1 conversation-name text-weight-bold q-ma-none">
        {{ conversationName }}
      </h2>
      <div class="conversation-latest-msg row justify-between">
        <span class="latest-msg">{{ lastMsg }}</span>
        <span class="latest-msg-time">{{ lastMsgTimeFormatted }}</span>
      </div>
    </div>
  </div>
</template>
