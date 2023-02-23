<template>
  <Layout>
    <Title title="销售管理"></Title>
    <el-button type="primary" size="medium" @click="dialogVisible = true">制定销售单</el-button>
    <div class="body">
      <el-tabs v-model="activeName" :stretch="true">
        <el-tab-pane label="待一级审批" name="PENDING_LEVEL_1">
          <div v-if="pendingLevel1List.length === 0">
            <el-empty description="暂无数据"></el-empty>
          </div>
          <div v-else>
            <sale-list :list="pendingLevel1List" :type="1" @refresh="getSale()"/>
          </div>
        </el-tab-pane>
        <el-tab-pane label="待二级审批" name="PENDING_LEVEL_2">
          <div v-if="pendingLevel2List.length === 0">
            <el-empty description="暂无数据"></el-empty>
          </div>
          <div v-else>
            <sale-list :list="pendingLevel2List" :type="2" @refresh="getSale()"/>
          </div>
        </el-tab-pane>
        <el-tab-pane label="审批完成" name="SUCCESS">
          <div v-if="successList.length === 0">
            <el-empty description="暂无数据"></el-empty>
          </div>
          <div v-else>
            <sale-list :list="successList" :type="3"/>
          </div>
        </el-tab-pane>
        <el-tab-pane label="审批失败" name="FAILURE">
          <div v-if="failureList.length === 0">
            <el-empty description="暂无数据"></el-empty>
          </div>
          <div v-else>
            <sale-list :list="failureList" :type="4"/>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
    <el-dialog
      title="创建销售单"
      :visible.sync="dialogVisible"
      width="40%"
      :before-close="handleClose">
      <div style="width: 90%; margin: 0 auto">
        <el-form :model="saleForm" label-width="100px" ref="saleForm" :rules="rules">
          <el-form-item label="销售商: " prop="supplier">
            <el-select v-model="saleForm.supplier" placeholder="请选择销售商">
              <el-option
                v-for="item in sellers"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="可用代金券: ">
            <el-form-item label="代金券: ">
              <el-select v-model="cash">
                <el-option
                    v-for="item in cashList"
                    :key="item.voucherId"
                    :label="item.voucherName"
                    :value="item"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="商品组合包: ">
                <el-select v-model="combination">
                  <el-option
                      v-for="item in combinationList"
                      :key="item.voucherId"
                      :label="item.voucherName"
                      :value="item"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="商品赠送: ">
                <el-select v-model="gift">
                  <el-option
                      v-for="item in giftList"
                      :key="item.voucherId"
                      :label="item.voucherName"
                      :value="item"></el-option>
                </el-select>
              </el-form-item>
            <el-button type="success" @click="getVoucher">查询可用代金券</el-button>
          </el-form-item>
          <el-form-item label="折扣: " prop="discount">
            <el-input v-model="saleForm.discount"></el-input>
          </el-form-item>
          <el-form-item label="代金券总额: " prop="voucherAmount">
            <span>{{amount}}</span>
<!--            <el-input v-model="saleForm.voucherAmount"></el-input>-->
          </el-form-item>
          <el-form-item
            v-for="(item, index) in saleForm.saleSheetContent"
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
              <el-input v-model="item.unitPrice" style="width: 25%;" placeholder="请输入商品单价"></el-input>
            </div>
            <div style="margin-top: 10px">
              <el-input v-model="item.remark" style="width: 70%; margin-right: 10%" placeholder="请填写备注"></el-input>
              <el-button type="text" size="small" @click="addProduct" v-if="index === saleForm.saleSheetContent.length - 1">添加</el-button>
              <el-button type="text" size="small" @click.prevent="removeProduct(item)" v-if="index !== 0">删除</el-button>
            </div>
          </el-form-item>
          <el-form-item label="备注: ">
            <el-input type="textarea" v-model="saleForm.remark"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm('saleForm')">立即创建</el-button>
      </span>
    </el-dialog>
  </Layout>
</template>

<script>
import Layout from "@/components/content/Layout";
import Title from "@/components/content/Title";
import SaleList from './components/SaleList'
import { getAllSale, createSale } from '@/network/sale'
import { getAllCustomer } from '@/network/purchase'
import { getAllCommodity } from '@/network/commodity'
import { getAvailableVoucher } from "@/network/gm";

export default {
  name: 'SaleView',
  components: {
    Layout,
    Title,
    SaleList
  },
  data() {
    return {
      activeName: 'PENDING_LEVEL_1',
      saleList: [],
      pendingLevel1List: [],
      pendingLevel2List: [],
      successList: [],
      failureList: [],
      dialogVisible: false,
      vouchers:[],
      voucherList:[],
      voucherTypes:['代金券', '商品组合包', '商品赠送'],
      voucherType:'',

      cashList:[],
      combinationList:[],
      giftList:[],

      cash:'',
      combination:'',
      gift:'',
      saleForm: {
        saleSheetContent: [
          {
            pid: '',
            quantity: '',
            unitPrice: '',
            remark: ''
          }
        ]
      },
      sellers: [],
      rules: {
        supplier: [
          { required: true, message: '请选择一个销售商', trigger: 'change' }
        ],
        discount: [
          { required: true, message: '请输入折扣', trigger: 'change' }
        ],
      },
      commodityList: []
    }
  },
  mounted() {
    this.getSale()
    getAllCommodity({}).then(_res => {
      let res = _res.result
      res.forEach(item => this.commodityList.push({ id: item.id,name:item.name }))
    })
    getAllCustomer({ params : { type: 'SELLER' } }).then(_res => {
      this.sellers = _res.result
    })
  },
  methods: {
    async getVoucher(){

      let temp={
        saleSheetContent:this.saleForm.saleSheetContent,
      }
      await getAvailableVoucher(temp,{
        params:{
          customerId:Number(this.saleForm.supplier),
          type:'代金券',
        }}).then(res=>{
        this.cashList=res.result
      })
      await getAvailableVoucher(temp,{
        params:{
          customerId:Number(this.saleForm.supplier),
          type:'商品组合包',
        }}).then(res=>{
        this.combinationList=res.result
      })
      await getAvailableVoucher(temp,{
        params:{
          customerId:Number(this.saleForm.supplier),
          type:'商品赠送',
        }}).then(res=>{
        this.giftList=res.result
      })

    },
    getSale() {
      getAllSale({}).then(_res => {
        this.saleList = _res.result
        this.pendingLevel1List = this.saleList.filter(item => item.state === '待一级审批')
        this.pendingLevel2List = this.saleList.filter(item => item.state === '待二级审批')
        this.successList = this.saleList.filter(item => item.state === '审批完成')
        this.failureList = this.saleList.filter(item => item.state === '审批失败')
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
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.saleForm.id = null
          this.saleForm.operator = sessionStorage.getItem("name")
          this.saleForm.salesman = sessionStorage.getItem("name")
          this.saleForm.state = null
          this.saleForm.rawTotalAmount = null
          this.saleForm.finalAmount = null
          this.saleForm.discount = Number(this.saleForm.discount)
          this.saleForm.voucherAmount = this.amount
          this.saleForm.saleSheetContent.forEach((item) => {
            item.id = null
            item.purchaseSheetId = null
            item.quantity = parseInt(item.quantity)
            item.unitPrice = parseInt(item.unitPrice)
            item.totalPrice = item.quantity * item.unitPrice
          })
          console.log(this.saleForm)
          let voucherId = ''
          if(this.gift){
              voucherId=this.gift.voucherId
          }
          let config={
            params:{
              voucherId:voucherId
            }
          }
          console.log(config)
          createSale(this.saleForm, config).then(_res => {
            if (_res.msg === 'Success') {
              this.$message.success('创建成功!')
              this.dialogVisible = false
              this.resetForm()
              this.getSale()
            }
          })
        }
      })
    },
    resetForm() {
      this.saleForm = {
        saleSheetContent: [
          {
            pid: '',
            quantity: '',
            unitPrice: '',
            remark: ''
          }
        ]
      }
    },
    addProduct() {
      this.saleForm.saleSheetContent.push({});
    },
    removeProduct(item) {
      var index = this.saleForm.saleSheetContent.indexOf(item)
      if (index !== -1) {
        this.saleForm.saleSheetContent.splice(index, 1)
      }
    }
  },
  computed:{
    amount(){
      let res = 0
      if(this.cash){
        res += Number(this.cash.voucherAmount)
      }
      if(this.combination){
        res += Number(this.combination.voucherAmount)
      }
      return res
    }
  }
}
</script>

<style lang="scss" scoped>
.body {
  margin: 0 auto;
  margin-top: 10px;
  height: 80vh;
  overflow-y: auto;
  width: 100%;
  background: rgba($color: #fff, $alpha: 0.5);
}
</style>