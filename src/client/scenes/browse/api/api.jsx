import axios from 'axios'

const MONGO_API = '/exchange'
const RATES_API = 'https://api.fixer.io/latest'

const ApiCall = {
  getFile: () => {
    return axios.get(MONGO_API).then(res => {
      return res.data
    })
  },
  getRates: () => {
    return axios.get(RATES_API).then(res => {
      return res.data
    })
  }
}

export default ApiCall
