<template>
    <div class="user">
        <sideTop>
            <p slot="one">用户管理</p>
            <p slot="two">用户列表</p>
        </sideTop>

        <div class="contain">
            <!-- 搜索框 -->
            <div class="search">
                <el-input v-model="search" class="ipt" placeholder="请输入内容"/>
                <el-button type="info" @click="searchName" class="ser" icon="el-icon-search" plain></el-button>
            </div>
            <el-button type="primary" @click="dialogVisible = true">添加用户</el-button>
        </div>
        
        <!-- 表格 -->
        <el-table
         :data="tableData" 
         border style="width: 100%">
            <el-table-column type="index"  label="#" width="50"></el-table-column>
            <el-table-column prop="username" label="姓名" width="100"></el-table-column>
            <el-table-column prop="email" label="邮箱" width="180"></el-table-column>
            <el-table-column prop="mobile" label="电话" width="180"></el-table-column>
            <el-table-column prop="role_name" label="角色" width="180"></el-table-column>
            
            <el-table-column label="状态" width="180">
                <template slot-scope="scope">
                    <el-switch v-model="scope.row.mg_state" @change="changeState(scope.row,scope.$index)"></el-switch>
                </template>
            </el-table-column>

            <el-table-column label="操作" width="240">
                <template slot-scope="scope">
                    <el-button @click="edit(scope.row,scope.$index)" type="primary" icon="el-icon-edit" size="mini"></el-button>
                    <el-button @click="del(scope.row,scope.$index)" type="danger" icon="el-icon-delete" size="mini"></el-button>
                    <el-button @click="distribution(scope.row,scope.$index)" type="warning" icon="el-icon-setting" size="mini"></el-button>
                </template>
            </el-table-column>
        </el-table>
        <!-- 分页器 -->
        <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[1, 10, 20, 30]"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total">
        </el-pagination>
        
        <!-- 添加用户 -->
        <el-dialog
            title="添加信息"
            :visible.sync="dialogVisible"
            width="30%">
            <div>
                <div class="wrap">
                    <p>用户名：</p>
                    <el-input v-model="username" class="inp"></el-input>
                </div>
                <div class="wrap">
                    <p>密码：</p>
                    <el-input v-model="password" class="inp"></el-input>
                </div>
                <div class="wrap">
                    <p>邮箱：</p>
                    <el-input v-model="email" class="inp"></el-input>
                </div>
                <div class="wrap">
                    <p>手机：</p>
                    <el-input v-model="mobile" class="inp"></el-input>
                </div>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="addUser">确 定</el-button>
            </span>
        </el-dialog>
        <!-- 编辑用户 -->
        <el-dialog
            title="修改用户信息"
            :visible.sync="flag"
            width="30%">
            <div>
                <div class="wrap">
                    <p>用户名：</p>
                    <el-input v-model="newName" class="inp"></el-input>
                </div>
                <div class="wrap">
                    <p>邮箱：</p>
                    <el-input v-model="newEmail" class="inp"></el-input>
                </div>
                <div class="wrap">
                    <p>手机：</p>
                    <el-input v-model="newMobile" class="inp"></el-input>
                </div>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="flag = false">取 消</el-button>
                <el-button type="primary" @click="update">确 定</el-button>
            </span>
        </el-dialog>
        <!-- 分配角色 -->
        <el-dialog
            title="分配角色"
            :visible.sync="isShow"
            width="30%">
            <div>
                <div class="role">
                    <p>当前的用户：</p>
                    <p>{{ username }}</p>
                </div>
                <div class="role">
                    <p>当前的角色：</p>
                    <p>{{ roles }}</p>
                </div>
                <div class="role">
                    <p>分配新角色：</p>
                    <el-select v-model="value" placeholder="请选择" @change="slt(value)">
                        <el-option 
                        v-for="item in rolesList" :key="item.id"
                        :value="item.roleName">
                        {{ item.roleName }}</el-option>
                    </el-select>
                </div>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="isShow = false">取 消</el-button>
                <el-button type="primary" @click="roleOk">确 定</el-button>
            </span>
        </el-dialog>
        <!-- 删除模态框 -->
        <el-dialog
            title="提示"
            :visible.sync="bool"
            width="30%"
            >
            <span>此操作将永久删除该用户, 是否继续?</span>
            <span slot="footer" class="dialog-footer">
                    <el-button @click="bool = false">取 消</el-button>
                    <el-button @click="delOk" type="primary">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import sideTop from '../../components/content/sideTop/sideTop'
import Product from '../../services/product-service'
const _product = new Product()
export default {
    name: 'users',
    components: {
        sideTop
    },
    data () {
        return {
            tableData: [],
            search: '',   
            dialogVisible: false,
            flag: false,
            isShow: false,
            bool: false,
            username: '',
            password: '',
            email: '',
            mobile: '',
            newName: "",
            newEmail: '',
            newMobile: '',
            total:0,
            currentPage:1,
            pageSize:10,
            id: '',
            rid: '',
            cid: '',
            roles: '',
            rolesList: [],
            value: '',
            figure: '',
            delId: ''
        }
    },
    mounted(){
        this.getList()
    },
    methods: {
        // 修改用户状态
        changeState(v){
            console.log(v)
            let obj = {
                id: v.id,
                true: v.mg_state
            }
             _product.changeState(obj).then(res => {
                console.log(res)
            })
        },
        //删除用户
        del(v,i){
            this.delId = v.id
            this.bool = true
        },
        delOk(){
            _product.del(this.delId).then(res => {
                if(res.data.meta.status == 200) {
                    console.log(res)
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    })
                    this.bool = false
                    this.getList()
                }
            })
        },
        // 搜索用户
        searchName(){
            let obj = {
                query: this.search,
                pagenum: this.currentPage,
                pageSize: this.pageSize
            }
            _product.search(obj).then(res => {
                if (res.data.meta.status == 200) {
                    this.tableData = res.data.data.users
                }
            })
        },
        // 分配权限
        distribution(v,i){
            this.isShow = true
            this.id = v.id
            this.username = v.username
            this.roles = v.role_name
            _product.roles().then(res => {
                console.log(res)
                if(res.data.meta.status == 200){
                    this.rolesList = res.data.data
                } 
            })
        },
        slt(v){
            this.figure = v
            this.rolesList.forEach(item => {
                if (item.roleName == v) {
                    this.rid = item.id
                }
            })
            console.log(this.rid)
        },
        roleOk(){
            this.isShow = false
            let obj = {
                role: this.figure,
                id: Number(this.id),
                rid: Number(this.rid)
            }
            _product.disRoles(obj).then(res => {
                console.log(res)
                if(res.data.meta.status == 200){
                    this.getList()
                }
            })
        },
        //编辑用户
        edit(v,i){
            this.flag = true   
            this.id = v.id
            this.newName = v.username
            this.newEmail = v.email
            this.newMobile = v.mobile
        },
        update(){
            let obj = {
                id: this.id,
                username: this.newName,
                email: this.newEmail,
                mobile: this.newMobile
            }
            _product.edit(obj).then(res => {
                console.log(res)
                if(res.data.meta.status == 200){
                    this.flag = false
                    this.$message({
                        message: '恭喜你，修改成功',
                        center: true,
                        type: 'success'
                    })
                    this.getList()   
                }
            })
        },
        //渲染用户列表
        getList(){
            let params = {
                pagenum: this.currentPage,
                pagesize: this.pageSize
            }
            _product.usersList(params).then(res=>{
                if(res.data.meta.status == 200) {
                    this.tableData = res.data.data.users
                    this.total = res.data.data.total
                }
                console.log(res)
            })
        },
        handleSizeChange(val){
            this.pageSize = val;
            this.getList()
        },
        handleCurrentChange(val){
            this.currentPage = val
            this.getList()
        },
        //添加新用户
        addUser(){
            this.dialogVisible = false
            let obj = {
                username: this.username,
                password: this.password,
                email: this.email,
                mobile: this.mobile
            }
            _product.users(obj).then(res => {
                if(res.data.meta.status == 201){
                   this.getList()
                    this.$message({
                        message: '恭喜你，添加成功',
                        center: true,
                        type: 'success'
                    })
                }
            })
        }
    }
  }
</script>

<style lang="scss" scoped>
    .user{
        .contain{
            display: flex;
            height: 40px;
            margin-bottom: 15px;
            .search{
                display: flex;
                .ipt{
                    width: 300px;
                    height: 40px;
                }
                .ser{
                    margin-right: 15px;
                    border-left: none;
                    border-top-left-radius: 0;
                    border-bottom-left-radius: 0;
                }
            }
        }
        .wrap{
            display: flex;
            width: 95%;
            margin: 10px auto;
            height: 40px;
            align-items: center;
            justify-content: space-between;
            >p{
               width: 120px;
               text-align: right;
            }
            .inp{
                width: 80%;
            }
        }
        .role{
            display: flex;
            height: 60px;
            align-items: center;
            >p:nth-of-type(1){
                text-indent: 20px;
                margin-right: 15px;
            }
        }
    }
</style>