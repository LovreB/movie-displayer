<template>
<div class="content-card-row">
  <p class="content-card-row__title">{{ title }}</p>
  <p class="content-card-row__subtitle">
    <b v-if="large" class="content-card-row__large">{{ large }}</b>
    <b>{{ subtitle }}</b>
  </p>
</div>
</template>

<script>
export default {
  name: "ContentCardRow",
  props: {
    title: {
      type: String,
      required: true
    },
    subtitle: {
      type: String,
      required: false
    },
    large: {
      type: String,
      required: false
    }
  }
}
</script>

<style lang="scss" scoped>
.content-card-row {
  &__title {
    margin-bottom: 0;
    font-size: 13px;
  }
  &__subtitle {
    margin-top: 0;
  }
  &__large {
    font-size: 70px;
  }
}
</style>