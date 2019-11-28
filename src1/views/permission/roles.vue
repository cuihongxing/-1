<template>
    <div class="roles">
        <sideTop>
            <p slot="one">权限管理</p>
            <p slot="two">角色列表</p>
        </sideTop>
        <!-- 添加角色 -->
        <el-button class="roles" type="primary" @click="addRoles">添加角色</el-button>
        <el-dialog
            title="提示"
            :visible.sync="dialogVisible"
            width="50%">
            <div>
                <div class="wrap">
                    <p>角色名称：</p>
                    <el-input v-model="roleName" class="inp"></el-input>
                </div>
                <div class="wrap">
                    <p>角色描述：</p>
                    <el-input v-model="roleDesc" class="inp"></el-input>
                </div>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="addOk">确 定</el-button>
            </span>
        </el-dialog>
        <!-- 编辑角色 -->
        <el-dialog
            title="提示"
            :visible.sync="isShow"
            width="50%">
            <div>
                <div class="wrap">
                    <p>角色名称：</p>
                    <el-input v-model="newRoleName" class="inp"></el-input>
                </div>
                <div class="wrap">
                    <p>角色描述：</p>
                    <el-input v-model="newRoleDesc" class="inp"></el-input>
                </div>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="isShow = false">取 消</el-button>
                <el-button type="primary" @click="editOk">确 定</el-button>
            </span>
        </el-dialog>
        <!-- 表格渲染 -->
        <el-table :data="tableData" style="width: 100%" :border="true">
            <el-table-column type="expand">
                <template slot-scope="props">
                    <el-form label-position="left" inline class="demo-table-expand">
                        <el-form-item>
                            <div v-for="item in props.row.children" :key="item.id" class="box">
                                <div class="one">
                                    <el-tag closable>{{ item.authName }}</el-tag>
                                </div>
                                <div>
                                    <div class="two" v-for="v in item.children" :key="v.id">
                                        <div class="s_tag">
                                            <el-tag type="success" closable>{{ v.authName }}</el-tag>
                                        </div>
                                        <div class="box2">
                                            <div v-for="pay in v.children" :key="pay.id" class="three">
                                                <el-tag class="t_tag" type="warning" closable>{{ pay.authName }}</el-tag>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </el-form-item>
                    </el-form>
                </template>
            </el-table-column>

            <el-table-column label="#" type="index"></el-table-column>
            <el-table-column label="角色名称" width="300" prop="roleName"></el-table-column>
            <el-table-column label="描述" width="300" prop="roleDesc"></el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button @click="edit(scope.row,scope.$index)" type="primary" icon="el-icon-edit" size="mini">编辑</el-button>
                    <el-button @click="del(scope.row,scope.$index)" type="danger" icon="el-icon-delete" size="mini">删除</el-button>
                    <el-button @click="rightsClick(scope.row,scope.$index)" type="warning" icon="el-icon-setting" size="mini">分配权限</el-button>
                </template>
            </el-table-column>
        </el-table>
         <!-- 删除模态框 -->
        <el-dialog
            title="提示"
            :visible.sync="flag"
            width="30%"
            >
            <span>此操作将永久删除该用户, 是否继续?</span>
            <span slot="footer" class="dialog-footer">
                    <el-button @click="flag = false">取 消</el-button>
                    <el-button @click="delOk" type="primary">确 定</el-button>
            </span>
        </el-dialog>
        <!-- 分配权限 -->
        <el-dialog
            title="提示"
            :visible.sync="bool"
            width="50%"
            >
            <el-tree
                :data="rightsLs"
                show-checkbox
                ref="tree"
                node-key="id"
                default-expand-all
                :props="defaultProps">
            </el-tree>
            <span slot="footer" class="dialog-footer">
                    <el-button @click="bool=false">取 消</el-button>
                    <el-button @click="rightsOk" type="primary">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import sideTop from '../../components/content/sideTop/sideTop'
import Product from '../../services/product-service'
const _product = new Product()
export default {
    name: 'roles',
    components: {
        sideTop
    },
    data () {
        return {
            tableData: [],
            dialogVisible: false,
            flag: false,
            isShow: false,
            bool: false,   
            roleName: '',
            roleDesc: '',
            newRoleName: '',
            newRoleDesc: '',
            id: '',
            item: '',
            rightsLs: [],
            defaultProps: {
                children: 'children',
                label: 'authName'
            }
        }
    },
    methods: {
        // 删除
        del(v){
            console.log(v)
            this.flag = true
            this.id = v.id
        },
        delOk(){
            _product.delRoles(this.id).then(res => {
                console.log(res)
                if(res.data.meta.status == 200) {
                    this.flag = false
                    this.$message({
                        message: '删除成功',
                        center: true,
                        type: 'success'
                    })
                    this.getRolesList()
                }
            })
        },
        // 删除小标签
        delLabel(){
            _product.delLabel.then(res => {
                console.log(res)
            })
        },
        //权限列表
        rightsClick(v){
            this.id = v.id
            console.log(this.item)
            this.bool = true
            _product.rightsList().then(res => {
                if(res.data.meta.status == 200){
                    this.rightsLs = res.data.data
                    console.log(this.rightsLs)
                }
            })
        },
        //分配权限
        rightsOk(){
            let str = []
            str = (this.$refs.tree.getHalfCheckedKeys().concat(this.$refs.tree.getCheckedKeys()).join())
            console.log(str)
            let obj = {
                id: this.id,
                rids: str
            }
            _product.disRights(obj).then(res => {
                if(res.data.meta.status == 200){
                    this.bool = false
                    this.$message({
                        message: '分配权限成功',
                        center: true,
                        type: 'success'
                    })
                    this.getRolesList()
                }
                console.log(res)
            })
        },
        // 编辑角色
        edit(v){
            console.log(v)
            this.isShow = true
            this.id = v.id
            this.newRoleName = v.roleName
            this.newRoleDesc = v.roleDesc
        },
        editOk(){
            let obj = {
                id: this.id,
                roleName: this.newRoleName,
                roleDesc: this.newRoleDesc
            }
            _product.editRoles(obj).then(res => {
                if(res.data.meta.status == 200){
                    this.isShow = false
                     this.$message({
                        message: '编辑成功',
                        center: true,
                        type: 'success'
                    })
                    this.getRolesList()
                }
                console.log(res)
            })
        },
        // 添加角色
        addRoles(){
            this.dialogVisible = true
        },
        addOk(){
            this.dialogVisible = false
            let obj = {
                roleName: this.roleName,
                roleDesc: this.roleDesc
            }
            _product.addRoles(obj).then(res => {
                console.log(res)
                if(res.data.meta.status == 201){
                    this.$message({
                        message: '添加角色成功',
                        center: true,
                        type: 'success'
                    })
                    this.getRolesList()
                }
            })
        },
        // 获取角色列表
        getRolesList(){
            _product.roles().then(res => {
                console.log(res)
                this.tableData = res.data.data
            })
        }  
    },
    created () {
        this.getRolesList()
    }
}
</script>

<style lang="scss" scoped>
    .wrap{
        display: flex;
        height: 60px;
        align-items: center;
        .inp{
            width: 80%;
        }
    }
  .demo-table-expand {
        font-size: 0;
    }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
  .box{
      display: flex;
      justify-content: flex-start;
      width: 100%;
      border-bottom: 1px solid #ddd;
      padding: 10px 0;
      .one{
          margin-right: 30px;
          
      }
      .two{
          align-items: center;
          display: flex;
          .s_tag{
              margin-right: 30px;
          }
          .box2{
              display: flex;
              width: 40%;
              .three{
                margin-right: 5px;
            }
          }
      }
  }
  .roles{
      margin-bottom: 15px;
  }
</style>