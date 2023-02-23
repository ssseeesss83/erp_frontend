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
          <el-col :span="6">
            <el-button class="button" type="text"
                       v-if="!showAll[index]"
                       @click="changeState(index)">
              展开
            </el-button>
            <el-button class="button" type="text"
                       v-if="showAll[index]"
                       @click="changeState(index)">
              收起</el-button>
          </el-col>
        </el-row>
      </template>
      <div>
        <el-row>
          <el-col :span="3">
            <span><strong>客户id: </strong>{{item.customer}}</span>
          </el-col>
          <el-col :span="6">
            <span><strong>操作员: </strong>{{item.operator}}</span>
          </el-col>
          <el-col :span="6">
            <span><strong>总额汇总: </strong>{{item.totalAmount}}(元)</span>
          </el-col>
        </el-row>
        <div v-if="showAll[index]" style="margin-top: 15px">
          <div style="margin-bottom: 15px"><strong>转账列表:</strong></div>
          <el-table
              :data="item.receiveSheetContentVOS"
              stripe
              style="width: 100%"
              :header-cell-style="{'text-align':'center'}"
              :cell-style="{'text-align':'center'}">
            <el-table-column
                prop="name"
                label="账户名称"
                width="200">
            </el-table-column>
            <el-table-column
                prop="transferAmount"
                label="转账金额"
                width="200">
            </el-table-column>
            <el-table-column
                prop="remark"
                label="备注">
            </el-table-column>
          </el-table>
        </div>
      </div>
    </el-card>
    <el-dialog
        title="修改"
        :visible.sync="dialogVisible"
        width="40%"
        :before-close="handleClose">
      <div style="width: 90%; margin: 0 auto">
        <el-form :model="temp" label-width="100px" ref="temp">
          <el-form-item label="客户: " prop="customer">
            <el-select v-model="temp.customer" placeholder="请选择客户">
              <el-option
                  v-for="item in customers"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item
              v-for="(item, index) in temp.receiveSheetContentVOS"
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
              <el-button type="text" size="small" @click="addList" v-if="index === temp.receiveSheetContentVOS.length - 1">添加</el-button>
              <el-button type="text" size="small" @click.prevent="removeList(item)" v-if="index !== 0">删除</el-button>
            </div>
          </el-form-item>

          <el-form-item label="备注: ">
            <el-input type="textarea" v-model="temp.remark"></el-input>
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
import {approveReceive, getAllAccount, receiveCopyIn, receiveRedFlush} from '@/network/financial'
import {getAllCustomer} from "@/network/sale";
export default {
  name: 'ReceiveList',
  props: {
    list: Array,
    type: Number
  },
  data() {
    return {
      showAll: [],
      dialogVisible: false,
      temp:'',
      accountList: [],
      customers:[],
    }
  },
  async mounted() {
    this.showAll = new Array(this.list.length).fill(false)
    await getAllAccount().then(_res =>{
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
    addList(){
      this.receiveForm.receiveSheetContentVOS.push({});
    },
    removeList(item){
      let index = this.receiveForm.receiveSheetContentVOS.indexOf(item);
      if (index !== -1) {
        this.receiveForm.receiveSheetContentVOS.splice(index, 1)
      }
    },
    redFlush(it){
      console.log(it)
      receiveRedFlush(it).then(res=>{
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
      receiveRedFlush(it).then(res=>{
      }).then(res=>{
        receiveCopyIn(it).then(_res=>{
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
    changeState(index) {
      this.$set(this.showAll, index, !this.showAll[index])
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
            receiveSheetId: id,
            state: 'SUCCESS',
          }
        }
        approveReceive(config).then(res =>{
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
          receiveSheetId: id,
          state: 'FAILURE'
        }
      }
      approveReceive(config).then(res =>{
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