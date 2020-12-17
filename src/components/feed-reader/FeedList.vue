<template>
  <div class="col-md-2">
    <h2 class="mb-4 text-white">Feeds</h2>
    <ul v-if="feeds && feeds.length" class="nav flex-column nav-pills customd">
      <li v-for="feed in feeds" :key="feed.title" class="nav-item p-2">
        <Link
          @click.native="selectFeed(feed)"
          :isActive="isActive(feed.title)"
          :linkText="feed.title"
        />
      </li>
    </ul>
  </div>
</template>

<script>
import Link from "./Link.vue";
export default {
  name: "FeedList",

  components: { Link },

  props: ["feeds", "selectedFeed"],
  methods: {
    selectFeed(feed) {
      this.$emit("onSelectFeed", feed);
    },
    isActive(title) {
      if (!this.selectedFeed) return "";
      return title === this.selectedFeed.title;
    },
  },
};
</script>
<style scoped>
.customd {
  height: 350px;
  overflow-y: auto;
  -ms-flex-wrap: nowrap;
  flex-wrap: nowrap;
}
</style>
