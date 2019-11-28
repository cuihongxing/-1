import HTTP from '../utils/http'
const _http = new HTTP()

class Classify {
  // 分类列表
  categoriesList () {
    return _http.request({
      url: 'categories?type=3&pagenum=1&pagesize=50'
    })
  }
  // 获取商品参数
  getMany (id) {
    return _http.request({
      url: `categories/${id}/attributes?sel=many`
    })
  }
  // 获取商品属性
  getOnly (id) {
    return _http.request({
      url: `categories/${id}/attributes?sel=only`
    })
  }
  // 添加动态参数
  addDy (obj) {
    return _http.request({
      url: `categories/${obj.id}/attributes`,
      type: 'post',
      data: {
        attr_name: obj.attr_name,
        attr_sel: obj.attr_sel
      }
    })
  }
  // 动态参数删除
  delDy (obj) {
    return _http.request({
      url: `categories/${obj.id}/attributes/${obj.attr_id}`,
      type: 'delete'
    })
  }
  // 静态参数删除
  delSt (obj) {
    return _http.request({
      url: `categories/${obj.id}/attributes/${obj.attr_id}`,
      type: 'delete'
    })
  }
  // 静态参数小tag删除
  delSmall (obj) {
    return _http.request({
      url: `categories/${obj.id}/attributes/${obj.attr_id}`,
      type: 'put',
      data: {
        attr_name: obj.attr_name,
        attr_sel: obj.attr_sel,
        attr_vals: obj.attr_vals
      }
    })
  }
  //静态参数小tag添加
  addSmall (obj) {
    return _http.request({
      url: `categories/${obj.id}/attributes/${obj.attr_id}`,
      type: 'put',
      data: {
        attr_name: obj.attr_name,
        attr_sel: obj.attr_sel,
        attr_vals: obj.attr_vals
      }
    })
  }
  // 订单列表
  getOrders (obj) {
    return _http.request({
      url: `orders?=&pagenum=${obj.pagenum}&pagesize=${obj.pagesize}`
    })
  }
  // 商品分类
  getCategories (obj) {
    return _http.request({
      url: `categories?type=3&pagenum=${obj.pagenum}&pagesize=${obj.pagesize}`
    })
  }
  // 分类修改
  editCate (obj) {
    return _http.request({
      url: `categories/${obj.id}`,
      type: 'put',
      data: {
        cat_name: obj.cat_name
      }
    })
  }
  // 分类删除
  delCate (id) {
    return _http.request({
      url: `categories/${id}`,
      type: 'delete'
    })
  }
  // 分类添加
  addCate (obj) {
    return _http.request({
      url: 'categories',
      type: 'post',
      data: {
        cat_pid: obj.cat_pid,                                               
        cat_name: obj.cat_name,
        cat_level: obj.cat_level
      }
    })
  }
  // 添加分类列表
  addCateList () {
    return _http.request({
      url: 'categories?type=2'
    })
  }
  // 添加商品
  addShop (obj) {
    return _http.request({
      url: 'goods',
      type: 'post',
      data: {
        goods_name: obj.goods_name,
        goods_price: obj.goods_price,
        goods_weight: obj.goods_weight,
        goods_number: obj.goods_number,
        goods_cat: obj.goods_cat,
        goods_introduce: obj.goods_introduce,
        pics: obj.pics,
        attrs: obj.attrs
      }
    })
  }
}
export default Classify
