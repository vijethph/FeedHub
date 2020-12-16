<template>
  <nav id="sidebar" class="navbar-collapse collapse bg-dark">
    <ul class="list-unstyled mt-5">
      <li
        class="components"
        v-for="source in sources"
        :key="source.id"
        @click="selectSource(source.id)"
      >
        <a href="#"
          ><img class="icon" :src="getImgUrl(source.id)" />{{ source.name }}</a
        >
      </li>
    </ul>
    <ul class="list-unstyled CTAs">
      <li><a href="#" class="download">Subscribe</a></li>
    </ul>
  </nav>
</template>

<script>
import axios from "axios";
export default {
  props: {
    api_key: String,
    drawer: Boolean,
  },

  data: () => ({
    sources: [],
    errors: [],
  }),

  created() {
    axios
      .get("https://newsapi.org/v2/sources?language=en&apiKey=" + this.api_key)
      .then((response) => {
        //this.articles = response.data.articles
        this.sources = response.data.sources;
        console.log("data:");
        console.log(response.data.sources); // This will give you access to the full object
      })
      .catch((e) => {
        this.errors.push(e);
      });
  },

  methods: {
    getImgUrl(pic) {
      return require("../assets/images/" + pic + ".png");
    },

    selectSource(source) {
      this.$emit("selectsource", source);
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
</style>
