import { defineStore } from 'pinia';
import { useStorage } from '@vueuse/core';
import router from '@/router';

const useAuth = defineStore( 'auth' , {
  state: () => {
    return {
      token: useStorage('token', ''),
      usuario: useStorage('usuario', {})
    }
  },
  getters: {
    getToken: (state) => state.token
  },
  actions: {
    async login(email, password){
        const uri = `${process.env.VUE_APP_BASE_URL}/usuarios/login`;
        try {
            const response = await fetch( uri, {
                method: 'POST',
                headers: {
                    'Content-type' : 'Application/json'
                },
                body: JSON.stringify({
                    'email' : email,
                    'password' : password 
                })
            });
            const { token , usuario, msg } = await response.json();
            if(response.status === 200){
                this.token = token;
                this.usuario = usuario;
                return true;
            } else if(response.status === 400 || response.status === 401) {
              throw new Error(msg);
            } 
        } catch (error) {
            return error;
        }
    },
    logOut(){
        try {
          router.push( { name : 'login'} );
          this.token = '';
          this.usuario = '';
        } catch (error) {
            return error;
        }
    }
  }
})

export default useAuth