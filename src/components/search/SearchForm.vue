<script setup lang="ts">
import { QForm } from "quasar";
import { maxLengthRule, stringRule } from "../../rules/_rules";
import { ref } from "vue";

const searchInputValue = ref("");
const form = ref<QForm | null>(null);

const handleSubmit = async () => {
  form.value?.validate();
};
</script>

<template>
  <q-form ref="form" action="/" @submit.prevent="handleSubmit" class="q-pa-lg row q-gutter-md">
    <q-input
      v-model="searchInputValue"
      outlined
      label="Pesquisar por usuários"
      :rules="[stringRule, maxLengthRule]"
      :error="false"
      class="col q-pa-none"
      lazy-rules
    >
    </q-input>
    <q-btn label="Enviar" no-caps class="col-auto bg-1" unelevated outline type="submit"></q-btn>
  </q-form>
</template>
