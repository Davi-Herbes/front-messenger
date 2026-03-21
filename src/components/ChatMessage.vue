<script lang="ts" setup>
import { computed } from "vue";

const { sended } = defineProps<{ sended?: boolean }>();

const sendedClass = computed(() => {
  return sended ? "sended" : "received";
});
</script>

<template>
  <div :class="sendedClass" class="chat-message q-py-xs q-px-md rounded-borders text-subtitle1">
    <slot></slot>
  </div>
</template>

<style>
.chat-message.sended {
  align-self: end;
  /* border: solid 1px var(--q-bg-1); */
  background-color: var(--q-bg-1);
}

.chat-message.received {
  align-self: start;
  background-color: var(--q-grey);
}
</style>
