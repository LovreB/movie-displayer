<template>
<div class="content-card">
  <slot></slot>
</div>
</template>

<script>
export default {
name: "content-card.vue"
}
</script>

<style lang="scss" scoped>
@import ".././styles/variables.scss";
.content-card {
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: $border-radius;
  padding: $padding-medium;
  color: rgba(0,0,0,0.7);
}
@media (max-width: $mobile-medium-max-width) {
  .content-card {
    border-radius: 0;
  }
}
</style>