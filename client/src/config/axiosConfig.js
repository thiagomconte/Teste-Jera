import axios from "axios";
import store from "../store/index";
//import router from "../router/index";

export const http = axios.create({
    baseURL: "http://localhost:3000/api/",
    headers: {
        Authorization: `Bearer ${store.state.token}`,
    },
});