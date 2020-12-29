<template>
  <div>
    <ul class="list-unstyled mt-5" v-if="feeds && feeds.length">
      <li
        class="components"
        v-for="feed in feeds"
        :key="feed.title"
        @click="selectFeed(feed)"
      >
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
/* .customd {
  height: 350px;
  overflow-y: auto;
  -ms-flex-wrap: nowrap;
  flex-wrap: nowrap;
} */
ul li {
  padding: 10px;
  font-size: 1.1em;
  display: block;
}
/* ul.CTAs {
  padding: 20px;
} */
</style>
