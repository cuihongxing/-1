import HTTP from '../utils/http'
const _http = new HTTP()

class AboutShop {
  // 获取商品列表
  getShopList (obj) {
    return _http.request({
      url: `goods?pagenum=${obj.pagenum}&pagesize=${obj.pagesize}`
    })
  }
  // 搜索商品
  searchShop (obj) {
    return _http.request({
      url: `goods?query=${obj.query}&pagenum=${obj.pagenum}&pagesize=${obj.pagesize}`
    })
  }
  // 数据报表
  reports () {
    return _http.request({
      url: 'reports/type/1'
    })
  }
  // 删除商品
  delShop (id) {
    return _http.request({
      url: `goods/${id}`,
      type: 'delete'
    })
  }
}
export default AboutShop
