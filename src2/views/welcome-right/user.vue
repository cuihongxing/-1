<template>
    <div class="user">
        <div class="user-header"> 
            <router-link to="/welcome">首页</router-link>
            <span>></span>
            <span>用户管理</span>
            <span>></span>
            <span>用户列表</span>
        </div>
        <div class="user-box">
            <div>
                <el-input class="user-input" v-model="input" ref="input" placeholder="请输入内容"></el-input>
                <el-button type="info" @click="each">搜索</el-button>
                <el-button type="primary" @click="dialogVisible = true">添加用户</el-button>
            </div>
            <!-- 数据渲染 -->
            <template>
              <el-table  border :data="list.slice((currentPage - 1) * pagesize,currentPage * pagesize)" style="width: 90%" class="user-table">
                <el-table-column  label="#" width="80px" type="index"></el-table-column>
                <el-table-column prop="username" width="120px" label="姓名"></el-table-column>
                <el-table-column prop="email" label="邮箱"></el-table-column>
                <el-table-column prop="create_time"  label="电话"></el-table-column>
                <el-table-column prop="role_name" width="130px" label="角色"></el-table-column>
                <template >
                    <el-table-column width="120px"  label="状态">
                      <el-switch active-color="#13ce66" v-model="list.mg_state" inactive-color="#ff4949"></el-switch>
                    </el-table-column>
                </template>
                
                <!-- <template slot-scope="scope">
                    <el-button @click="edit(scope.row,scope.$index)" type="primary" icon="el-icon-edit" size="mini"></el-button>
                    <el-button @click="del(scope.row,scope.$index)" type="danger" icon="el-icon-delete" size="mini"></el-button>
                    <el-button @click="distribution(scope.row,scope.$index)" type="warning" icon="el-icon-setting" size="mini"></el-button>
                </template> -->
                <el-table-column  label="操作" width="210px" class="user-button">
                  <template slot-scope="scope">
                    <el-button type="primary" size="mini" icon="el-icon-edit" @click="edit(scope.row,scope.$index)"></el-button>
                    <el-button type="danger" size="mini" icon="el-icon-delete" @click="del(scope.row,scope.$index)"></el-button>
                    <el-button type="warning" size="mini" icon="el-icon-setting" @click="set(scope.row,scope.$index)"></el-button>
                  </template>
                </el-table-column>
              </el-table>  
            </template> 
            <!-- 分页器 -->
            <div class="block">
              <el-pagination 
                @size-change="handleSizeChange" 
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                :page-sizes="[2, 5, 10, 15]"
                :page-size="pagesize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="list.length">
              </el-pagination>
            </div>         
        </div>
        <!-- 添加用户信息 -->
        <div>
          <el-dialog title="添加用户" :visible.sync="dialogVisible" width="40%" :before-close="handleClose" class="suer-button-item">
                <el-form :model="numberValidateForm" ref="numberValidateForm" label-width="100px" class="demo-ruleForm">
                    <el-form-item label="用户名" prop="userName" :rules="[{ required: true, message: '用户名不能为空'},{ type: '', message: ''}]">
                      <el-input v-model.number="numberValidateForm.userName" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="密码" prop="pass" :rules="[{ required: true, message: '密码不能为空'},{ type: 'number', message: '密码必须为数字值'}]">
                      <el-input v-model.number="numberValidateForm.pass" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="邮箱" prop="email">
                      <el-input v-model="numberValidateForm.mailbox"></el-input>
                    </el-form-item> 
                    <el-form-item label="手机号" prop="cellphone" :rules="[{ required: true, message: '手机号不能为空'},{ type: 'number', message: '手机号必须为数字值'}]">
                      <el-input v-model.number="numberValidateForm.cellphone" autocomplete="off"></el-input>
                    </el-form-item> 
                </el-form>
            <span slot="footer" class="dialog-footer">
              <el-button @click="dialogVisible = false">取 消</el-button>
              <el-button type="primary" @click="add">确 定</el-button>
            </span>
          </el-dialog>
        </div>
        <!-- 修改用户信息 -->
        <div>
          <el-dialog title="修改用户信息" :visible.sync="dialogVisible1" width="50%" :before-close="handleClose">
             <el-form :model="ruleForm" status-icon ref="ruleForm" label-width="100px" class="demo-ruleForm">
              <el-form-item label="用户名" prop="pass">
                <el-input  :disabled="true" v-model="ruleForm.user" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="邮箱" prop="checkPass">
                <el-input v-model="ruleForm.email1" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="手机号" prop="age">
                <el-input v-model.number="ruleForm.cellphone1"></el-input>
              </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
              <el-button @click="dialogVisible1 = false">取 消</el-button>
              <el-button type="primary" @click="xiugai">确 定</el-button>
            </span>
          </el-dialog>
        </div>
        <!-- 设置角色 -->
        <div>
          <el-dialog title="分配角色" :visible.sync="dialogFormVisible2">
            <el-form :model="form">
              <el-form-item label="当前的用户" :label-width="formLabelWidth">
                <span v-html="form.name"></span>
              </el-form-item>
              <el-form-item label="当前的角色" :label-width="formLabelWidth">
                <span v-html="form.user"></span>
              </el-form-item>
              <el-form-item :data="list" label="分配新角色" :label-width="formLabelWidth">
                <el-select v-model="form.region" placeholder="请选则">
                  <el-option label="" :value="role_name"></el-option>
                  <el-option label="区域二" value="beijing"></el-option>
                </el-select>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogFormVisible2 = false">取 消</el-button>
              <el-button type="primary" @click="dialogFormVisible2 = false">确 定</el-button>
            </div>
          </el-dialog>
        </div>
    </div>
</template>

<script>
import Local from '../../local/index'
import Menus from '../../services/connector'
const _menus = new Menus()
export default {
  data () {
    return {
        input:'',
        list:[],
        currentPage: 1,
        pagesize:5,
        leng:'',
        dialogVisible: false,
        dialogVisible1:false,
        dialogFormVisible2:false,
        abc:true,
        numberValidateForm: {
          userName:'',//用户名
          pass:'', //密码
          mailbox:"", // 邮箱
          cellphone:'',//手机号
        },
        ruleForm: {
          user:'',
          id:'',
          email1: '',
          cellphone1: ''
        },
        form: {
          name: '',
          region: '',
          user: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
        formLabelWidth: '120px',
    }
  },
  created() {
    this.getList()
  },
  methods: {
      //总数据
      getList(){
        let token = Local.get('token')
        _menus.Goods(token).then((res)=>{
          this.list = res.data.data.users
          // console.log(res)
        })
      },
      //分页器
      handleSizeChange(val) {
        this.pagesize = val
      },
      handleCurrentChange(val) {
        this.currentPage = val
      },
       handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      },
      //搜索
      	each() {
          let obj = {
            val:this.$refs.input.value,
            token:Local.get('token')
          }
          _menus.UserSeek(obj).then((res)=>{
            this.list = res.data.data.users
            console.log(res)
          })
         
        },
      //添加用户
      add(){
        let obj = {
          token:Local.get('token'),
          username:this.numberValidateForm.userName,
          password:this.numberValidateForm.pass,
          email:this.numberValidateForm.mailbox,
          mobile:this.numberValidateForm.cellphone
        }
        // console.log(obj)
        
        _menus.Users(obj).then((res)=>{
          console.log(res)
          this.dialogVisible = false
          this.$message({
                        message: '创建成功',
                        type: 'success'
                    });
        })
        this.getList()
      },
      //修改 获取数据
      edit(v,i){
        this.dialogVisible1 = true
        this.ruleForm.user = v.username
        this.ruleForm.id = v.id
        this.ruleForm.email1 = v.email
        this.ruleForm.cellphone1 = v.create_time
        console.log(this.ruleForm.user)
      },
      //修改
      xiugai(){
        let obj = {
          token:Local.get('token'),
          id:this.ruleForm.id,
          username:this.ruleForm.user,
          email:this.ruleForm.email1,
          monile:this.ruleForm.cellphone1
        }
        _menus.UsersCompile(obj).then((res)=>{
          console.log(res)
          if(res.data.meta.status == 200){
            this.dialogVisible1 = false
            this.$message({
                message: '修改成功',
                type: 'success'
            });
          }
          
        })
        this.getList()
      },
      //删除
      del(v,i) {

        let obj = {
          token:Local.get("token"),
          id:v.id
        }
        // console.log(obj)
        this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        .then(() => {
          _menus.UsersDel(obj).then((res)=>{
            console.log(res)
            if(res.data.meta.status == 200){
                this.$message({
                  type: 'success',
                  message: '删除成功!'
                });
            }else{
                this.$message.error('删除失败');
            } 
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
      },
      //设置管理
      set(v,i){
          console.log(v,i)
          this.dialogFormVisible2 = true
          this.form.name = v.username
          this.form.user = v.role_name
      }
  }
}
</script>

<style lang="scss" scoped>
.user{
  width: 100%;
  height: 100%;
  background-color: #DCDCDC;
}
.block{
  margin-left: 30px;
  margin-top: 20px;
}
.user-table{
  margin-left: 30px;
  margin-top: 15px;
}
.user-input{
  width: 30%;
  margin-top: 20px;
  margin-left: 30px;
}
// .suer-button-item{
//   div{
//     display: flex;
//     align-items: center;
//     margin-top: 10px;
//     .input{
//       width: 70%;
//       margin-left: 30px;
//     }
//     .input1{
//       margin-left: 18px;
//       width: 70%;
//     }
//   }
//   span:nth-child(1){
//     color: red;
//   }
//   span:nth-child(2){
//     margin-left: 10px;
//   }
// }
.user-header{
  width: 90%;
  height: 50px;
  line-height: 50px;
  color: #333;
  a{
    margin-left:30px;
    text-decoration: none;
    color: #333
  }
}
.user-box{
  margin-left: 50px;
  width: 90%;
  // border: 1px solid;
  border-radius:5px; 
  height: 100%;
  background-color: white;
}
</style>