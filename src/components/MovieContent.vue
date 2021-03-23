<template>
<div class="movie-content">
  <ContentCard>
    <p class="content-card__plot">{{movie.Plot}}</p>
  </ContentCard>
  <div class="movie-content__row">
    <ContentCard
        class="content-card--small">
      <ContentCardRow
          v-for="row in castingRows"
          :key="row.title"
          :title="row.title"
          :subtitle="row.subtitle"/>
    </ContentCard>
    <ContentCard
        class="content-card--small">
      <ContentCardRow
          title="IMDB Rating"
          subtitle="/10"
          :large="movie.imdbRating"
      />
      <ContentCardRow
          title="Awards"
          :subtitle="movie.Awards"/>
    </ContentCard>
    <ContentCard
        class="content-card--small">
      <ContentCardRow
          v-for="row in productionRows"
          :key="row.title"
          :title="row.title"
          :subtitle="row.subtitle"/>
    </ContentCard>
  </div>
</div>
</template>

<script>
import ContentCard from "@/components/ContentCard";
import ContentCardRow from "@/components/ContentCardRow";

export default {
  name: 'MovieContent',
  components: {ContentCardRow, ContentCard},
  props: {
    movie: {
      type: Object,
      required: true
    }
  },
  computed: {
    imdbRating() {
      if (this.isLoading)
        return ''
      return this.movie.imdbRating + '/10';
    },
    productionRows() {
      if (this.isLoading)
        return []
      return [
        {title: "Released", subtitle: this.movie.Released},
        {title: "Country", subtitle: this.movie.Country},
        {title: "Language", subtitle: this.movie.Language},
        {title: "Production", subtitle: this.movie.Production}
      ]
    },
    castingRows() {
      if (this.isLoading)
        return []
      return [
        {title: "Director", subtitle: this.movie.Director},
        {title: "Stars", subtitle: this.movie.Actors},
        {title: "Writer", subtitle: this.movie.Writer},
      ]
    },
  }
}
</script>

<style lang="scss" scoped>
@import ".././styles/variables.scss";

.movie-content {
  &__row {
    display: flex;
    margin: $padding-medium 0;
  }
  .content-card {
    &__plot {
      min-height: calc(#{$movie-view-img-height} / 2 - #{$padding-medium});
      margin: 0 0 0 calc(#{$movie-view-img-width} + #{$padding-medium})
    }
    &--small {
      flex-basis: 30%;
      flex-grow: 1;
      margin-right: $padding-medium;
      &:last-of-type {
        margin-right: 0;
      }
    }
  }
}
@media (max-width: $mobile-medium-max-width) {
  .movie-content {
    &__row {
      flex-wrap: wrap;
      margin: 0;
    }

    .content-card {
      &__plot {
        min-height: 0;
        margin: 0;
      }
      &--small {
        flex-basis: 100%;
        margin: $padding-medium 0 0;
        flex-grow: 1;
      }
    }
  }
}
</style>