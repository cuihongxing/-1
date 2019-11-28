<template>
    <div class="orders">
        <div class="search">
            <el-input v-model="search" class="ipt" placeholder="请输入内容"/>
            <el-button type="info" class="ser" icon="el-icon-search" plain></el-button>
        </div>
        <el-table
         :data="tableData"
         class="tab" 
         border style="width: 100%">
            <el-table-column type="index"  label="#" width="50"></el-table-column>
            <el-table-column prop="order_number" label="订单编号" width="220"></el-table-column>
            <el-table-column prop="order_price" label="订单价格" width="100"></el-table-column>
            <el-table-column prop="pay_status" label="是否付款" width="100">
                <template slot-scope="scope">
                   <el-tag :type="scope.row.pay_status == '未付款'?'danger':'success'">{{ scope.row.pay_status }}</el-tag>
                </template>
                <el-tag >标签二</el-tag>
            </el-table-column>
            <el-table-column prop="is_send" label="是否发货" width="180"></el-table-column>
            <el-table-column prop="create_time" label="下单时间" :formatter="dateFormat" width="180"></el-table-column>
            
            <el-table-column label="操作" width="240">
                <template slot-scope="scope">
                    <el-button @click="edit(scope.row,scope.$index)" type="primary" icon="el-icon-edit" size="mini"></el-button>
                    <el-button type="success" icon="el-icon-location" size="mini"></el-button>
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
        <!-- 修改订单地址 -->
        <el-dialog
            title="修改地址"
            :visible.sync="flag"
            width="50%">
            <div>
                <div class="wrap">
                    <p>省市区/县：</p>
                    <el-input v-model="city" class="inp"></el-input>
                </div>
                <div class="wrap">
                    <p>邮箱：</p>
                    <el-input v-model="address" class="inp"></el-input>
                </div>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="flag = false">取 消</el-button>
                <el-button type="primary" @click="updateOk">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import Classify from '../../services/categories'
const _classify = new Classify()
export default {
    name: 'orders',
    data () {
        return {
            tableData: [],
            total:0,
            currentPage:1,
            pageSize:10,
            search: '',
            city: '',
            address: '',
            flag: false
        }
    },
    created () {
       this.getList()
    },
    methods: {
        getList(){
            let params = {
                pagenum: this.currentPage,
                pagesize: this.pageSize
            }
             _classify.getOrders(params).then(res => {
                 if(res.data.meta.status == 200) {
                    this.tableData = res.data.data.goods
                    this.total = res.data.data.total
                }
                this.tableData.forEach(v => {
                    if(v.pay_status == '0'){
                        v.pay_status = "未付款"
                    }else{
                        v.pay_status = "已付款"
                    }
                })
                console.log(res)
            })
        },
        edit(){
            this.flag = true
        },
        updateOk(){
            this.flag = false
        },
        handleSizeChange(val){
            this.pageSize = val;
            this.getList()
        },
        handleCurrentChange(val){
            this.currentPage = val
            this.getList()
        },
        dateFormat(row,column){
            let t=new Date(row.create_time);
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

<style lang="scss" scoped>
    .orders{
        .tab{
            font-size: 12px;
        }
        .search{
                display: flex;
                margin-bottom: 20px;
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
    }
</style>