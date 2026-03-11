<script setup lang="ts">
const { conversationName, lastMsg, lastMsgTime } = defineProps<{
  conversationName: string;
  lastMsg: string;
  lastMsgTime: string;
}>();
</script>

<template>
  <div class="conversation row">
    <div class="conversation-pic col-2 row items-center justify-center">
      <img src="/public/icons/favicon-32x32.png" class="col-6" alt="Favicon" />
    </div>
    <div class="conversation-info col column q-col-gutter-sm justify-center q-px-xl">
      <h2 class="text-body1 conversation-name text-weight-bold q-ma-none">
        {{ conversationName }}
      </h2>
      <div class="conversation-latest-msg row justify-between">
        <span class="latest-msg">{{ lastMsg }}</span>
        <span class="latest-msg-time">{{ lastMsgTime }}</span>
      </div>
    </div>
  </div>
</template>
