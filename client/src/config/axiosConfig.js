import axios from "axios";
import store from "../store/index";
import router from "../router/index";

var url = 'http://localhost:3000/api/'
if (process.env.NODE_ENV === 'production') url = "/api/"

export const http = axios.create({
    baseURL: url,
    headers: {
        Authorization: `Bearer ${store.state.token}`,
    },
});

http.interceptors.response.use(null, function(error) {
    if (error.response.status === 401) {
        store.dispatch("logout");
        router.push("/login");
    }
    return Promise.reject(error);
});