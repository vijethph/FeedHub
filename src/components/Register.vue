<template>
  <div class="col-md-12">
    <div class="card card-container">
      <h3 class="text-center p-2 mb-2">Register</h3>
      <img
        id="profile-img"
        src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
        class="profile-img-card"
      />
      <form name="form" @submit.prevent="userRegistration">
        <div class="form-group">
          <label for="username">Name</label>
          <input v-model="user.name" type="text" class="form-control" />
        </div>
        <div class="form-group">
          <label for="useremail">Email address</label>
          <input v-model="user.email" type="email" class="form-control" />
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input v-model="user.password" type="password" class="form-control" />
        </div>
        <div class="form-group">
          <button class="btn btn-primary btn-block" :disabled="loading">
            <span
              v-show="loading"
              class="spinner-border spinner-border-sm"
            ></span>
            <span>Register</span>
          </button>
        </div>
        <div class="form-group">
          <p class="forgot-password text-right">
            Already registered
            <router-link :to="{ name: 'login' }">sign in?</router-link>
          </p>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";

const db = firebase.firestore();

export default {
  data() {
    return {
      user: {
        name: "",
        email: "",
        password: "",
      },
    };
  },
  methods: {
    userRegistration() {
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.user.email, this.user.password)
        .then((res) => {
          db.collection('userfavs').doc(firebase.auth().currentUser.uid).add({  useremail:this.user.email, newssources:[], rssfeeds: []  }).then(() => {
            console.log("Users Document successfully written!");
          })
          .catch((error) => {
            console.error("Error writing document: ", error);
          });
          res.user
            .updateProfile({
              displayName: this.user.name,
            })
            .then(() => {
              this.$router.push("/login");
            });
        })
        .catch((error) => {
          alert(error.message);
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
