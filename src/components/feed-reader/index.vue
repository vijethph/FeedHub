<template>
  <div>
    <nav
      v-if="this.$route.name === 'rssfeeds'"
      id="sidebar"
      class="navbar-collapse collapse bg-dark col-sm-6 col-md-3"
    >
      <FeedList
        :feeds="feeds"
        :selectedFeed="selectedFeed"
        @onSelectFeed="handleSelectFeed"
      />
      <center>
        <!-- Button trigger modal -->
        <button
          type="button"
          class="btn btn-primary text-center"
          data-toggle="modal"
          data-target="#exampleModal"
        >
          <i class="fas fa-rss-square"></i> Configure RSS Feeds
        </button>
      </center>
    </nav>

    <div class="row mt-3">
      <div class="col">
        <h1 class="mb-6 text-white">Feed Reader</h1>
      </div>
    </div>
    <div class="row">
      <Loading :isLoading="isLoading" />
    </div>
    <div class="row">
      <ArticleList
        :articles="articles"
        :selectedArticle="selectedArticle"
        @onSelectArticle="handleSelectArticle"
      />
      <SingleArticle :article="selectedArticle" />
    </div>
    <div
      class="modal fade"
      id="exampleModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">
              Configure RSS Feeds
            </h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="list-group" v-for="rssurl in rssurls" :key="rssurl">
              <input
                type="checkbox"
                name="CheckBoxInputName"
                :value="rssurl"
                :id="rssurl"
                v-model="selectedrssurls"
              />
              <label class="list-group-item" :for="rssurl">{{ rssurl }}</label>
            </div>
            <label for="basic-url">Enter RSS Feed URL</label>
            <div class="input-group mb-3">
              <input
                type="text"
                class="form-control"
                id="basic-url"
                v-model="addurl"
              />
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-dismiss="modal"
            >
              Close
            </button>
            <button
              type="button"
              class="btn btn-primary"
              v-on:click="addToList"
            >
              Add new URL
            </button>
            <button
              type="button"
              class="btn btn-success"
              v-on:click="saveChanges"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import FeedList from "./FeedList.vue";
import ArticleList from "./ArticleList.vue";
import SingleArticle from "./SingleArticle.vue";
import Loading from "./Loading.vue";
import firebase from "firebase";

const db = firebase.firestore();

export default {
  name: "FeedReader",
  components: { ArticleList, FeedList, SingleArticle, Loading },

  data() {
    return {
      rssurls: ["https://hnrss.org/frontpage", "https://www.reddit.com/.rss"],
      addurl: "",
      isLoading: false,
      feeds: [],
      articles: [],
      selectedFeed: null,
      selectedArticle: null,
      selectedrssurls: [],
    };
  },
  created() {
    db.collection("userfavs")
      .doc(firebase.auth().currentUser.uid)
      .get()
      .then((doc) => {
        if (!doc.exists) {
          console.log("oh no.. no doc found");
        } else {
          console.log("hooray, doc found", doc.data().rssfeeds);
          if (doc.data().rssfeeds.length) {
            this.rssurls = doc.data().rssfeeds;
          }

          //console.log('modified array: ',this.rssurls);
        }

        this.getFeeds();
      })
      .catch(function(error) {
        console.log("Error getting document:", error);
      });
  },

  methods: {
    /*
    async getURLs() {
      const rssRef = db
        .collection("userfavs")
        .doc(firebase.auth().currentUser.uid);
      const doc = await rssRef.get();
      if (!doc.exists) { console.log('oh no.. no doc found');
      } else {
        console.log('hooray, doc found',doc.data().rssfeeds);
        this.rssurls = doc.data().rssfeeds;

        console.log('modified array: ',this.rssurls);
        //this.getFeeds();
      }
    },
    */
    getFeeds() {
      // console.log('before making axios request',this.rssurls);
      let body = {
        feeds: this.rssurls,
      };

      this.isLoading = true;

      axios
        .post(process.env.RSS_PARSING_URL, body)
        .then((response) => {
          this.feeds = response.data;
          console.log("got rss feeds", response.data);
          this.isLoading = false;
        })
        .catch((e) => {
          console.log("axios post req failed", e);
        });
    },

    handleSelectArticle(article) {
      this.selectedArticle = article;
    },

    handleSelectFeed(feed) {
      this.selectedFeed = feed;
      this.articles = feed.items;
      this.selectedArticle = null;
    },
    addToList() {
      this.rssurls.push(this.addurl);
    },
    saveChanges() {
      console.log("selected ones", this.selectedrssurls);
      this.rssurls = this.selectedrssurls;

      db.collection("userfavs")
        .doc(firebase.auth().currentUser.uid)
        .update({
          rssfeeds: this.rssurls,
        })
        .then(function() {
          console.log("Document successfully updated!");
        })
        .catch(function(error) {
          // The document probably doesn't exist.
          console.error("Error updating document: ", error);
        });
      //console.log("whatever the hell is this", unionRes);
    },
  },
};
</script>

<style scoped>
#sidebar {
  padding: 5px;
  color: #fff;
  height: 100%;
  overflow: auto;
  position: fixed;
  z-index: 1;
}

.navbar-collapse {
  top: 0;
  left: 0;
  padding-left: 15px;
  padding-right: 15px;
  padding-bottom: 15px;
  height: 100%;
}

.navbar-collapse.collapsing {
  height: 100%;
  left: -75%;
  transition: height 0s ease;
}

.navbar-collapse.show {
  height: 100%;
  left: 0;
  transition: left 400ms ease-in-out;
}

.navbar-toggler.collapsed ~ .navbar-collapse {
  transition: left 400ms ease-in;
}

.list-group-item {
  user-select: none;
}

.list-group input[type="checkbox"] {
  display: none;
}

.list-group input[type="checkbox"] + .list-group-item {
  cursor: pointer;
}

.list-group input[type="checkbox"] + .list-group-item:before {
  content: "\2713";
  color: transparent;
  font-weight: bold;
  margin-right: 1em;
}

.list-group input[type="checkbox"]:checked + .list-group-item {
  background-color: #0275d8;
  color: #fff;
}

.list-group input[type="checkbox"]:checked + .list-group-item:before {
  color: inherit;
}
</style>
