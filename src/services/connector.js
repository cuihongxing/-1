import HTTP from '../utils/http'
const _http = new HTTP()

class Item {

    //注册接口
    Resign(){
        console.log(obj)
        return _http.request(
            {
                type: 'post',
                url:'/api/userPwd',
                data:{
                    
                }
            }
        )
    }

    //登录接口
    Login(obj){
        // console.log(obj)
        return _http.request(
            {
                type: 'post',
                url:'http://www.wyunfei.com:7007/api/login',
                data:{
                    user:obj.user,
                    passwd:obj.passwd
                }
            }
        )
    }

    //聊天内容接口
    ChatData(token){
        console.log()
        return _http.request(
            {
                type: 'post',
                url:'http://www.wyunfei.com:7007/api/chatList',
                data:{
                    token:token
                }
            }
        )
    }

    //用户列表
    UsersList(token){
        console.log()
        return _http.request(
            {
                type: 'post',
                url:'http://www.wyunfei.com:7007/api/chatPerson',
                data:{
                    token:token
                }
            }
        )
    }
}

export default Item