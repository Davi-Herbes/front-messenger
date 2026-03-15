<script setup lang="ts">
import { useQuasar } from "quasar";
import { emailRule } from "src/rules/email";
import { stringRule } from "src/rules/string";
import { useUserStore } from "src/stores/user-store";
import { ref } from "vue";
import { useRouter, RouterLink } from "vue-router";

const email = ref("");
const password = ref("");

const userStore = useUserStore();
const $q = useQuasar();

const router = useRouter();

async function onSubmit() {
  const response = await userStore.login(email.value, password.value);

  if (!response) {
    $q.notify({
      color: "red",
      message: "E-mail ou Senha inválidos",
    });

    return;
  }

  await router.push({ name: "home" });
}
</script>

<template>
  <div class="fit main-container row justify-center">
    <div class="column col-4 justify-center">
      <main class="main-content col-8 bg-white q-px-lg q-py-xl rounded-borders">
        <h1 class="text-h4 q-ma-none text-weight-medium">Login</h1>
        <q-form @submit.prevent="onSubmit" class="justify-center">
          <q-input
            v-model="email"
            type="email"
            name="email"
            label="E-mail"
            :rules="[stringRule, emailRule]"
          >
          </q-input>
          <q-input
            v-model="password"
            type="password"
            name="password"
            label="Senha"
            :rules="[stringRule]"
          >
          </q-input>
          <q-btn type="submit" outline unelevated class="q-py-md">Enviar</q-btn>
        </q-form>
        <div class="register-link-container text-subtitle1">
          Não tem uma conta? <RouterLink to="register">Registre-se</RouterLink>
        </div>
      </main>
    </div>
  </div>
</template>

<style>
.main-container {
  background-color: var(--q-bg-2);
}

.main-content {
  box-shadow: 0 0 5px 5px rgba(0, 0, 0, 0.04);

  display: flex;
  flex-direction: column;
}

.main-content form {
  display: flex;
  flex-direction: column;
  height: 100%;
}
.main-content form button {
  margin-top: 15px;
}
</style>
