<template>
  <div v-if="article" class="col-md-6" tabindex="-1">
    <h2 class="mb-2 text-white">Article Details</h2>
    <div class="card">
      <h4 class="mb-4 card-header">{{ article.title }}</h4>

      <div class="mb-4 card-body" v-html="article.content" />

      <a
        :href="article.link"
        target="_blank"
        rel="noopener"
        class="inline-block bg-teal hover:bg-teal-dark text-dark font-bold py-2 px-4 no-underline card-text"
      >
        View original
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: "SingleArticle",

  props: ["article"],

  watch: {
    article: {
      immediate: true,
      handler() {
        if (this.article) {
          this.$nextTick(() => {
            this.$el.focus();
            window.scroll(0, 0);
          });
        }
      },
    },
  },
};
</script>

<style></style>
