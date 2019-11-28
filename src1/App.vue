<template>
  <div id="app">
    <div v-if="$route.meta.keepAlive">
        <div>
            <keep-alive>
              <Top></Top>
            </keep-alive>
        </div>
        <div class="ft">
            <div class="le">
              <keep-alive>
                <NavBar></NavBar>
              </keep-alive>
            </div>
            <div class="ri"> 
                <div class="ricd">
                    <router-view></router-view>
                </div>
            </div>
        </div>
    </div>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
  </div>
</template>

<script>
import Top from './components/content/top/top'
import NavBar from './components/content/navbar/navbar'
import Product from './services/product-service'
const _product = new Product()
export default {
  name: 'App',
  components: {
      Top,
      NavBar
  }
}
</script>
<style lang="scss">
    body{
      margin: 0;
    }
    .ft{
      display: flex;
      overflow: hidden;
      .ri{
        flex: 1;
        padding: 20px;
        height:auto;
        min-height: 550px;
        .ricd{
          padding: 20px;
          background: white;
        }
      }
    }
    @import './assets/baseCss/base.css'
</style>
