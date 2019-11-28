// import config from '../config'
import Axios from 'axios'
import Qs from 'qs'
// import Local from '../local/index'
// config.headers.Authorization = Local.get('token')
// axios.interceptors.request.use(config => {
//   config.headers.Authorization = Local.get('token')
//   return config
// })
class HTTP {
    request(params){
        return new Promise((resolve,reject)=>{

            Axios({
                method:params.type || 'get',
                url:params.url,
                data:Qs.stringify(params.data),
                headers: {
                    Authorization:params.data.token
                }
            })
            .then(res => {
                // console.log(res)
                resolve(res)
            })

        })
        
    }
}

export default HTTP