<template>
    <div class="params">
        <div class="params-header">
            <router-link to="/welcome">首页</router-link>
            <span>></span>
            <span>商品管理</span>
            <span>></span>
            <span>分类参数</span>
        </div>
        <div class="params-box">
        <el-alert title="注意：只允许为第三级分类设置相关参数！" :closable='false' type="warning" show-icon></el-alert>
        <div class="block">
            <span class="demonstration">选择商品分类：</span>
            <el-cascader
                :options="options"
                expand-trigger="hover"
                :props="defaultData"
                @change="handleChange">
            </el-cascader>
        </div>
        <!-- 选项卡 -->
        <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="动态参数" name="first">
                <!-- 动态参数数据渲染 -->
                <el-button @click="flag=true" class="addbtn" size="mini" type="primary">添加参数</el-button>
                <el-table :data="many" style="width: 100%" :border="true">
                    <el-table-column type="expand">
                        <template slot-scope="props">
                            <el-form label-position="left" inline class="demo-table-expand">
                                <el-form-item>
                                    <el-tag closable>{{ props.row.attr_vals }}</el-tag>
                                </el-form-item>
                            </el-form>
                        </template>
                    </el-table-column>

                    <el-table-column label="#" type="index"></el-table-column>
                    <el-table-column label="参数名称" width="300" prop="attr_name"></el-table-column>
                    <el-table-column label="操作">
                        <template slot-scope="scope">
                            <el-button type="primary" icon="el-icon-edit" size="mini">修改</el-button>
                            <el-button type="danger" @click="delShow(scope.row,scope.$index)" icon="el-icon-delete" size="mini">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>                
            </el-tab-pane>
            <el-tab-pane label="静态属性" name="second">
                <!-- 静态属性数据渲染 -->
                <el-button @click="bool=true" class="addbtn" size="mini" type="primary">添加属性</el-button>
                <el-table :data="only" style="width: 100%" :border="true">
                    <el-table-column type="expand">
                        <template slot-scope="props">
                            <el-form label-position="left" inline class="demo-table-expand">
                                 <el-form-item>
                                    <el-tag closable>{{ props.row.attr_vals }}</el-tag>
                                </el-form-item>
                            </el-form>
                        </template>
                    </el-table-column>

                    <el-table-column label="#" type="index"></el-table-column>
                    <el-table-column label="属性名称" width="300" prop="attr_name"></el-table-column>
                    <el-table-column label="操作">
                        <template slot-scope="scope">
                            <el-button type="primary" icon="el-icon-edit" size="mini">修改</el-button>
                            <el-button type="danger" @click="staShow(scope.row,scope.$index)"  icon="el-icon-delete" size="mini">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-tab-pane>
        </el-tabs>
        </div>
        <!-- 添加动态模态框 -->
        <el-dialog
            title="添加动态参数"
            :visible.sync="flag"
            width="50%"
            >
            <div class="wrap">
                <p>动态参数：</p>
                <el-input v-model="dyparams" class="inp"></el-input>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="flag = false">取 消</el-button>
                <el-button @click="addDyOk" type="primary">确 定</el-button>
            </span>
        </el-dialog>
        <!-- 添加静态模态框 -->
        <el-dialog
            title="添加静态属性"
            :visible.sync="bool"
            width="50%"
            >
             <div class="wrap">
                <p>静态属性：</p>
                <el-input v-model="staticattr" class="inp"></el-input>
            </div>
            <span slot="footer" class="dialog-footer">
                    <el-button @click="bool = false">取 消</el-button>
                    <el-button type="primary">确 定</el-button>
            </span>
        </el-dialog>
        <!-- 删除动态属性模态框 -->
        <el-dialog
            title="提示"
            :visible.sync="tf"
            width="50%"
            >
            <span>此操作将永久删除该用户, 是否继续?</span>
            <span slot="footer" class="dialog-footer">
                    <el-button @click="tf = false">取 消</el-button>
                    <el-button @click="delDy" type="primary">确 定</el-button>
            </span>
        </el-dialog>
        <!-- 删除静态属性模态框 -->
        <el-dialog
            title="提示"
            :visible.sync="stat"
            width="50%"
            >
            <span>此操作将永久删除该用户, 是否继续?</span>
            <span slot="footer" class="dialog-footer">
                    <el-button @click="stat = false">取 消</el-button>
                    <el-button @click="delSt" type="primary">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import Local from "../../local/index";
import Params from "../../services/connector";
const _params = new Params();
export default {
    name: 'params',
    data () {
        return {
           options: [],
           defaultData: {
               value: 'cat_id',
               label: 'cat_name',
               children: 'children'
           },
           activeName: 'first',
           tableData: [],
           id: '',
           many: [],
           only: [],
           flag: false,
           bool: false,
           tf: false,
           dyparams: '',
           staticattr: '',
           attr_id: '',
           stat: false,
           ad: ''
        }
    },
    created () {
          let token = Local.get('token')
        _params.GoodsClass(token).then(res => {
            console.log(res)
            if(res.data.meta.status == 200) {
                this.options = res.data.data
            }
            console.log(this.options)
        })
    },
    methods: {
        handleChange(value) {
            let obj = {
                token:Local.get('token'),
                id:value[value.length - 1]
            }
            // console.log(obj)
            // this.id = value[value.length - 1]
            // 动态参数
            _params.GoodsParameter(obj).then(res => {
                if(res.data.meta.status == 200){
                    this.many = res.data.data
                }
            })
            // 静态属性
            _params.GoodsStatic(obj).then(res => {
                if(res.data.meta.status == 200){
                    this.only = res.data.data
                }
                console.log(this.only)
            })
        },
        // 添加动态参数
        addDyOk(){
            let obj = {
                token:Local.get('token'),
                id: this.id,
                attr_name: this.dyparams,
                attr_sel: 'many'
            }
            _params.GoodsAddStatic(obj).then(res => {
                if(res.data.meta.status == 201){
                    this.flag = false
                    this.$message({
                        message: '添加动态参数成功',
                        center: true,
                        type: 'success'
                    })
                    this.handleChange()
                }
            })
        },
        // 删除静态参数
        staShow(v){
            console.log(v)
            this.stat = true
            this.ad = v.attr_id
        },
        delSt(){
            let obj = {
                token:Local.get('token'),
                id: this.id,
                attr_id: this.ad
            }
            _params.DelStatic(obj).then(res => {
                console.log(res)
                if(res.data.meta.status == 200) {
                     this.stat = false
                     this.$message({
                        message: '删除动态参数成功',
                        center: true,
                        type: 'success'
                    })
                    this.handleChange()
                }
            })
        },
        // 删除动态参数
        delShow(v){
            this.tf = true
            this.attr_id = v.attr_id
        },
        delDy(){
            let obj = {
                token:Local.get('token'),
                id: this.id,
                attr_id: this.attr_id
            }
            _params.GoodsDelStatic(obj).then(res => {
                if(res.data.meta.status == 200) {
                     this.tf = false
                     this.$message({
                        message: '删除动态参数成功',
                        center: true,
                        type: 'success'
                    })
                    this.handleChange()
                }
            })
        },
        handleClick(tab, event) {
            // console.log(event);
        },
    }
}
</script>

<style lang="scss" scoped>
.params-header{
    height: 50px;
    line-height: 50px;
    color: #333;
    a {
      margin-left: 30px;
      text-decoration: none;
      color: #333;
    }
}
.params-box{
  width: 95%;
  border: 1px solid;
  border-radius: 5px;
  // margin-left: 30px;
  margin: 0 auto;
  margin-top: 15px; 
  background-color: white;
  padding: 5px;
}
    .params{
      width: 100%;
      height: 100%;
      background-color: #cdcdcd;
      padding-bottom: 50px;
       .block{
           margin: 15px 0;
       }
       .addbtn{
           margin-bottom: 15px;
       }
       .wrap{
            display: flex;
            height: 60px;
            align-items: center;
            .inp{
                width: 85%;
            }
        }
        .el-tag + .el-tag {
            margin-left: 10px;
        }
        .button-new-tag {
            margin-left: 10px;
            height: 32px;
            line-height: 30px;
            padding-top: 0;
            padding-bottom: 0;
        }
        .input-new-tag {
            width: 90px;
            margin-left: 10px;
            vertical-align: bottom;
        }
    }
</style>