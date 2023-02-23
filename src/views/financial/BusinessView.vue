<template>
  <Layout>
    <Title title="经营历程"></Title>
    <div class="filter">
      <div class="line-item">
        <span>起止时间：</span>
        <el-input type="date" v-model="filter.begin" style="width: 20%;"></el-input>
        <span style="font-size: 2rem;">~</span>
        <el-input type="date" v-model="filter.end" style="width: 20%;"></el-input>
      </div>
      <div class="line-item">
        <span>客户：</span>
        <el-select v-model="filter.customerId">
          <el-option
              v-for="item in customers"
              :key="item.id"
              :label="item.name"
              :value="item.id">
          </el-option>
        </el-select>
      </div>
      <div class="line-item">
        <span>操作员：</span>
        <el-input type="text" v-model="filter.operator" style="width: 40%;"></el-input>
      </div>

      <el-button type="primary" size="medium" @click="submitFilter" style="left: 0;bottom: 0;position: relative">筛选</el-button>
      <el-button type="primary" size="medium" @click="exportExcel" style="left: 0;bottom: 0;position: relative">导出</el-button>
    </div>
    <div class="body">
      <el-tabs v-model="activeName" :stretch="true">
        <el-tab-pane label="销售单" name="SALE">
          <div v-if="saleList.length === 0">
            <el-empty description="暂无数据"></el-empty>
          </div>
          <div v-else>
            <sale-list :list="saleList" :type="10"/>
          </div>
        </el-tab-pane>
        <el-tab-pane label="销售退货单" name="SALE_RETURN">
          <div v-if="saleReturnList.length === 0">
            <el-empty description="暂无数据"></el-empty>
          </div>
          <div v-else>
            <sale-return-list :list="saleReturnList" :type="10"/>
          </div>
        </el-tab-pane>
        <el-tab-pane label="进货单" name="PURCHASE">
          <div v-if="purchaseList.length === 0">
            <el-empty description="暂无数据"></el-empty>
          </div>
          <div v-else>
            <purchase-list :list="purchaseList" :type="10"/>
          </div>
        </el-tab-pane>
        <el-tab-pane label="进货退货单" name="PURCHASE_RETURN">
          <div v-if="purchaseReturnList.length === 0">
            <el-empty description="暂无数据"></el-empty>
          </div>
          <div v-else>
            <purchase-return-list :list="purchaseReturnList" :type="10"/>
          </div>
        </el-tab-pane>
        <el-tab-pane label="收款单" name="RECEIVE">
          <div v-if="receiveList.length === 0">
            <el-empty description="暂无数据"></el-empty>
          </div>
          <div v-else>
            <receive-list :list="receiveList" :type="10"/>
          </div>
        </el-tab-pane>
        <el-tab-pane label="付款单" name="PAYABLE">
          <div v-if="payableList.length === 0">
            <el-empty description="暂无数据"></el-empty>
          </div>
          <div v-else>
            <payable-list :list="payableList" :type="10"/>
          </div>
        </el-tab-pane>
        <el-tab-pane label="工资" name="SALARY">
          <div v-if="salaryList.length === 0">
            <el-empty description="暂无数据"></el-empty>
          </div>
          <div v-else>
            <salary-list :list="salaryList" :type="10"/>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>



  </Layout>
</template>

<script>
import Layout from "@/components/content/Layout";
import Title from "@/components/content/Title";
import saleList from "@/views/sale/components/SaleList";
import saleReturnList from "@/views/sale/components/SaleReturnList";
import purchaseList from "@/views/purchase/components/PurchaseList";
import purchaseReturnList from "@/views/purchase/components/PurchaseReturnList";
import payableList from "@/views/financial/components/PayableList";
import receiveList from "@/views/financial/components/ReceiveList";
import salaryList from "@/views/financial/components/SalaryList";

import {getAllCustomer} from "@/network/sale";
import {getAllAccount} from "@/network/financial";

import {getSaleBusiness, getSaleReturnBusiness, getPurchaseBusiness, getPurchaseReturnBusiness,
getReceiveBusiness, getPayableBusiness, getSalaryBusiness,exportBusiness,exportBExcel} from "@/network/financial"


export default {
  name: 'BusinessView',
  components: {
    Layout,
    Title,
    salaryList,
    saleList,
    saleReturnList,
    purchaseList,
    purchaseReturnList,
    payableList,
    receiveList,
  },
  data() {
    return {
      activeName: 'SALE',
      filter:{},
      saleList:[],
      saleReturnList:[],
      purchaseList:[],
      purchaseReturnList:[],
      receiveList: [],
      payableList:[],
      salaryList:[],

      dialogVisible: false,
      redFlushCopyForm: {
      },
      customers: [],
      rules: {
        customer: [
          { required: true, message: '请填写客户', trigger: 'change' }
        ],
      },
    }
  },
  async mounted() {
    await getAllAccount().then(_res =>{
      this.accountList = _res.result
    })
    await getAllCustomer({ params : { type: 'SUPPLIER' } }).then(_res => {
      this.customers= this.customers.concat(_res.result)
    })
    await getAllCustomer({ params : { type: 'SELLER' } }).then(_res => {
      this.customers = this.customers.concat(_res.result)
    })
  },
  methods: {
    submitFilter(){
      this.getAll()
      console.log(this.filter)
    },
    exportExcel(){
      exportBExcel({data:this.filter,fileName:'经营历程表.xlsx'})
    },
    async getAll(){
      await getSaleBusiness(this.filter).then(res=>{
        this.saleList = res.result
      })
      await getSaleReturnBusiness(this.filter).then(res=>{
        this.saleReturnList = res.result
      })
      await getPurchaseBusiness(this.filter).then(res=>{
        this.purchaseList = res.result
      })
      await getPurchaseReturnBusiness(this.filter).then(res=>{
        this.purchaseReturnList = res.result
      })
      await getReceiveBusiness(this.filter).then(res=>{
        this.receiveList = res.result
      })
      await getPayableBusiness(this.filter).then(res=>{
        this.payableList = res.result
      })
      await getSalaryBusiness(this.filter).then(res=>{
        this.salaryList = res.result
      })
    },
    auth(){
      return sessionStorage.getItem('role')
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
      // this.$refs[formName].validate((valid) => {
      //   if (valid) {
      //     this.receiveForm.id = null
      //     this.receiveForm.operator = sessionStorage.getItem("name")
      //     this.receiveForm.totalAmount = 0
      //     this.receiveForm.state = null
      //     console.log(this.receiveForm)
      //     createReceive(this.receiveForm).then(_res => {
      //       console.log(_res)
      //       if (_res.msg === 'Success') {
      //         this.$message.success('创建成功!')
      //         this.dialogVisible = false
      //         this.resetForm()
      //         this.getReceive()
      //       }
      //     })
      //   }
      // })
    },
    resetForm() {
    },
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