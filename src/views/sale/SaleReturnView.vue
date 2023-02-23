<template>
  <Layout>
    <Title title="销售退货管理"></Title>
    <el-button type="primary" size="medium" @click="dialogVisible = true">制定销售退货单</el-button>
    <div class="body">
      <el-tabs v-model="activeName" :stretch="true">
        <el-tab-pane label="待一级审批" name="PENDING_LEVEL_1">
          <div v-if="pendingLevel1List.length === 0">
            <el-empty description="暂无数据"></el-empty>
          </div>
          <div v-else>
            <sale-return-list :list="pendingLevel1List" :type="1" @refresh="getSaleReturn()"/>
          </div>
        </el-tab-pane>
        <el-tab-pane label="待二级审批" name="PENDING_LEVEL_2">
          <div v-if="pendingLevel2List.length === 0">
            <el-empty description="暂无数据"></el-empty>
          </div>
          <div v-else>
            <sale-return-list :list="pendingLevel2List" :type="2" @refresh="getSaleReturn()"/>
          </div>
        </el-tab-pane>
        <el-tab-pane label="审批完成" name="SUCCESS">
          <div v-if="successList.length === 0">
            <el-empty description="暂无数据"></el-empty>
          </div>
          <div v-else>
            <sale-return-list :list="successList" :type="3"/>
          </div>
        </el-tab-pane>
        <el-tab-pane label="审批失败" name="FAILURE">
          <div v-if="failureList.length === 0">
            <el-empty description="暂无数据"></el-empty>
          </div>
          <div v-else>
            <sale-return-list :list="failureList" :type="4"/>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
    <el-dialog
        title="创建销售退货单"
        :visible.sync="dialogVisible"
        width="40%"
        :before-close="handleClose">
      <div style="width: 90%; margin: 0 auto">
        <el-form :model="saleReturnForm" label-width="100px" ref="saleReturnForm">
          <el-form-item label="销售单id: " prop="saleSheetId">
            <el-select v-model="saleReturnForm.saleSheetId"
                       placeholder="请选择关联的销售单id"
                       @change="selectSale(completedSale.filter(item => item.id === saleReturnForm.saleSheetId))">
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
          <el-form-item label="销售单清单: " v-if="this.saleReturnForm.saleReturnSheetContent.length === 0">
            暂无数据!
          </el-form-item>
          <el-form-item label="销售单清单: " v-else>
            <div
                v-for="(item, index) in saleReturnForm.saleReturnSheetContent"
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
            <el-input type="textarea" v-model="saleReturnForm.remark"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm('saleReturnForm')">立即创建</el-button>
      </span>
    </el-dialog>
  </Layout>
</template>

<script>
import Layout from "@/components/content/Layout";
import Title from "@/components/content/Title";
import saleReturnList from "./components/SaleReturnList"
import { getAllSale,getAllSaleReturn,createSaleReturn, } from '../../network/sale'
export default {
  name: 'SaleReturnView',
  components: {
    Layout,
    Title,
    saleReturnList
  },
  data() {
    return {
      activeName: 'PENDING_LEVEL_1',
      saleReturnList: [],
      pendingLevel1List: [],
      pendingLevel2List: [],
      successList: [],
      failureList: [],
      dialogVisible: false,
      saleReturnForm: {
        saleReturnSheetContent: [
          {
            pid: '',
            quantity: '',
            unitPrice: '',
            remark: ''
          }
        ]
      },
      completedSale: []
    }
  },
  async mounted() {
    this.getSaleReturn()
    await getAllSale({ params: { state: 'SUCCESS' } }).then(_res => {
      this.completedSale = _res.result
    })
  },
  methods: {
    getSaleReturn() {
      getAllSaleReturn({}).then(_res => {
        this.saleReturnList = _res.result
        this.pendingLevel1List = this.saleReturnList.filter(item => item.state === '待一级审批')
        this.pendingLevel2List = this.saleReturnList.filter(item => item.state === '待二级审批')
        this.successList = this.saleReturnList.filter(item => item.state === '审批完成')
        this.failureList = this.saleReturnList.filter(item => item.state === '审批失败')
      })
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
          .then(_ => {
            this.saleReturnForm = {}
            this.saleReturnForm.saleReturnSheetContent = []
            done();
          })
          .catch(_ => {});
    },
    selectSale(content) {
      this.saleReturnForm.saleReturnSheetContent = content[0].saleSheetContent
      this.saleReturnForm.supplier = content[0].supplier
      this.saleReturnForm.totalAmount = content[0].totalAmount
      this.saleReturnForm.finalAmount = content[0].finalAmount
      this.saleReturnForm.discount = Number(content[0].discount)
      this.saleReturnForm.voucherAmount = Number(content[0].voucherAmount)
      this.saleReturnForm.salesman = content[0].salesman
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.saleReturnForm.id = null
          this.saleReturnForm.operator = sessionStorage.getItem("name")
          this.saleReturnForm.createTime = null
          this.saleReturnForm.state = null
          this.saleReturnForm.saleReturnSheetContent.forEach(item => {
            item.unitPrice = Number(item.unitPrice)
            item.quantity = Number(item.quantity)
            item.totalPrice = item.unitPrice * item.quantity
          })
          console.log(this.saleReturnForm)
          createSaleReturn(this.saleReturnForm).then(_res => {
            if (_res.msg == 'Success') {
              this.$message.success('创建成功!')
              this.dialogVisible = false
              this.saleReturnForm = {}
              this.saleReturnForm.saleReturnSheetContent = []
              this.getSaleReturn()
            }
          })
        }
      })
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