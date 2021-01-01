import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import firebase from "firebase";
import "bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "@/assets/main.css";
import VueSocialSharing from "vue-social-sharing";
import VueParticles from 'vue-particles'
Vue.use(VueParticles);

Vue.use(VueSocialSharing);
Vue.config.productionTip = false;

const firebaseConfig = {
  apiKey: "AIzaSyBmuhGmAn5MF3jx4k6LAbdbv6yi56RvMZE",
  authDomain: "newsrssapp.firebaseapp.com",
  databaseURL: "https://newsrssapp.firebaseio.com",
  projectId: "newsrssapp",
  storageBucket: "newsrssapp.appspot.com",
  messagingSenderId: "879955215758",
  appId: "1:879955215758:web:23d00154413a56409490df",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

//const db = firebase.firestore();

let app;

firebase.auth().onAuthStateChanged(user => {
 if (!app) {
    //wait to get user
    

    //start app
    app = new Vue({
      router,
      created() {
        //redirect if user not logged in
        if (!user) {
          this.$router.push("/");
        }
      },
      render: h => h(App)
    }).$mount("#app");
  }
});
