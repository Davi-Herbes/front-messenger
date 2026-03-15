<script setup lang="ts">
import { useQuasar } from "quasar";
import { codeRule } from "src/rules/code";
import { emailRule } from "src/rules/email";
import { stringRule } from "src/rules/string";
import { useUserStore } from "src/stores/user-store";
import { ref, watch } from "vue";
import { useRouter, RouterLink } from "vue-router";

const tab = ref("step-1");

const code = ref("");
const name = ref("");
const email = ref("");
const password = ref("");

const userStore = useUserStore();
const $q = useQuasar();

const router = useRouter();

// watch(code, () => {
//   if()
// })

async function onRegisterSubmit() {
  const response = await userStore.registerUser(name.value, email.value);

  if (!response) {
    $q.notify({
      color: "red",
      message: "Ocorreu um erro ao registrar o usuário",
    });

    return;
  }

  tab.value = "step-2";
}

async function onRegisterConfirmationSubmit() {
  const response = await userStore.confirmRegistration(
    name.value,
    email.value,
    code.value,
    password.value,
  );

  if (!response) {
    $q.notify({
      color: "red",
      message: "Código errado",
    });

    return;
  }

  await router.push({ name: "home" });
}
</script>

<template>
  <div class="fit main-container row justify-center">
    <div class="column col-4 justify-center">
      <main class="main-content col-9 bg-white q-px-lg q-py-xl rounded-borders">
        <q-tab-panels v-model="tab" animated>
          <q-tab-panel name="step-1">
            <h1 class="text-h4 q-ma-none text-weight-medium">Registrar-se</h1>
            <q-form @submit.prevent="onRegisterSubmit" class="justify-center">
              <q-input v-model="name" type="text" name="name" label="Nome" :rules="[stringRule]">
              </q-input>
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
              Já tem uma conta? <RouterLink to="register">Fazer login</RouterLink>
            </div>
          </q-tab-panel>
          <q-tab-panel name="step-2" class="step-2">
            <h1 class="text-h4 q-ma-none text-weight-medium col-auto">Confirmação</h1>
            <div class="confirmation-message">
              Enviamos um código de seis dígitos para
              <b>{{ email }}. </b>Por favor, verifique sua caixa de entrada e digite o código
              recebido.
            </div>
            <q-form @submit="onRegisterConfirmationSubmit">
              <q-input
                mask="######"
                v-model="code"
                unmasked-value
                label="Código"
                pattern="[0-9]*"
                :rules="[codeRule]"
              ></q-input>
              <q-btn outline unelevated class="q-py-md" type="submit">Confirmar</q-btn>
            </q-form>
          </q-tab-panel>
        </q-tab-panels>
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

.q-panel {
  overflow: visible !important;
}

.confirmation-message {
  text-align: justify;
}

.main-content form {
  display: flex;
  flex-direction: column;
  height: 100%;
}
.main-content form button {
  margin-top: 15px;
}

.step-2 {
  display: flex;
  flex-direction: column;

  gap: 20px;
}
</style>
