import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import * as firebase from 'firebase';
import 'bootstrap/dist/css/bootstrap.min.css'
import '@/assets/css/main.css'
import './plugins/Axios';
Vue.config.productionTip = false

const firebaseConfig = {
  apiKey: "AIzaSyBZfmVs4WwDLkicbH6LNJ3qmOTRGnu2JnQ",
  authDomain: "vari-2f1aa.firebaseapp.com",
  projectId: "vari-2f1aa",
  storageBucket: "vari-2f1aa.appspot.com",
  messagingSenderId: "208921726994",
  appId: "1:208921726994:web:ad8a8f305bf238a7a248cb",
  measurementId: "G-98HGEG8FVN"
};

firebase.initializeApp(firebaseConfig);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
