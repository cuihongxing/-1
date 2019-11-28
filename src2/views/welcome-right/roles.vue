<template>
  <div class="roles">
      <div class="roles-header"> 
          <router-link to="/welcome">首页</router-link>
          <span>></span>
          <span>权限管理</span>
          <span>></span>
          <span>角色列表</span>
      </div>
      <div class="roles-box">
          <div class="roles-box-header">
              <el-button type="primary" @click="addrole">添加角色</el-button>
          </div>
          <div class="roles-box-content">
              <el-table :data="list" border style="width: 95%">
                <el-table-column type="expand">
                  <template slot-scope="props">
                    <el-form label-position="left" inline class="demo-table-expand">
                        <el-form-item>
                              <div v-for="item in props.row.children" :key="item.id" class="roles-box-content-box">
                                  <div class="roles-box-content-box-one">
                                     <el-tag closable>{{item.authName}}</el-tag>
                                  </div>
                                  <div>
                                      <div v-for="v in item.children" :key="v.id" class="roles-box-content-box-two">
                                          <div>
                                              <el-tag type="success" closable>{{v.authName}}</el-tag>
                                          </div>
                                          <div class="roles-box-content-box-three">
                                              <div v-for="pay in v.children" :key="pay.id" class="therr">
                                                  <el-tag type="warning" closable>{{pay.authName}}</el-tag>
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
                <el-table-column label="角色名称" prop="roleName" width="160px"></el-table-column>
                <el-table-column label="描述" prop="roleDesc"></el-table-column>
                <el-table-column label="操作" width="300px">
                    <template slot-scope="scope">
                        <el-button ton type="primary" icon="el-icon-edit" size="mini" @click="compile(scope.row,scope.$index)">编辑</el-button>
                        <el-button type="danger" icon="el-icon-delete" size="mini" @click="del(scope.row,scope.$index)">删除</el-button>
                        <el-button type="warning" icon="el-icon-s-tools" size="mini" @click="allocation(scope.row,scope.$index)">分配权限</el-button>
                    </template>  
                </el-table-column>
              </el-table>
         </div> 
          <!-- 添加角色 -->
          <div>
              <el-dialog title="添加角色信息" :visible.sync="compile2"  width="40%" :before-close="handleClose">
                  <el-form :model="role" ref="role" label-width="100px" class="demo-ruleForm">
                    <el-form-item label="角色名称">
                      <el-input v-model="role.name"></el-input>
                    </el-form-item>
                    <el-form-item label="角色描述">
                      <el-input v-model="role.roleDescribe"></el-input>
                    </el-form-item>
                  </el-form>
                  <span slot="footer" class="dialog-footer">
                      <el-button @click="compile2 = false">取 消</el-button>
                      <el-button type="primary" @click="addroles">确 定</el-button>
                  </span>
              </el-dialog>
          </div>
          <!-- 编辑 -->
          <div>
              <el-dialog title="编辑角色信息" :visible.sync="compile1"  width="40%" :before-close="handleClose">
                  <el-form :model="ruleForm" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                    <el-form-item label="角色名称">
                      <el-input v-model="ruleForm.rolesUser"></el-input>
                    </el-form-item>
                    <el-form-item label="角色描述">
                      <el-input v-model="ruleForm.rolesDescribe"></el-input>
                    </el-form-item>
                  </el-form>
                  <span slot="footer" class="dialog-footer">
                      <el-button @click="compile1 = false">取 消</el-button>
                      <el-button type="primary" @click="compilerole">确 定</el-button>
                  </span>
              </el-dialog>
          </div>
          <!-- 分配权限 -->
          <el-dialog title="分配权限" :visible.sync="compile3" width="50%" :before-close="handleClose">
              <el-tree
                :data="newList"
                ref="tree"
                show-checkbox
                default-expand-all
                :props="defaultProps"
                node-key="id">
              </el-tree>
              <span slot="footer" class="dialog-footer">
                  <el-button @click="compile3 = false">取 消</el-button>
                  <el-button type="primary" @click="rightsOk">确 定</el-button>
              </span>
          </el-dialog>
      </div>
  </div>
</template>

<script>
import Local from '../../local/index'
import roles from '../../services/connector'
const _roles = new roles()
export default {
    data() {
      return {
          list:[],
          compile1:false, //编辑状态
          compile2:false, //添加状态 框
          compile3:false, //分配权限状态 框
          ruleForm: {
            id:'',
            rolesUser:'',
            rolesDescribe:''
          },
          role: {
              name:'',
              roleDescribe:''
          },
          props: {
            label: 'name',
            children: 'zones'
          },
          count: 1,
          newList:[],
          defaultProps: {
            children:'children',
            label:'authName'
          },
          id:'', //分配权限的id
      } 
    },
    created() {
        let token = Local.get('token')
        _roles.Roles(token).then((res)=>{
            
            this.list = res.data.data
            console.log(this.list)
        })
    },
    methods: {
        handleCheckChange(data, checked, indeterminate) {
          console.log(data, checked, indeterminate);
        },
        handleNodeClick(data) {
          console.log(data);
        },
        loadNode(node, resolve) {
          if (node.level === 0) {
            return resolve([{ name: 'region1' }, { name: 'region2' }]);
          }
          if (node.level > 3) return resolve([]);

          var hasChild;
          if (node.data.name === 'region1') {
            hasChild = true;
          } else if (node.data.name === 'region2') {
            hasChild = false;
          } else {
            hasChild = Math.random() > 0.5;
          }

          setTimeout(() => {
            var data;
            if (hasChild) {
              data = [{
                name: 'zone' + this.count++
              }, {
                name: 'zone' + this.count++
              }];
            } else {
              data = [];
            }

            resolve(data);
          }, 500);
        },
        //添加角色
        addrole(){
            this.compile2 = true
        },
        //确定添加
        addroles(){
            let obj = {
                token:Local.get('token'),
                roleName:this.role.name,
                roleDesc:this.role.roleDescribe
            }
            _roles.RolesUser(obj).then((res)=>{
                console.log(res)
                if(res.data.meta.status == 201){
                  this.compile2 = false
                  this.$message({
                      message: '创建成功',
                      type: 'success'
                  });
                }else{
                    this.$message.error('创建失败');
                } 
            })
            // console.log(obj)
        },
        //编辑弹窗 关闭
        handleClose(done) {
          this.$confirm('确认关闭？')
            .then(_ => {
              done();
            })
            .catch(_ => {});
        },
        //点击编辑获取数据
        compile(v,i){
            this.compile1 = true
            this.ruleForm.id = v.id
            this.ruleForm.rolesUser = v.roleName
            this.ruleForm.rolesDescribe = v.roleDesc
            console.log(v,i)
        },
        //编辑确认
        compilerole(){
            let obj = {
                token:Local.get('token'),
                id:this.ruleForm.id,
                roleName:this.ruleForm.rolesUser,
                roleDesc:this.ruleForm.roleDescribe
            }
            _roles.RolesCompi(obj).then((res)=>{
                // console.log(res)
                if(res.data.meta.status == 200){
                  this.compile1 = false
                  this.$message({
                      message: '修改成功',
                      type: 'success'
                  });
                }else{
                    this.$message.error('修改失败');
                } 
            })
        },
        //删除
        del(v,i){
            let obj = {
              token:Local.get("token"),
              id:v.id
            }
            console.log(obj)
            this.$confirm('此操作将永久删除该角色, 是否继续?', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              _roles.RolesDele(obj).then((res)=>{
                  console.log(res)
                  if(res.data.meta.status == 200){
                      this.$message({
                        type: 'success',
                        message: '删除成功!'
                      });
                  }
              }) 
            }).catch(() => {
              this.$message({
                type: 'info',
                message: '已取消删除'
              });          
            });
        },
        //分配权限 数据
        allocation(v,i){
            this.compile3 = true
            let token = Local.get('token')
            this.id = v.id
            console.log(this.id)
            _roles.RightsAllocation(token).then((res)=>{
                this.newList = res.data.data
            })
        },
        //分配权限
         rightsOk(){
            let str = []
            str = (this.$refs.tree.getHalfCheckedKeys().concat(this.$refs.tree.getCheckedKeys()).join())
            let obj = {
                token:Local.get('token'),
                id:this.id,
                rids: str
            }
            _roles.RightsOk(obj).then((res)=>{
                 if(res.data.meta.status == 200){
                    this.compile3 = false
                    this.$message({
                        message: '分配权限成功',
                        center: true,
                        type: 'success'
                    })
//                     this.getRolesList()
                 }
            })
            // console.log(str)
            // console.log(obj)
        },
    }
}
</script>

<style lang="scss" scoped>
.roles-box-content-box{
  display: flex;
  .roles-box-content-box-two{
    display: flex;
    margin-left: 25px;
  }
  .roles-box-content-box-three{
    display: flex;
    margin-left: 25px;
    .therr{
      margin-left: 10px;
    }
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
.roles-box-content{
  margin-left: 20px;
  margin-top: 15px;
}
.roles-header{
  // width: 90%;
  height: 50px;
  line-height: 50px;
  color: #333;
  a{
    margin-left:30px;
    text-decoration: none;
    color: #333
  }
}
.roles{
  width: 100%;
  height: 100%;
  background-color: #cdcdcd;
  .roles-box{
    width: 95%;
    margin: 0 auto;
    height: 100%;
    background-color: white;
    border-radius: 5px;
    border: 1px solid;
    .roles-box-header{
      margin-left: 20px;
      margin-top: 20px;
    }
  }
}
</style>