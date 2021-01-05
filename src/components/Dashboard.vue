<template>
  <div class="col-md-12">
    <div class="card card-container">
      <h3 class="text-center p-2 mb-2 font-weight-bold">Welcome</h3>
      <img id="profile-img" src="../assets/user.png" class="profile-img-card" />
      <p><i class="fas fa-user"></i> {{ user.displayName }}</p>
      <p><i class="fas fa-envelope"></i> {{ user.email }}</p>
      <button
        type="submit"
        class="btn btn-dark btn-lg btn-block"
        @click="logOut()"
      >
        Log out
      </button>
    </div>
    <div class="d-flex align-items-center card">
    <vue-weather :api-key="weather_api_key" units="uk" />
    </div>
  </div>
</template>

<script>
import firebase from "firebase";
import VueWeather from "vue-weather-widget";
require('dotenv').config();
const db = firebase.firestore();

export default {
  data() {
    return {
      user: null,
      weather_api_key: process.env.VUE_APP_WEATHER_API_KEY,
    };
  },
  components: {
      VueWeather,
    },
  created() {
    var user = firebase.auth().currentUser;

    if (user) {
      // User is signed in.
      this.user = user;
      db.collection("userfavs")
        .doc(user.uid)
        .get()
        .then((doc) => {
          if (doc.exists) {
            //console.log("whatever this object is: ", this);
            console.log("Document data:", doc.data());
          } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");

            db.collection("userfavs")
              .doc(user.uid)
              .set({ useremail: user.email, newssources: [], rssfeeds: [] })
              .then(() => {
                console.log("Users Document successfully created!");
              })
              .catch((error) => {
                console.error("Error creating document for new user: ", error);
              });
          }
        })
        .catch(function(error) {
          console.log("Error getting document:", error);
        });
    } else {
      // No user is signed in.
      this.user = null;
    }
  },
  methods: {
    logOut() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.push("/login");
        });
    },
  },
};
</script>
<style scoped>
label {
  display: block;
  margin-top: 10px;
}

.card-container.card {
  max-width: 350px !important;
  padding: 20px 20px;
}

.card {
  background-color: #f7f7f7;
  padding: 20px 25px 30px;
  margin: 0 auto 25px;
  margin-top: 50px;
  -moz-border-radius: 2px;
  -webkit-border-radius: 2px;
  border-radius: 2px;
  -moz-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
  -webkit-box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
}

.profile-img-card {
  width: 96px;
  height: 96px;
  margin: 0 auto 10px;
  display: block;
  -moz-border-radius: 50%;
  -webkit-border-radius: 50%;
  border-radius: 50%;
}
</style>
