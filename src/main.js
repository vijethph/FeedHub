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
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  databaseURL: process.env.DATABASE_URL,
  projectId: process.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.APP_ID,
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
