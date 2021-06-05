import store from '../store/index';


export const isAuth = (to, from, next) =>{
    if(store.state.isAuth) next();
    else next("/login");
}

export const isGuest = (to, from, next) =>{
    if(!store.state.isAuth) next();
    else next("/home");
}