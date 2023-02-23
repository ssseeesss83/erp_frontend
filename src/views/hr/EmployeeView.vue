<template>
  <Layout>
    <Title title="员工管理"></Title>
    <el-button type="primary" size="medium" @click="addVisible = true">新增员工</el-button>
    <div style="margin-top: 10px">
      <el-table
          :data="employeeList"
          stripe
          style="width: 100%"
          :header-cell-style="{'text-align':'center'}"
          :cell-style="{'text-align':'center'}">
        <el-table-column
            prop="employeeId"
            label="id"
            width="60">
        </el-table-column>
        <el-table-column
            prop="employeeName"
            label="姓名"
            width="70">
        </el-table-column>
        <el-table-column
            prop="sex"
            label="性别"
            width="100"
            :filters="[{ text: '男', value: '男' }, { text: '女', value: '女' }]"
            :filter-method="filterTag"
            filter-placement="bottom-end">
          <template slot-scope="scope">
            <el-tag
                :type="scope.row.sex === '男' ? 'primary' : 'success'"
                disable-transitions>{{scope.row.sex}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column
            prop="birth"
            label="出生日期"
            width="200">
        </el-table-column>
        <el-table-column
            prop="phone"
            label="电话"
            width="150">
        </el-table-column>
        <el-table-column
            prop="employeeAccount"
            label="工资账户"
            width="150">
        </el-table-column>
        <el-table-column
            prop="stationName"
            label="岗位"
            width="100">
        </el-table-column>
        <el-table-column
            prop="stationLevel"
            label="岗位级别"
            width="100">
        </el-table-column>
        <el-table-column
            prop="salaryCalculationType"
            label="薪资计算方式"
            width="120">
        </el-table-column>
        <el-table-column
            prop="payMethod"
            label="薪资发放方式"
            width="120">
        </el-table-column>
        <el-table-column
            prop="taxType"
            label="纳税种类"
            width="120">
        </el-table-column>
        <el-table-column
            label="操作" >
          <template slot-scope="scope" >
            <div style="flex-direction: column; align-content: center;justify-items: center;">
              <el-button  style="margin: 0 5px"
                          @click.native.prevent="editInfo(scope.row.employeeId)"
                          type="text"
                          size="small">编辑
              </el-button>
              <el-button style="margin: 0 5px"
                         @click.native.prevent="deleteEmployee(scope.row.employeeId)"
                         type="text"
                         size="small">删除
              </el-button>
            </div>

          </template>
        </el-table-column>
      </el-table>
    </div>

    <el-dialog
        title="新增员工"
        :visible.sync="addVisible"
        width="40%"
        :before-close="handleClose"
    >
      <div style="width: 90%; margin: 0 auto">
        <el-form :model="createForm" label-width="100px" ref="createForm" :rules="rules">
          <el-form-item label="员工名称：" prop="employeeName">
            <el-input v-model="createForm.employeeName"></el-input>
          </el-form-item>
          <el-form-item label="性别：" prop="sex">
            <el-select v-model="createForm.sex">
              <el-option v-for="it in sexList"
                         :key="it"
                         :label="it"
                         :value="it">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="出生日期：" prop="birth">
            <el-input type="date" v-model="createForm.birth"></el-input>
          </el-form-item>
          <el-form-item label="手机号：" prop="phone">
            <el-input v-model="createForm.phone"></el-input>
          </el-form-item>
          <el-form-item label="工资账户：" prop="employeeAccount">
            <el-input v-model="createForm.employeeAccount"></el-input>
          </el-form-item>
          <el-form-item label="岗位：" prop="stationName">
            <el-select v-model="createForm.stationName">
              <el-option v-for="it in stations"
                         :key="it.name"
                         :label="it.value"
                         :value="it.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="岗位级别：" prop="stationLevel">
            <el-select v-model="createForm.stationLevel">
              <el-option v-for="it in levels"
                         :key="it"
                         :label="it"
                         :value="it">
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm('createForm')">立即添加</el-button>
      </span>
    </el-dialog>
<!--update-->
    <el-dialog
        title="更新信息"
        :visible.sync="updateVisible"
        width="40%"
        :before-close="handleClose"
    >
      <div style="width: 90%; margin: 0 auto">
        <el-form :model="updateForm" label-width="100px" ref="updateForm" :rules="rules">
          <el-form-item label="员工名称：" prop="employeeName">
            <el-input v-model="updateForm.employeeName"></el-input>
          </el-form-item>
          <el-form-item label="性别：" prop="sex">
            <el-select v-model="updateForm.sex">
              <el-option v-for="it in sexList"
                         :key="it"
                         :label="it"
                         :value="it">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="出生日期：" prop="birth">
            <el-input type="date" v-model="updateForm.birth"></el-input>
          </el-form-item>
          <el-form-item label="手机号：" prop="phone">
            <el-input v-model="updateForm.phone"></el-input>
          </el-form-item>
          <el-form-item label="工资账户：" prop="employeeAccount">
            <el-input v-model="updateForm.employeeAccount"></el-input>
          </el-form-item>
          <el-form-item label="岗位：" prop="stationName">
            <el-select v-model="updateForm.stationName">
              <el-option v-for="it in stations"
                         :key="it.name"
                         :label="it.value"
                         :value="it.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="岗位级别：" prop="stationLevel">
            <el-select v-model="updateForm.stationLevel">
              <el-option v-for="it in levels"
                         :key="it"
                         :label="it"
                         :value="it">
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitUpdateForm('updateForm')">修改</el-button>
      </span>
    </el-dialog>

  </Layout>
</template>

<script>
import Layout from "@/components/content/Layout";
import Title from "@/components/content/Title";
import { getAllEmployee,createEmployee,deleteEmployee, updateEmployee} from "@/network/hr";

export default {
  name: 'EmployeeView',
  components: {
    Layout,
    Title,
  },
  data() {
    return {
      employeeList: [],
      addVisible : false,
      updateVisible : false,
      rules:{
        name:[
          {required: true,message:'请输入员工姓名',trigger: 'change'}
        ]
      },
      sexList:['男', '女'],
      createForm :{},
      updateForm :{},
      stations:[
        {name:'INVENTORY_MANAGER',value: "库存管理人员"}, //库存管理人员
        {name:'SALE_STAFF',value: "进货销售人员"}, // 销售销售人员
        {name:'SALE_MANAGER',value: "销售经理"}, //销售经理
        {name:'FINANCIAL_STAFF',value:  "财务人员"}, // 财务人员
        {name:'HR',value:  "人力资源人员"}, // 人力资源人员
        {name:'GM',value:  "总经理"}, // 总经理
      ],
      levels:[1,2,3],
      tempId:0,
    }
  },
  mounted() {
    getAllEmployee().then(_res => {
      let arr = _res.result.map(item =>{
        item.birth=item.birth.substr(0,10)
        return item
      })
      this.employeeList=arr
      console.log(arr)
    })
  },
  methods: {
    filterTag(value, row) {
      return row.type === value
    },
    editInfo(id){
      this.updateVisible=true
      this.tempId = id
    },
    deleteEmployee(id){
      deleteEmployee({
        params:{
          id:id,
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
        //null
      }
      this.updateForm={

      }
    },
    refresh(){
      this.employeeList = []
      getAllEmployee().then(_res => {
        let arr = _res.result.map(item =>{
          item.birth=item.birth.substr(0,10)
          return item
        })
        this.employeeList=arr
        console.log(arr)
      })
    },
    submitForm(formName){
      this.$refs[formName].validate((valid) =>{
        if(valid){
          this.createForm.employeeId=null
          this.createForm.salaryCalculationType = null
          this.createForm.payMethod=null
          this.createForm.taxType=null
          console.log(this.$refs[formName])
          createEmployee(this.createForm).then(_res =>{
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
    submitUpdateForm(formName){
      console.log(this.$refs[formName])
      this.$refs[formName].validate((valid) =>{
        if(valid){
          this.updateForm.employeeId=this.tempId
          this.updateForm.salaryCalculationType = null
          this.updateForm.payMethod=null
          this.updateForm.taxType=null
          console.log(this.updateForm)
          updateEmployee(this.updateForm).then(_res =>{
            console.log(_res.result)
            if(_res.msg === 'Success'){
              this.$message.success('修改成功！')
              this.updateVisible = false
              this.resetForm()
              this.refresh()
            }
          })
        }
      })
    }
  },
}
</script>

<style>

</style>