<template>
  <div>
    <Nav class="mb-5"/>
    <router-view/>
  </div>
</template>

<script>
import {http} from '../config/axiosConfig'
import Nav from '../components/Nav.vue';
export default {
  components:{
    Nav
  },
  created(){
    http.get(`https://api.themoviedb.org/3/configuration?api_key=${this.$store.state.api_key}`)
      .then(res =>{
        this.$store.dispatch('setBase_url', res.data.images.base_url);
      }).catch(err =>{
        console.log(err);
      })
  }
}
</script>

<style>

</style>