<template>
  <div class="container">
    <div class="d-block mb-5" v-for="(movie, index) in movies" :key="movie._id">
      <div class="d-flex current-movie">
        <img :src="$store.state.base_url + movie.poster_path">
        <div class="ml-3 position-relative">
          <h4 class="d-block">{{movie.title}}</h4>
          <span class="text-muted d-block mb-2">Lançamento: <i class="far fa-calendar-alt mx-2"></i>{{movie.release_date}}</span>
          <p>{{movie.overview}}</p>
          <button @click.prevent="checkWatch(movie.id)" v-if="!mylist[index].assistiu" class="btn btn-danger">Marcar como assistido</button>
          <span v-else class="btn btn-danger disabled">Já assistiu</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { http } from "../config/axiosConfig";
export default {
  data(){
    return {
      mylist : [],
      movies : [],
    }
  },
  created() {
    http
      .get(`profiles/mylist/${this.$store.state.perfilId}`)
      .then((res) => {
        this.mylist = res.data
        for(var i = 0 ; i<  this.mylist.length ; i++){
          http.get(`https://api.themoviedb.org/3/movie/${this.mylist[i].movie_id}?api_key=${this.$store.state.api_key}&language=pt-BR`)
          .then((res) => {
            console.log(res.data)
            this.movies.push(res.data)
          }).catch(err => {
            console.log(err)
          })
        }
      })
      .catch((err) => {
        this.$bvToast.toast(err?.response?.data, {
          title: "Ocorreu um erro!",
          autoHideDelay: 3000,
          variant: "danger",
          toaster: "b-toaster-top-center",
          solid: true,
        });
      });
  },
  methods:{
    checkWatch(id){
      http.post(`profiles/checkWatch`, {id}).then(() =>{
        window.location.reload();
      }).catch( err =>{
        this.$bvToast.toast(err?.response?.data, {
          title: "Ocorreu um erro!",
          autoHideDelay: 3000,
          variant: "danger",
          toaster: "b-toaster-top-center",
          solid: true,
        });
      })
    }
  }
};
</script>

<style scoped>
.current-movie img{
  min-width: 270px;
  height: 250px;
  object-fit: cover;
}

span{
  font-size: 12px;
}

.btn{
  position: absolute;
  bottom: 0;
}
</style>