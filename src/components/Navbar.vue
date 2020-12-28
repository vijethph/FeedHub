<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
    <button
      class="navbar-toggler d-md-block"
      v-if="
        isLoggedIn &&
          (this.$route.name === 'rssfeeds' || this.$route.name === 'news')
      "
      type="button"
      data-toggle="collapse"
      data-target="#sidebar"
      aria-controls="sidebar"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <!-- <span class="navbar-toggler-icon"></span> -->
      <span class="navbar-toggler-icon"></span>
    </button>
    <!-- <button class="open">Source</button> -->
    <a href class="navbar-brand" @click.prevent>NewsRSSApp</a>
    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarTogglerDemo02"
      aria-controls="navbarTogglerDemo02"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>

    <div class="navbar-collapse collapse" id="navbarTogglerDemo02">
      <div class="navbar-nav ml-auto">
        <li class="nav-item" v-if="isLoggedIn">
          <router-link to="/news" class="nav-link">
            News
          </router-link>
        </li>
        <li class="nav-item" v-if="isLoggedIn">
          <router-link to="/rssfeeds" class="nav-link">
            RSS Feeds
          </router-link>
        </li>

        <li class="nav-item" v-if="isLoggedIn">
          <router-link to="/dashboard" class="nav-link">
            Dashboard
          </router-link>
        </li>
        <li class="nav-item" v-if="isLoggedIn">
          <span class="nav-link ">{{ currentUser }}</span>
        </li>
        <li v-if="!isLoggedIn" class="nav-item">
          <router-link to="/login" class="nav-link">Login</router-link>
        </li>
        <li v-if="!isLoggedIn" class="nav-item">
          <router-link to="/register" class="nav-link">Register</router-link>
        </li>
        <li class="nav-item" v-if="isLoggedIn">
          <button
            v-on:click="logout"
            class="btn btn-outline-primary text-white"
          >
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
