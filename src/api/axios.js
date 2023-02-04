"use strict";

import axios from "axios";
import {message} from "ant-design-vue";
// Full config:  https://github.com/axios/axios#request-config
// axios.defaults.baseURL = process.env.baseURL || process.env.apiUrl || '';
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

let config = {
    baseURL: '/api',
    timeout: 5 * 60 * 1000, // Timeout
    // withCredentials: true, // Check cross-site Access-Control
};

const _axios = axios.create(config);

export function myGet(url, params = {}, headers = {}) {
    return new Promise((resolve, reject) => {
        _axios
            .get(url, {
                params: params,
                headers
            })
            .then(({data}) => {
                if (data.state == 200) {
                    resolve(data);
                } else {
                    if (data.state != 100) {
                        reject(data);
                        message.error(data.message)
                    }
                }
            })
            .catch(err => {
                reject(err)
            })
    })
}



export function myPost(url, data = {}, headers = {}) {
    return new Promise((resolve, reject) => {
        _axios
            .post(url, data, headers)
            .then(({data}) => {
                if (data.state == 200) {
                    resolve(data);
                } else {
                    if (data.state != 100) {
                        reject(data);
                        message.error(data.message)
                    }
                }
            })
            .catch(err => {
                reject(err)
            })
    })
}
