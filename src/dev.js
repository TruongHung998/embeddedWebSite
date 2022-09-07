import Vue from 'vue'
import Loader from './components/Loader'

(function () {
  new Vue({
    render: h => h(Loader)
  }).$mount('#app')
})()
