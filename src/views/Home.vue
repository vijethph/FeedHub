<template>
  <div class="home justify-content-center">
    <img alt="Vue logo" src="../assets/logo.png" width="200" height="200" />
    <h1 class="display-3 text-center text-white font-weight-bold">FeedHub</h1>
  </div>
</template>

<script>
// @ is an alias to /src
//import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: "Home",
  components: {},
};
</script>

<style scoped>
img {
  position: fixed;
  top: 30%;
  left: 50%;
  /* bring your own prefixes */
  transform: translate(-50%, -50%);
}
h1 {
  position: fixed;
  top: 60%;
  left: 50%;
  /* bring your own prefixes */
  transform: translate(-50%, -50%);
  text-shadow: 0 1px 0 #ccc, 0 2px 0 #c9c9c9, 0 3px 0 #bbb, 0 4px 0 #b9b9b9,
    0 5px 0 #aaa, 0 6px 1px rgba(0, 0, 0, 0.1), 0 0 5px rgba(0, 0, 0, 0.1),
    0 1px 3px rgba(0, 0, 0, 0.3), 0 3px 5px rgba(0, 0, 0, 0.2),
    0 5px 10px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.2),
    0 20px 20px rgba(0, 0, 0, 0.15);
}
</style>
