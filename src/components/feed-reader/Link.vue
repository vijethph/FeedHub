<template>
  <a href="#" :class="linkClass">
    {{ linkText }}
  </a>
</template>

<script>
export default {
  name: "Link",
  props: ["linkText", "isActive"],

  computed: {
    linkClass() {
      let classes = "";

      if (this.isActive) {
        classes += " bg-light text-dark active";
      } else {
        classes += "hover:bg-warning";
      }

      return classes;
    },
  },
};
</script>
<style scoped>
a,
a:hover,
a:focus {
  color: inherit;
  text-decoration: none;
  transition: all 0.3s;
}
a {
  padding: 10px;
  font-size: 1.1em;
  display: block;
}
a:hover {
  color: #fff;
  background: #318fb5;
}
</style>
