import axios from 'axios'
import API from '../api'
import qs from 'qs'
// import { getToken } from '@/utils/auth'
import Cookies from 'js-cookie'

export default function http({ url, method, data }) {
    let options = {
        url: url,
        method: method,
        baseURL: process.env.NODE_ENV === 'production' ? API.PRO_HOST : API.SAT_HOST,
        contentType: "application/json;charset=UTF-8",
        // timeout: 2000,
        withCredentials: false,
        // headers: { token: 'ggdhdddddddddddddddddddddd' }
    };
    if (Cookies.get('TokenKey')) {
        options.headers = { token: Cookies.get('TokenKey') }
    } else {
        options.headers = { token: ' ' }
    }
    if (method == 'GET') {
        options.params = data;
    } else if (method == "POST") {
        options.data = qs.stringify(data);
    }

    return axios(options);

}