<script setup lang="ts">
import Conversation from "./Conversation.vue";
</script>

<template>
  <div class="conversations-container fit column">
    <Conversation
      last-msg="Opa, bão?"
      class="unread"
      conversation-name="Amigo tal"
      last-msg-time="22:24"
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
