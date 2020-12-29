<template>
  <div class="container">
    <FeedReader />
  </div>
</template>

<script>
import FeedReader from "./feed-reader/index.vue";
export default {
  name: "FeedComponent",
  components: { FeedReader },
};
</script>
