<template>
  <div class="container">
    <h1 class="text-center mb-5">Filmes para você</h1>
    <div class="row d-flex">
      <div class="movie mx-2 mb-5" v-for="movie in movies" :key="movie.id">
        <img :src="$store.state.base_url+movie.poster_path">
        <button class="btn btn-watch">Assistir mais tarde</button>
      </div>
    </div>
  </div>
</template>

<script>
import { http } from "../config/axiosConfig";
export default {
  data(){
    return {
      movies: []
    }
  },
  created() {
    let genresIds = [];
    for (var genre in this.$store.state.genres) {
      genresIds.push(genre.genre_id)
    }
    http.get(`https://api.themoviedb.org/3/discover/movie?api_key=${this.$store.state.api_key}&language=pt-BR&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres${genresIds}=&with_watch_monetization_types=flatrate`)
    .then(res =>{
      this.movies = res.data.results;
    }).catch(err =>{
      console.log(err.response);
    })
  },
};
</script>

<style>
.movie img{
  width: 200px;
  height:250px;
  display: block;
  border-radius: 20px;
  margin-left: auto;
  margin-right: auto;
}

.btn-watch{
  width:200px;
  margin: 20px auto;
  background-color: var(--main-green-color);
}

</style>