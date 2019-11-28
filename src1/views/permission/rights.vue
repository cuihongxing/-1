<template>
    <div class="rights">
        <sideTop>
            <p slot="one">权限管理</p>
            <p slot="two">权限列表</p>
        </sideTop>
        <!-- 表格数据渲染 -->
        <el-table
         :data="tableData" 
         border style="width:100%">
            <el-table-column type="index"  label="#" width="50"></el-table-column>
            <el-table-column prop="authName" label="权限名称"></el-table-column>
            <el-table-column prop="path" label="路径"></el-table-column>
            <el-table-column label="权限等级">
                <template slot-scope="scope">
                   <el-tag 
                   :type="scope.row.level == '一级' ? '': scope.row.level == '二级' ? 'success': scope.row.level == '三级'&&scope.row.level!=='二级'||'一级'?'warning': ''">
                       {{ scope.row.level }}
                    </el-tag>
                </template>
            </el-table-column>
        </el-table>
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
        }
    },
    created () {
        //权限列表
        _product.rsList().then(res => {
            if(res.data.meta.status == 200){
                this.tableData = res.data.data
                this.tableData.forEach(v => {
                    if(v.level == '0'){
                        v.level = '一级'
                        
                    }else if(v.level == '1') {
                        v.level = '二级'
                    }else {
                        v.level = '三级'
                    }
                })
                console.log(this.tableData)
            }
        })
    }
}
</script>

<style lang="scss" scoped>
    .rights{
        width: 100%;
    }
</style>