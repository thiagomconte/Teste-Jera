<template>
  <div class="container">
    <h1 class="text-center mb-5">Selecione um perfil</h1>
    <div class="row mx-auto mb-5">
      <div v-for="profile in profiles" :key="profile._id" class="col-md text-center">
        <div class="prof-icon"  @click.prevent="chooseProfile(profile.name, profile._id, profile.genre_id)">
          <span><i class="fas fa-user"></i></span>
        </div>
        <span>{{profile.name}}</span>
      </div>
    </div>
    <div class="d-block mx-auto " v-if="numberOfProfiles < 4">
      <input
            type="text"
            class="form-control prof-input mx-auto mb-3"
            placeholder="Novo perfil"
            v-model="profName"
          />
      <button @click.prevent="addProfile" class="btn add-button d-block mx-auto"><i class="fas fa-plus"></i></button>
    </div>
  </div>
</template>

<script>
import {http} from '../config/axiosConfig';
export default {
  data(){
    return {
      profiles: [],
      profName:''
    }
  },
  created(){
    http.get("profiles/").then(res => {
      this.profiles = res.data
    })
  },
  methods:{
    chooseProfile(name, id, genres){
      this.$store.dispatch('setPerfil',{name, perfilId: id, genres});
      this.$router.push('/home');
    },
    addProfile(){
      http.post('profiles/register', {name: this.profName}).then(() =>{
        window.location.reload()
      }).catch((err) =>{
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
    numberOfProfiles: function(){
      if(this.profiles){
        return this.profiles.length
      }
      return '';
    }
  }
}
</script>

<style>
.prof-icon{
  text-align: center;
    background-color: var(--main-green-color);
    border-radius: 13%;
    font-size: 50px;
    color: white;
    width: 110px;
    height: 120px;
    margin: auto;
    margin-bottom: 10px;
    line-height: 100px;
}

.col-md{
  cursor: pointer;
}

.add-button{
  background-color: var(--main-green-color);
  color: white;
  font-size: 30px;
  border-radius: 50%;
  width: 4rem;
}

.prof-input{
  width: 250px;
}
</style>