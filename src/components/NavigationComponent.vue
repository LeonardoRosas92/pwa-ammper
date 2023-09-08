<template>
    <nav class="bg-white border-gray-200 w-screen z-30 h-12">
        <div class="max-w-screen-xl flex flex-wrap items-center justify-end mx-auto py-2 px-2">
            <div class="flex items-center md:order-2 mr-3">
                <button v-if="auth.token" id="user-menu-button" type="button" @click.prevent="tooglePerfil"
                    class="flex ml-3 mr-1 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 transition-all hover:scale-105">
                    <img class="w-8 h-8 rounded-full" src="../assets/user.png" alt="Icono Usuario" />
                </button>
                <!-- Dropdown menu -->
                <div class="absolute z-50 top-14 right-5 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow border border-gray-300"
                    id="user-dropdown" :class="{ hidden: showPerfil }">
                    <div class="px-4 py-3">
                        <span class="block text-sm text-gray-900">
                            {{ auth.usuario.nombre }} {{ auth.usuario.apellido }}
                        </span>
                        <span class="block text-sm text-gray-500 truncate">{{ auth.usuario.email }}</span>
                        <span class="block text-sm text-gray-500 truncate">{{ auth.usuario.uuid }}</span>
                    </div>
                    <ul v-if="auth.usuario" class="py-2" aria-labelledby="user-menu-button">
                        <li>
                            <a @click="logOut" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                Cerrar sesión
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </nav>
</template>
<script>
import { ref } from "vue";
import useAuth from '@/store/auth';
export default {
    name: "NavigationComponent",
    setup() {
        const auth = useAuth();
        const showPerfil = ref(true);
        const showMenu = ref(true);
        const tooglePerfil = () => showPerfil.value = !showPerfil.value;
        const toogleMenu = () => showMenu.value = !showMenu.value;
        const logOut = () => {
            tooglePerfil();
            auth.logOut();
        }

        return {
            showPerfil,
            showMenu,
            tooglePerfil,
            toogleMenu,
            auth,
            logOut
        }
    }
};
</script>