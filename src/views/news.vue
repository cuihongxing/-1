<template>
  <div class="news">
    <div class="news-box">
      <div class="news-header">
          <div class="news-header-left" @click="fanhui">
              <i class="el-icon-back"></i>
              <span>退出</span>
          </div>
          <div class="news-header-content">
              <img :src="list.photoImg" alt="">
              <p>{{list.user}}</p>
              <p>{{list.autograph}}</p>
          </div>
          <div class="news-hader-right">
              <i class="el-icon-search"></i>
          </div>
      </div>
      <div class="news-content">
        <router-link to="/news" tag="div" exact active-class="active">
            <i class="el-icon-chat-dot-round"></i>
        </router-link>
        <router-link to="/person" tag="div" active-class="active">
            <i class="el-icon-s-custom"></i>
        </router-link>
        <router-link to="/group" tag="div" active-class="active">
            <i class="el-icon-chat-line-square"></i>
        </router-link>
      </div>
    </div>
      <div class="news-content-789">
        <router-view/>
      </div>
      
  </div>
</template>

<script>
import Local from '../local/index'
export default {
    computed: {
      list(){
        return this.$store.state.userItem
      }
    },
    methods: {
      fanhui(){
          this.$router.push({path:'/'})
          Local.remove('token')
          Local.remove('title')
      }
    }
}
</script>

<style lang="scss" scoped>
.news-content-789{
  margin-top: 2.2rem;
}
.news-box{
  position: fixed;
  width: 100%;
  top: 0;
  // position: absolute;
}
.active{
  i{
    color: red;
  }
}
.news{
  width: 100%;
  height: 100%;
  .news-header{
    width: 100%;
    height: 1.78rem;
    background-color: #4559e0;
    border-bottom-left-radius: 0.1rem;
    border-bottom-right-radius: 0.1rem;
    display: flex;
    justify-content: space-around;
    .news-header-left{
      // margin-left: 0.2rem;
      margin-top: 0.2rem;
      color: white;
      span{
        font-size: 0.17rem;
      }
    }
    .news-header-content{
      width: 65%;
      text-align: center;
      img{
        width: 0.8rem;
        height: 0.8rem;
        border-radius: 50%;
        background-color: white;
        margin-top: 0.15rem;
      }
      p{
        font-size: 0.16rem;
        color: white;
      }
    }
    .news-hader-right{
      margin-top: 0.2rem;
      color: white;
      i{
        font-size: 0.25rem;
      }
    }
  }
}
.news-content{
  display: flex;
  width: 85%;
  height: 0.5rem;
  // border: 0.01rem solid;
  border-radius: 0.3rem; 
  margin: 0 auto;
  margin-top: -0.25rem;
  background-color: white;
  box-shadow:0.02rem 0.02rem 0.05rem #000;
  div{
    width: 33%;
    text-align: center;
    line-height: 0.5rem;
    i{
      color: #551a8b;
    }
    i:hover{
      border-bottom: 0.02rem solid; 
      color: red;
    }
  }
}
</style>