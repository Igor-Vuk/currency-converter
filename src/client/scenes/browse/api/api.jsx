import axios from 'axios'

const MONGO_API = '/exchange'
const RATES_API = 'http://api.fixer.io/latest'

const ApiCall = {
  getFile: function () {
    return axios.get(MONGO_API).then((res) => {
      return res.data
    })
  },
  getRates: function () {
    return axios.get(RATES_API).then((res) => {
      return res.data
    })
  }
}

export default ApiCall
