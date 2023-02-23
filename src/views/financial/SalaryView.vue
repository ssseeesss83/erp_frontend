<template>
  <Layout>
    <Title title="工资管理"></Title>
    <el-button type="primary" size="medium" v-if="auth() === 'FINANCIAL_STAFF' || auth() === 'ADMIN'" @click="dialogVisible = true">制定工资单</el-button>
    <div class="body">
      <el-tabs v-model="activeName" :stretch="true">
        <el-tab-pane label="待审批" name="PENDING">
          <div v-if="pendingList.length === 0">
            <el-empty description="暂无数据"></el-empty>
          </div>
          <div v-else>
            <salary-list :list="pendingList" :type="1" @refresh="getSalary"/>
          </div>
        </el-tab-pane>
        <el-tab-pane label="审批完成" name="SUCCESS">
          <div v-if="successList.length === 0">
            <el-empty description="暂无数据"></el-empty>
          </div>
          <div v-else>
            <salary-list :list="successList" :type="2"/>
          </div>
        </el-tab-pane>
        <el-tab-pane label="审批失败" name="FAILURE">
          <div v-if="failureList.length === 0">
            <el-empty description="暂无数据"></el-empty>
          </div>
          <div v-else>
            <salary-list :list="failureList" :type="3"/>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
    <el-dialog
        title="创建工资单"
        :visible.sync="dialogVisible"
        width="40%"
        :before-close="handleClose">
      <div style="width: 90%; margin: 0 auto">
        <el-form :model="salaryForm" label-width="100px" ref="salaryForm" :rules="rules">
          <el-form-item label="员工: " prop="employeeName">
            <el-select v-model="salaryForm.employeeName" placeholder="请选择员工">
              <el-option
                  v-for="item in employeeList"
                  :key="item.employeeId"
                  :label="item.employeeName"
                  :value="item.employeeName">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="工资账户: ">
              <el-select v-model="salaryForm.companyAccount" placeholder="请选择转账账户名：" style="width: 40%; margin-right: 5%">
                <el-option v-for="it in accountList"
                           :key = "it.name"
                           :label = "it.name"
                           :value="it.name">
                </el-option>
              </el-select>
          </el-form-item>
          <el-form-item label="指定年份: " >
            <el-select type="text" v-model="salaryForm.year">
              <el-option v-for="it in years"
                         :key = "it"
                         :label = "it"
                         :value="it">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="指定月份: ">
            <el-select  type="text" v-model="salaryForm.month">
              <el-option v-for="it in months"
                         :key = "it"
                         :label = "it"
                         :value="it">
              </el-option>
            </el-select>
          </el-form-item>


        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm('salaryForm')">立即创建</el-button>
      </span>
    </el-dialog>
  </Layout>
</template>

<script>
import Layout from "@/components/content/Layout";
import Title from "@/components/content/Title";
import salaryList from './components/SalaryList'
import { getAllSalary, createSalary} from '@/network/financial'
import {getAllEmployee} from "@/network/hr";
import {getAllAccount} from "@/network/financial";

export default {
  name: 'SalaryView',
  components: {
    Layout,
    Title,
    salaryList
  },
  data() {
    return {
      activeName: 'PENDING',
      salaryList: [],
      pendingList: [],
      successList: [],
      failureList: [],
      accountList: [],
      dialogVisible: false,
      salaryForm: {
      },
      employeeList: [],
      rules: {
        employeeName: [
          { required: true, message: '请填写员工', trigger: 'change' }
        ],
      },
      years: [],
      months:[1,2,3,4,5,6,7,8,9,10,11,12],
    }
  },
  async mounted() {
    await this.getSalary()
    await getAllAccount().then(_res =>{
      this.accountList = _res.result
    })
    await getAllEmployee().then(_res => {
      this.employeeList= _res.result
    })
    let date = new Date()
    this.years=[date.getFullYear()-1,date.getFullYear(),date.getFullYear()+1]
  },
  methods: {
    async getSalary() {
      await getAllSalary({
        params : { state:'PENDING'}}).then(_res => {
        this.pendingList = _res.result
        console.log(this.pendingList)
      })

      await getAllSalary({
        params : { state:'SUCCESS'}}).then(_res => {
        this.successList = _res.result
      })

      await getAllSalary({
        params : { state:'FAILURE'}}).then(_res => {
        this.failureList = _res.result
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
    auth(){
      return sessionStorage.getItem('role')
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let config = {params:{
              employeeName:this.salaryForm.employeeName,
              companyAccount:this.salaryForm.companyAccount,
              year:Number(this.salaryForm.year),
              month:Number(this.salaryForm.month)
            }}
          console.log(config)
          createSalary(config).then(_res => {
            console.log(_res)
            if (_res.msg === 'Success') {
              this.$message.success('创建成功!')
              this.dialogVisible = false
              this.resetForm()
              this.getSalary()
            }
          })
        }
      })
    },
    resetForm() {
      this.salaryForm = {
      }
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