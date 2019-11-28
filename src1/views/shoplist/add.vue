<template>
    <div class="addshop">
         <sideTop>
            <p slot="one">商品管理</p>
            <p slot="two">商品列表</p>
        </sideTop>
        <el-alert
            title="添加商品信息"
            type="info"
            center
            show-icon>
        </el-alert>
        <!-- 左边菜单 -->
        <el-steps align-center class="steps" :active="active" finish-status="success">
            <el-step title="基本信息"></el-step>
            <el-step title="商品参数"></el-step>
            <el-step title="商品属性"></el-step>
            <el-step title="商品图片"></el-step>
            <el-step title="商品内容"></el-step>
            <el-step title="完成"></el-step>
        </el-steps>
        <el-tabs :tab-position="tabPosition" @tab-click='next' style="height: auto;">
            <el-tab-pane label="基本信息">
                <div class="one">
                    <div class="child">
                        <p>*</p>
                        <p>商品名称</p>
                    </div>
                    <el-input v-model="shopname"></el-input>
                </div>
                <div class="one">
                    <div class="child">
                        <p>*</p>
                        <p>商品价格</p>
                    </div>
                    <el-input v-model="shopprice" min="0" type="number"></el-input>
                </div>
                <div class="one">
                    <div class="child">
                        <p>*</p>
                        <p>商品重量</p>
                    </div>
                    <el-input v-model="shopweight" min="0" type="number"></el-input>
                </div>
                <div class="one">
                    <div class="child">
                        <p>*</p>
                        <p>商品数量</p>
                    </div>
                    <el-input v-model="shopnumber" min="0" type="number"></el-input>
                </div>
                <div class="one">
                    <div class="child">
                        <p>*</p>
                        <p>商品分类</p>
                    </div>
                     <el-cascader
                        :options="options"
                        expand-trigger="hover"
                        :props="defaultData"
                        @change="handleChange">
                    </el-cascader>
                </div>
            </el-tab-pane>
            <el-tab-pane label="商品参数">
                <div v-for="(v,i) in many" :key="i" class="shop">
                    <p class="attrname">{{ v.attr_name }}</p>
                    <div class="box">
                        <div class="tags" closable v-for="(item,index) in v.attr_vals.split(' ')" :key="index">
                            <i @click="del(index)" class="el-icon-success"></i>
                            {{ item }}
                        </div>
                    </div>
                </div>
            </el-tab-pane>
            <el-tab-pane label="商品属性">
                <div v-for="(v,i) in only" :key="i" class="shop">
                    <p class="attrname">{{ v.attr_name }}</p>
                    <el-input v-model="v.attr_vals"></el-input>
                </div>
            </el-tab-pane>
            <el-tab-pane label="商品图片">
                <el-upload
                    class="upload-demo"
                    action="http://www.wyunfei.com:7001/api/private/v1/upload"
                    :on-preview="handlePreview"
                    :headers="headers"
                    :on-remove="handleRemove"
                    :file-list="fileList"
                    :on-success='succ'
                    list-type="picture">
                    <el-button size="small" type="primary">点击上传</el-button>
                </el-upload>
            </el-tab-pane>
            <el-tab-pane label="商品内容">
                <quill-editor ref="text" v-model="content" class="myQuillEditor" :options="editorOption" />
                <el-button type="primary" @click="addShop">添加商品</el-button>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
import sideTop from '../../components/content/sideTop/sideTop'
import Classify from '../../services/categories'
const _classify = new Classify()
import storage from '../../storage/index'
import { quillEditor } from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
export default {
    name: 'add',
    components: {
        sideTop,
        quillEditor
    },
    created () {
        _classify.categoriesList().then(res => {
            //console.log(res)
            if(res.data.meta.status == 200) {
                this.options = res.data.data.result
            }
        })
    },
    data () {
        return {
            active: 0,
            tabPosition: 'left',
            shopname: '',
            shopprice: '',
            shopweight: '',
            shopnumber: '',
            options: [],
            defaultData: {
                value: 'cat_id',
                label: 'cat_name',
                children: 'children'
            },
            id: '',
            many: [],
            only: [],
            info: '',
            fileList: [],
            editorOption: {},
            content: '',
            ids: [],
            pics: [],
            attrIds: [],
            statIds: [],
            allIds: []
        }
    },
    methods: {
        addShop () {
            console.log(this.$refs.text.value)
            let obj = {
                goods_name: this.shopname,
                goods_price: this.shopprice,
                goods_weight: this.shopweight,
                goods_number: this.shopnumber,
                goods_cat: this.ids,
                goods_introduce: this.$refs.text.value,
                pics: this.pics,
                attrs: this.allIds
            }
            _classify.addShop(obj).then(res => {
                if(res.data.meta.status == 201) {
                     this.$message({
                        message: '添加成功',
                        center: true,
                        type: 'success'
                    })
                    this.$router.push('/goods')
                }
                console.log(res)
            })
        },
        handleRemove(file, fileList) {
            console.log(file, fileList);
        },
        handlePreview(file) {
            console.log(file);
        },
        succ(res){
            console.log(res)  
            this.pics.push({
                pic: res.data.tmp_path
            })
            console.log(this.pics)
        },
        next(tag) {
            if(this.options == []) {
                this.$message.error('请选择商品分类');
            }
            this.active = Number(tag.index)
        },
        handleChange(value){
           this.ids = value.join()
           this.id = value[value.length - 1]
            // 动态参数
            _classify.getMany(this.id).then(res => {
                if(res.data.meta.status == 200){
                    this.many = res.data.data
                    this.attrIds = this.many.map(v => {
                        return {
                            attr_id: v.attr_id,
                            attr_value: v.attr_vals
                        }
                    })
                    this.allIds.push(...this.attrIds)
                }
                console.log(this.attrIds)
            })
            // 静态属性
            _classify.getOnly(this.id).then(res => {
                if(res.data.meta.status == 200){
                    this.only = res.data.data
                    this.statIds = this.only.map(v => {
                        return {
                            attr_id: v.attr_id,
                            attr_value: v.attr_vals
                        }
                    })
                    this.allIds.push(...this.statIds)
                }
                console.log(this.statIds)
                console.log(this.allIds)
            })
            
        },
        del(i){
            console.log(i)
            this.many.forEach(v => {
               v.attr_vals.split(' ').splice(i,1)
            })
        }
    },
    computed: {
        headers() {
            return{
              "Authorization": storage.get('token')
            }
        }
    }
}
</script>

<style lang="scss" scoped>
    .addshop{
        width: 100%;
        height: auto;
        .steps{
            width: 95%;
            margin: 10px auto;
            font-size: 12px;
            height: auto;
        }
        .myQuillEditor{
            height: 400px;
            border-bottom: 1px solid darkgray;
            overflow: hidden;
        }
        .one{
            margin-bottom: 22px;
            .child{
                color: #606266;
                display: flex;
                margin-bottom: 20px;
                p:nth-of-type(1){
                    color: #F56C6C;
                    margin-right: 4px;
                }
            }
        }
        .shop{
            margin-bottom: 20px;
           .attrname{
                font-size: 14px;
                margin-bottom: 15px;
            } 
            .box{
                .tags{
                    display: inline-block;
                    white-space: nowrap;
                    -webkit-box-direction: normal;
                    padding: 9px 20px 9px 10px;
                    border-radius: 4px;
                    border: 1px solid #DCDFE6;
                    -webkit-box-sizing: border-box;
                    box-sizing: border-box;
                    line-height: normal;
                    height: 40px;
                    border-color: #409EFF;
                    color: #409EFF;
                    font-size: 14px;
                    margin-right: 30px;
                    margin-bottom: 8px;
                }
            }
            
        }
        
    }
</style>