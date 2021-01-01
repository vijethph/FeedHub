<template>
  <div>
    <nav
      v-if="this.$route.name === 'news'"
      id="sidebar"
      class="navbar-collapse collapse bg-dark"
    >
      <ul class="list-unstyled mt-5">
        <li
          class="components"
          v-for="source in sources"
          :key="source.id"
          @click="selectSource(source.id)"
        >
          <a href="#"
            ><img class="icon" :src="getImgUrl(source.id)" />{{
              source.name
            }}</a
          >
        </li>
      </ul>
      <ul class="list-unstyled CTAs">
        <li>
          <!-- Button trigger modal -->
          <button
            type="button"
            class="btn btn-primary"
            data-toggle="modal"
            data-target="#exampleModal"
          >
            <i class="far fa-heart"></i> Configure Favourites
          </button>
        </li>
      </ul>
    </nav>
    <!-- Modal -->
    <div
      class="modal fade"
      id="exampleModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-scrollable" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">
              News Sources for {{ useremail }}
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
            <div
              class="list-group"
              v-for="source in allsources"
              :key="source.id"
            >
              <input
                type="checkbox"
                name="CheckBoxInputName"
                :value="source.id"
                :id="source.id"
                v-model="selectedsources"
              />
              <label class="list-group-item" :for="source.id"
                ><img class="icon" :src="getImgUrl(source.id)" />{{
                  source.name
                }}</label
              >
            </div>

            <!--
            <ul class="list-unstyled mt-5">
              <li
                class="components"
                v-for="source in sources"
                :key="source.id"
              >
                <a href="#"
                  ><img class="icon" :src="getImgUrl(source.id)" />{{
                    source.name
                  }}</a
                >
              </li>
            </ul>

            -->
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
              v-on:click="saveChanges"
            >
              Save changes
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import firebase from "firebase";

const db = firebase.firestore();

export default {
  props: {
    api_key: String,
    drawer: Boolean,
    useremail: String,
  },

  data: () => ({
    selectedsources: [],
    allsources: [],
    sources: [],
    errors: [],
  }),

  created() {
    //const dataobj = this;

    axios
      .get("https://newsapi.org/v2/sources?language=en&apiKey=" + this.api_key)
      .then((response) => {
        //this.articles = response.data.articles
        this.allsources = response.data.sources;
        console.log("data:");
        console.log(response.data.sources); // This will give you access to the full object
      })
      .catch((e) => {
        this.errors.push(e);
      });

    db.collection("userfavs")
      .doc(firebase.auth().currentUser.uid)
      .get()
      .then((doc) => {
        if (doc.exists) {
          console.log("whatever this object is: ", this);
          console.log("Document data:", doc.data());
          //dataobj.sources = doc.data().newssources;

          this.sources = this.allsources.filter((e) =>
            doc.data().newssources.includes(e.id)
          );
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
          this.sources = this.allsources;
        }
      })
      .catch(function(error) {
        console.log("Error getting document:", error);
      });
  },

  methods: {
    getImgUrl(pic) {
      return require("../assets/images/" + pic + ".png");
    },

    selectSource(source) {
      this.$emit("selectsource", source);
    },
    saveChanges() {
      db.collection("userfavs")
        .doc(firebase.auth().currentUser.uid)
        .update({
          newssources: this.selectedsources,
        })
        .then(function() {
          console.log("Document successfully updated!");
        })
        .catch(function(error) {
          // The document probably doesn't exist.
          console.error("Error updating document: ", error);
        });
      this.sources = this.allsources.filter((e) =>
        this.selectedsources.includes(e.id)
      );
      console.log(this.selectedsources);
    },
  },
};
</script>

<style scoped>
a,
a:hover,
a:focus {
  color: inherit;
  text-decoration: none;
  transition: all 0.3s;
}

#sidebar {
  padding: 20px;
  color: #fff;
  height: 100%;
  overflow: auto;
  position: fixed;
  z-index: 1;
}

#sidebar ul li a {
  padding: 10px;
  font-size: 1.1em;
  display: block;
}

#sidebar ul li a:hover {
  color: #fff;
  background: #318fb5;
}

ul.CTAs {
  padding: 20px;
}

ul.CTAs a {
  text-align: center;
  font-size: 0.9em !important;
  display: block;
  border-radius: 5px;
  margin-bottom: 5px;
  background-color: blue;
}

.icon {
  border-radius: 20vh;
  width: 45px;
  margin-right: 15px;
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
