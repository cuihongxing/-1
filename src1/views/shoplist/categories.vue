<template>
    <div class="cate">
        <el-button class="btn" type="primary" @click="addCl">添加分类</el-button>
        <el-table
            class="table"
            :header-cell-style="{background:'#f8f8f9',color:'#000'}"
            :data="tableData"
            style="width: 100%"
            row-key="cat_id"
            border
            :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
            <el-table-column prop="cat_name" label="分类名称"></el-table-column>
            <el-table-column prop="cat_deleted" label="是否有效">
                <i style="color:lightseagreen" class="el-icon-circle-check"></i>
            </el-table-column>
            <el-table-column label="排序">
                <template slot-scope="scope">
                        <el-tag v-show="scope.row.cat_level == 0">
                            一级
                        </el-tag>
                        <el-tag type="success" v-show="scope.row.cat_level == 1">
                            二级
                        </el-tag>
                        <el-tag type="warning" v-show="scope.row.cat_level == 2">
                            三级
                        </el-tag>
                    </template>
            </el-table-column>
            <el-table-column label="操作">
                 <template slot-scope="scope">
                    <el-button @click="edit(scope.row,scope.$index)" type="primary" icon="el-icon-edit" size="mini">编辑</el-button>
                    <el-button @click="del(scope.row,scope.$index)" type="danger" icon="el-icon-delete" size="mini">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <!-- 分页器 -->
        <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[1, 5, 10, 15]"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total='total'>
        </el-pagination>
        <!-- 商品编辑 -->
        <el-dialog
            title="编辑分类信息"
            :visible.sync="bool"
            width="50%"
            >
             <div class="wrap">
                <p>分类名称：</p>
                <el-input v-model="shopinfo" class="inp"></el-input>
            </div>
            <span slot="footer" class="dialog-footer">
                    <el-button @click="bool = false">取 消</el-button>
                    <el-button @click="editOk" type="primary">确 定</el-button>
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
                    <el-button @click="delOk" type="primary">确 定</el-button>
            </span>
        </el-dialog>
        <!-- 添加分类模态框 -->
        <el-dialog
            title="添加分类"
            :visible.sync="flag"
            width="50%"
            >
             <div class="wrap">
                <p>分类名称：</p>
                <el-input v-model="clname" class="inp"></el-input>
            </div>
             <div class="box">
                <div class="block">
                    <span class="demonstration">父级分类：</span>
                    <el-cascader
                        class="casc"
                        :options="options"
                        :props="defaultData"
                        @change="handleChange"
                        v-model="val"
                        clearable></el-cascader>
                </div>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="flag = false">取 消</el-button>
                <el-button type="primary" @click="addClOk">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import Classify from '../../services/categories'
const _classify = new Classify()
export default {
    name: 'categories',
    data () {
        return {
            tableData: [],
            total:0,
            currentPage:1,
            pageSize:5,
            bool: false,
            flag: false,
            shopinfo: '',
            id: '',
            stat: false,
            options: [],
            clname: '',
             defaultData: {
                checkStrictly: true,
                value: 'cat_id',
                label: 'cat_name',
                children: 'children'
            },
            cat_id: 0,
            cat_level: 0,
            val: []
        }
    },
    mounted () {
        this.getCateList()
    },
    methods: {
        // 添加分类
        handleChange(value){
            this.cat_id = value[value.length-1]
            if(value.length == 1){
                this.cat_level = 1
            }else if(value.length == 2) {
                this.cat_level = 2
            }
        },
        addCl(){
            this.flag = true
             _classify.addCateList().then(res => {
                if(res.data.meta.status == 200) {
                    this.options = res.data.data
                }
            })
        },
        addClOk(){
            this.flag = false
            if(this.val.length == 0){
                this.cat_level = 0
                this.cat_id = 0
            }
            let obj = {
                cat_pid: this.cat_id,                                               
                cat_name: this.clname,
                cat_level: this.cat_level
            }
            console.log(obj)
            _classify.addCate(obj).then(res => {
                if(res.data.meta.status == 201){
                    this.$message({
                        message: '添加分类成功',
                        center: true,
                        type: 'success'
                    })
                    this.getCateList()
                }
                //console.log(res)
            })
        },
        getCateList(){
            let obj = {
                pagenum: this.currentPage,
                pagesize: this.pageSize
            }
            _classify.getCategories(obj).then(res => {
                console.log(res.data.data)
                if(res.data.meta.status == 200) {
                    this.tableData = res.data.data.result
                    this.total = res.data.data.total
                }
                
            }) 
        },
         handleSizeChange(val){
            this.pageSize = val;
            this.getCateList()
        },
        handleCurrentChange(val){
            this.currentPage = val
            this.getCateList()
        },
        // 编辑分类
        edit(v){
            this.bool = true
            console.log(v)
            this.shopinfo = v.cat_name
            this.id = v.cat_id
        },
        editOk(){
            let obj = {
                id: this.id,
                cat_name: this.shopinfo
            }
            _classify.editCate(obj).then(res => {
                if(res.data.meta.status == 200) {
                    this.bool = false
                    this.$message({
                        message: '更新成功',
                        center: true,
                        type: 'success'
                    })
                    this.getCateList()
                }
            })
        },  
        del(v){
            this.stat = true
            console.log(v)
            this.id = v.cat_id
        },
        delOk(){
            _classify.delCate(this.id).then(res => {
                console.log(res)
                if(res.data.meta.status == 200) {
                    this.stat = false
                    this.$message({
                        message: '删除成功',
                        center: true,
                        type: 'success'
                    })
                    this.getCateList()
                }
            })
        }
    }
}
</script>

<style lang="scss" scoped>
    .cate{
        width: 100%;
        .btn{
            margin-bottom: 20px;
        }
        .table{
            color: #000;
            font-size: 12px;
        }
        .box{
            .block{
                display: flex;
                height: 60px;
                align-items: center;
                .casc{
                    width: 85%;
                }
            }
        }
        
         .wrap{
            display: flex;
            height: 60px;
            align-items: center;
            .inp{
                width: 85%;
            }
        }
    }
</style>