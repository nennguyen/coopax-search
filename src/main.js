import Vue from 'vue';
import App from './App.vue';
import wrap from '@vue/web-component-wrapper';
import './config/axios';

const coopaxSearch = wrap(Vue, App);

window.customElements.define('coopax-search', coopaxSearch);

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app');
