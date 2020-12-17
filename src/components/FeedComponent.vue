<template>
  <div class="container-xl p-8">
    <h1 class="mb-6 text-white">Feed Reader</h1>
  
    <FeedReader />
  </div>
</template>

<script>
import FeedReader from './feed-reader/index.vue'
export default {
  name: 'FeedComponent',
  components: { FeedReader }
}
</script>
