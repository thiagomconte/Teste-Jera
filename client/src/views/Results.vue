<template>
  <div class="container">
    <h1 class="text-center mb-5">Resultados da pesquisa</h1>
    <div class="row d-flex">
      <div class="movie mx-2 mb-5" v-for="movie in movies" :key="movie.id">
        <h5 class="title">{{ movie.title }}</h5>
        <img :src="$store.state.base_url + movie.poster_path" />
        <button
          @click="addToWatchlist(movie.id, movie.genre_ids)"
          class="btn btn-watch"
        >
          Assistir mais tarde
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import {http} from '../config/axiosConfig';
export default {
  data(){
    return{
      movies: []
    }
  },
  methods:{
    loadMovies(){
      http.get(`https://api.themoviedb.org/3/search/movie?api_key=${this.$store.state.api_key}&language=pt-BR&query=${this.$route.query.query}&page=1&include_adult=false`)
      .then( res =>{
        this.movies = res.data.results;
      }).catch(err =>{
        console.log(err);
      })
    },
    addToWatchlist(movie_id, genre_ids) {
      http
        .post("profiles/addwatchlist", {
          movie_id,
          genre_ids,
          profile_id: this.$store.state.perfilId,
        })
        .then((res) => {
          this.$bvToast.toast(res?.data, {
            title: "Sucesso!",
            autoHideDelay: 3000,
            variant: "success",
            toaster: "b-toaster-top-right",
            solid: true,
          });
        })
        .catch((err) => {
          this.$bvToast.toast(err?.response?.data, {
            title: "Ocorreu um erro!",
            autoHideDelay: 3000,
            variant: "warning",
            toaster: "b-toaster-top-right",
            solid: true,
          });
        });
    },
  },
  created(){
    this.loadMovies()
  },
  watch: {
    '$route.query.query'() {
      this.loadMovies()
    }
  },
}
</script>

<style>

</style>