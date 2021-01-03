<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-12">
        <Sidebar
          :api_key="api_key"
          @selectsource="setResource"
          :useremail="user.email"
        />
      </div>
      <div class="offset-md-2 col-md-8">
        <div class="card my-5" v-for="article in articles" :key="article.title">
          <img
            class="card-img-top"
            alt="Card image cap"
            v-bind:src="article.urlToImage"
          />
          <div class="card-body">
            <h5 class="card-title">{{ article.title }}</h5>
            <p class="card-text">
              {{ article.description }}
            </p>
            <div class="row align-items-center text-center">
              <div class="col-xs-12 col-md-4">
                <span class="lead">
                  <span class="badge badge-pill badge-dark"
                    >Source: {{ article.source.name }}</span
                  ></span
                >
              </div>
              <div class="col-xs-12  col-md-4">
                <ul class="social-network social-circle">
                  <li>
                    <ShareNetwork
                      network="facebook"
                      url="{article.url}"
                      title="{article.title}"
                      description="{article.description}"
                    >
                      <i class="fab fa-facebook icoFacebook"></i>
                    </ShareNetwork>
                  </li>
                  <li>
                    <ShareNetwork
                      network="twitter"
                      url="{article.url}"
                      title="{article.title}"
                    >
                      <i class="fab fa-twitter icoTwitter"></i>
                    </ShareNetwork>
                  </li>
                  <li>
                    <ShareNetwork
                      network="reddit"
                      url="{article.url}"
                      title="{article.title}"
                    >
                      <i class="fab fa-reddit icoReddit"></i>
                    </ShareNetwork>
                  </li>
                  <li>
                    <ShareNetwork network="linkedin" url="{article.url}">
                      <i class="fab fa-linkedin icoLinkedin"></i>
                    </ShareNetwork>
                  </li>
                </ul>
              </div>
              <div class="col-xs-12 col-md-4">
                <a
                  v-bind:href="article.url"
                  target="_blank"
                  class="card-link float-md-right btn btn-primary"
                  >Read more...</a
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";
import Sidebar from "./Sidebar";
import axios from "axios";
export default {
  components: { Sidebar },
  data() {
    return {
      user: null,
      api_key: process.env.VUE_APP_NEWSAPI_API_KEY,
      articles: [],
      errors: [],
    };
  },
  created() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.user = user;
      } else {
        this.user = null;
      }
    });
    axios
      .get(
        "https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=" +
          this.api_key
      )
      .then((response) => {
        this.articles = response.data.articles;
        console.log("data:");
        console.log(response.data.articles).catch((e) => {
          this.errors.push(e);
        });
      });
  },
  methods: {
    logOut() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          firebase.auth().onAuthStateChanged(() => {
            this.$router.push("/login");
          });
        });
    },
    setResource(source) {
      axios
        .get(
          "https://newsapi.org/v2/top-headlines?sources=" +
            source +
            "&apiKey=" +
            this.api_key
        )
        .then((response) => {
          //this.articles = response.data.articles
          this.articles = response.data.articles;
          console.log("Source Articles:");
          console.log(response.data.articles); // This will give you access to the full object
        })
        .catch((e) => {
          this.errors.push(e);
        });
    },
  },
};
</script>

<style scoped>
ul.social-network {
  list-style: none;
  display: inline;
  padding: 0;
}
ul.social-network li {
  display: inline;
  margin: 0 5px;
}

.social-network i.icoFacebook {
  background-color: #3b5998;
}
.social-network i.icoTwitter {
  background-color: #33ccff;
}
.social-network i.icoReddit {
  background-color: #ff5700;
}
.social-network i.icoLinkedin {
  background-color: #007bb7;
}

.social-network i.icoFacebook,
.social-network i.icoTwitter,
.social-network i.icoReddit,
.social-network i.icoLinkedin {
  color: #fff;
}

.social-circle li i {
  display: inline-block;
  position: relative;
  margin: 0 auto 0 auto;
  -moz-border-radius: 50%;
  -webkit-border-radius: 50%;
  border-radius: 50%;
  text-align: center;
  width: 50px;
  height: 50px;
  font-size: 20px;
}
.social-circle li i {
  margin: 0;
  line-height: 50px;
  text-align: center;
}
</style>
