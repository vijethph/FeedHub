<template>
  <div class="container-fluid">
    <Loading :isLoading="isLoading" />
    <div v-if="!isLoading" class="row">
      <FeedList
        :feeds="feeds"
        :selectedFeed="selectedFeed"
        @onSelectFeed="handleSelectFeed"
      />

      <ArticleList
        :articles="articles"
        :selectedArticle="selectedArticle"
        @onSelectArticle="handleSelectArticle"
      />

      <SingleArticle :article="selectedArticle" />
    </div>
  </div>
</template>

<script>
import axios from "axios";
import FeedList from "./FeedList.vue";
import ArticleList from "./ArticleList.vue";
import SingleArticle from "./SingleArticle.vue";
import Loading from "./Loading.vue";
export default {
  name: "FeedReader",
  components: { ArticleList, FeedList, SingleArticle, Loading },

  data() {
    return {
      rssurls: ["https://hnrss.org/frontpage", "https://www.reddit.com/.rss"],
      isLoading: false,
      feeds: [],
      articles: [],
      selectedFeed: null,
      selectedArticle: null,
    };
  },
  created() {
    this.getFeeds();
  },

  methods: {
    async getFeeds() {
      let body = {
        feeds: this.rssurls,
      };

      this.isLoading = true;

      let { data } = await axios.post("http://localhost:5000/rssfeeds", body);

      console.log(data);

      this.feeds = data;
      this.isLoading = false;
    },

    handleSelectArticle(article) {
      this.selectedArticle = article;
    },

    handleSelectFeed(feed) {
      this.selectedFeed = feed;
      this.articles = feed.items;
      this.selectedArticle = null;
    },
  },
};
</script>

<style></style>
