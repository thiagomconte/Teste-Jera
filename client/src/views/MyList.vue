<template>
  <div class="container">
    <div class="overlay" v-if="showSpinner">
          <div class="overlay__wrapper">
            <div class="overlay__spinner">
              <b-spinner class="spinner d-block mx-auto"></b-spinner>
            </div>
          </div>
    </div>

      <div class="d-block mb-5" v-for="(movie, index) in movies" :key="movie._id">
        <div class="d-flex current-movie">
          <img :src="$store.state.base_url + movie.poster_path">
          <div class="ml-3 position-relative">
           <h4 class="d-block">{{movie.title}}</h4>
           <span class="text-muted d-block mb-2">Lançamento: <i class="far fa-calendar-alt mx-2"></i>{{movie.release_date}}</span>
           <p>{{movie.overview}}</p>
           <div v-if="!mylist[index].assistiu" class="d-flex">
              <button @click.prevent="checkWatch(movie.id)" class="btn btn-post btn-danger">Marcar como assistido</button>
            </div>
            <button v-else class="btn btn-post btn-danger" disabled>Já assistiu</button>
            <button class="btn btn-post btn-primary btn-info" @click="setMovieName(movie.title)"  v-b-modal.modal-agendar>Agendar</button>
          </div>
        </div>
    </div>
    <h1 class="text-center" v-if="!showSpinner && getMovieLength === 0">Sua lista está vazia</h1>
  <b-modal
    id="modal-agendar"
    hide-footer
    title="Agendar filme"
  >
  <the-mask type="text" class="form-control item" placeholder="dia/mes - hora:minuto"
    :mask="['##/## - ##:##']"
    v-model="horario"/>
    <button class="btn btn-primary mt-3" @click="agendar">Agendar</button>
  </b-modal>
  </div>
</template>

<script>
import { http } from "../config/axiosConfig";
import { TheMask } from "vue-the-mask";
export default {
  components: { TheMask },
  data(){
    return {
      mylist : [],
      movies : [],
      showSpinner: true,
      movie_name: '',
      horario: ''
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
            this.showSpinner = false;
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
    agendar(){
      this.$bvModal.hide('modal-agendar')
      http.post(`profiles/agendar`, {horario: this.horario, movie_name: this.movie_name}).then(() =>{
        this.$bvToast.toast("Seu filme foi agendado", {
          title: "Sucesso!",
          autoHideDelay: 3000,
          variant: "success",
          toaster: "b-toaster-top-center",
          solid: true,
        });
      }).catch( err => {
        this.$bvToast.toast(err?.response?.data, {
          title: "Ocorreu um erro!",
          autoHideDelay: 3000,
          variant: "danger",
          toaster: "b-toaster-top-center",
          solid: true,
        });
      })
      this.horario = ''
    },
    setMovieName(movie_name){
      this.movie_name = movie_name;
    },
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
  },
  computed:{
    getMovieLength(){
      return this.movies.length
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

.btn-post{
  position: absolute;
  bottom: 0;
}

.btn-info{
  left: 200px;
}
</style>