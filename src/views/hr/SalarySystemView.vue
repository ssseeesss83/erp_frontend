<template>
  <Layout>
    <Title title="薪酬制度管理"></Title>
    <el-button type="primary" size="medium" @click="dialogVisible = true">制定薪酬制度</el-button>
    <div class="body">
      <el-tabs v-model="activeName" :stretch="true">
        <el-tab-pane label="待一级审批" name="PENDING_LEVEL_1">
          <div v-if="pendingLevel1List.length === 0">
            <el-empty description="暂无数据"></el-empty>
          </div>
          <div v-else>
            <salary-system-list :list="pendingLevel1List" :type="1" @refresh="getSalarySystem()"/>
          </div>
        </el-tab-pane>
        <el-tab-pane label="待二级审批" name="PENDING_LEVEL_2">
          <div v-if="pendingLevel2List.length === 0">
            <el-empty description="暂无数据"></el-empty>
          </div>
          <div v-else>
            <salary-system-list :list="pendingLevel2List" :type="2" @refresh="getSalarySystem()"/>
          </div>
        </el-tab-pane>
        <el-tab-pane label="审批完成" name="SUCCESS">
          <div v-if="successList.length === 0">
            <el-empty description="暂无数据"></el-empty>
          </div>
          <div v-else>
            <salary-system-list :list="successList" :type="3"/>
          </div>
        </el-tab-pane>
        <el-tab-pane label="审批失败" name="FAILURE">
          <div v-if="failureList.length === 0">
            <el-empty description="暂无数据"></el-empty>
          </div>
          <div v-else>
            <salary-system-list :list="failureList" :type="4"/>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>

    <el-dialog
        title="创建薪酬制度"
        :visible.sync="dialogVisible"
        width="40%"
        :before-close="handleClose">
      <div style="width: 90%; margin: 0 auto">
        <el-form :model="salarySystemForm" label-width="100px" ref="salarySystemForm">
          <el-form-item label="岗位名称: " prop="stationName">
            <el-select v-model="salarySystemForm.stationName" placeholder="请选择岗位名称">
              <el-option
                  v-for="item in stations"
                  :key="item.name"
                  :label="item.value"
                  :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="岗位名称: " prop="stationLevel">
            <el-select v-model="salarySystemForm.stationLevel" placeholder="请选择岗位级别">
              <el-option
                  v-for="item in levels"
                  :key="item"
                  :label="item"
                  :value="item">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="基本工资: " prop="basisSalary">
            <el-input v-model="salarySystemForm.basisSalary"></el-input>
          </el-form-item>
          <el-form-item label="岗位工资: " prop="stationSalary">
            <el-input v-model="salarySystemForm.stationSalary"></el-input>
          </el-form-item>
          <el-form-item label="薪资计算方式: " prop="salaryCalculationType">
            <el-select v-model="salarySystemForm.salaryCalculationType">
              <el-option
                  v-for="item in calculationTypes"
                  :key="item"
                  :label="item"
                  :value="item">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="薪资发放方式: " prop="payMethod">
            <el-select v-model="salarySystemForm.payMethod">
              <el-option
                  v-for="item in payMethods"
                  :key="item"
                  :label="item"
                  :value="item">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="纳税种类: " prop="taxType">
            <el-select v-model="salarySystemForm.taxType">
              <el-option
                  v-for="item in taxTypes"
                  :key="item"
                  :label="item"
                  :value="item">
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm('salarySystemForm')">立即创建</el-button>
      </span>
    </el-dialog>
  </Layout>
</template>

<script>
import Layout from "@/components/content/Layout";
import Title from "@/components/content/Title";
import SalarySystemList from "@/views/hr/components/SalarySystemList";
import {getAllSalarySystem, createSalarySystem,} from "@/network/hr"

export default {
  name: "SalarySystemView",
  components: {
    Layout,
    Title,
    SalarySystemList
  },
  mounted() {
    this.getSalarySystem()
  },
  data(){
    return{
      activeName: 'PENDING_LEVEL_1',
      salarySystemList:[],
      salarySystemForm:{},
      pendingLevel1List: [],
      pendingLevel2List: [],
      successList: [],
      failureList: [],
      dialogVisible: false,
      stations:[
        {name:'INVENTORY_MANAGER',value: "库存管理人员"}, //库存管理人员
        {name:'SALE_STAFF',value: "进货销售人员"}, // 销售销售人员
        {name:'SALE_MANAGER',value: "销售经理"}, //销售经理
        {name:'FINANCIAL_STAFF',value:  "财务人员"}, // 财务人员
        {name:'HR',value:  "人力资源人员"}, // 人力资源人员
        {name:'GM',value:  "总经理"}, // 总经理
      ],
      levels:[1,2,3],
      calculationTypes:['月薪制','年薪制','提成制'],
      payMethods:['转账','现金'],
      taxTypes:['五险一金','八险二金']
    }
  },
  methods:{
    getSalarySystem(){
      getAllSalarySystem({params:{state:'待一级审批'}}).then(res=>{this.pendingLevel1List = res.result})
      getAllSalarySystem({params:{state:'待二级审批'}}).then(res=>{this.pendingLevel2List = res.result})
      getAllSalarySystem({params:{state:'审批完成'}}).then(res=>{this.successList = res.result})
      getAllSalarySystem({params:{state:'审批失败'}}).then(res=>{this.failureList = res.result})
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
        this.salarySystemForm.state = '待一级审批'
        this.salarySystemForm.basisSalary = Number(this.salarySystemForm.basisSalary)
        this.salarySystemForm.stationSalary = Number(this.salarySystemForm.stationSalary)
        if (valid) {
          console.log(this.salarySystemForm)
          createSalarySystem(this.salarySystemForm).then(_res => {
            if (_res.msg === 'Success') {
              this.$message.success('创建成功!')
              this.dialogVisible = false
              this.resetForm()
              this.getSalarySystem()
            }
          })
        }
      })
    },
    resetForm() {
      this.salarySystemForm = {
      }
    },
  }
}
</script>

<style scoped>

</style>