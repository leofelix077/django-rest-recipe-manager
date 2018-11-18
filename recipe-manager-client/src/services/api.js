import axios from "axios";

export function setTokenHeader(token) {
    if (token) {
        axios.defaults.headers.common["Authorization"] = `JWT ${token}`
    } else {
        delete axios.defaults.headers.common['Authorization']
    }
}

export function apiCall(method, path, data) {
    return new Promise((resolve, reject) => {
        return axios[method](`http://localhost:8080${path}`, data).then(res => {
            return resolve(res.data)
        }).catch(err => {
            return reject(err || "Could not fetch data");
        })
    })
}

export default apiCall;