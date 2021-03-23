<template>
<div class="browse-view">
  <div class="filter-bar">
    <div class="filter-bar__sorting">
      <p><b>Sort by:</b></p>
      <v-select
          :options="selectOptions"
          v-model="selected"
          class="filter-bar__dropdown"
      ></v-select>
    </div>
    <img src="../assets/heart-filled.png" class="filter-bar__favorite" @click="toggleFavoriteFilter"/>
  </div>
  <MovieGrid
      v-if="movies"
      :movies="sortedAndFilteredMovies"
      @favorite-changed="loadFavorites"
  />
  <div v-else class="browse-view__loading">
    <vue-loading type="bubbles" color="white" :size="{ width: '100px', height: '100px' }"></vue-loading>
  </div>
</div>
</template>

<script>
import vSelect from 'vue-select'
import MovieGrid from '@/components/MovieGrid';
import {getMovies} from "@/utils/api";
import {getFavorites} from "@/utils/favorite-helper";
import { VueLoading } from 'vue-loading-template'

export default {
  name: 'BrowseView',
  components: {
    MovieGrid,
    vSelect,
    VueLoading
  },
  data() {
    return {
      favorites: [],
      movies: null,
      selected: null,
      selectOptions: [
        {label: 'Title', attribute: 'Title', compareFn: this.stringCompare },
        {label: 'Year', attribute: 'Year', compareFn: this.numberCompare },
        {label: 'Rating', attribute: 'imdbRating', compareFn: this.numberCompare },
      ],
      favoriteFilter: false
    }
  },
  computed: {
    sortedMovies() {
      if (this.selected == null)
        return this.movies;
      const movieCopy = this.movies.slice(0);
      return movieCopy.sort((a, b) => {
        const attrA = a[this.selected.attribute];
        const attrB = b[this.selected.attribute];
        return this.selected.compareFn(attrA, attrB);
      })
    },
    sortedAndFilteredMovies() {
      if (this.favoriteFilter)
        return this.sortedMovies.filter(movie => this.favorites.indexOf(movie.imdbID) != -1)
      return this.sortedMovies;
    },
  },
  created() {
    this.favorites = getFavorites();
    this.loadMovies();

  },
  methods: {
    async loadMovies() {
      this.movies = await getMovies();
    },
    loadFavorites() {
      this.favorites = getFavorites();

    },
    numberCompare(a,b) {
      return a - b;
    },
    stringCompare(a,b) {
      return a.localeCompare(b);
    },
    toggleFavoriteFilter() {
      this.favoriteFilter = !this.favoriteFilter;
    }
  }
}
</script>

<style lang="scss" scoped>
@import ".././styles/variables.scss";
$color-filterbar: white;
.browse-view {
  max-width: $mobile-large-max-width;
  margin: auto;
  .filter-bar {
    color: $color-filterbar;
    padding: $padding-mini $padding-medium ;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 2px solid $color-filterbar;
    &__sorting {
      display: flex;
      align-items: center;
    }
    &__dropdown {
      width: 160px;
      margin-left: $padding-small;
    }
    &__favorite {
      height: 25px;
      cursor: pointer;
      &:hover {
        opacity: 0.7;
      }
    }
    &__loading {
      width: 100%;
      height: 300px;
      display: flex;
      align-items: center;
    }
  }
}
</style>