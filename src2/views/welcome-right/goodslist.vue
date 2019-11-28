<template>
  <div class="goods">
    <div class="goods-header">
      <router-link to="/welcome">首页</router-link>
      <span>></span>
      <span>商品管理</span>
      <span>></span>
      <span>商品列表</span>
    </div>
    <div class="goods-box">
      <div class="goods-box-header">
        <el-input class="user-input" v-model="input" ref="input" placeholder="请输入内容"></el-input>
        <el-button type="info" plain icon="el-icon-search"></el-button>
        <router-link to="/add" style="margin-left: 30px">
          <el-button type="primary">添加商品</el-button>
        </router-link>
      </div>
      <div class="goods-box-content">
        <el-table
          :data="list.slice((currentPage - 1) * pagesize,currentPage * pagesize)"
          border
          style="width: 95%"
          class="goods-box-content-item"
        >
          <el-table-column label="#" type="index"></el-table-column>
          <el-table-column prop="goods_name" label="商品名称"></el-table-column>
          <el-table-column prop="goods_price" label="商品价格(元)" width="105px"></el-table-column>
          <el-table-column prop="goods_number" label="商品重量" width="80px"></el-table-column>
          <el-table-column prop="add_time" label="创建时间" :formatter="dateFormat" width="150px"></el-table-column>
          <el-table-column label="操作" width="125px">
            <el-button type="primary" icon="el-icon-edit" size="mini"></el-button>
            <el-button type="danger" icon="el-icon-delete" size="mini"></el-button>
          </el-table-column>
        </el-table>
      </div>
      <div class="block">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[10, 15, 20, 30]"
          :page-size="pagesize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="list.length"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import Local from "../../local/index";
import Goods from "../../services/connector";
const _goods = new Goods();
export default {
  data() {
    return {
      list: [],
      currentPage: 1,
      pagesize: 10,
      input: ""
    };
  },
  created() {
    let token = Local.get("token");
    _goods.GoodsList(token).then(res => {
      console.log(res);
      this.list = res.data.data.goods;
    });
  },
  methods: {
    handleSizeChange(val) {
      this.pagesize = val;
    },
    handleCurrentChange(val) {
      this.currentPage = val;
    },
    dateFormat(row, column) {
      let t = new Date(row.add_time);
      let year = t.getFullYear(),
        month = t.getMonth() + 1,
        day = t.getDate(),
        hour = t.getHours(),
        min = t.getMinutes(),
        sec = t.getSeconds();
      let newTime =
        year +
        "-" +
        (month < 10 ? "0" + month : month) +
        "-" +
        (day < 10 ? "0" + day : day) +
        " " +
        (hour < 10 ? "0" + hour : hour) +
        ":" +
        (min < 10 ? "0" + min : min) +
        ":" +
        (sec < 10 ? "0" + sec : sec);
      return newTime;
    }
  }
};
</script>

<style lang="scss" scpoed>
.goods-header {
  height: 50px;
  line-height: 50px;
  color: #333;
  a {
    margin-left: 30px;
    text-decoration: none;
    color: #333;
  }
}
.goods-box-content-item {
  font-size: 13px;
}
.goods {
  width: 100%;
  height: 100%;
  background-color: #cdcdcd;
  .goods-box {
    width: 95%;
    margin: 0 auto;
    height: 100%;
    background-color: white;
    border-radius: 5px;
    border: 1px solid;
    .goods-box-header {
      display: flex;
      margin-top: 15px;
      margin-left: 30px;
      .user-input {
        width: 30%;
      }
    }
  }
}
.goods-box-content {
  margin-left: 30px;
  margin-top: 15px;
}
.block {
  margin-left: 30px;
  margin-top: 20px;
}
</style>