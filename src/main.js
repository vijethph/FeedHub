import Vue from 'vue'
import App from './App.vue'
import router from './router'
import firebase from 'firebase';


import 'bootstrap/dist/css/bootstrap.min.css'
import '@/assets/main.css'



Vue.config.productionTip = false


 const firebaseConfig = process.env.FIREBASE_CONFIG;
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);


new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
