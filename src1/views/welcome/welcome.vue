<template>
    <div class="welcome">
        <h2>欢迎您，亲爱的后台管理</h2>
        <p>
            作为一个"优秀的码农"就是不要畏手畏脚，大胆去尝试，不要害怕报错，不会的可以上网查关键点。我觉得目前初级程序员编程不困难，困难的是你没有理清业务逻辑。随着业务不断复杂，需要的关键代码越来越难以理解，我的技术也会有所提高吧！
        </p>
        <p>小崔再此留言</p>

    </div>
</template>

<script>
export default {
    name: 'welcome',
    components: {
        
    },
    created () {
       
    }
}
</script>

<style lang="scss" scoped>
    .welcome{
        width: 100%;
        h2{
            font-size: 40px;
            width: 1000px;
            margin: 40px auto;
            border-bottom: 1px solid #ddd;
            padding-bottom: 40px;
        }
        p{
            width: 1000px;
            margin: 0 auto;
            font-weight: bold;
            color: gold;
            font-size: 26px;
            &:nth-of-type(1){
                margin-bottom: 40px;
            }
            &:nth-of-type(2){
                text-indent: 750px;
            }
        }
    }
</style>