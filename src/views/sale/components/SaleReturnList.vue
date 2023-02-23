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
          <el-col :span="6">
            <span><strong>关联的销售商id: </strong>{{item.supplier}}</span>
          </el-col>
          <el-col :span="3">
            <span><strong>操作员: </strong>{{item.operator}}</span>
          </el-col>
          <el-col :span="3">
            <span><strong>业务员: </strong>{{item.salesman}}</span>
          </el-col>
          <el-col :span="6">
            <span><strong>折让前总额: </strong>{{item.totalAmount}}(元)</span>
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
              :data="item.saleReturnSheetContent"
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
        title="修改"
        :visible.sync="dialogVisible"
        width="40%"
        :before-close="handleClose">
      <div style="width: 90%; margin: 0 auto">
        <el-form :model="temp" label-width="100px" ref="temp">
          <el-form-item label="销售单id: " prop="saleSheetId">
            <el-select v-model="temp.saleSheetId"
                       placeholder="请选择关联的销售单id">
              <el-option
                  v-for="(item, index) in completedSale"
                  :key="item.id"
                  :label="item.id"
                  :value="item.id">
                <el-popover
                    placement="right"
                    width="800"
                    trigger="hover">
                  <el-table :data="completedSale[index].saleSheetContent">
                    <el-table-column width="100" property="id" label="id"></el-table-column>
                    <el-table-column width="200" property="pid" label="pid"></el-table-column>
                    <el-table-column width="100" property="unitPrice" label="单价"></el-table-column>
                    <el-table-column width="100" property="quantity" label="数量"></el-table-column>
                    <el-table-column width="100" property="totalPrice" label="总价"></el-table-column>
                    <el-table-column property="remark" label="备注"></el-table-column>
                  </el-table>
                  <span slot="reference">{{ item.id }}</span>
                </el-popover>
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="销售单清单: ">
            <div
                v-for="(item, index) in temp.saleReturnSheetContent"
                :key="index">
              <el-row>
                <el-col :span="8">
                  <span>id: {{item.pid}}</span>
                </el-col>
                <el-col :span="8">
                  数量: <el-input v-model="item.quantity" size="mini" style="width: 120px"></el-input>
                </el-col>
                <el-col :span="8">
                  单价: <el-input v-model="item.unitPrice" size="mini" style="width: 120px"></el-input>
                </el-col>
              </el-row>
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
import {getAllSale, returnFirstApproval, returnSecondApproval} from '@/network/sale'
import {saleReturnRedFlush, saleReturnCopyIn,} from "@/network/financial";

export default {
  name: 'SaleReturnList',
  props: {
    list: Array,
    type: Number
  },
  data() {
    return {
      showAll: [],
      temp:{},
      dialogVisible: false,
      completedSale: [],
    }
  },
  mounted() {
    this.showAll = new Array(this.list.length).fill(false)
    getAllSale({ params: { state: 'SUCCESS' } }).then(_res => {
      this.completedSale = _res.result
    })
  },
  methods: {
    redFlush(it){
      console.log(it)
      saleReturnRedFlush(it).then(res=>{
        console.log(res)
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
      saleReturnRedFlush(it).then(res=>{
      }).then(res=>{
        saleReturnCopyIn(it).then(_res=>{
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
          saleReturnsSheetId: id,
          state: this.type === 1 ? 'PENDING_LEVEL_2' : 'SUCCESS'
        }
      }
      if (this.type === 1) {
        returnFirstApproval(config).then(res => {
          this.$emit("refresh")
          this.$message({
            message: '操作成功!',
            type: 'success'
          })
        })
      } else {
        returnSecondApproval(config).then(res => {
          this.$emit("refresh")
          this.$message({
            message: '操作成功!',
            type: 'success'
          })
        })
      }
    },
    deny(id) {
      let config = {
        params: {
          saleReturnsSheetId: id,
          state: 'FAILURE'
        }
      }
      if (this.type === 1) {
        returnFirstApproval(config).then(res => {
          this.$emit("refresh")
          this.$message({
            message: '操作成功!',
            type: 'success'
          })
        })
      } else {
        returnSecondApproval(config).then(res => {
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