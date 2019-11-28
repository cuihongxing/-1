<template>
    <div class="goodslist">
        <sideTop>
            <p slot="one">商品管理</p>
            <p slot="two">商品列表</p>
        </sideTop>
        <div class="contain">
            <!-- 搜索框 -->
            <div class="search">
                <el-input class="ipt" v-model="shopname" placeholder="请输入内容"/>
                <el-button type="info" @click="search" class="ser" icon="el-icon-search" plain></el-button>
            </div>
            <el-button type="primary" @click="addShop">添加商品</el-button>
        </div>
        <!-- 渲染表格数据 -->
        <el-table
         class="tab"
         :data="tableData" 
         border style="width: 100%">
            <el-table-column type="index"  label="#" width="40"></el-table-column>
            <el-table-column prop="goods_name" label="商品名称" width="570"></el-table-column>
            <el-table-column prop="goods_price" label="商品价格（元）" width="110"></el-table-column>
            <el-table-column prop="goods_weight" label="商品重量" width="80"></el-table-column>
            <el-table-column class="tr" prop="add_time" :formatter="dateFormat" label="创建时间" width="140"></el-table-column>

            <el-table-column label="操作" width="140">
                <template slot-scope="scope">
                    <el-button @click="edit(scope.row,scope.$index)" type="primary" icon="el-icon-edit" size="mini"></el-button>
                    <el-button @click="del(scope.row,scope.$index)" type="danger" icon="el-icon-delete" size="mini"></el-button>
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
import AboutShop from '../../services/shop'
const _aboutShop = new AboutShop() 
export default {
    name: 'goodsList',
    components: {
        sideTop
    },
    data () {
        return {
            tableData: [],
            total:0,
            currentPage:1,
            pageSize:10,
            shopname: '',
            bool: false,
            goods_id: ''
        }
    },
    created () {
        this.getShopls()
    },
    methods: {
        // 删除商品
        del(v){
            console.log(v)
            this.goods_id = v.goods_id
            this.bool = true
        },
        delOk(){
            _aboutShop.delShop(this.goods_id).then(res => {
                console.log(res)
                if(res.data.meta.status == 200) {
                     this.$message({
                        type: 'success',
                        message: '删除商品成功!'
                    })
                    this.bool = false
                    this.getShopls()
                }
            })
        },
        addShop(){
            this.$router.push('/add')
        },
        // 获取商品列表
        getShopls(){
            let obj = {
                pagenum: this.currentPage,
                pagesize: this.pageSize
            }
            _aboutShop.getShopList(obj).then(res => {
                console.log(res)
                this.total = res.data.data.total
                this.tableData = res.data.data.goods
            })
        },
        // 分页器
        handleSizeChange(val){
            this.pageSize = val;
            this.getShopls()
        },
        handleCurrentChange(val){
            this.currentPage = val
            this.getShopls()
        },
        // 搜索商品
        search(){
            let obj = {
                query: this.shopname,
                pagenum: this.currentPage,
                pagesize: this.pageSize
            }
            _aboutShop.searchShop(obj).then(res => {
                if(res.data.meta.status == 200){
                    this.tableData = res.data.data.goods
                } 
                console.log(res)
            })
        },
        //时间格式化
        dateFormat(row,column){
            let t=new Date(row.add_time);
            let year=t.getFullYear(),
                month=t.getMonth()+1,
                day=t.getDate(),
                hour=t.getHours(),
                min=t.getMinutes(),
                sec=t.getSeconds();
            let newTime=year+'-'+
                (month<10?'0'+month:month)+'-'+
                (day<10?'0'+day:day)+' '+
                (hour<10?'0'+hour:hour)+':'+
                (min<10?'0'+min:min)+':'+
                (sec<10?'0'+sec:sec);
            return newTime;
        }
    }
}
</script>

<style scoped lang="scss">
    .goodslist{
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
        .tab{
            font-size: 12px;
        }
    }

</style>