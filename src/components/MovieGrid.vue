<template>
  <div class="movie-grid">
    <MovieGridItem
        v-for="movie in movies"
        :key="movie.imdbID"
        :movie="movie"
        v-on="$listeners"
    />
  </div>
</template>

<script>
import MovieGridItem from '@/components/MovieGridItem';

export default {
  name: 'MovieGrid',
  components: {
    MovieGridItem
  },
  props: {
    movies: {
      type: Array,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
@import ".././styles/variables.scss";

.movie-grid {
  flex-wrap: wrap;
  display: flex;
  padding: $padding-small;
}
</style>