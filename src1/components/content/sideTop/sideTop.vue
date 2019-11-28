<template>
    <div class="sidetop">
        <h4 @click="backHome">首页</h4>
        <i class="el-icon-arrow-right"></i>
        <slot name="one"></slot>
        <i class="el-icon-arrow-right"></i>
        <slot name="two"></slot>
    </div>
</template>

<script>
    export default {
        name: 'sidetop',
        methods: {
            backHome(){
                this.$router.push('/welcome')
            }
        }
    }
</script>

<style lang="scss" scoped>
    .sidetop{
        display: flex;
        margin-bottom: 15px;
        color: #606266;
        font-size: 14px;
        h4{
            color: black;
        }
        h4:hover{
            color: darkcyan;
            cursor: pointer;
        }
        i{
            margin: 0 7px;
        }
    }
</style>