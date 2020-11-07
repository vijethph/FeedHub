<template>
    <div class="vue-template">
        <form @submit.prevent="userLogin">
            <h3>Sign In</h3>

            <div class="form-group">
                <label>Email address</label>
                <input type="email" class="form-control form-control-lg" v-model="user.email" />
            </div>

            <div class="form-group">
                <label>Password</label>
                <input type="password" class="form-control form-control-lg" v-model="user.password" />
            </div>

            <button type="submit" class="btn btn-dark btn-lg btn-block">Sign In</button>

            <p class="forgot-password text-right mt-2 mb-4">
                <router-link to="/forgot-password">Forgot password ?</router-link>
            </p>
            
        </form>
        <button @click="socialLogin" class="btn btn-outline-dark btn-lg btn-block">
        <img width="20px" style="margin-bottom:3px; margin-right:5px" alt="Google sign-in" src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/512px-Google_%22G%22_Logo.svg.png" />
        Sign In With Google</button>
    </div>
</template>


<script>
import firebase from "firebase";

export default {
  data() {
    return {
      user: {   
        email: '',
        password: ''
      }
    };
  },
  methods: {
    userLogin() {
        firebase
        .auth()
        .signInWithEmailAndPassword(this.user.email, this.user.password)
        .then(() => {
            this.$router.push('/home')
        })
        .catch((error) => {
          alert(error.message);
        });
    },
    socialLogin(){
        const provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider).then((result) => {
        
        // This gives you a Google Access Token. You can use it to access the Google API.
    //    var token = result.credential.accessToken;
        
        // The signed-in user info.
     //   var user = result.user;
     
        console.log(result);
        
        this.$router.push('/home');
      
      
        }).catch((error) => {
        
        
        // Handle Errors here.
        //var errorCode = error.code;
     //   var errorMessage = error.message;
        
        // The email of the user's account used.
      //  var email = error.email;
        
        // The firebase.auth.AuthCredential type that was used.
       // var credential = error.credential;
        
        
            alert(error.code + " " + error.message+ " "+error.email + " "+error.credential);
        });

    }
  }
};
</script>
