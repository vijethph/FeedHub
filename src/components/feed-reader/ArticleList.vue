<template>
  <div v-if="articles && articles.length" tabindex="-1" class="col-md-4">
    <h2 class="mb-2 text-white">Articles</h2>
    <!--
    <div v-for="item in articles" :key="item.title" class="btn btn-outline-primary btn-md btn-block">
				<Link
          @click.native="selectArticle(item)"
          :isActive="isActive(item.title)"
          :linkText="item.title"
        />
	</div>
	-->

    <ul class="nav flex-column nav-pills customd bg-dark">
      <li
        v-for="item in articles"
        :key="item.title"
        class="nav-item p-2 text-white"
      >
        <Link
          @click.native="selectArticle(item)"
          :isActive="isActive(item.title)"
          :linkText="item.title"
        />
      </li>
    </ul>
  </div>
</template>

<script>
import Link from "./Link";
export default {
  name: "ArticleList",

  components: { Link },

  props: ["articles", "selectedArticle"],

  watch: {
    articles: {
      immediate: true,
      handler() {
        if (this.articles.length) {
          this.$nextTick(() => {
            this.$el.focus();
            window.scroll(0, 0);
          });
        }
      },
    },
  },
  methods: {
    selectArticle(article) {
      this.$emit("onSelectArticle", article);
    },

    isActive(title) {
      if (!this.selectedArticle) return "";
      return title === this.selectedArticle.title;
    },
  },
};
</script>
<style scoped>
.customd {
  height: 50vh;
  overflow-y: auto;
  -ms-flex-wrap: nowrap;
  flex-wrap: nowrap;
}
.nav-pills > .active {
  background-color: #ade8f4;
}
</style>
