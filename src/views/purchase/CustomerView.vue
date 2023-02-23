<template>
  <Layout>
    <Title title="客户管理"></Title>
    <el-button type="primary" size="medium" @click="addVisible = true">新增客户</el-button>
    <div style="display: block;background: rgba(255,255,255,0.1);border-radius: 0.8rem; padding: 10px 10px">
      <span>查询销售人员时间段内最大金额客户：</span>
      <div style="margin: 10px 10px">
        <span>起始时间：</span>
        <el-input type="date" style="width: 30%" v-model="begin"></el-input>
        <span>结束时间：</span>
        <el-input type="date" style="width: 30%" v-model="end"></el-input>
        <span>销售员：</span>
        <el-select v-model="staff">
          <el-option v-for="it in employeeList"
                     :label="it.employeeName"
                     :key="it.employeeId"
                     :value="it.employeeName"></el-option>
        </el-select>
        <el-button type="success" @click="findMax">查找</el-button>

      </div>
      <span><strong>查询结果为：{{this.maxCustomer}}</strong></span>
    </div>
    <div style="margin-top: 10px">
      <el-table
        :data="customerList"
        stripe
        style="width: 100%"
        :header-cell-style="{'text-align':'center'}"
        :cell-style="{'text-align':'center'}">
        <el-table-column
          prop="id"
          label="id"
          width="60">
        </el-table-column>
        <el-table-column
          prop="name"
          label="姓名"
          width="70">
        </el-table-column>
        <el-table-column
          prop="type"
          label="类型"
          width="100"
          :filters="[{ text: '供应商', value: '供应商' }, { text: '销售商', value: '销售商' }]"
          :filter-method="filterTag"
          filter-placement="bottom-end">
          <template slot-scope="scope">
            <el-tag
              :type="scope.row.type === '供应商' ? 'primary' : 'success'"
              disable-transitions>{{scope.row.type}}</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          prop="level"
          label="级别"
          width="50">
        </el-table-column>
        <el-table-column
          prop="phone"
          label="电话"
          width="150">
        </el-table-column>
        <el-table-column
          prop="address"
          label="地址"
          width="150">
        </el-table-column>
        <el-table-column
          prop="zipcode"
          label="邮编"
          width="100">
        </el-table-column>
        <el-table-column
          prop="email"
          label="邮箱"
          width="200">
        </el-table-column>
        <el-table-column
          prop="lineOfCredit"
          label="应收额度(元)"
          width="120">
        </el-table-column>
        <el-table-column
          prop="receivable"
          label="应收(元)"
          width="120">
        </el-table-column>
        <el-table-column
          prop="payable"
          label="应付(元)"
          width="120">
        </el-table-column>
        <el-table-column
          prop="operator"
          label="操作员"
          width="120">
        </el-table-column>
        <el-table-column
          label="操作" >
          <template slot-scope="scope" >
            <div style="flex-direction: column; align-content: center;justify-items: center;">
            <el-button  style="margin: 0 5px"
              @click.native.prevent="editInfo(scope.row.id)"
              type="text"
              size="small">编辑
            </el-button>
            <el-button style="margin: 0 5px"
                @click.native.prevent="deleteCustomer(scope.row.id)"
                type="text"
                size="small">删除
            </el-button>
            </div>

          </template>
        </el-table-column>
      </el-table>
    </div>

    <el-dialog
        title="新增用户"
        :visible.sync="addVisible"
        width="40%"
        :before-close="handleClose"
    >
      <div style="width: 90%; margin: 0 auto">
        <el-form :model="createForm" label-width="100px" ref="createForm" :rules="rules">
          <el-form-item label="客户名称：" prop="name">
            <el-input v-model="createForm.name"></el-input>
          </el-form-item>
        </el-form>
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm('createForm')">立即添加</el-button>
      </span>

    </el-dialog>


    <el-dialog
        title="更新信息"
        :visible.sync="updateVisible"
        width="40%"
        :before-close="handleClose"
    >
      <div style="width: 90%; margin: 0 auto">
        <el-form :model="updateForm" label-width="100px" ref="updateForm">
          <el-form-item label="客户名称：" prop="name">
            <el-input v-model="updateForm.name"></el-input>
          </el-form-item>
          <el-form-item label="客户等级：" prop="level">
            <el-select v-model="updateForm.level">
              <el-option v-for="it in levels"
                         :key="it"
                         :label="it"
                         :value="it">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="客户分类：" prop="type">
            <el-select type="date" v-model="updateForm.type">
              <el-option v-for="it in types"
                         :key="it"
                         :label="it"
                         :value="it">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="手机号：" prop="phone">
            <el-input v-model="updateForm.phone"></el-input>
          </el-form-item>
          <el-form-item label="地址：" prop="address">
            <el-input v-model="updateForm.address"></el-input>
          </el-form-item>
          <el-form-item label="邮编：" prop="zipcode">
            <el-input v-model="updateForm.zipcode">
            </el-input>
          </el-form-item>
          <el-form-item label="电子邮箱：" prop="email">
            <el-input v-model="updateForm.email">
            </el-input>
          </el-form-item>
          <el-form-item label="信用额度：" prop="lineOfCredit">
            <el-input v-model="updateForm.lineOfCredit">
            </el-input>
          </el-form-item>
          <el-form-item label="应收账款：" prop="receivable">
            <el-input v-model="updateForm.receivable">
            </el-input>
          </el-form-item>
          <el-form-item label="应付账款：" prop="payable">
            <el-input v-model="updateForm.payable">
            </el-input>
          </el-form-item>
          <el-form-item label="默认业务员：" prop="operator">
            <el-select v-model="updateForm.operator">
              <el-option v-for="it in employeeList"
                         :label="it.employeeName"
                         :key="it.employeeId"
                         :value="it.employeeName"></el-option>
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
import {getAllCustomer, createCustomer, deleteCustomer, updateCustomer} from "../../network/purchase";
import {getAllEmployee} from "@/network/hr";
import {getMaxAmountCustomerOfSalesmanByTime} from "@/network/sale";

export default {
  name: 'CustomerView',
  components: {
    Layout,
    Title
  },
  data() {
    return {
      staff:'',
      begin:'',
      end:'',
      customerList: [],
      addVisible : false,
      updateVisible : false,
      rules:{
        name:[
          {required: true,message:'请输入客户姓名',trigger: 'change'}
        ]
      },
      createForm :{},
      updateForm :{},
      employeeList: [],
      maxCustomer:'',
      levels:[1,2,3,4,5],
      types:['供应商', '销售商'],
      tempId:''
    }
  },
  async mounted() {
    await getAllCustomer({ params : { type: 'SUPPLIER' } }).then(_res => {
      this.customerList = this.customerList.concat(_res.result)
    })
    await getAllCustomer({ params : { type: 'SELLER' } }).then(_res => {
      this.customerList = this.customerList.concat(_res.result)
    })
    await getAllCustomer({ params : { type: 'UNDEFINED' } }).then(_res => {
      this.customerList = this.customerList.concat(_res.result)
    })
    getAllEmployee().then(_res => {
      let arr = _res.result.map(item =>{
        item.birth=item.birth.substr(0,10)
        return item
      })
      this.employeeList=arr.filter(item => item.stationName==='进货销售人员'|| item.stationName==='销售经理')
      console.log(arr)
    })
  },
  methods: {
    submitUpdateForm(formName){
      console.log(this.$refs[formName])
      this.$refs[formName].validate((valid) =>{
        if(valid){
          this.updateForm.id=this.tempId
          console.log(this.updateForm)
          updateCustomer(this.updateForm).then(_res =>{
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
    },
    findMax(){
      getMaxAmountCustomerOfSalesmanByTime({params:{
        salesman:this.staff,
          beginDateStr: this.begin,
          endDateStr:this.end,
        }}).then(res=>{

      })
    },
    auth(){
      return sessionStorage.getItem('name')
    },
    filterTag(value, row) {
      return row.type === value
    },
    editInfo(id) {
      this.updateVisible=true
      this.tempId=id
    },
    deleteCustomer(id){
      deleteCustomer({
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
    async refresh(){
      this.customerList = []
      await getAllCustomer({ params : { type: 'SUPPLIER' } }).then(_res => {
        this.customerList = this.customerList.concat(_res.result)
      })
      await getAllCustomer({ params : { type: 'SELLER' } }).then(_res => {
        this.customerList = this.customerList.concat(_res.result)
      })
      await getAllCustomer({ params : { type: 'UNDEFINED' } }).then(_res => {
        this.customerList = this.customerList.concat(_res.result)
      })
    },
    submitForm(formName){
      console.log(this.$refs[formName])
      this.$refs[formName].validate((valid) =>{
        if(valid){
          createCustomer(
              {
                params: {
                  name: this.createForm.name,
                }
              }).then(_res =>{
            console.log(_res.result)
            if(_res.msg === 'Success'){
              this.$message.success('添加成功！')
              this.addVisible = false
              this.resetForm()


              //
              this.refresh()
            }
          })
        }
      })
    },
  }
}
</script>

<style>

</style>