<template>
  <div class="container">
    <div class="registration-form">
      <form @submit.prevent="onLogin">
        <div class="form-icon">
          <img src=".././assets/jeraflix.png" alt="" srcset="">
        </div>
        <div class="form-group">
          <input
            type="email"
            class="form-control item"
            id="email"
            placeholder="Email"
            v-model="email"
          />
        </div>
        <div class="form-group">
          <input
            type="password"
            class="form-control item"
            id="password"
            placeholder="Senha"
            v-model="password"
          />
        </div>
        <div class="form-group">
          <button
            type="submit"
            class="btn btn-block create-account"
          >
            Entrar <i class="fa fa-sign-in" aria-hidden="true"></i>
          </button>
        </div>
        <p>
          Ainda não é cadastrado? Crie uma conta
          <router-link class="redirect" to="/register">aqui</router-link>
        </p>
        <div class="overlay" v-if="showSpinner">
          <div class="overlay__wrapper">
            <div class="overlay__spinner">
              <b-spinner class="spinner"></b-spinner>
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import {http} from '../config/axiosConfig';
export default {
    data() {
        return {
            email: "",
            password: "",
            showSpinner:false,
        };
    },
    methods: {
        onLogin() {
            this.showSpinner = true
            http.post('users/login', {
              email: this.email,
              password: this.password
            }).then( res =>{
              let data = res.data
              this.$store.dispatch('authenticate',{
                name: data?.user?.name,
                email: data?.user?.email,
                token: data?.token,
                api_key: data?.api_key,
                isAuth: true,
              });
              window.location.href = "/profile";
            }).catch( err =>{
              this.showSpinner = false;
              this.$bvToast.toast(err?.response?.data, {
                        title: "Ocorreu um erro!",
                        autoHideDelay: 3000,
                        variant: "danger",
                        toaster: "b-toaster-top-center",
                        solid: true,
              });
            })
        },
    },
};
</script>

<style scoped>
.registration-form {
    padding: 50px 0;
}
.registration-form form {
    max-width: 600px;
    margin: auto;
    padding: 50px 70px;
    border-radius:30px;
    box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.075);
}
.registration-form .form-icon img{
    display: block;
    margin: auto;
    margin-bottom: 4em;
    height: 5rem;
    width: 20rem;
}
.registration-form .item {
    border-radius: 20px;
    margin-bottom: 25px;
    padding: 10px 20px;
}
.registration-form .create-account {
    border-radius: 30px;
    padding: 10px 20px;
    font-size: 18px;
    font-weight: bold;
    background-color: var(--main-green-color);
    border: none;
    color: white;
    margin-top: 20px;
}
.overlay {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.7);
}
.overlay__wrapper {
    width: 100%;
    height: 100%;
    position: relative;
}
.overlay__spinner {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
}
.spinner {
    display: block;
    margin: 0 auto;
    height: 5rem;
    width: 5rem;
    color: var(--main-green-color);
}
@media (max-width: 576px) {
    .registration-form form {
        padding: 50px 20px;
    }
}
</style>