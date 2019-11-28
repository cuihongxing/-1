import HTTP from '../utils/http'
const _http = new HTTP()

class Product {
  login (obj) {
    return _http.request({
      url: 'login',
      type: 'post',
      data: {
        username: obj.username,
        password: obj.password
      }
    })
  }
  menus (obj) {
    return _http.request({
      url: 'menus'
    })
  }
  // 用户列表
  usersList (obj) {
    return _http.request({
      url: `users?query=&pagenum=${obj.pagenum}&pagesize=${obj.pagesize}`
    })
  }
  //  添加用户
  users (obj) {
    return _http.request({
      url: 'users',
      type: 'post',
      data: {
        username: obj.username,
        password: obj.password,
        email: obj.email,
        mobile: obj.mobile
      }
    })
  }
  // 删除
  del (id) {
    return _http.request({
      url: `users/${id}`,
      type: 'delete'
    })
  }
  // 编辑
  edit (obj) {
    return _http.request({
      url: `users/${obj.id}`,
      type: 'put',
      data: {
        username: obj.username,
        email: obj.email,
        mobile: obj.mobile
      }
    })
  }
  // 搜索
  search (obj) {
    return _http.request({
      url: `users?query=${obj.query}&pagenum=${obj.pagenum}&pagesize=${obj.pageSize}`
    })
  }
  // 角色列表
  roles () {
    return _http.request({
      url: 'roles'
    })
  }
  // 分配角色
  disRoles (obj) {
    return _http.request({
      url: `users/${obj.id}/role`,
      type: 'put',
      data: {
        rid: obj.rid
      }
    })
  }
  // 角色添加
  addRoles (obj) {
    return _http.request({
      url: 'roles',
      type: 'post',
      data: {
        roleName: obj.roleName,
        roleDesc: obj.roleDesc
      }
    })
  }
  // 角色删除
  delRoles (id) {
    return _http.request({
      url: `roles/${id}`,
      type: 'delete'
    })
  }
  // 编辑角色
  editRoles (obj) {
    return _http.request({
      url: `roles/${obj.id}`,
      type: 'put',
      data: {
        roleName: obj.roleName,
        roleDesc: obj.roleDesc
      }
    })
  }
  // 权限列表
  rightsList (obj) {
    return _http.request({
      url: 'rights/tree'
    })
  }
  // 权限分配
  disRights (obj) {
    return _http.request({
      url: `roles/${obj.id}/rights`,
      type: 'post',
      data: {
        rids: obj.rids
      }
    })
  }
  // 权限列表
  rsList () {
    return _http.request({
      url: 'rights/list'
    })
  }
  // 修改用户状态
  changeState (obj) {
    return _http.request({
      url: `users/${obj.id}/state/${obj.true}`,
      type: 'put'
    })
  }
  // 删除小标签
  // delLabel () {
  //   return _http.request({
  //     url: `roles/${id}/rights/${treeId}`,
  //     type: 'delete'
  //   })
  // }
}
export default Product

