<template>
  <div>
    <b-navbar class="navbar" toggleable="lg" type="dark">
      <b-navbar-brand to="/home">Jeraflix</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-form @submit.prevent="searchMovies">
            <b-form-input
              class="mr-sm-2"
              placeholder="Buscar"
              v-model="query"
            ></b-form-input>
            <b-button class="my-2 my-sm-0 button-search" type="submit"
              >Buscar</b-button
            >
          </b-nav-form>
          <router-link to="/mylist" class="nav-link ml-4 mr-2"
            >Minha lista</router-link
          >
          <span @click="logout" class="nav-link ml-4 mr-2">Sair</span>
          <b-nav-item-dropdown right>
            <template #button-content>
              <em>{{ $store.state.perfilName }}</em>
            </template>
            <b-dropdown-item to="/profile">Trocar perfil</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      query: "",
    };
  },
  methods: {
    logout() {
      this.$store.dispatch("logout");
      this.$router.push("/login");
    },
    searchMovies(){
      this.$router.push({path:'/results', query:{query: this.query}});
    }
  },
};
</script>

<style >
.nav-link {
  cursor: pointer;
}

.navbar {
  background-color: var(--main-green-color);
}

.button-search {
  background-color: black;
}

.button-search:hover {
  background-color: rgb(26, 26, 26);
}

.nav-link {
  color: white !important;
}
</style>