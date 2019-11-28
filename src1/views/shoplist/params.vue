<template>
    <div class="params">
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
        <el-tabs v-model="activeName">
            <el-tab-pane label="动态参数" name="first">
                <!-- 动态参数数据渲染 -->
                <el-button @click="flag=true" class="addbtn" size="mini" type="primary">添加参数</el-button>
                <el-table :data="many" style="width: 100%" :border="true">
                    <el-table-column type="expand">
                        <!-- <template slot-scope="props">
                            <el-form label-position="left" inline class="demo-table-expand">
                                <el-form-item>
                                    <el-tag closable>{{ props.row.attr_vals }}</el-tag>
                                    </el-form-item>
                            </el-form>
                        </template> -->
                        <template slot-scope="scope">
                            <el-tag
                                :key="index"
                                v-for="(tag,index) in scope.row.attr_vals.split(' ')"
                                closable
                                v-if="tag!=''"
                                :disable-transitions="false"
                                @close="handleCl(scope.row,index)">
                                {{tag}}
                            </el-tag>
                            <el-input
                                class="input-new-tag"
                                v-if="inputVis"
                                v-model="inputVal"
                                ref="saveTagIn"
                                size="small"
                                @keyup.enter.native="handleInputCon"
                                @blur="handleInputCon(scope.row,scope.$index)">
                            </el-input>
                            <el-button v-else class="button-new-tag" size="small" @click="showIn">+ New Tag</el-button>
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
                    <el-table-column type="expand" label="">
                        <template slot-scope="scope">
                            <el-tag
                                :key="index"
                                v-for="(tag,index) in scope.row.attr_vals.split(' ')"
                                closable
                                v-if="tag!=''"
                                :disable-transitions="false"
                                @close="handleClose(scope.row,index)">
                                {{tag}}
                            </el-tag>
                            <el-input
                                class="input-new-tag"
                                v-if="inputVisible"
                                v-model="inputValue"
                                ref="saveTagInput"
                                size="small"
                                @keyup.enter.native="handleInputConfirm"
                                @blur="handleInputConfirm(scope.row,scope.$index)">
                            </el-input>
                            <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
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
import Classify from '../../services/categories'
const _classify = new Classify()
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
           ad: '',
           inputVisible: false,
           inputVis: false,
           inputValue: '',
           inputVal: '',
           dynamicTags: [],
           arr: [],
           arr2: [],
           updateArr: [],
           updateArr2: []
        }
    },
    created () {
        _classify.categoriesList().then(res => {
            console.log(res)
            if(res.data.meta.status == 200) {
                this.options = res.data.data.result
            }
            //console.log(this.options)
        })
    },
    methods: {
        //tag的删除
        handleClose(v,i) {
            console.log(v,i)
            this.arr = v.attr_vals.split(" ")
            this.arr.splice(i,1)
            v.attr_vals = this.arr.join(' ')
            let obj = {
                id: v.cat_id,
                attr_id: v.attr_id,
                attr_name: v.attr_name,
                attr_sel: v.attr_sel,
                attr_vals: v.attr_vals
            }
            _classify.delSmall(obj).then(res => {
                 console.log(res)
                if(res.data.meta.status == 200) {
                     this.stat = false
                     this.$message({
                        message: '更新参数成功',
                        center: true,
                        type: 'success'
                   })
                    //this.getStatic()
                }
            })
        },
        handleCl(v,i) {
            console.log(v,i)
            this.arr2 = v.attr_vals.split(" ")
            this.arr2.splice(i,1)
            v.attr_vals = this.arr2.join(' ')
            let obj = {
                id: v.cat_id,
                attr_id: v.attr_id,
                attr_name: v.attr_name,
                attr_sel: v.attr_sel,
                attr_vals: v.attr_vals
            }
            _classify.delSmall(obj).then(res => {
                 console.log(res)
                if(res.data.meta.status == 200) {
                     this.stat = false
                     this.$message({
                        message: '更新参数成功',
                        center: true,
                        type: 'success'
                   })
                    //this.getStatic()
                }
            })
        },
        showInput() {
            this.inputVisible = true;
            this.$nextTick(_ => {
                this.$refs.saveTagInput.$refs.input.focus();
            });
        },
        showIn() {
            this.inputVis = true;
            this.$nextTick(_ => {
                this.$refs.saveTagIn.$refs.input.focus();
            });
        },
        //tag的修改
        handleInputConfirm(v,i) {
            console.log(v,i)
            let inputValue = this.inputValue;
            this.updateArr = v.attr_vals.split(" ")
            if (inputValue) {
                this.updateArr.push(inputValue)
            }
            let str = this.updateArr.join(' ')
            console.log(str)
            let obj = {
                id: v.cat_id,
                attr_id: v.attr_id,
                attr_name: v.attr_name,
                attr_sel: v.attr_sel,
                attr_vals: str
            }
            _classify.addSmall(obj).then(res => {
                 console.log(res)
                if(res.data.meta.status == 200) {
                    this.only[i].attr_vals = str
                     this.stat = false
                     this.$message({
                        message: '更新参数成功',
                        center: true,
                        type: 'success'
                   })
                }
            })
            this.inputVisible = false;
            this.inputValue = '';
        },
        handleInputCon(v,i) {
            console.log(v,i)
            let inputVal = this.inputVal;
            this.updateArr2 = v.attr_vals.split(" ")
            if (inputVal) {
                this.updateArr2.push(inputVal)
            }
            let str = this.updateArr2.join(' ')
            console.log(str)
            let obj = {
                id: v.cat_id,
                attr_id: v.attr_id,
                attr_name: v.attr_name,
                attr_sel: v.attr_sel,
                attr_vals: str
            }
            _classify.addSmall(obj).then(res => {
                 console.log(res)
                if(res.data.meta.status == 200) {
                    this.many[i].attr_vals = str
                     this.stat = false
                     this.$message({
                        message: '更新参数成功',
                        center: true,
                        type: 'success'
                   })
                }
            })
            this.inputVis = false;
            this.inputVal = '';
        },
        // 参数和属性的id获取
        handleChange(value) {
            this.id = value[value.length - 1]
            this.getActive()
            this.getStatic()
        },
        getActive(){
            // 动态参数
            _classify.getMany(this.id).then(res => {
                if(res.data.meta.status == 200){
                    this.many = res.data.data
                }
            })
        },
        getStatic(){
             // 静态属性
            _classify.getOnly(this.id).then(res => {
                if(res.data.meta.status == 200){
                    this.only = res.data.data
                }
                console.log(this.only)
            })
        },
        // 添加动态参数
        addDyOk(){
            let obj = {
                id: this.id,
                attr_name: this.dyparams,
                attr_sel: 'many'
            }
            _classify.addDy(obj).then(res => {
                if(res.data.meta.status == 201){
                    this.flag = false
                    this.$message({
                        message: '添加动态参数成功',
                        center: true,
                        type: 'success'
                    })
                    this.getActive()
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
                id: this.id,
                attr_id: this.ad
            }
            _classify.delSt(obj).then(res => {
                console.log(res)
                if(res.data.meta.status == 200) {
                     this.stat = false
                     this.$message({
                        message: '删除动态参数成功',
                        center: true,
                        type: 'success'
                    })
                    this.getStatic()
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
                id: this.id,
                attr_id: this.attr_id
            }
            _classify.delDy(obj).then(res => {
                if(res.data.meta.status == 200) {
                     this.tf = false
                     this.$message({
                        message: '删除动态参数成功',
                        center: true,
                        type: 'success'
                    })
                    this.getActive()
                }
            })
        }
    }
}
</script>

<style lang="scss" scoped>
    .params{
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