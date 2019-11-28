<template>
  <div class="message">
      <!-- <div class="message-content-not" v-if="!list.lists.length>0" >
          <img src="../assets/img/no_data.png" alt="">
          <p>暂无内容</p>
      </div> -->
      <div>
          <ul>
              <li v-for="(item,index) in list" :key="index">
                  <div>
                      <img :src="item[0].photoImg" alt="">
                  </div>
                  <div>
                      <p>{{item[0].user}}</p>
                      <p>{{item[0].content}}</p>
                  </div>
                  
              </li>
          </ul>
      </div>
  </div>
</template>

<script>
import message from '../services/connector'
let _message = new message()
import Local from '../local/index'
export default {
    data() {
        return {
            list:[]
        }
    },
    created () {
         let obj="Bearer"
         let tok = Local.get('token')
         let token = obj+" "+tok
        _message.ChatData(token).then((res)=>{
            
            this.list = res.data.lists
            console.log(this.list)
        })
    }
}
</script>

<style lang="scss" scoped>
.message{
    width: 100%;
    height: 100%;
    
}
.message-content-not{
    text-align: center;
    p{
        font-size: 0.16rem;
        margin-top: 0.2rem;
    }
    img{
        width: 2rem;
        height: 2rem;  
        margin-top: 0.3rem;  
    }
    }
</style>