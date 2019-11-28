<template>
  <aside class="aside">
    <el-radio-group v-model="isCollapse" style="margin-bottom: 20px;">
      <el-radio-button :label="false">展开</el-radio-button>
      <el-radio-button :label="true">收起</el-radio-button>
    </el-radio-group>

    <el-menu
      default-active="1-4-1"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      :collapse="isCollapse"
    >
      <el-submenu index="1" >
          <div slot="title" >
            <i class="el-icon-user-solid"></i>
            <span slot="title">{{ list[0].authName }}</span>
          </div>
          <el-menu-item index="1-1" >
            <div v-for="(item,index) in list[0].children" :key="index">
              <i class="el-icon-menu"></i>
              <router-link to="/user" tag="span">
                {{ item.authName }}
              </router-link>
            </div>
          </el-menu-item>
      </el-submenu>
      <el-submenu index="2" >
          <div slot="title" >
           <i class="el-icon-folder-remove"></i>
            <span slot="title">{{ list[1].authName }}</span>
          </div>
          <el-menu-item index="2-1" >
            <div v-for="(item,index) in list[1].children" :key="index">
              <i class="el-icon-menu"></i>
              <router-link to="/user" tag="span">
                {{ item.authName }}
              </router-link>
            </div>
          </el-menu-item>
      </el-submenu>

      <el-submenu index="3" >
          <div slot="title" >
            <i class="el-icon-shopping-cart-1"></i>
            <span slot="title">{{ list[2].authName }}</span>
          </div>
          <el-menu-item index="3-1" >
            <div v-for="(item,index) in list[2].children" :key="index">
              <i class="el-icon-menu"></i>
              <router-link to="/user" tag="span">
                {{ item.authName }}
              </router-link>
            </div>
          </el-menu-item>
      </el-submenu>

 <el-submenu index="4" >
          <div slot="title" >
           <i class="el-icon-notebook-1"></i>
            <span slot="title">{{ list[3].authName }}</span>
          </div>
          <el-menu-item index="4-1" >
            <div v-for="(item,index) in list[3].children" :key="index">
              <i class="el-icon-menu"></i>
              <router-link to="/user" tag="span">
                {{ item.authName }}
              </router-link>
            </div>
          </el-menu-item>
      </el-submenu>
 <el-submenu index="5" >
          <div slot="title" >
         <i class="el-icon-notebook-2"></i>
            <span slot="title">{{ list[4].authName }}</span>
          </div>
          <el-menu-item index="5-1" >
            <div v-for="(item,index) in list[4].children" :key="index">
              <i class="el-icon-menu"></i>
              <router-link to="/user" tag="span">
                {{ item.authName }}
              </router-link>
            </div>
          </el-menu-item>
      </el-submenu>


    </el-menu>
  </aside>
  <!-- el-icon-menu -->
</template>


<script type="text/ecmascript-6">
import Product from '../../../services/order-servide'
let _http = new Product()
export default {
  data() {
    return {
      isCollapse: true,
      list:[]
    };
  },
  created(){
    let token =JSON.parse(localStorage.getItem('token'))
   
    _http.menus(token).then((res=>{
      this.list=res.data.data
      console.log(this.list[0])
    }))
     },
  methods: {
    handleOpen(key, keyPath) {
      // console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      // console.log(key, keyPath);
    }
  }
};
</script>
<style>
.aside {
  width: 15%;
  height: 606px;
  float: left;
  background: #373d41;
}
.el-radio-button__inner {
  background: #373d41;
  color: white;
  border: none;
}
.el-submenu__title {
  color: white;
}
.el-menu-vertical-demo {
  background: #373d41;
}
.el-menu-vertical-demo /deep/ .el-submenu__title:hover {
  background: black !important;
}
.el-menu {
  background: #373d41;
}
.el-menu-item {
  color: white;
}
</style>
<style scoped lang="scss">
</style>
