<template>
    <div class="navbar">
        <div class="open" @click="SHOU" :class="{wid: isCollapse}">
            <img src="../../../assets/images/three.png" alt="">
        </div>
        <el-menu default-active="1-4-1" 
        :unique-opened="true" 
        class="el-menu-vertical-demo"
        :class="{hd: isCollapse}" 
        :collapse="isCollapse"
        :collapse-transition="false" 
        background-color="#333744" 
        text-color="#ffffff"
        router
        >
        <el-submenu v-for="(v, i) in menus" :key="i" :index="String(v.order)">
                <template slot="title">
                    <i class="el-icon-star-on"></i>
                    <span slot="title">{{ v.authName }}</span>
                </template>
                <el-menu-item-group v-for="(item,index) in v.children" :key="index">
                    
                    <el-menu-item :index="item.path">{{ item.authName }}</el-menu-item>
                </el-menu-item-group>
            </el-submenu>
        </el-menu>
    </div>
</template>

<script>
    import Product from '../../../services/product-service'
    const _product = new Product()
    export default {
        data() {
            return {
                isCollapse: false,
                menus: []
            }
        },
        created () {
            _product.menus().then(res => {
                this.menus = res.data.data
                //console.log(this.menus)
            })
        },
        methods: {
            SHOU(){
                this.isCollapse = !this.isCollapse
            }
        }
  }
</script>

<style lang="scss" scoped>
    .el-menu-vertical-demo{
        width: 200px;
        height: 100%;
        min-height: 550px;
    }
    .hd{
        width: 64px;
        height: 100%;
        min-height: 550px;
    }
    .navbar{
        height: 100%;
        min-height: 550px;
        padding-bottom:9999px; 
        margin-bottom:-9999px
    }
    .open{
        width: 200px;
        height: 25px;
        background: #4a5064;
        display: flex;
        justify-content: center;
        align-items: center;
        img{
            width: 20px;
            height: 20px;
        }
    }
    .wid{
        width: 64px;
        @extend .open
    }
</style>