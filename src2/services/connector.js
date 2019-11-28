import HTTP from '../utils/http'
const _http = new HTTP()

class Item {

    //登录接口
    Login(obj){
        // console.log(obj)
        return _http.request(
            {
                type: 'post',
                url:'http://www.wyunfei.com:7001/api/private/v1/login',
                data:{
                    username:obj.username,
                    password:obj.password,
                }
            }
        )
    }

    //菜单接口
    Menus(token){
        // console.log(token)
        return _http.request(
            {
                // type: 'post',
                url:'http://www.wyunfei.com:7001/api/private/v1/menus',
                data:{
                   token:token
                }
            }
        )
    }

    //用户列表
    Goods(token){
        // console.log()
        return _http.request(
            {
                url:'http://www.wyunfei.com:7001/api/private/v1/users?query=&pagenum=1&pagesize=100',
                data:{
                   token:token
                }
            }
        )
    }

    //添加用户
    Users(obj){
        // console.log(obj)
        return _http.request(
            {
                type:'post',
                url:'http://www.wyunfei.com:7001/api/private/v1/users',
                data:{
                   token:obj.token,
                   username:obj.username,
                   password:obj.password,
                   email:obj.email,
                   mobile:obj.mobile
                }
            }
        )
    }

    //编辑用户
    UsersCompile(obj){
        // console.log(obj)
        return _http.request(
            {
                type:'put',
                url:`http://www.wyunfei.com:7001/api/private/v1/users/${obj.id}`,
                data:{
                   token:obj.token,
                   username:obj.username,
                   email:obj.email,
                   mobile:obj.monile
                }
            }
        )
    }
    //删除用户
    UsersDel(obj){
        // console.log(obj)
        return _http.request(
            {
                type:'delete',
                url:`http://www.wyunfei.com:7001/api/private/v1/users/${obj.id}`,
                data:{
                   token:obj.token
                }
            }
        )
    }

    //搜索
    UserSeek(obj){
        // console.log(obj)
        return _http.request(
            {
                url:`http://www.wyunfei.com:7001/api/private/v1/users?query=${obj.val}&pagenum=1&pagesize=100`,
                data:{
                   token:obj.token
                }
            }
        )
    }
    
    //角色列表
    Roles(token){
        // console.log()
        return _http.request(
            {
                url:'http://www.wyunfei.com:7001/api/private/v1/roles',
                data:{
                   token:token
                }
            }
        )
    }

    //添加角色
    RolesUser(obj){
        // console.log()
        return _http.request(
            {   
                type: 'post',
                url:'http://www.wyunfei.com:7001/api/private/v1/roles',
                data:{
                   token:obj.token,
                   roleName:obj.roleName,
                   roleDesc:obj.roleDesc
                }
            }
        )
    }

    //角色编辑
    RolesCompi(obj){
        // console.log(obj)
        return _http.request(
            {   
                type: 'put',
                url:`http://www.wyunfei.com:7001/api/private/v1/roles/${obj.id}`,
                data:{
                   token:obj.token,
                   roleName:obj.roleName,
                   roleDesc:obj.roleDesc
                }
            }
        )
    }

    //角色删除
    RolesDele(obj){
        // console.log(obj)
        return _http.request(
            {   
                type: 'delete',
                url:`http://www.wyunfei.com:7001/api/private/v1/roles/${obj.id}`,
                data:{
                   token:obj.token
                }
            }
        )
    }

    //权限列表
    Rights(token){
        // console.log(obj)
        return _http.request(
            {   
                // type: 'delete',
                url:'http://www.wyunfei.com:7001/api/private/v1/rights/list',
                data:{
                   token:token
                }
            }
        )
    }

    //权限分配 数据
    RightsAllocation(token){
        // console.log(obj)
        return _http.request(
            {   
                // type: 'post',
                url:'http://www.wyunfei.com:7001/api/private/v1/rights/tree',
                data:{
                   token:token
                }
            }
        )
    }

    //权限分配 ok键
    RightsOk(obj){
        console.log(obj)
        return _http.request(
            {   
                type: 'post',
                url:`http://www.wyunfei.com:7001/api/private/v1/roles/${obj.id}/rights`,
                data:{
                   token:obj.token,
                   rids:obj.rids
                }
            }
        )
    }

    //订单列表
    Orders(token){
        console.log()
        return _http.request(
            {   
                // type: 'post',
                url:`http://www.wyunfei.com:7001/api/private/v1/orders?=&pagenum=1&pagesize=100`,
                data:{
                   token:token,
                   
                }
            }
        )
    }

    //数据报表
    Reports(token){
        console.log()
        return _http.request(
            {   
                url:'http://www.wyunfei.com:7001/api/private/v1/reports/type/1',
                data:{
                   token:token
                }
            }
        )
    }

    //商品列表
    GoodsList(token){
        console.log()
        return _http.request(
            {   
                url:'http://www.wyunfei.com:7001/api/private/v1/goods?pagenum=1&pagesize=10000',
                data:{
                   token:token
                }
            }
        )
    }

    //商品分类
    GoodsClass(token){
        console.log()
        return _http.request(
            {   
                url:'http://www.wyunfei.com:7001/api/private/v1/categories?type=8',
                data:{
                   token:token
                }
            }
        )
    }

    //商品参数
    GoodsParameter(obj){
        console.log()
        return _http.request(
            {   
                url:`http://www.wyunfei.com:7001/api/private/v1/categories/${obj.id}/attributes?sel=many`,
                data:{
                   token:obj.token
                }
            }
        )
    }

    //静态属性
    GoodsStatic(obj){
        console.log()
        return _http.request(
            {   
                url:`http://www.wyunfei.com:7001/api/private/v1/categories/${obj.id}/attributes?sel=only`,
                data:{
                   token:obj.token
                }
            }
        )
    }

    //动态参数添加
    GoodsAddStatic(obj){
        console.log()
        return _http.request(
            {   
                type:'post',
                url:`http://www.wyunfei.com:7001/api/private/v1/categories/${obj.id}/attributes`,
                data:{
                   token:obj.token,
                   attr_name:obj.attr_name,
                   attr_sel:obj.attr_sel
                }
            }
        )
    }

    //删除动态参数
    GoodsDelStatic(obj){
        console.log()
        return _http.request(
            {   
                type:'delete',
                url:`http://www.wyunfei.com:7001/api/private/v1/categories/${obj.id}/attributes/${obj.attr_id}`,
                data:{
                   token:obj.token
                }
            }
        )
    }

    //删除静态参数
    DelStatic(obj){
        console.log()
        return _http.request(
            {   
                type:'delete',
                url:`http://www.wyunfei.com:7001/api/private/v1/categories/${obj.id}/attributes/${obj.attr_id}`,
                data:{
                   token:obj.token
                }
            }
        )
    }

    //分类列表
    Cate(obj){
        // console.log(obj)
        return _http.request(
            {   
                url: `http://www.wyunfei.com:7001/api/private/v1/categories?type=3&pagenum=${obj.pagenum}&pagesize=${obj.pagesize}`,
                data:{
                   token:obj.token
                }
            }
        )
    }

    //分类修改
    CateAmend(obj){
        // console.log(obj)
        return _http.request(
            {   
                url: `http://www.wyunfei.com:7001/api/private/v1/categories/1`,
                data:{
                   token:obj.token
                }
            }
        )
    }
}

export default Item