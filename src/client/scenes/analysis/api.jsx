import axios from 'axios'

const MONGO_API = '/exchange'



module.exports = {
  getFile: function () {
    return axios.get(MONGO_API).then(function (res) {
      return res.data
    })
  }
}
