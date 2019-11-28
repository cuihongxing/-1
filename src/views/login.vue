<template>
  <div class="login">
      <div class="login-header-img">
          <img src="../assets/img/loginbg.46a4e4d.jpg" alt="">
      </div>
      <div class="login-input">
          <div class="login-input-box1"> 
              <i class="el-icon-user"></i>
              <input type="text" v-model="userName" placeholder="请输入您的账号">
          </div>
          <div class="login-input-box2"> 
              <i class="el-icon-lock"></i>
              <input type="password" v-model="password" placeholder="请输入您的密码">
          </div>
      </div>
      <div class="login-btn">
          <el-button type="primary" round @click="login">登录</el-button>
          <div class="login-btn-a">
              <router-link to="/resign">注册</router-link>
              <span>|</span>
              <router-link to="">忘记密码</router-link>
          </div>
      </div>
  </div>
</template>

<script>
import resign from '../services/connector'
let _login = new resign()
export default {
    data() {
        return {
            userName:'',
            password:'',
            list:[],
            token:''
        }
    },
    methods: {
        login(){
            let obj = {
                user:this.userName,
                passwd:this.password
            }
            _login.Login(obj).then((res)=>{
                // console.log(res)
                if(res.status==200){
                    
                    this.$router.push({
                        path:'/news'
                    })
                    this.list = res.data.list
                    this.token = res.data.token
                    let lis = {
                        list:this.list,
                        token:this.token
                    }
                    this.$store.commit('addlist',lis)
                    this.$message({
                        showClose: true,
                        message: '登录成功',
                        type: 'success'
                    });
                }else{
                    this.$message({
                        showClose: true,
                        message: '登录失败',
                        type: 'warning'
                    });
                }
            })
        }
    }
}
</script>

<style lang="scss" scoped>
.login{
    padding-bottom: 0.3rem;
}
.login-btn-a{
    margin-top: 0.2rem;
    a{
        text-decoration: none;
        margin-left: 0.15rem;
    }
    span{
        margin-left: 0.15rem;
    }
}
.login-btn{
    width: 100%;
    text-align: center;
    margin-top: 0.2rem;
    button{
        width: 2rem;
    }
}
.login{
    .login-header-img{
        img{
            width: 100%;
            height: 100%;
            display: inline-block;
            vertical-align: top;
        }
    }
    .login-input{
        .login-input-box1{
            position: relative;
        }
        .login-input-box2{
            position: relative;
        }
        i{
            margin-left: 1.1rem;
            position: absolute;
            font-size: 0.24rem;
        }
        i:nth-child(1){
            top: 0.15rem;
            color: #4559e0; 
        }
        input{
            display: block;
            width: 70%;
            margin: 0 auto;
            height: 0.5rem;
            border: 1px solid #4559e0;
            border-radius: 0.3rem;
            padding-left: 0.6rem;
            outline: none;
            font-size: 0.14rem;
            margin-top: 0.15rem; 
        }
        input::-webkit-input-placeholder { /* WebKit browsers */ 
            color: #4559e0; 
        } 
    }
}
</style>