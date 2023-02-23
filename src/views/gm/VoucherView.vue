<template>
  <Layout>
    <Title title="促销策略"></Title>
    <el-button type="primary" size="medium" @click="addVisible = true">新增优惠策略</el-button>
    <div style="margin-top: 10px">
      <el-table
          :data="voucherList"
          stripe
          style="width: 100%"
          :header-cell-style="{'text-align':'center'}"
          :cell-style="{'text-align':'center'}">
        <el-table-column
            prop="voucherId"
            label="id"
            width="100">
        </el-table-column>
        <el-table-column
            prop="voucherName"
            label="优惠券名"
            width="70">
        </el-table-column>
        <el-table-column
            prop="voucherType"
            label="优惠券类型"
            width="100">
        </el-table-column>
        <el-table-column
            prop="voucherAmount"
            label="优惠额度"
            width="200">
        </el-table-column>
        <el-table-column
            prop="customerLevel"
            label="使用客户最低等级"
            width="150">
        </el-table-column>
        <el-table-column
            prop="begin"
            label="起始时间"
            width="100">
        </el-table-column>
        <el-table-column
            prop="end"
            label="到期时间"
            width="100">
        </el-table-column>
        <el-table-column
            prop="gift"
            label="关联商品信息"
            width="120">
        </el-table-column>
        <el-table-column
            label="操作" >
          <template slot-scope="scope" >
            <div style="flex-direction: column; align-content: center;justify-items: center;">
              <el-button style="margin: 0 5px"
                         @click.native.prevent="deleteVoucher(scope.row.voucherId)"
                         type="text"
                         size="small">删除
              </el-button>
            </div>

          </template>
        </el-table-column>
      </el-table>
    </div>

    <el-dialog
        title="新增优惠策略"
        :visible.sync="addVisible"
        width="40%"
        :before-close="handleClose"
    >
      <div style="width: 90%; margin: 0 auto">
        <el-form :model="createForm" label-width="100px" ref="createForm" :rules="rules">
          <el-form-item label="优惠券名称：" prop="voucherName">
            <el-input v-model="createForm.voucherName"></el-input>
          </el-form-item>
          <el-form-item label="优惠类型：" prop="voucherType">
            <el-select v-model="createForm.voucherType">
              <el-option v-for="it in voucherTypes"
                         :key="it"
                         :label="it"
                         :value="it">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="优惠额度：" prop="voucherAmount">
            <el-input v-model="createForm.voucherAmount"></el-input>
          </el-form-item>
          <el-form-item label="客户等级：" prop="customerLevel">
            <el-select v-model="createForm.customerLevel">
              <el-option v-for="it in levels"
                         :key="it"
                         :label="it"
                         :value="it">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="起始日期：" prop="begin">
            <el-input type='date' v-model="createForm.begin"></el-input>
          </el-form-item>
          <el-form-item label="截止日期：" prop="end">
            <el-input type='date' v-model="createForm.end">
            </el-input>
          </el-form-item>
          <el-form-item
              v-if="createForm.voucherType==='商品赠送'"
              v-for="(item, index) in createForm.voucherLimitVOS"
              :key="index"
              :label="'商品' + index">
            <div>
              <el-select v-model="item.pid" placeholder="请选择商品" style="width: 40%; margin-right: 5%">
                <el-option
                    v-for="item1 in commodityList"
                    :key="item1.id"
                    :label="item1.name"
                    :value="item1.id">
                </el-option>
              </el-select>
              <el-input v-model="item.quantity" style="width: 25%; margin-right: 5%" placeholder="请输入商品数量"></el-input>
            </div>
            <div style="margin-top: 10px">
              <el-button type="text" size="small" @click="addProduct" v-if="index === createForm.voucherLimitVOS.length - 1">添加</el-button>
              <el-button type="text" size="small" @click.prevent="removeProduct(item)" v-if="index !== 0">删除</el-button>
            </div>
          </el-form-item>
        </el-form>
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm('createForm')">立即添加</el-button>
      </span>
    </el-dialog>
    <!--update-->

  </Layout>
</template>

<script>
import Layout from "@/components/content/Layout";
import Title from "@/components/content/Title";
import { getAllVoucher,createVoucher,deleteVoucher} from "@/network/gm";
import {getAllCommodity} from "@/network/commodity";

export default {
  name: 'VoucherView',
  components: {
    Layout,
    Title,
  },
  data() {
    return {
      voucherList: [],
      addVisible : false,
      rules:{
        name:[
          {required: true,message:'请输入员工姓名',trigger: 'change'}
        ]
      },
      sexList:['男', '女'],
      createForm :{
        voucherLimitVOS:[
          {
            pid: '',
            quantity: '',
            voucherId:'',
          }
        ],
      },
      voucherTypes:['代金券', '商品组合包', '商品赠送'],
      levels:[1,2,3,4,5],
      tempId:0,
      commodityList: []
    }
  },
  async mounted() {
    await this.getVoucher()
    getAllCommodity({}).then(_res => {
      let res = _res.result
      res.forEach(item => this.commodityList.push({ id: item.id,name:item.name }))
    })
  },
  methods: {
    addProduct() {
      this.createForm.voucherLimitVOS.push({});
    },
    removeProduct(item) {
      var index = this.createForm.voucherLimitVOS.indexOf(item)
      if (index !== -1) {
        this.createForm.voucherLimitVOS.splice(index, 1)
      }
    },
    async getVoucher(){
      this.voucherList=[]
      await getAllVoucher({params: {type:'代金券'}}).then(res=>{this.voucherList = this.voucherList.concat(res.result)})
      await getAllVoucher({params: {type:'商品组合包'}}).then(res=>{this.voucherList = this.voucherList.concat(res.result)})
      await getAllVoucher({params: {type:'商品赠送'}}).then(res=>{
        let temp = res.result
        temp.map(item =>{
          console.log(item)
          item.gift = ''
          item.voucherLimitVOS.forEach(it =>{
            item.gift += (it.pid + ": "+it.quantity+';')
          })
          return item
        })
        this.voucherList = this.voucherList.concat(res.result)

      })
    },
    filterTag(value, row) {
      return row.type === value
    },
    deleteVoucher(id){
      deleteVoucher({
        params:{
          voucherId:id,
        }
      }).then(_res =>{
        if(_res.msg === 'Success'){
          this.$message.success('删除成功！')
          this.refresh()
        }
      })
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
          .then(_ => {
            this.resetForm()
            done();
          })
          .catch(_ => {});
    },
    resetForm(){
      this.createForm={
        voucherLimitVOS:[],
      }
    },
    refresh(){
      this.getVoucher()
    },
    submitForm(formName){
      this.$refs[formName].validate((valid) =>{
        if(valid){
          this.createForm.voucherId=null
          console.log(this.$refs[formName])
          createVoucher(this.createForm).then(_res =>{
            console.log(_res.result)
            if(_res.msg === 'Success'){
              this.$message.success('添加成功！')
              this.addVisible = false
              this.resetForm()
              this.refresh()
            }
          })
        }
      })
    },
  },
}
</script>

<style>

</style>