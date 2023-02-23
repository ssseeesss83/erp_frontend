<template>
  <Layout>
    <Title title="账户管理"></Title>
    <el-button type="primary" size="medium" @click="addVisible = true">新增账户</el-button>
    <div style="margin-top: 10px">
      <el-table
          :data="accountList"
          stripe
          style="width: 100%"
          :header-cell-style="{'text-align':'center'}"
          :cell-style="{'text-align':'center'}">
        <el-table-column
            prop="name"
            label="账户名称"
            width="300">
        </el-table-column>
        <el-table-column
            prop="balance"
            label="余额"
            width="300">
        </el-table-column>
        <el-table-column
            label="操作" >
          <template slot-scope="scope" >
            <div style="flex-direction: column; align-content: center;justify-items: center;">
              <el-button  style="margin: 0 5px"
                          @click.native.prevent="displayUpdateForm(scope.row.name)"
                          type="text"
                          size="small">修改
              </el-button>
              <el-button style="margin: 0 5px"
                         @click.native.prevent="deleteAccount(scope.row.name)"
                         type="text"
                         size="small">删除
              </el-button>
            </div>

          </template>
        </el-table-column>
      </el-table>
    </div>

    <el-dialog
        title="新增账户"
        :visible.sync="addVisible"
        width="40%"
        :before-close="handleClose"
    >
      <div style="width: 90%; margin: 0 auto">
        <el-form :model="createForm" label-width="100px" ref="createForm" :rules="rules">
          <el-form-item label="账户名称：" prop="name">
            <el-input v-model="createForm.name"></el-input>
          </el-form-item>
          <el-form-item label="余额：" prop="balance">
            <el-input v-model="createForm.balance"></el-input>
          </el-form-item>
        </el-form>
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitAddForm('createForm')">添加</el-button>
      </span>

    </el-dialog>

    <el-dialog
        title="新增账户"
        :visible.sync="updateVisible"
        width="40%"
        :before-close="handleClose"
    >
      <div style="width: 90%; margin: 0 auto">
        <el-form :model="updateForm" label-width="100px" ref="updateForm" :rules="updateRules">
          <el-form-item label="账户名称：" prop="name">
            <span>{{this.tempName}}</span>
          </el-form-item>
          <el-form-item label="修改余额：" prop="name">
            <el-input v-model="updateForm.balance"></el-input>
          </el-form-item>
        </el-form>
      </div>

      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitUpdateForm('updateForm', )">修改</el-button>
      </span>

    </el-dialog>
  </Layout>
</template>

<script>
import Layout from "@/components/content/Layout";
import Title from "@/components/content/Title";
import { getAllAccount,deleteAccount,updateAccount,createAccount} from "../../network/financial";

export default {
  name: 'AccountManagement',
  components: {
    Layout,
    Title
  },
  data() {
    return {
      accountList: [],
      addVisible : false,
      updateVisible : false,
      tempName:'',
      rules:{
        name:[
          {required: true,message:'请输入账户名称',trigger: 'change'}
        ],
        balance:[
          {required: true,message:'请输入余额',trigger: 'change'}
        ]
      },
      updateRules:{
        balance:[
          {required: true,message:'请输入余额',trigger: 'change'}
        ]
      },
      createForm :{},
      updateForm :{},
    }
  },
  async mounted() {
    await getAllAccount().then(_res => {
      this.accountList = _res.result
    })
  },
  methods: {
    editInfo(id) {
      alert(`TODO: 修改${id}客户信息`)
    },
    deleteAccount(name){
      deleteAccount({
        params:{
          name:name,
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

      }
    },
    async refresh(){
      await getAllAccount().then(_res => {
        this.accountList = _res.result
      })
    },
    displayUpdateForm(name){
      this.updateVisible = true
      this.tempName = name
    },
    submitAddForm(formName){
      console.log(this.$refs[formName])
      this.$refs[formName].validate((valid) =>{
        if(valid){
          this.createForm.balance = Number(this.createForm.balance)
          createAccount(this.createForm).then(_res =>{
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
    submitUpdateForm(formName){
      console.log(this.$refs[formName])
      this.$refs[formName].validate((valid) =>{
        this.updateForm.name = this.tempName
        this.updateForm.balance = Number(this.updateForm.balance)
        if(valid){
          updateAccount(this.updateForm).then(_res =>{
            console.log(_res.result)
            if(_res.msg === 'Success'){
              this.$message.success('修改成功！')
              this.updateVisible = false
              this.resetForm()
              //
              this.refresh()
            }
          })
        }
      })
    }

  }
}
</script>

<style>

</style>