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
      let classes =
        "no-underline p-2 block border-grey border border-b-0 nav-link";

      if (this.isActive) {
        classes += " bg-light text-dark active";
      } else {
        classes += " text-warning hover:bg-warning";
      }

      return classes;
    },
  },
};
</script>
