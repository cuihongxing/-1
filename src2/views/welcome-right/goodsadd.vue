<template>
  <div class="goodsadd">
    <div class="goodsadd-header">
      <router-link to="/welcome">首页</router-link>
      <span>></span>
      <span>商品管理</span>
      <span>></span>
      <span>商品列表</span>
    </div>
    <div class="goodsadd-box">
      <div class="goodsadd-box-header">
        <el-alert title="添加商品信息" type="info" center show-icon></el-alert>
      </div>
      <div class="goodsadd-box-steps">
        <el-steps :active="active" finish-status="success">
          <el-step title="基本信息"></el-step>
          <el-step title="商品参数"></el-step>
          <el-step title="商品属性"></el-step>
          <el-step title="商品图片"></el-step>
          <el-step title="商品内容"></el-step>
          <el-step title="完成"></el-step>
        </el-steps>
      </div>
      <div class="goodsadd-box-left">
        <el-tabs @tab-click="next" :tab-position="tabPosition" >
          <el-tab-pane  label="基本信息">
            <div class="goodsadd-box-left-input">
              <p>商品名称</p>
              <el-input v-model="name" placeholder="请输入内容"></el-input>
            </div>
            <div class="goodsadd-box-left-input">
              <p>商品价格</p>
              <el-input v-model="price" placeholder="请输入内容"></el-input>
            </div>
            <div class="goodsadd-box-left-input">
              <p>商品重量</p>
              <el-input v-model="weight" placeholder="请输入内容"></el-input>
            </div>
            <div class="goodsadd-box-left-input">
              <p>商品数量</p>
              <el-input v-model="num" placeholder="请输入内容"></el-input>
            </div>
            <div>
              <p>商品分类</p>
              <div>
                <el-cascader
                  v-model="value"
                  :options="options"
                  :props="{ expandTrigger: 'hover',label:'cat_name',value:'cat_id' }"
                  @change="handleChange"
                ></el-cascader>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="商品参数">配置管理</el-tab-pane>
          <el-tab-pane label="商品属性">角色管理</el-tab-pane>
          <el-tab-pane label="商品图片">定时任务补偿</el-tab-pane>
          <el-tab-pane label="商品内容">定时任务补偿</el-tab-pane>
        </el-tabs>
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
      tabPosition: "left",
      active: 0,
      name: "",
      price: "",
      weight: "",
      num: "",
      value: [],
      options: [],
      defaultProps: {
        children: "children",
        label: "cat_name"
      }
    };
  },
  created() {
    let token = Local.get("token");
    _goods.GoodsClass(token).then(res => {
      console.log(res);
      this.options = res.data.data;
    });
  },
  methods: {
    next() {
      if (this.active++ > 4) this.active = 0
    },
    handleChange(value) {
      console.log(value);
    }
  }
};
</script>

<style lang="scss" scpoed>
.goodsadd {
  width: 100%;
  height: 100%;
  .goodsadd-header {
    height: 50px;
    line-height: 50px;
    color: #333;
    a {
      margin-left: 30px;
      text-decoration: none;
      color: #333;
    }
  }
  .goodsadd-box {
    width: 95%;
    height: 100%;
    border: 1px solid;
    margin-left: 30px;
    background-color: white;
    border-radius: 5px;
  }
}
.goodsadd-box-header {
  width: 95%;
  margin: 0 auto;
  margin-top: 20px;
}
.goodsadd-box-steps {
  width: 90%;
  margin: 0 auto;
  margin-top: 20px;
}
.goodsadd-box-left {
  margin-top: 30px;
  padding-bottom: 20px;
  p {
    margin-left: 10px;
    margin-top: 15px;
  }
  input {
    margin-top: 10px;
    //   width: 85%;
  }
}
.goodsadd-box-left-input {
  width: 80%;
}
</style>