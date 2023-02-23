<template>
  <div class="card">
    <el-card v-for="(item, index) in list" :index="item.index" :key="item.id" shadow="hover">
      <template #header>
        <el-row>
          <el-col :span="18">
            <span><strong>id: </strong>{{item.id}}</span>
            <el-button v-if="authorization() === 1" style="margin-left: 10px"
                       type="success" icon="el-icon-check" circle size="mini" @click="approval(item.id)"></el-button>
            <el-button v-if="authorization() === 1"
                       type="danger" icon="el-icon-close" circle size="mini" @click="deny(item.id)"></el-button>

            <span style="left: 50%;position: relative;">
              <el-button v-if="authorization() === 10"
                         type="danger" @click="redFlush(item)">红冲
              </el-button>
              <el-button v-if="authorization() === 10"
                         type="danger" @click="redFlushCopy(item)">红冲并复制
              </el-button>
            </span>
            <span style="margin-left: 10px">
              <el-tag v-if="type === 2" effect="dark" type='success'>审核通过</el-tag>
              <el-tag v-if="type === 3" effect="dark" type='danger'>审核未通过</el-tag>
            </span>
          </el-col>
        </el-row>
      </template>
      <div>
        <el-row>
          <el-col :span="6">
            <span><strong>操作员: </strong>{{item.operator}}</span>
          </el-col>
          <el-col :span="6">
            <span><strong>员工姓名: </strong>{{item.employeeName}}(元)</span>
          </el-col>
          <el-col :span="6">
            <span><strong>员工账户: </strong>{{item.employeeAccount}}</span>
          </el-col>
          <el-col :span="6">
            <span><strong>应发工资: </strong>{{item.shouldPay}}</span>
          </el-col>
          <el-col :span="6">
            <span><strong>税款: </strong>{{item.tax}}</span>
          </el-col>
          <el-col :span="6">
            <span><strong>实发工资: </strong>{{item.realPay}}</span>
          </el-col>
          <el-col :span="8">
            <span><strong>工资账户: </strong>{{item.companyAccount}}</span>
          </el-col>
        </el-row>
      </div>
    </el-card>

    <el-dialog
        title="修改"
        :visible.sync="dialogVisible"
        width="40%"
        :before-close="handleClose">
      <div style="width: 90%; margin: 0 auto">
        <el-form :model="temp" label-width="100px" ref="temp">
          <el-form-item label="员工: " prop="employeeName">
            <el-select v-model="temp.employeeName" placeholder="请选择员工">
              <el-option
                  v-for="item in employeeList"
                  :key="item.employeeId"
                  :label="item.employeeName"
                  :value="item.employeeName">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="工资账户: ">
            <el-select v-model="temp.companyAccount" placeholder="请选择转账账户名：" style="width: 40%; margin-right: 5%">
              <el-option v-for="it in accountList"
                         :key = "it.name"
                         :label = "it.name"
                         :value="it.name">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="指定年份: " >
            <el-select type="text" v-model="temp.year">
              <el-option v-for="it in years"
                         :key = "it"
                         :label = "it"
                         :value="it">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="指定月份: ">
            <el-select  type="text" v-model="temp.month">
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
        <el-button type="primary" @click="submitForm('temp')">修改并写入</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {approveSalary, getAllAccount, salaryCopyIn, salaryRedFlush} from '@/network/financial'
import {getAllEmployee} from "@/network/hr";
export default {
  name: 'SalaryList',
  props: {
    list: Array,
    type: Number
  },
  data() {
    return {
      dialogVisible: false,
      temp:'',
      years: [],
      months:[1,2,3,4,5,6,7,8,9,10,11,12],
      employeeList: [],
      accountList: [],
    }
  },
  async mounted() {
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
    redFlush(it){
      console.log(it)
      salaryRedFlush(it).then(res=>{
        this.$message({
          message: '操作成功!',
          type: 'success'
        })
      })
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
    },
    redFlushCopy(it){
      this.temp=it
      this.dialogVisible = true
    },
    copyIn(it){
      salaryRedFlush(it).then(res=>{
      }).then(res=>{
        salaryCopyIn(it).then(_res=>{
          this.$message({
            message: '操作成功!',
            type: 'success'
          })
          this.dialogVisible = false
          this.temp=''
        })
      })
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.copyIn(this.temp)
        }
      })
    },
    authorization() {
      if(this.type === 10 && sessionStorage.getItem('role') !== 'GM'){
        return 10
      }
      if (this.type === 1 && sessionStorage.getItem('role') === 'GM') {
        return 1
      } else
        return 0
    },
    approval(id) {
      let config = {
        params: {
          salarySheetId: id,
          state: 'SUCCESS',
        }
      }
      approveSalary(config).then(res =>{
        this.$emit("refresh")
        this.$message({
          message: '操作成功!',
          type: 'success'
        })
      })
    },
    deny(id) {
      let config = {
        params: {
          salarySheetId: id,
          state: 'FAILURE'
        }
      }
      approveSalary(config).then(res =>{
        this.$emit("refresh")
        this.$message({
          message: '操作成功!',
          type: 'success'
        })
      })
    },
  }
}
</script>

<style lang="scss" scoped>
.card {
  width: 80%;
  margin: 0 auto;
  .button {
    float: right;
    padding: 3px 0
  }
}
.el-card {
  margin-bottom: 20px;
  background: #EEF7F2;
}
</style>