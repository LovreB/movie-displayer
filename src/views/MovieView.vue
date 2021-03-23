<template>
<div class="movie-view">
  <router-link :to="{ name: browseRoute }" custom v-slot="{ navigate }">
    <img
      class="movie-view__back"
      src="../assets/left-arrow_1.svg"
      @click="navigate"
      @keypress.enter="navigate"
      role="link"/>
  </router-link>
  <div v-if="!isLoading">
    <MovieHeader
      :movie="movie"/>
    <MovieContent
      :movie="movie"/>
  </div>
  <div v-if="isLoading" class="movie-view__loading">
    <vue-loading type="bubbles" color="white" :size="{ width: '100px', height: '100px' }"></vue-loading>
  </div>
</div>
</template>

<script>
import { getMovieFull } from "@/utils/api";
import {RouteNames} from "@/utils/strings";
import MovieContent from "@/components/MovieContent";
import MovieHeader from "@/components/MovieHeader";
import { VueLoading } from 'vue-loading-template'


export default {
  name: 'MovieView',
  components: {MovieHeader, MovieContent, VueLoading },
  data() {
    return {
      movie: null,
      browseRoute: RouteNames.BROWSE
    }
  },
  computed: {
    imdbId() {
      return this.$route.params.imdbId;
    },
    imdbRating() {
      if (this.isLoading)
        return ''
      return this.movie.imdbRating + '/10';
    },
    isLoading() {
      return this.movie == null;
    },
    subtitle() {
      if (this.isLoading)
        return ''
      const attributes = [
          this.movie.Year,
          this.movie.Genre,
          this.movie.Runtime
      ]
      return attributes.join(' - ')
    },
  },
  created() {
    this.loadMovie();
  },
  methods: {
    async loadMovie() {
      this.movie = await getMovieFull(this.imdbId);
    }
  }
}
</script>

<style lang="scss" scoped>
@import ".././styles/variables.scss";

$imgWidth: 200px;
$imgHeight: 300px;

.movie-view {
  max-width: $mobile-large-max-width;
  flex-wrap: wrap;
  display: flex;
  margin: auto;
  padding: $padding-medium;

  &__loading {
    width: 100%;
    height: 90vh;
    display: flex;
    align-items: center;
  }
  &__back {
    height: 25px;
    cursor: pointer;
  }
}

@media (max-width: $mobile-medium-max-width) {
  .movie-view {
    padding: 0;
    &__back {
      padding: $padding-medium;
    }
  }
}
</style>