<template>
  <div class="vue-template">
    <!-- Navigation -->

    <!-- Main -->
    <div class="App">
      <Navbar />
      <router-view />
    </div>
  </div>
</template>
<script>
import Navbar from "./components/Navbar";
export default {
  name: "app",
  components: {
    Navbar,
  },
};
</script>
<style>
nav {
  margin-bottom: 10px;
}
</style>
