<template>
  <section class="bg-gray-900">
    <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <a href="#" class="flex items-center mb-6 text-2xl font-semibold text-white">
            Información bancaria    
        </a>
        <div class="w-full rounded-lg shadow border md:mt-0 sm:max-w-md xl:p-0 bg-gray-800 border-gray-700">
            <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 class="text-xl font-bold leading-tight tracking-tight md:text-2xl text-white">
                    Crea una cuenta
                </h1>
                <form class="space-y-4 md:space-y-6" @submit.prevent="registrar">
                    <div>
                      <label for="nombre" class="block mb-2 text-sm font-medium text-white">
                        Nombre
                      </label>
                      <input type="text" name="nombre" id="nombre" class="border sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500" placeholder="Juan" required="">
                    </div>
                    <div>
                      <label for="apellido" class="block mb-2 text-sm font-medium text-white">
                        Apellido
                      </label>
                      <input type="text" name="apellido" id="apellido" class="border sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500" placeholder="Perez" required="">
                    </div>
                    <div>
                      <label for="email" class="block mb-2 text-sm font-medium text-white">
                        Email
                      </label>
                      <input type="email" name="email" id="email" class="border sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500" placeholder="usuario@compañia.com" required="">
                    </div>
                    <div>
                      <label for="password" class="block mb-2 text-sm font-medium text-white">Password</label>
                      <input type="password" name="password" id="password" placeholder="••••••••" class="border sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500" required="">
                    </div>
                    <button type="submit" class="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-primary-600 hover:bg-primary-700 focus:ring-primary-800">Crear cuenta</button>
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
  </section>
</template>

<script setup>
import { useRouter } from 'vue-router';
const router = useRouter();

const registrar = async() => {
  router.push( { name : 'login'} )
}
</script>

<style>

</style>