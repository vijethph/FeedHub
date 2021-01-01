<template>
   
  <div class="vue-template">
  <vue-particles color="#dedede"></vue-particles>
    <!-- Navigation -->

    <!-- Main -->
    <div class="App">
      <Navbar />
      <router-view class="pt-5"/>
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
#particles-js { 
  /*position: absolute;
  background-size: cover;
  top: 0; 
  bottom: 0; 
  left: 0;
  right: 0; 
  overflow-y: hidden; 
  z-index: 0;*/
  width: 100%;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 0; 
}
</style>
