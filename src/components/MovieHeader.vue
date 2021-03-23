<template>
<div class="movie-header">
  <img class="movie-header__img" :src="movie.Poster">
  <div class="movie-header__info">
    <div>
      <h1>{{movie.Title}}</h1>
      <p>{{subtitle}}</p>
    </div>
    <FavoriteIcon
        class="movie-header__favorite"
        :imdbId="imdbId"/>
  </div>
</div>

</template>

<script>
import FavoriteIcon from "@/components/FavoriteIcon";
import {RouteNames} from "@/utils/strings";

export default {
  name: 'MovieHeader',
  components: { FavoriteIcon},
  props: {
    movie: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      browseRoute: RouteNames.BROWSE,
    }
  },
  computed: {
    imdbId() {
      return this.$route.params.imdbId;
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
  }
}
</script>

<style lang="scss" scoped>
@import ".././styles/variables.scss";

$imgWidth: 200px;
$imgHeight: 300px;

.movie-header {
  display: flex;
  align-items: flex-end;
  color: rgba(255, 255, 255, 0.9);
  max-width: 960px;
  margin: -50px, auto, auto;

  &__img {
    border-radius: $border-radius;
    margin: 0 $padding-medium;
    width: 200px;
    position: relative;
    top: 150px;
  }
  &__mobile {
    display: none;
  }
  &__info {
    flex-grow: 1;
    display: flex;
    justify-content: space-between;
    align-items: center;
    h1 {
      margin: 0;
    }
    p {
      font-weight: bold;
      margin: 0.5em 0;
    }

  }
  &__favorite {
    height: 30px;
    margin: 0 $padding-medium;
  }
}

@media (max-width: $mobile-medium-max-width) {
  .movie-header {
    padding: $padding-medium $padding-medium $padding-small ;
    &__img {
      display: none;
    }
  }
}
</style>