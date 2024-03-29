import Vue from 'vue'
import App from './App'
import axios from './common/plugins/axios/index.js'


Vue.config.productionTip = false

Vue.prototype.$axios = axios()

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
