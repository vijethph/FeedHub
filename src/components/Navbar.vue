<template>
  <nav class="navbar navbar-expand navbar-dark bg-dark navbar-fixed-top">
    <a href class="navbar-brand" @click.prevent>NewsRSSApp</a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  
  <div class="collapse navbar-collapse" id="navbarTogglerDemo02">
    <div class="navbar-nav ml-auto">
      <li class="nav-item" v-if="isLoggedIn">
        <span class="nav-link">{{ currentUser }}</span>
      </li>
      <li class="nav-item" v-if="isLoggedIn">
        <router-link to="/dashboard" class="nav-link">
          Dashboard
        </router-link>
      </li>
      <li v-if="!isLoggedIn" class="nav-item">
        <router-link to="/login" class="nav-link">Login</router-link>
      </li>
      <li v-if="!isLoggedIn" class="nav-item">
        <router-link to="/register" class="nav-link">Register</router-link>
      </li>
      <li class="nav-item" v-if="isLoggedIn">
        <button v-on:click="logout" class="btn btn-outline-primary text-white">
          Logout
        </button>
      </li>
    </div>
    </div>
  </nav>
</template>

<script>
import firebase from "firebase";
export default {
  name: "Navbar",
  data() {
    return {
      user: null,
      isLoggedIn: false,
      currentUser: false,
    };
  },
  created() {
    //console.log(firebase.auth().currentUser);

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.isLoggedIn = true;
        this.user = user;
        this.currentUser = user.email;
      } else {
        this.user = null;
        this.isLoggedIn = false;
        this.currentUser = false;
      }
    });
  },

  /*

    if (firebase.auth().currentUser) {
      console.log("boomedin");
      this.isLoggedIn = true;
      this.currentUser = firebase.auth().currentUser.email;
    }
    */

  methods: {
    logout: function() {
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

<style></style>
