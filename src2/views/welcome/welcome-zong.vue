<template>
  <div>
      <Welcome></Welcome>
      <div class="welcome-zong">
        <WelcomeLeth :list="list"></WelcomeLeth>
        <router-view></router-view>
      </div>
      
  </div>
</template>

<script>
import Welcome from './welcome'
import WelcomeItem from './welcome-item'
import WelcomeLeth from './welcome-leth'
import Local from '../../local/index'
import Menus from '../../services/connector'
const _menus = new Menus()

export default {
    data () {
        return {
            list:[]
        }
    },
    components:{
        Welcome,WelcomeItem,WelcomeLeth
    },
    created() {
        let token = Local.get('token')
        _menus.Menus(token).then((res)=>{
            let { data } = res.data
            this.list = data
        })
   },
}
</script>

<style lang="scss" scoped>
.welcome-zong{
    display: flex;
}
</style>