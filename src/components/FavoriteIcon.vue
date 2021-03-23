<template>
  <img :src="imgSrc" class="favorite-icon" @click="toggleFavorite"/>
</template>

<script>
import {isFavorite, toggleFavorite} from "@/utils/favorite-helper";

export default {
  name: 'FavoriteIcon',
  props: {
    imdbId: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      isFavorite: false
    }
  },
  computed: {
    imgSrc() {
      return (this.isFavorite)
        ? require('../assets/heart-filled.png')
        : require('../assets/heart-light.png')
    }
  },
  created() {
    this.isFavorite = isFavorite(this.imdbId);
  },
  methods: {
    toggleFavorite(e) {
      e.stopPropagation();
      this.isFavorite = !this.isFavorite;
      toggleFavorite(this.imdbId);
      this.$emit('favorite-changed');
    }
  },
}
</script>

<style lang="scss" scoped>
@import ".././styles/variables.scss";

.favorite-icon {
  cursor: pointer;
}
</style>