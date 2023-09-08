<template>
  <section class="pt-10 px-5">
    <h5 class="text-white text-2xl text-center">CUENTAS</h5>
    <h5 class="text-white text-2xl text-center" v-if="!showTemplate">Total : {{ accounts.length }}</h5>
    <h4 class="text-white text-xl text-center" v-if="showTemplate">Cargando...</h4>
    <div class="w-full grid grid-cols-1 md:grid-cols-2 gap-10 pt-5">
      <AccountTemplateComponent v-if="showTemplate" class="animate-pulse"/>
      <AccountTemplateComponent v-if="showTemplate" class="animate-pulse"/>
      <AccountTemplateComponent v-if="showTemplate" class="animate-pulse"/>
      <AccountTemplateComponent v-if="showTemplate" class="animate-pulse"/>
      <AccountComponent v-for="account in accounts" :key="account.id" :cuenta="account" :banco="auth.usuario.banco" />
    </div>
  </section>
</template>

<script setup>
import AccountComponent from '@/components/AccountComponent.vue';
import AccountTemplateComponent from '@/components/AccountTemplateComponent.vue';
import { onMounted, ref } from 'vue';
import useAuth from '@/store/auth';
const auth = useAuth();
const accounts = ref([]);
const showTemplate = ref(false);
onMounted(async () => {
  try {
    showTemplate.value = true;
    const response = await fetch(`https://sandbox.belvo.com/api/accounts/?link=${auth.usuario.uuid}`, 
    {
      method: 'GET',
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
        authorization: process.env.VUE_APP_BELVO_AUTH
      }
    });
    const data = await response.json();
    accounts.value = data.results;
  } catch (error) {
    console.log(error);
  } finally {
    showTemplate.value = false;
  }
})
</script>
