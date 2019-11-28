<template>
  <div class="orders">
    <div class="orders-header">
      <router-link to="/welcome">首页</router-link>
      <span>></span>
      <span>订单管理</span>
      <span>></span>
      <span>订单列表</span>
    </div>
    <div class="orders-box">
      <div class="orders-box-header">
        <el-input class="user-input" v-model="input" ref="input" placeholder="请输入内容"></el-input>
        <el-button type="info" plain icon="el-icon-search"></el-button>
      </div>
      <div class="orders-box-content">
        <template>
          <el-table
            :data="list.slice((currentPage - 1) * pagesize,currentPage * pagesize)"
            border
            style="width: 95%"
          >
            <el-table-column type="index" label="#"></el-table-column>
            <el-table-column prop="order_number" label="订单编号" width="210px"></el-table-column>
            <el-table-column prop="order_price" label="订单价格"></el-table-column>
            <el-table-column label="是否付款">
              <template slot-scope="scope">
                <el-tag
                  :type="scope.row.order_pay==0?'':scope.row.order_pay==1"
                  disable-transitions
                >{{scope.row.order_pay==0?'未付款':'付款'}}</el-tag>
              </template>
            </el-table-column>
            <el-table-column prop="is_send" label="是否发货"></el-table-column>
            <el-table-column prop="create_time" :formatter="dateFormat" label="下单时间"></el-table-column>
            <el-table-column label="操作" width="140px">
              <el-button
                type="primary"
                icon="el-icon-edit"
                size="mini"
                @click="dialogFormVisible = true"
              ></el-button>
              <el-button type="success" icon="el-icon-location" size="mini" @click="open"></el-button>
            </el-table-column>
          </el-table>
        </template>
        <!-- 分页器 -->
        <div class="block">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[3, 6, 9, 12]"
            :page-size="pagesize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="list.length"
          ></el-pagination>
        </div>
      </div>
    </div>
    <!-- 修改提示框 -->
    <div>
      <el-dialog title="修改地址" :visible.sync="dialogFormVisible">
        <el-form :model="form">
          <el-form-item label="省市区/县" :label-width="formLabelWidth">
            <el-select v-model="form.region" placeholder="请选择">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="详细地址" :label-width="formLabelWidth">
            <el-input v-model="form.name" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>
         
<script>
import Local from "../../local/index";
import orders from "../../services/connector";
const _orders = new orders();
export default {
  data() {
    return {
      input: "",
      list: [],
      currentPage: 1,
      pagesize: 6,
      dialogFormVisible: false,
      form: {
        name: "",
        region: "",
      },
      formLabelWidth: "120px"
    };
  },
  created() {
    let token = Local.get("token");
    _orders.Orders(token).then(res => {
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
      let t = new Date(row.create_time);
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
    },
    open() {
      this.$message.error("获取物流信息错误");
    }
  }
};
</script>

<style lang="scss" scoped>
.block {
  margin-top: 15px;
}
.orders {
  width: 100%;
  height: 100%;
  background-color: #dcdcdc;
}
.orders-header {
  height: 50px;
  line-height: 50px;
  color: #333;
  a {
    margin-left: 30px;
    text-decoration: none;
    color: #333;
  }
}
.orders-box {
  width: 95%;
  margin: 0 auto;
  height: 100%;
  background-color: white;
  border-radius: 5px;
  border: 1px solid;
  .orders-box-header {
    display: flex;
    margin-top: 15px;
    margin-left: 30px;
  }
  .user-input {
    width: 30%;
  }
  .orders-box-content {
    margin-left: 30px;
    margin-top: 15px;
  }
}
</style>