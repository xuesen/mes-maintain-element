import axios from 'axios'

let base = './usermanagementservice'

export const login = params => { return axios.post(`${base}/employee/login`) }
