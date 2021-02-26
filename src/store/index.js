import Vue from 'vue'
import Vuex from 'vuex'
import config from './config'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation
 */

export default function (/* { ssrContext } */) {
  const Store = new Vuex.Store({
    modules: {
      config
    },

    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: process.env.DEV,
    plugins: [createPersistedState()]
  })

  return Store
}
 