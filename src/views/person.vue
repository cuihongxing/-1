<template>
  <div class="person">
      <div class="person-content">
          <ul>
              <li v-for="(item,index) of list" :key="index">
                  <div>
                      <img :src="item.photoImg" alt="">
                  </div>
                  <div class="person-content-p">
                      <p>{{item.user}}</p>
                      <p>{{item.autograph}}</p>
                  </div>
              </li>
          </ul>
      </div>
  </div>
</template>

<script>
import person from '../services/connector'
const _person = new person()
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
    _person.UsersList(token).then((res)=>{
      this.list = res.data.list
      console.log(this.list)
    })
  }
}
</script>

<style lang="scss" scoped>
.person{
  width: 100%;
  height: 100%;
  .person-content{
    ul{
      width: 100%;
      li{
        display: flex;
        align-items: center;
        width: 100%;
        height: 0.7rem;
        // border: 0.01rem solid;
        img{
          width: 0.6rem;
          height: 0.6rem;
          border-radius: 50%;
          margin-left: 0.3rem;
        }
        .person-content-p{
          margin-left: 0.2rem;
        }
        p{
          font-size: 0.16rem;
          line-height: 0.25rem;
        }
      }
    }
  }
}
</style>