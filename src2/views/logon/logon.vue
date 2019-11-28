<template>
  <div class=".login-container">
      <div data-v-ef68022e="" style="position: absolute; z-index: -1; top: 0px; left: 0px; bottom: 0px; right: 0px; background-size: contain; background-repeat: no-repeat; background-position: 50% 50%; background-image: none;">
          <video data-v-ef68022e="" autoplay="autoplay" loop="loop" muted="muted" style="margin: auto; position: absolute; z-index: -1; top: 50%; left: 50%; transform: translate(-50%, -50%); visibility: visible; width: 100%;">
              <source data-v-ef68022e="" src="http://xmadmin.exrick.cn/lib/video/Ipad.mp4" type="video/mp4">
              <source data-v-ef68022e="" src="lib/video/Ipad.webm" type="video/webm"><source data-v-ef68022e="" src="lib/video/Ipad.ogv" type="video/ogg">
          </video>
      </div>
      <div data-v-ef68022e="" class="logo">
            <img data-v-ef68022e="" src="../../assets/img/ping_02.jpg" alt="">
      </div>
      <div class="login-input">
          <el-input class="logon-input-1" v-model="user" placeholder="账户" @blur="name"></el-input>
          <el-input class="logon-input-2" placeholder="请输入密码" v-model="password"></el-input>
      </div>
      <div class="login-btn">
           <el-button type="primary" :plain="true" @click="login">登录</el-button>
           <el-button type="info" @click="chongzhi">重置</el-button>
      </div>
  </div>
</template>

<script>
import login from '../../services/connector'
let _login = new login()
export default {
    data () {
        return {
            user:'',
            password:'',
            token:''
        }
    },
    methods: {
        login(){
            let obj = {
                username:this.user,
                password:this.password
            }
            _login.Login(obj).then((res)=>{
                let { data } = res.data
                this.token = data.token
                this.$store.commit('addtoken',this.token)
                if(res.data.meta.status===200){
                    this.$router.push({path:'/welcome'})
                    this.$message({
                        message: '登录成功',
                        type: 'success'
                    });
                }else{
                    alert("请输入正确账号密码")
                }
                
            })
        },
        chongzhi(){
            this.user = '',
            this.password = ''
        },
        name(){
            if(this.user.length>6){
                alert("请输入正确的账户")
            }
        },
        
    }
}
</script>

<style lang="scss" scoped>
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