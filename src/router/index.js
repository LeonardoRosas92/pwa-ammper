import { createRouter, createWebHistory } from 'vue-router';
import useAuth from '@/store/auth';
import { Buffer } from 'buffer';
const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import(/* webpackChunkName: "Home" */ '../views/HomeView.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "Login" */ '../views/LoginView.vue')
  },
  {
    path: '/registro',
    name: 'registro',
    component: () => import(/* webpackChunkName: "Registro" */ '../views/RegistroView.vue')
  },
  {
    path: '/acerca',
    name: 'acerca',
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/bancos',
    name: 'bancos',
    component: () => import(/* webpackChunkName: "Bancos" */ '../views/BancosView.vue')
  },
  {
    path: '/usuario',
    name: 'usuario',
    component: () => import(/* webpackChunkName: "Bancos" */ '../views/UsuarioView.vue'),
    meta : {
      requireAuth : true
    }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

const parseJwt = (token) => {
  var base64Url = token.split('.')[1];
  var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  var jsonPayload = decodeURIComponent(Buffer.from(base64, "base64").toString("ascii").split("").map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));

  return JSON.parse(jsonPayload);
};

router.beforeEach( ( to, from , next) => {
  const auth = useAuth()
  const isAuth = auth.token
  if ( !to.meta.requireAuth ) {
    next();
  }else{
    if(isAuth !== ''){
      const jwtPayload = parseJwt(isAuth);
      if (jwtPayload.exp < Date.now()/1000) {
        auth.logOut();
        next({ name : 'login'});
      }else{
        next();
      }
    }else{
      next({ name : 'login'});
    }
  }
})
export default router
