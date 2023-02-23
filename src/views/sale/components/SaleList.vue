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
            <el-button v-if="authorization() === 2" style="margin-left: 10px"
                       type="primary" icon="el-icon-check" circle size="mini" @click="approval(item.id)"></el-button>
            <el-button v-if="authorization() === 2"
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
              <el-tag v-if="type === 3" effect="dark" type='success'>审核通过</el-tag>
              <el-tag v-if="type === 4" effect="dark" type='danger'>审核未通过</el-tag>
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
            <span><strong>销售商id: </strong>{{item.supplier}}</span>
          </el-col>
          <el-col :span="3">
            <span><strong>操作员: </strong>{{item.operator}}</span>
          </el-col>
          <el-col :span="3">
            <span><strong>业务员: </strong>{{item.salesman}}</span>
          </el-col>
          <el-col :span="6">
            <span><strong>折让前总额: </strong>{{item.rawTotalAmount}}(元)</span>
          </el-col>
        </el-row>
        <el-row style="margin-top: 15px">
          <el-col :span="3">
            <span><strong>折扣: </strong>{{item.discount}}</span>
          </el-col>
          <el-col :span="6">
            <span><strong>使用代金券总额: </strong>{{item.voucherAmount}}(元)</span>
          </el-col>
          <el-col :span="6">
            <span><strong>折让后总额: </strong>{{item.finalAmount}}(元)</span>
          </el-col>
        </el-row>
        <el-row style="margin-top: 15px">
          <el-col :span="24">
            <span><strong>备注: </strong>{{item.remark}}</span>
          </el-col>
        </el-row>
        <div v-if="showAll[index]" style="margin-top: 15px">
          <div style="margin-bottom: 15px"><strong>详细商品清单:</strong></div>
          <el-table
              :data="item.saleSheetContent"
              stripe
              style="width: 100%"
              :header-cell-style="{'text-align':'center'}"
              :cell-style="{'text-align':'center'}">
            <el-table-column
                prop="pid"
                label="商品id"
                width="180">
            </el-table-column>
            <el-table-column
                prop="quantity"
                label="数量"
                width="200">
            </el-table-column>
            <el-table-column
                prop="unitPrice"
                label="单价(元)"
                width="200">
            </el-table-column>
            <el-table-column
                prop="totalPrice"
                label="金额(元)"
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
        title="编辑"
        :visible.sync="dialogVisible"
        width="40%"
        :before-close="handleClose">
      <div style="width: 90%; margin: 0 auto">
        <el-form :model="temp" label-width="100px" ref="temp" :rules="rules">
          <el-form-item label="销售商: " prop="supplier">
            <el-select v-model="temp.supplier" placeholder="请选择销售商">
              <el-option
                  v-for="item in sellers"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="折扣: " prop="discount">
            <el-input v-model="saleForm.discount"></el-input>
          </el-form-item>
          <el-form-item label="代金券总额: " prop="voucherAmount">
            <span>{{temp.voucherAmount}}</span>
          </el-form-item>
          <el-form-item
              v-for="(item, index) in temp.saleSheetContent"
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
              <el-button type="text" size="small" @click="addProduct" v-if="index === temp.saleSheetContent.length - 1">添加</el-button>
              <el-button type="text" size="small" @click.prevent="removeProduct(item)" v-if="index !== 0">删除</el-button>
            </div>
          </el-form-item>
          <el-form-item label="备注: ">
            <el-input type="textarea" v-model="saleForm.remark"></el-input>
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
import {createSale, firstApproval, secondApproval} from '../../../network/sale'
import {saleRedFlush, saleCopyIn} from "@/network/financial";
import {getAllCustomer} from "@/network/purchase";
import {getAllCommodity} from "@/network/commodity";

export default {
  name: 'SaleList',
  props: {
    list: Array,
    type: Number
  },
  data() {
    return {
      showAll: [],
      temp:{},
      saleForm:{},
      sellers: [],
      commodityList:[],
      rules: {
        supplier: [
          { required: true, message: '请选择一个销售商', trigger: 'change' }
        ],
        discount: [
          { required: true, message: '请输入折扣', trigger: 'change' }
        ],
        voucherAmount: [
          { required: true, message: '请输入代金券总额', trigger: 'change' }
        ]
      },
      dialogVisible:false,
    }
  },
  mounted() {
    this.showAll = new Array(this.list.length).fill(false)
    getAllCustomer({ params : { type: 'SELLER' } }).then(_res => {
      this.sellers = _res.result
    })
    getAllCommodity({}).then(_res => {
      let res = _res.result
      res.forEach(item => this.commodityList.push({ id: item.id,name:item.name }))
    })
  },
  methods: {
    redFlush(it){
      console.log(it)
      saleRedFlush(it).then(res=>{
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
      saleRedFlush(it).then(res=>{
      }).then(res=>{
        saleCopyIn(it).then(_res=>{
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
      if (this.type === 1 && sessionStorage.getItem('role') === 'SALE_MANAGER') {
        return 1
      } else if (this.type === 2 && sessionStorage.getItem('role') === 'GM') {
        return 2
      }
    },
    approval(id) {
      let config = {
        params: {
          saleSheetId: id,
          state: this.type === 1 ? 'PENDING_LEVEL_2' : 'SUCCESS'
        }
      }
      if (this.type === 1) {
        firstApproval(config).then(res => {
          this.$emit("refresh")
          this.$message({
            message: '操作成功!',
            type: 'success'
          })
        })
      } else {
        secondApproval(config).then(res => {
          this.$emit("refresh")
          this.$message({
            message: '操作成功!',
            type: 'success'
          })
        })
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
    },
    deny(id) {
      let config = {
        params: {
          saleSheetId: id,
          state: 'FAILURE'
        }
      }
      if (this.type === 1) {
        firstApproval(config).then(res => {
          this.$emit("refresh")
          this.$message({
            message: '操作成功!',
            type: 'success'
          })
        })
      } else {
        secondApproval(config).then(res => {
          this.$emit("refresh")
          this.$message({
            message: '操作成功!',
            type: 'success'
          })
        })
      }
    }
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