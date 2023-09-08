<template>
  <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto">
      <Toaster position="top-right" richColors />
      <ModalLoadingComponentVue v-if="showModal"/>
      <h3 class="flex items-center mb-6 text-2xl font-semibold text-white">
        Información bancaria
      </h3>
      <div class="w-full rounded-lg shadow border md:mt-0 sm:max-w-md xl:p-0 bg-gray-800 border-gray-700">
          <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 class="text-xl font-bold leading-tight tracking-tight md:text-2xl text-white">
                  Inicia sesión en tu cuenta
              </h1>
              <form class="space-y-7 md:space-y-9" @submit.prevent="login">
                  <div class="relative">
                      <label for="email" class="block mb-2 text-sm font-medium text-white">Email</label>
                      <input type="email" name="email" id="email" v-model="usuario.email" @blur="v$.email.$touch" class="border sm:text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500" placeholder="usuario@compañia.com">
                      <p  v-if="v$.email.required.$invalid && v$.email.$dirty" class="absolute -bottom-5 left-0 text-[11px] text-white">
                          {{ v$.email.required.$message }}
                      </p>
                  </div>
                  <div class="relative">
                      <label for="password" class="block mb-2 text-sm font-medium text-white">Password</label>
                      <input type="password" name="password" id="password" placeholder="••••••••" v-model="usuario.password" @blur="v$.password.$touch" class="border sm:text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500">
                      <p  v-if="v$.password.required.$invalid && v$.password.$dirty" class="absolute -bottom-5 left-0 text-[11px] text-white">
                          {{ v$.password.required.$message }}
                      </p>
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
</template>

<script setup>
// @ is an alias to /src
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

import { useVuelidate } from '@vuelidate/core';
import { required, helpers } from '@vuelidate/validators';

import ModalLoadingComponentVue from '@/components/ModalLoadingComponent.vue';
import { Toaster, toast } from 'vue-sonner';

import useAuth from '@/store/auth';
const auth = useAuth();
const router = useRouter();
const showModal = ref(false);
const usuario = ref({
  email : '',
  password : ''
});
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    authorization: 'Basic Y2I4MDI0NjAtZTcxMC00MjA4LWIzN2UtZDk4MzU3MmE3YjFiOkxQKjZCMlcyWmRtYlgxU2dGUW5aOTlENjZOOUw3akdUN3pRZXB2VkplcDlFRyNVcVo0QUVLYUduTmV6a0JfVEY='
  }
};
onMounted(async () => {
  try {
    const response = await fetch('https://development.belvo.com/api/institutions/', options);
    const data = await response.json();
    banks.value = data.results;
  } catch (error) {
    console.log(error);
  }
})
const validacionesLogin =  {
  email : { 
      required : helpers.withMessage('El email es obligatorio', required)
  },
  password : { 
      required : helpers.withMessage('El password es obligatorio', required)
  }
};
const login = async() => {
  v$.value.$touch();
  if (v$.value.$invalid) {
      // eslint-disable-next-line
      for (const [key, input] of Object.entries(v$.value.$errors)) {
          document.getElementById(input.$property).focus();
          break;
      }
      return false;
  }
  try {
      showModal.value = true;
      const response = await auth.login(usuario.value.email,usuario.value.password);
      if ( response instanceof Error ) {
        throw new Error(response.message);
      }
      router.push( { name : 'usuario'} )
  } catch (error) {
      toast.error(error.message);
  } finally {
    showModal.value = false;
  }
}
const v$ = useVuelidate(validacionesLogin, usuario);
const banks = ref([]);

</script>
