import axios from 'axios'
import qs from 'qs'
import url from '../baseURL/index'
import storage from '../storage/index'
axios.interceptors.request.use(config => {
  if (storage.get('token')) {
    config.headers.Authorization = storage.get('token')
  }
  return config
}, error => {
  return Promise.reject(error)
})
class HTTP {
  request (params) {
    return new Promise((resolve, reject) => {
      axios({
        method: params.type || 'get',
        url: url.baseUrl + params.url,
        data: qs.stringify(params.data)
      }).then(res => {
        resolve(res)
      })
    })
  }
}
export default HTTP
