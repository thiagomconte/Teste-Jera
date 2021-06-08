<template>
  <div class="container">
    <h1 class="text-center mb-5">Últimos lançamentos</h1>
    <div class="overlay" v-if="showSpinner">
          <div class="overlay__wrapper">
            <div class="overlay__spinner">
              <b-spinner class="spinner d-block mx-auto"></b-spinner>
            </div>
          </div>
    </div>
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
    <div v-if="genresCount > 0">
    <h1 class="text-center my-5">Sugeridos especialmente para você</h1>
    <div class="row d-flex">
      <div class="movie mx-2 mb-5" v-for="movie in moviesSugeridos" :key="movie.id">
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
  </div>
</template>

<script>
import { http } from "../config/axiosConfig";
export default {
  data() {
    return {
      movies: [],
      moviesSugeridos: [],
      showSpinner:true,
    };
  },
  created() {
    http
      .get(
        `https://api.themoviedb.org/3/discover/movie?api_key=${this.$store.state.api_key}&language=pt-BR&sort_by=popularity.desc&include_adult=false&include_video=false&page=1=&with_watch_monetization_types=flatrate`
      )
      .then((res) => {
        this.showSpinner = false
        this.movies = res.data.results;
      })
      .catch((err) => {
        this.showSpinner = false
        console.log(err.response);
      });

    let randomGenre = this.$store.state.genres[Math.floor(Math.random() * this.$store.state.genres.length)]
    http
      .get(
        `https://api.themoviedb.org/3/discover/movie?api_key=${this.$store.state.api_key}&language=pt-BR&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=${randomGenre}&with_watch_monetization_types=flatrate`
      )
      .then((res) => {
        this.showSpinner = false
        this.moviesSugeridos = res.data.results;
      })
      .catch((err) => {
        this.showSpinner = false
        console.log(err.response);
      });
  },
  methods: {
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
  computed:{
    genresCount(){
      return this.$store.state.genres.length
    }
  }
};
</script>

<style>
.movie img {
  min-width: 200px;
  height: 250px;
  display: block;
  border-radius: 20px;
  object-fit: cover;
  margin-left: auto;
  margin-right: auto;
}

.btn-watch {
  width: 200px;
  margin: 20px auto;
  background-color: var(--main-green-color);
}

.btn-watch:hover {
  background-color: green;
}

.title {
  min-width: 200px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  width: 100px;
}
</style>