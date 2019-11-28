<template>
    <div class="">
      <div data-v-ef68022e="">
          <video data-v-ef68022e="" autoplay="autoplay" loop="loop" muted="muted"  class="login-container">
              <source data-v-ef68022e="" src="http://xmadmin.exrick.cn/lib/video/Ipad.mp4" type="video/mp4">
              <source data-v-ef68022e="" src="lib/video/Ipad.webm" type="video/webm"><source data-v-ef68022e="" src="lib/video/Ipad.ogv" type="video/ogg">
          </video>
      </div>
      <div class="login">
          <div data-v-ef68022e="" class="logo">
            <img data-v-ef68022e="" src="../../assets/images/ping_02.jpg" alt="">
        </div>
        <div class="login-input">
            <el-input class="logon-input-1" v-model="admin" placeholder="账户" @blur="name"></el-input>
            <el-input class="logon-input-2" placeholder="请输入密码" v-model="password"></el-input>
        </div>
        <div class="login-btn">
            <el-button type="primary" :plain="true" @click="login">登录</el-button>
            <el-button type="info" @click="reset">重置</el-button>
        </div>
      </div>
      
  </div>
</template>

<script>
import Product from '../../services/product-service'
const _product = new Product()
import storage from '../../storage/index'
export default {
    name: 'login',
    data () {
        return {
            admin: "",
            password: "",
        }
    },
    created () {
        
    },
    methods: {
        login(){
            let obj = {
                username: this.admin,
                password: this.password
            }
            console.log(obj)
            _product.login(obj).then(res => {
                console.log(res)
                if(res.data.meta.status == 200){
                    this.$router.push('/welcome')
                    this.$store.commit("getToken",res.data.data.token)
                    this.$message({
                        message: '恭喜你，登录成功',
                        center: true,
                        type: 'success'
                    })
                }
            })
            
        },
        reset(){
            this.admin = '',
            this.password = ''
        }
    }
}
</script>

<style lang="scss" scoped>
.login{
    position: absolute;
    width: 100%;
    // height: 100%;
    top: 20px;
}
.login-container{
    width: 100%;
    height: 80%;
}
.logo{
    margin-top: 100px;
    text-align: center;
    border-radius: 50%; 
    img{
        width: 130px;
        height: 130px;
        border-radius: 50%; 
    }
}
.login-input{
    width: 100%;
    height: 100%;
   text-align: center;
    margin: 0 auto;
    margin-top: 15px;
    .logon-input-1{
        width: 28%;
        margin: 20px 0 auto;
    }
    .logon-input-2{
        width: 28%;
        display: block;
        margin: 20px auto;
    }
}
.login-btn{
    text-align: center;
    margin-top: 20px;
}
</style>