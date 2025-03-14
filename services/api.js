import axios from 'axios'

const api = axios.create({
    baseURL: 'https://cadatrando-usuarios-api.onrender.com/'
})

export default api