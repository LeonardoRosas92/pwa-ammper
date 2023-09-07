<template>
    <section class="bg-gray-900">
      <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen py-0">
          <a href="#" class="flex items-center mb-6 text-2xl font-semibold text-white">
            Información bancaria
          </a>
          <div class="w-full rounded-lg shadow border md:mt-0 sm:max-w-md xl:p-0 bg-gray-800 border-gray-700">
              <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                  <h1 class="text-xl font-bold leading-tight tracking-tight md:text-2xl text-white">
                      Inicia sesión en tu cuenta
                  </h1>
                  <form class="space-y-4 md:space-y-6" @submit.prevent="login">
                      <div>
                          <label for="email" class="block mb-2 text-sm font-medium text-white">Email</label>
                          <input type="email" name="email" id="email" class="border sm:text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500" placeholder="usuario@compañia.com" required="">
                      </div>
                      <div>
                          <label for="password" class="block mb-2 text-sm font-medium text-white">Password</label>
                          <input type="password" name="password" id="password" placeholder="••••••••" class="border sm:text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500" required="">
                      </div>
                      <button type="submit" class="w-full text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-primary-600 hover:bg-primary-700 focus:ring-primary-800">
                        Iniciar sesión
                      </button>
                      <p class="text-sm font-light text-gray-400">
                          No tienes cuenta aun? 
                          <router-link :to=" { name : 'registro' }" class="font-medium text-primary-600 hover:underline text-primary-500">
                            Registrate
                          </router-link>
                      </p>
                  </form>
              </div>
          </div>
      </div>
    </section>
</template>

<script setup>
// @ is an alias to /src
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter();
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    authorization: 'Basic Y2I4MDI0NjAtZTcxMC00MjA4LWIzN2UtZDk4MzU3MmE3YjFiOkxQKjZCMlcyWmRtYlgxU2dGUW5aOTlENjZOOUw3akdUN3pRZXB2VkplcDlFRyNVcVo0QUVLYUduTmV6a0JfVEY='
  }
};
const login = async() => {
  router.push( { name : 'bancos'} )
}
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
