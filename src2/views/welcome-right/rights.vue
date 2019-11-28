<template>
  <div class="rights">
      <div class="rights-header"> 
          <router-link to="/welcome">首页</router-link>
          <span>></span>
          <span>权限管理</span>
          <span>></span>
          <span>权限列表</span>
      </div>
      <div class="rights-box">
          <div class="rights-content">
              <el-table :data="list" border style="width: 95%">
                  <el-table-column type="index" label="#"></el-table-column>
                  <el-table-column prop="authName" label="权限名称"></el-table-column>
                  <el-table-column prop="path" label="路径"></el-table-column>
                  <el-table-column prop="level" label="权限等级">
                      <template slot-scope="scope">
                        <el-tag :type="scope.row.level==0?'':scope.row.level==1?'success':scope.row.level==2&&scope.row.level==2&&scope.row.level !=1||0?'warning':''"
                        disable-transitions
                        >
                        {{scope.row.level==0?'一级':scope.row.level==1?'二级':scope.row.level==2&&scope.row.level!==1||0?'三级':'一级'}}
                        </el-tag>
                      </template>
                  </el-table-column>
              </el-table>
          </div>
      </div>
  </div>
</template>

<script>
import Local from '../../local/index'
import rights from '../../services/connector'
const _rights = new rights()
export default {
  data() {
    return {
      list:[]
    }
  },
  created() {
      let token = Local.get('token')
      _rights.Rights(token).then((res)=>{
          console.log(res)
          this.list = res.data.data
      })
  },
}
</script>

<style lang="scss" scoped>
.rights{
  width: 100%;
  height: 100%;
  background-color: #cdcdcd;
  .rights-box{
    width: 95%;
    margin: 0 auto;
    height: 100%;
    background-color: white;
    border-radius: 5px;
    border: 1px solid;
    .rights-content{
      margin-left: 25px;
      margin-top: 20px;
    }
  }
}
.rights-header{
  height: 50px;
  line-height: 50px;
  color: #333;
  a{
    margin-left:30px;
    text-decoration: none;
    color: #333;
  }
}
</style>