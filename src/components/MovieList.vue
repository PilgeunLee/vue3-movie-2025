<template>
  <div class="container">
    <div 
      :class="{'no-result': !movies.length}"
      class="inner">
      <Loader v-if="loading" /> 
      <div 
        v-if="message" 
        class="message">
        {{ message }}
      </div>
      <div 
        v-else
        class="movies">
        <MovieItem 
          v-for="movie in movies"
          :key="movie.imdbID" 
          :movie="movie" />
      </div>
    </div>
  </div>
</template>

<script>
import{ mapState } from 'vuex'
import MovieItem from '~/components/MovieItem'
import Loader from '~/components/Loader'

export default {
  components:{
    MovieItem,
    Loader
  },
  // data(){
  //   return{
  //     movies:[]
  //   }
  // }
  computed:{ 
    ...mapState('movie',[
      'movies',
      'message',
      'loading'
    ])
    // movies(){
    //   return this.$store.state.movie.movies
    // },
    // message(){
    //   return this.$store.state.movie.message
    // },
    // loading(){
    //   return this.$store.state.movie.loading
    // }
  }

}

</script>

<style lang="scss" scoped>
// @import "~/scss/main";

.container{
  margin-top:30px;
  .inner {
    background-color: $gray-200;
    padding: 10px 0;
    border-radius: 4px;
    text-align:center;
    &.no-result{
      padding:70px 0;
    }
  }
  .message{
    color:$gray-400;
    font-size:20px;
  }
  .movies {
    display: flex;       //한줄의 수평정렬
    flex-wrap:wrap;      // nowrap => wrap 2줄이상 감싼다
    justify-content:center;  //수평가운데 정렬
  }
}
</style>
