<template>
  <section class="min-h-screen p-2">
    <h3 class="text-center text-3xl font-bold">Bancos</h3>
    <div class="p-2 grid justify-items-center grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
      <div v-for="(bank) in banks" :key="bank.id" class="max-w-sm bg-white border border-gray-200 rounded-lg shadow-md p-2 transition-all hover:scale-105">
        <img class="rounded-t-lg" :src="bank.logo" alt="Logo Banco" />
        <div class="p-5 grayscale-1 rounded-b-md" :style="{'background-color': bank.primary_color}">
            <div class="mb-2 grid grid-cols-2">
              <h5 class="text-2xl font-bold tracking-tight text-gray-900 invert">
                <span class="invert">{{bandera[bank.country_code]}}</span> {{ bank.country_code }} 
              </h5>
              <a :href="bank.website" target="_blank" class="flex invert items-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                <path stroke-linecap="round" stroke-linejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
                </svg>
                <span class="text-2xl ml-2">Sitio oficial</span>
              </a>
            </div>
            <a href="#" class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 ">
                Mas información
                <svg class="w-3.5 h-3.5 ml-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                </svg>
            </a>
        </div>
      </div>
    </div>
  </section>
  
</template>

<script setup>
// @ is an alias to /src
import { onMounted, ref } from 'vue';
const bandera = ref({
  'MX' : '🇲🇽',
  'CO': '🇨🇴',
  'BR': '🇧🇷'
});
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    authorization: 'Basic Y2I4MDI0NjAtZTcxMC00MjA4LWIzN2UtZDk4MzU3MmE3YjFiOkxQKjZCMlcyWmRtYlgxU2dGUW5aOTlENjZOOUw3akdUN3pRZXB2VkplcDlFRyNVcVo0QUVLYUduTmV6a0JfVEY='
  }
};
const banks = ref([]);
onMounted(async () => {
  try {
    const response = await fetch('https://development.belvo.com/api/institutions/', options);
    const data = await response.json();
    banks.value = data.results;
  } catch (error) {
    console.log(error);
  }
})
</script>
