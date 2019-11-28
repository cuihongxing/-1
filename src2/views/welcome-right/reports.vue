<template>
  <div class="reports">
    <div class="reports-header">
      <router-link to="/welcome">首页</router-link>
      <span>></span>
      <span>数据统计</span>
      <span>></span>
      <span>数据报表</span>
    </div>
    <div class="userlistbox">
      <div id="myChart" :style="{ width: '800px', height: '400px' }"></div>
    </div>
  </div>
</template>

<script>
import Local from "../../local/index";
import reports from "../../services/connector";
const _reports = new reports();
export default {
  data() {
    return {
      dataArr: [],
      xAxis: [],
      series: [],
      yAxis: []
    };
  },
  mounted() {
    let token = Local.get("token");
    _reports.Reports(token).then(res => {
      this.dataArr = res.data.data.legend.data;
      this.xAxis = res.data.data.xAxis[0].data;
      this.yAxis = res.data.data.yAxis;
      this.series = res.data.data.series;
      this.draw();
    });
  },
  created() {},
  methods: {
    draw() {
      // 初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById("myChart"));
      // 绘制图表
      var option = {
        title: {
          text: "用户来源"
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            label: {
              backgroundColor: "#6a7985"
            }
          }
        },
        legend: {
          data: this.dataArr
        },
        grid: {
          left: "3%",
          right: "5%",
          bottom: "20%",
          containLabel: true
        },
        xAxis: [
          {
            type: "category",
            boundaryGap: false,
            data: this.xAxis
          }
        ],
        yAxis: [
          {
            type: "value"
          }
        ],
        series: this.series
      };
      window.onresize = myChart.resize;
      myChart.setOption(option); //设置option
    }
  }
};
</script>

<style lang="scss" scoped>
.reports-header {
  height: 50px;
  line-height: 50px;
  color: #333;
  a {
    margin-left: 30px;
    text-decoration: none;
    color: #333;
  }
}
.reports {
  width: 100%;
  height: 100%;
  background-color: #cdcdcd;
}
.userlistbox{
  width: 95%;
  height: 100%;
  border: 1px solid;
  background-color: white;
  margin-left: 30px;
  border-radius: 5px;
}
#myChart{
  margin-top: 30px;
  margin-left: 20px;
}
</style>