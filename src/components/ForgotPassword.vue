<template>
  <div class="col-md-12">
    <div class="card card-container">
      <img id="profile-img" src="../assets/user.png" class="profile-img-card" />
      <h3 class="font-weight-bold">Forgot Password</h3>
      <form name="form" @submit.prevent="forgetPassword">
        <div class="form-group">
          <label for="username">Email address</label>
          <div class="input-group">
            <div class="input-group-prepend">
              <span class="input-group-text"
                ><i class="fas fa-envelope"></i
              ></span>
            </div>
            <input v-model="user.email" type="email" class="form-control" />
          </div>
        </div>
        <div class="form-group">
          <button class="btn btn-primary btn-block" :disabled="loading">
            <span
              v-show="loading"
              class="spinner-border spinner-border-sm"
            ></span>
            <span>Reset Password</span>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";

export default {
  data() {
    return {
      user: {
        email: "",
      },
    };
  },
  methods: {
    forgetPassword() {
      firebase
        .auth()
        .sendPasswordResetEmail(this.user.email)
        .then(() => {
          alert("Check your registered email to reset the password!");
          this.user = {
            email: "",
          };
        })
        .catch((error) => {
          alert(error);
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
