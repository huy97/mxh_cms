import axios from 'axios';
import {API_URL} from "constants/global";
import store from "store";
import {hideLoading, showLoading} from "react-redux-loading-bar";
import queryString from 'querystring'

const instance = axios.create({
    baseURL: API_URL,
    withCredentials: true,
    paramsSerializer: params => queryString.stringify(params),
    timeout: 30000
});

instance.interceptors.request.use(function (config) {
    store.dispatch(showLoading());
    config.headers.token = localStorage.getItem('token');
    console.log(localStorage.getItem('token'));
    console.log("Request: ", config.url, config.method, config.params || [], config.data || []);
    return config;
}, function (error) {
    store.dispatch(hideLoading());
    return Promise.reject(error);
});
instance.interceptors.response.use(function (response) {
    store.dispatch(hideLoading());
    console.log("Response: ", response.config.url, response.data);
    return response.data;
}, function (error) {
    store.dispatch(hideLoading());
    if(error.response){
        console.log("Error:", error.response.config.url, error.response.data);
        return Promise.reject(error.response.data);
    }
    console.log("Error: ", error);
    return Promise.reject(error);
});


export default instance;
