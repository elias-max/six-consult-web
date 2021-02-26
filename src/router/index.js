import Vue from 'vue'
import VueRouter from 'vue-router'
import moment from 'moment'
import routes from './routes'
import axios from 'axios'

Vue.use(VueRouter)

Vue.filter('formatDate', function (value) {
  if (value) {
    return moment(String(value)).format('DD/MM/YYYY')
  }
})

Vue.filter('formatDateFull', function (value) {
  if (value) {
    return moment(String(value)).format('DD/MM/YYYY HH:mm')
  }
})

Vue.filter('cnpjcpf', function (value) {
  if (value) {
    value = value.replace(/[^\d]/g, "")
    if (value.length == 11) { //cpf
      return value.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4")
    } else { //cnpj
      return value.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, "$1.$2.$3/$4-$5");
    }
  }
  return value
})

Vue.filter('formatTelephone', function (value) {
  if (value) {
    value = value.replace(/[^\d]/g, '')
    if (value.length === 11) {
      return value.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3')
    } else { // cnpj
      return value.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3')
    }
  }
  return value
})

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

export default function ({ store }) {
  const Router = new VueRouter({
    scrollBehavior: () => ({ x: 0, y: 0 }),
    routes,

    // Leave these as they are and change in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    mode: process.env.VUE_ROUTER_MODE,
    base: process.env.VUE_ROUTER_BASE
  })

  Router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
      try {
        axios.defaults.headers.common.Authorization = 'Bearer ' + store.state.config.user.token
      } catch (error) {
        next({
          path: '/',
          query: {
            redirect: to.fullPath
          }
        })
      }

      if ((axios.defaults.headers.common.Authorization === undefined) || (axios.defaults.headers.common.Authorization === '') || (axios.defaults.headers.common.Authorization === null)) {
        next({
          path: '/',
          query: {
            redirect: to.fullPath
          }
        })
      } else {
        next()
      }
    } else {
      next()
    }
  })
  return Router
}
