import axios from "axios";

export function apiCall(method, path, data){
    return new Promise((resolve, reject) => {
        return axios[method](`http://localhost:8080${path}`, data).then(res => {
            return resolve(res.data)
        }).catch(err => {
            console.log(err)
            return reject(err.response.data.error);
        })
    })
}

export default apiCall;