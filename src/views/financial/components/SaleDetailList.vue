<template>
  <div class="card">
    <el-card v-for="(item,index) in list" :key="index" shadow="hover">
      <template #header>
        <el-row>
          <el-col :span="18">
            <span v-if="isTHD(item.sheetId)">退货</span>
            <span v-else>售出</span>
            <span><strong>id: </strong>{{item.sheetId}}</span>
          </el-col>
        </el-row>
      </template>
      <div>
        <el-row>
          <el-col :span="15">
            <span><strong>时间: </strong>{{item.saleOrSaleReturnTime}}</span>
          </el-col>
          <el-col :span="8">
            <span><strong>商品名: </strong>{{item.name}}</span>
          </el-col>
          <el-col :span="20">
            <span><strong>商品型号: </strong>{{item.productType}}</span>
          </el-col>
          <el-col :span="8">
            <span><strong>商品数量: </strong>{{item.quantity}}</span>
          </el-col>
          <el-col :span="8">
            <span><strong>单价: </strong>{{item.unitPrice}}(元)</span>
          </el-col>
          <el-col :span="8">
            <span><strong>总额: </strong>{{item.totalPrice}}(元)</span>
          </el-col>
        </el-row>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "SaleDetailList",
  props: {
    list: Array,
    type: Number
  },
  data() {
    return {
      showAll: [],
    }
  },
  mounted() {
  },
  methods:{
    isTHD(id){
      let check = id + ''
      if(check.startsWith('XSTHD')){
        return true
      }
      return false
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

.el-card-thd{
  margin-bottom: 20px;
  background: #f5ebeb;
}
</style>