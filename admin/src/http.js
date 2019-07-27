import axios from 'axios'

const http = axios.create({
    baseURL: 'http://localhost:9999/admin/api'
})

export default http