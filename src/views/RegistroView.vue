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
          Crea una cuenta
        </h1>
        <form class="space-y-6 md:space-y-8" @submit.prevent="registrar">
          <div class="relative">
            <label for="nombre" class="block mb-2 text-sm font-medium text-white">
              Nombre
            </label>
            <input type="text" name="nombre" id="nombre" v-model="usuario.nombre" @blur="v$.nombre.$touch" class="border sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500" placeholder="Juan">
            <p  v-if="v$.nombre.$invalid && v$.nombre.$dirty" 
                class="absolute -bottom-5 left-1 text-[11px] text-white">
                {{ v$.nombre.required.$message }}
            </p>
          </div>
          <div class="relative">
            <label for="apellido" class="block mb-2 text-sm font-medium text-white">
              Apellido
            </label>
            <input type="text" name="apellido" id="apellido" v-model="usuario.apellido" @blur="v$.apellido.$touch" class="border sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500" placeholder="Perez">
            <p  v-if="v$.apellido.$invalid && v$.apellido.$dirty" 
                class="absolute -bottom-5 left-1 text-[11px] text-white">
                {{ v$.apellido.required.$message }}
            </p>
          </div>
          <div class="relative">
            <label for="email" class="block mb-2 text-sm font-medium text-white">
              Email
            </label>
            <input type="email" name="email" id="email" v-model="usuario.email" @blur="v$.email.$touch" class="border sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500" placeholder="usuario@compañia.com">
            <p  v-if="v$.email.$invalid && v$.email.$dirty" 
                class="absolute -bottom-5 left-1 text-[11px] text-white">
                {{ v$.email.required.$message }}
            </p>
          </div>
          <div class="relative">
            <label for="password" class="block mb-2 text-sm font-medium text-white">Password</label>
            <input type="password" name="password" id="password" placeholder="••••••••" v-model="usuario.password" @blur="v$.password.$touch" class="border sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500">
            <p  v-if="v$.password.$invalid && v$.password.$dirty" 
                class="absolute -bottom-5 left-1 text-[11px] text-white">
                {{ v$.password.required.$message }}
            </p>
          </div>
          <div class="relative">
            <label for="banco" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Banco</label>
            <select id="banco" v-model="usuario.banco" @blur="v$.banco.$touch" class="border text-sm rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500">
              <option selected>Selecciona</option>
              <option v-for="(bank) in banks" :key="bank.id" :value="bank.name">
                {{bandera[bank.country_code]}} - {{ bank.name }}
              </option>
            </select>
            <p  v-if="v$.banco.$invalid && v$.banco.$dirty" 
                class="absolute -bottom-5 left-1 text-[11px] text-white">
                {{ v$.banco.validateSelectOption.$message }}
            </p>
          </div>
          <button type="submit" class="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-primary-600 hover:bg-primary-700 focus:ring-primary-800">
            Crear cuenta
          </button>
          <p class="text-sm font-light text-gray-400">
              Ya tienes cuenta? 
              <router-link :to=" { name : 'login' }" class="font-medium text-primary-600 hover:underline text-primary-500">
                Iniciar
              </router-link>
          </p>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { onMounted, ref } from 'vue';

import { useVuelidate } from '@vuelidate/core';
import { required, email, minLength, helpers } from '@vuelidate/validators';

import ModalLoadingComponentVue from '@/components/ModalLoadingComponent.vue';
import { Toaster, toast } from 'vue-sonner';

const router = useRouter();

const banks = ref([]);
const showModal = ref(false);

const usuario = ref({
  nombre : '',
  apellido : '',
  email : '',
  password : '',
  banco : 'Selecciona'
});
const bandera = ref({
  'MX' : '🇲🇽',
  'CO': '🇨🇴',
  'BR': '🇧🇷'
});
const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    authorization: 'Basic Y2Y2NGVlNDMtYzVlOS00YjMyLThhNjUtMzBlYzM3NjljZTk1OkxaRnIqLUl6STJHZ1p5bmNfWURFOXhjYW90YTBmNEZRb0FXUFZHQ2hpNU9OZl94WWc3OGsyckhmSEJIMkBEMjg='
  }
};
onMounted(async () => {
  try {
    const response = await fetch('https://sandbox.belvo.com/api/institutions/', options);
    const data = await response.json();
    banks.value = data.results.filter( b => b.logo );
  } catch (error) {
    console.log(error);
  }
})
//Reglas y funcinoes para valdiar formulario
const validateSelectOption = (value) => value != 'Selecciona';
const validacionesRegistro =  {
    nombre : { required : helpers.withMessage('El nombre es obligatorio', required) },
    apellido : { required : helpers.withMessage('El apellido es obligatorio', required) },
    email : { 
      required : helpers.withMessage('El correo es obligatorio', required), 
      email : helpers.withMessage('Formato incorrecto', email)
    },
    password : { 
      required : helpers.withMessage('El password es obligatorio', required) ,
      minLength : helpers.withMessage('Minimo 8 caracteres', minLength(8)) 
    },
    banco : { 
      validateSelectOption : helpers.withMessage('Seleccione opcion valida', validateSelectOption)
    }
};
const v$ = useVuelidate(validacionesRegistro, usuario);

const registrar = async() => {
  v$.value.$touch();
  if (v$.value.$invalid) {
      // eslint-disable-next-line
      for (const [key, input] of Object.entries(v$.value.$errors)) {
          document.getElementById(input.$property).focus();
          break;
      }
      return false;
  }
  const uriRegistro = `${process.env.VUE_APP_BASE_URL}/usuarios/registro`;
  try {
      showModal.value = true;
      const rawResponse = await fetch( uriRegistro, {
        method: 'POST',
        headers: {
            'Content-type' : 'Application/json'
        },
        body: JSON.stringify(
            {
                nombre : usuario.value.nombre.toUpperCase(),
                apellido : usuario.value.apellido.toUpperCase(),
                email : usuario.value.email,
                password : usuario.value.password,
                banco : usuario.value.banco
            }
        )  
      })
      const { msg, errors } = await rawResponse.json();
      if(rawResponse.status === 200) {
          toast.success( msg );
          setTimeout( () => router.push( { name : 'login'} ), 1000);
      } else if(rawResponse.status === 400) {
        errors.map( e => {
          throw new Error(e.msg);
        });
      } else if(rawResponse.status === 500) {
        throw new Error(msg);
      } 
  } catch (error) {
    toast.error( error.message );
  } finally {
    showModal.value = false;
  }
}
</script>

<style>

</style>