<template>
  <div class="container">
    <div class="registration-form">
      <form @submit.prevent="onRegister">
        <div class="form-icon">
          <span><i class="fas fa-user"></i> </span>
        </div>
        <div class="form-group">
          <input
            type="text"
            class="form-control item"
            placeholder="Nome"
            v-model="name"
          />
        </div>
        <div class="form-group">
          <input
            type="email"
            class="form-control item"
            placeholder="Email"
            v-model="email"
          />
        </div>
        <div class="form-group">
          <input
            type="password"
            class="form-control item"
            placeholder="Senha"
            v-model="password"
          />
        </div>
        <div class="form-group">
          <the-mask
            type="text"
            class="form-control item"
            placeholder="__/__/____"
            :mask="['##/##/####']"
            v-model="dtNascimento"
          />
        </div>
        <div class="form-group">
          <button type="submit" class="btn btn-block create-account">
            Registrar <i class="fa fa-sign-in" aria-hidden="true"></i>
          </button>
        </div>
        <p>
          Já é cadastrado? Faça o login
          <router-link class="redirect" to="/login">aqui</router-link>
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
import { http } from "../config/axiosConfig";
import { TheMask } from "vue-the-mask";
export default {
  components: { TheMask },
  data() {
    return {
      email: "",
      password: "",
      name: "",
      dtNascimento: "",
      showSpinner: false,
    };
  },
  methods: {
    onRegister() {
      this.showSpinner = true;
      http
        .post("users/register", {
          email: this.email,
          password: this.password,
          name: this.name,
          dtNascimento: this.dtNascimento,
        })
        .then((res) => {
          this.$router.push("/login", () => {
            this.$root.$bvToast.toast(res?.data, {
              title: "Sucesso!",
              autoHideDelay: 3000,
              variant: "success",
              toaster: "b-toaster-top-center",
              solid: true,
            });
          });
        })
        .catch((err) => {
          this.showSpinner = false;
          this.$bvToast.toast(err?.response?.data, {
            title: "Ocorreu um erro!",
            autoHideDelay: 3000,
            variant: "danger",
            toaster: "b-toaster-top-center",
            solid: true,
          });
        });
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
  border-radius: 30px;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.075);
}
.registration-form .form-icon {
  text-align: center;
  background-color: var(--main-green-color);
  border-radius: 50%;
  font-size: 40px;
  color: white;
  width: 100px;
  height: 100px;
  margin: auto;
  margin-bottom: 50px;
  line-height: 100px;
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