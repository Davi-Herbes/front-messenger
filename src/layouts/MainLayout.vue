<script setup lang="ts">
import { ref } from "vue";

// import { QTabs, QTab, QTabPanel } from "quasar";

const tab = ref("search");
</script>

<template>
  <div class="full-height full-width" :style="{ 'max-width': '30vw' }">
    <div class="column">
      <q-tabs class="col-auto" no-caps align="justify" v-model="tab" expand>
        <q-tab class="col-4" name="conversations" label="Conversas"></q-tab>
        <q-tab class="col-4" name="search" label="Buscar"></q-tab>
        <q-tab class="col-4" name="profile" label="Perfil"></q-tab>
      </q-tabs>
      <q-tab-panels class="col" v-model="tab" animated expand>
        <q-tab-panel class="bg-red" name="conversations">
          <h2>f</h2>
        </q-tab-panel>
        <q-tab-panel class="bg-green" name="search">
          <h2>1234</h2>
        </q-tab-panel>
        <q-tab-panel class="bg-blue" name="profile">
          <h2>JHFG</h2>
        </q-tab-panel>
      </q-tab-panels>
    </div>
    <div>
      <q-chat-message :text="['OPA']" sent> </q-chat-message>
    </div>
  </div>
</template>

<style></style>
