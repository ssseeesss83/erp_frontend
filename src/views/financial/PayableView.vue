<template>
  <Layout>
    <Title title="付款管理"></Title>
    <el-button type="primary" size="medium" v-if="auth() === 'FINANCIAL_STAFF' || auth() === 'ADMIN'" @click="dialogVisible = true">制定收款单</el-button>
    <div class="body">
      <el-tabs v-model="activeName" :stretch="true">
        <el-tab-pane label="待审批" name="PENDING">
          <div v-if="pendingList.length === 0">
            <el-empty description="暂无数据"></el-empty>
          </div>
          <div v-else>
            <payable-list :list="pendingList" :type="1" @refresh="getPayable"/>
          </div>
        </el-tab-pane>
        <el-tab-pane label="审批完成" name="SUCCESS">
          <div v-if="successList.length === 0">
            <el-empty description="暂无数据"></el-empty>
          </div>
          <div v-else>
            <payable-list :list="successList" :type="2"/>
          </div>
        </el-tab-pane>
        <el-tab-pane label="审批失败" name="FAILURE">
          <div v-if="failureList.length === 0">
            <el-empty description="暂无数据"></el-empty>
          </div>
          <div v-else>
            <payable-list :list="failureList" :type="3"/>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
    <el-dialog
        title="创建收款单"
        :visible.sync="dialogVisible"
        width="40%"
        :before-close="handleClose">
      <div style="width: 90%; margin: 0 auto">
        <el-form :model="payableForm" label-width="100px" ref="payableForm" :rules="rules">
          <el-form-item label="客户: " prop="customer">
            <el-select v-model="payableForm.customer" placeholder="请选择客户">
              <el-option
                  v-for="item in customers"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item
              v-for="(item, index) in payableForm.payableSheetContentVOS"
              :key="index"
              :label="'账户' + index">
            <div>
              <el-select v-model="item.name" placeholder="请选择转账账户名：" style="width: 40%; margin-right: 5%">
                <el-option v-for="it in accountList"
                           :key = "it.name"
                           :label = "it.name"
                           :value="it.name">
                </el-option>
              </el-select>
              <el-input v-model="item.transferAmount" style="width: 25%; margin-right: 5%" placeholder="请输入转账金额"></el-input>
              <el-input v-model="item.remark" style="width: 25%;" placeholder="请填写备注"></el-input>
            </div>
            <div style="margin-top: 10px">
              <el-button type="text" size="small" @click="addList" v-if="index === payableForm.payableSheetContentVOS.length - 1">添加</el-button>
              <el-button type="text" size="small" @click.prevent="removeList(item)" v-if="index !== 0">删除</el-button>
            </div>
          </el-form-item>

          <el-form-item label="备注: ">
            <el-input type="textarea" v-model="payableForm.remark"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm('payableForm')">立即创建</el-button>
      </span>
    </el-dialog>
  </Layout>
</template>

<script>
import Layout from "@/components/content/Layout";
import Title from "@/components/content/Title";
import payableList from './components/PayableList'
import { getAllPayable, createPayable} from '../../network/financial'
import {getAllCustomer} from "@/network/sale";
import {getAllAccount} from "../../network/financial";

export default {
  name: 'payableView',
  components: {
    Layout,
    Title,
    payableList
  },
  data() {
    return {
      activeName: 'PENDING',
      payableList: [],
      pendingList: [],
      successList: [],
      failureList: [],
      accountList: [],
      dialogVisible: false,
      payableForm: {
        payableSheetContentVOS:[{
          name:'',
          transferAmount:'',
          remark:'',
        }]
      },
      customers: [],
      rules: {
        customer: [
          { required: true, message: '请填写客户', trigger: 'change' }
        ],
      },
      commodityList: []
    }
  },
  async mounted() {
    await this.getPayable()
    getAllAccount().then(_res =>{
      this.accountList = _res.result
      //console.log(this.accountList)
    })
    await getAllCustomer({ params : { type: 'SUPPLIER' } }).then(_res => {
      this.customers= this.customers.concat(_res.result)
    })
    await getAllCustomer({ params : { type: 'SELLER' } }).then(_res => {
      this.customers = this.customers.concat(_res.result)
    })
  },
  methods: {
    async getPayable() {
      await getAllPayable({
        params : { state:'PENDING'}}).then(_res => {
        this.pendingList = _res.result
        console.log(this.pendingList)
      })

      await getAllPayable({
        params : { state:'SUCCESS'}}).then(_res => {
        this.successList = _res.result
      })

      await getAllPayable({
        params : { state:'FAILURE'}}).then(_res => {
        this.failureList = _res.result
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
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.payableForm.id = null
          this.payableForm.operator = sessionStorage.getItem("name")
          this.payableForm.totalAmount = 0
          this.payableForm.state = null
          console.log(this.payableForm)
          createPayable(this.payableForm).then(_res => {
            console.log(_res)
            if (_res.msg === 'Success') {
              this.$message.success('创建成功!')
              this.dialogVisible = false
              this.resetForm()
              this.getPayable()
            }
          })
        }
      })
    },
    resetForm() {
      this.payableForm = {
        payableSheetContentVOS:[{
          name:'',
          transferAmount:'',
          remark:'',
        }]
      }
    },
    addList(){
      this.payableForm.payableSheetContentVOS.push({});
    },
    removeList(item){
      let index = this.payableForm.payableSheetContentVOS.indexOf(item);
      if (index !== -1) {
        this.payableForm.payableSheetContentVOS.splice(index, 1)
      }
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