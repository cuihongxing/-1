<template>
    <div class="father">
        <sideTop>
            <p slot="one">商品管理</p>
            <p slot="two">商品列表</p>
        </sideTop>
        <div id="myChart" :style="{width: '1000px', height: '600px'}"></div>
    </div>
</template>

<script>
import sideTop from '../../components/content/sideTop/sideTop'
import AboutShop from '../../services/shop'
const _aboutShop = new AboutShop()
export default {
    name: 'reports',
    components: {
        sideTop
    },
    data () {
        return {
            legend: [],
            series: [],
            xAxis: [],
            yAxis: []
        }
    },
    mounted(){
        _aboutShop.reports().then(res => {
            console.log(res)
            if(res.data.meta.status == 200){
                this.legend = res.data.data.legend.data
                this.series = res.data.data.series
                this.xAxis = res.data.data.xAxis[0].data
                this.yAxis = res.data.data.yAxis
                console.log(this.legend)
                this.draw();
            }
        })
        
    },
    methods: {
        draw(){
            // 初始化echarts实例
            let myChart = this.$echarts.init(document.getElementById('myChart'))
            // 绘制图表
            var option = {
                title: {
                    text: '用户来源'
                },
                tooltip : {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'cross',
                        label: {
                            backgroundColor: '#6a7985'
                        }
                    }
                },
                legend: {
                    data:this.legend
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis : [
                    {
                        type : 'category',
                        boundaryGap : false,
                        data : this.xAxis
                    }
                ],
                yAxis : [
                    {
                        type : 'value'
                    }
                ],
                series : this.series,
            };
            //防止越界，重绘canva
            window.onresize = myChart.resize;
            myChart.setOption(option);//设置option
        }
    }
}
</script>

<style scoped lang='scss'>
    .father{
        width: 100%;
        height: 100%;
        #myChart{
            margin: 0;
            padding: 0;
        }
    }
</style>