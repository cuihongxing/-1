<template>
    <div class="top">
        <div class="le">
            <div><img src="../../../assets/images/leizi.png" alt=""></div>
            <h3>电商后台管理系统</h3>
        </div>
        <div class="ri">
            <el-button type="info" @click="exit">退出</el-button>
        </div>
    </div>
</template>

<script>
import storage from '@/storage/index'
export default {
    name: 'top',
    data () {
        return {
            
        }
    },
    methods: {
        exit(){
            storage.remove('token')
            this.$router.push('/login')
        }
    }
}
</script>

<style lang="scss" scoped>
    .top{
        height: 60px;
        width: 100%;
        background: #373d41;
        display: flex;
        justify-content: space-between;
        align-items: center;
        
        .le{
            display: flex;
            align-items: center;
            img{
                width: 80px;
                height: 60px;
                display: block;
                margin: 0 15px;
            }
            h3{
                color: white;
                font-size: 24px;
                font-weight: normal;
            }
        }
        .ri{
            button{
                margin-right: 15px;
            }
        }
    }
</style>