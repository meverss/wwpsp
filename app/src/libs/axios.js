import axios from 'axios'

const URL = `http://${window.location.hostname}:4000/api`
const token = localStorage.getItem("token")

const instance = axios.create({
    baseURL: URL,
    headers: {'Authorization':`Bearer ${token}`},
    withCredentials: true
})


export default instance  