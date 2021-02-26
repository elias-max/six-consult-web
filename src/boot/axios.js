import Vue from 'vue'
import axios from 'axios'

Vue.prototype.$axios = axios

export default async ({ Vue }) => {
  Vue.prototype.$axios = axios
  axios.defaults.headers.common = { 'X-Requested-With': 'XMLHttpRequest' }
  let url = ''
  if (process.env.NODE_ENV === 'development') {
    url = 'http://127.0.0.1:5000/api/' // Dev
  } else {
    url = 'http://127.0.0.1:5000/api/' // Production
  }
  axios.defaults.baseURL = url
}
