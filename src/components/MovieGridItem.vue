<template>
  <div class="movie-item">
    <router-link :to="{ name: routeName, params: { imdbId: movie.imdbID }}" custom v-slot="{ navigate }">
      <div @click="navigate" @keypress.enter="navigate" role="link" class="movie-item__img-wrapper">
        <img :src="imgSrc" class="img-wrapper__poster"/>
        <div class="img-wrapper__overlay">
          <FavoriteIcon
            class="img-wrapper__fav-button"
            :imdbId="id"
            v-on="$listeners"
          />
          <h3>{{movie.Title}}</h3>
        </div>
        <div class="img-wrapper__subtitle">
          <FavoriteIcon
              class="img-wrapper__fav-button"
              :imdbId="id"
              v-on="$listeners"
          />
          <p>{{movie.Title}}</p>
        </div>
      </div>
    </router-link>
  </div>
</template>

<script>
import { RouteNames } from "@/utils/strings";
import { toggleFavorite } from "@/utils/favorite-helper";
import FavoriteIcon from "@/components/FavoriteIcon";

export default {
  name: "MovieGridItem",
  components: {
    FavoriteIcon
  },
  props: {
    movie: {
      type: Object,
      required: true,
      validator(movie) {
        return movie.Title && movie.imdbID && movie.Poster;
      }
    }
  },
  data() {
    return {
      routeName: RouteNames.MOVIE
    }
  },
  computed: {
    id() {
      return this.movie.imdbID;
    },
    imgSrc() {
      return this.movie.Poster;
    }
  },
  methods: {
    toggleFavorite(e) {
      e.stopPropagation();
      toggleFavorite(this.id);
    }
  }
}
</script>

<style lang="scss" scoped>
@import ".././styles/variables.scss";

$imgWidth: 225px;
$imgHeight: 300px;
$imgWidthMobile: 100px;
$imgHeightMobile: 150px;

.movie-item {
  width: $imgWidth;
  padding: $padding-mini;

  &__img-wrapper {
    position: relative;
    height: $imgHeight;
    cursor: pointer;
  }

  .img-wrapper {
    &__poster {
      width: $imgWidth;
      height: $imgHeight;
      border-radius: $border-radius;
      cursor: pointer;
      position: absolute;
      top: 0;
      right: 0;
    }
    &__fav-button {
      height: 20px;
      width: 20px;
      display: block;
    }
    &__overlay {
      border-radius: $border-radius;
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-image: linear-gradient(rgba(33,33,33,0.2), rgba(0,0,0,1));
      opacity: 0;
      transition: all 1s;
      -webkit-transition: all 1s;
      color: white;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding: 14px;
      box-sizing: border-box;

      &:hover {
        opacity: 1
      }

      h3 {
        margin-bottom: 0;
      }
    }
    &__subtitle {
      display: none;
    }
  }
}
@media (max-width: $mobile-large-max-width) {
  .movie-item {
    width: calc(25% -  2 * #{$padding-mini});
    height: auto;
    &__img-wrapper {
      position: static;
      height: 100%;
      cursor: pointer;
    }
    .img-wrapper {
      &__poster {
        width: 100%;
        height: auto;
        position: static;
      }
      &__overlay {
        display:none;
      }

      &__subtitle {
        display: flex;
        align-items: center;
        p {
          color: white;
          font-weight: bold;
          margin: 0 $padding-small;
          font-size: 12px;
        }
      }
    }
  }
}
@media (max-width: $mobile-medium-max-width) {
  .movie-item {
    width: calc(33% -  2 * #{$padding-mini});
  }
}
@media (max-width: $mobile-small-max-width) {
  .movie-item {
    width: calc(50% -  2 * #{$padding-mini});
  }
}
</style>