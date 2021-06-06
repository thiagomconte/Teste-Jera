<template>
  <div class="container">
    <h1>Filmes para você</h1>
    <div class="row"></div>
  </div>
</template>

<script>
import { http } from "../config/axiosConfig";
export default {
  created() {
    http
      .get(
        `https://api.themoviedb.org/3/configuration?api_key=${this.$store.state.api_key}`
      )
      .then((res) => {
        console.log(res.data);
      })
      .catch(() => {
        this.$bvToast.toast("Erro ao carregar listagem de filmes", {
          title: "Ocorreu um erro!",
          autoHideDelay: 3000,
          variant: "danger",
          toaster: "b-toaster-top-center",
          solid: true,
        });
      });
  },
};
</script>

<style>
</style>