<template>
  <div>
      <div class="welcome-header">
        <div>
          <img src="../../assets/img/2.jpg" alt="">
          <router-link to="/welcome" tag="span">电商后台管理系统</router-link>
        </div>
        <el-button type="info" @click="tui">退出</el-button>
      </div>
      
  </div>
</template>

<script>
import Local from '../../local/index'

export default {
  data() {
      return {
        
      };
  },
  methods: {
      tui(){
        Local.remove('token')
        this.$router.push({path:'/login'})
      }
  }
}
</script>

<style lang="scss" scoped>
.welcome-header{
  display: flex;
  width: 100%;
  height: 60px;
  align-items: center;
  justify-content: space-between;
  background-color: #333744;
  div{
    display: flex;
    align-items: center;
    span{
      margin-left: 25px;
      font-size: 20px;
      color: white;
    }
  }
  img{
    width: 50px;
    height: 50px;
    border: 1px solid;
    border-radius:50%; 
    margin-left: 30px
  }
  button{
    margin-right: 50px;
  }
}
</style>