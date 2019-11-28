<template>
  <div class="resign">
      <div class="resign-header" @click="drawer = true">
          <div v-if="!imageUrl" class="resign-header-12">
              <i class="el-icon-camera-solid"></i>
          </div>
          <img v-if="imageUrl" :src="imageUrl" class="avatar">
      </div>
      <div>
          <el-drawer
            :visible.sync="drawer"
            direction="btt">
            <div class="resign-img">
                <el-upload
                    class="avatar-uploader"
                    action="http://jsonplaceholder.typicode.com/posts/"
                    :show-file-list="false"
                    :on-success="handleAvatarSuccess">
                    <div>从相册中选取</div>
                </el-upload>
            </div>
            <div class="resign-img-1">从本地相册中选取</div>
          </el-drawer>
      </div>
      <div class="resign-content-box">
          <div>
              <i class="el-icon-s-custom"></i>
              <input type="text" v-model="name" placeholder="请输入用户名">
          </div>
          <div>
              <i class="el-icon-lock"></i>
              <input type="text" v-model="password" placeholder="请输入密码">
          </div>
          <div>
              <i class="el-icon-edit"></i>
              <input type="text" v-model="affirmPassword" placeholder="确认密码">
          </div>
      </div>
      <div class="resign-btn">
          <el-button type="primary" round @click="register">注册</el-button>
          <div>
              <router-link to="/login">已有账号，去登陆</router-link>
          </div>
      </div>
  </div>
</template>

<script>
import resign from '../services/connector'
let _resign = new resign()

export default {
    data() {
        return {
            name:'',
            password:'',
            affirmPassword:'',
            drawer: false,
            direction: 'rtl',
            // photoImg:'',
            imageUrl: ''
        }
    },
    methods: {
        register(){
            // console.log(this.imageUrl)
            let obj = {
                user:this.user,
                passwd:this.password,
                photoImg:this.imageUrl
            }
            _resign.Resign(obj).then((res)=>{
                console.log(res)
            })
        },
        handleAvatarSuccess(res, file) {
            this.imageUrl = URL.createObjectURL(file.raw);
        },
    }
}
</script>

<style lang="scss" scoped>
.resign-header-12{
    width: 100%;
    height: 100%;
    background-color: #4559e0;
    border-radius: 50%;
    text-align: center;
    // line-height: 0.5rem;
    i{
        font-size: 0.5rem;
        color: white;
        margin-top: 0.3rem;
    } 
}
.resign-img-1{
    width: 100%;
    height: 0.5rem;
    border: 0.01rem solid; 
    text-align: center;
    line-height: 0.5rem;
    font-size: 0.17rem;
}
.resign-img{
    width: 100%;
    height: 0.5rem;
    border: 0.01rem solid; 
    text-align: center;
    // margin-top: -0.4rem;
    font-size: 0.17rem;
    line-height: 0.5rem;
}
.el-drawer{
    height: 40% !important;
}

.resign{
    width: 100%;
    height: 100%;
    padding-bottom: 0.3rem;
    .resign-header{
        width: 1.1rem;
        height: 1.1rem;
        border: 0.01rem solid;
        border-radius: 50%;
        margin: 0 auto;
        margin-top: 0.3rem;
        img{
            width: 100%;
            height: 100%;
            border-radius: 50%;
        }
    }
}
.resign-content-box{
    margin-top: 0.4rem;
    div{
        width: 80%;
        border-bottom: 0.01rem solid #4559e0;
        margin: 0 auto;
        margin-top: 0.25rem;
        height: 0.4rem;

        i{
            font-size: 0.24rem;
            margin-left: 0.15rem;
            color: #4559e0; 
        }
        input{
            border: none;
            outline: none;
            margin-left: 0.15rem;
            font-size: 0.18rem;
        }
        input::-webkit-input-placeholder { /* WebKit browsers */ 
            color: #4559e0; 
        } 
    }
}
.resign-btn{
    width: 100%;
    text-align: center;
    button{
        margin-top: 0.3rem;
        width: 3rem;
    }
    a{
        display: block;
        
        text-decoration: none;
        width: 30%;
        margin: 0 auto;
        margin-top: 0.25rem;
    }
    
}
</style>