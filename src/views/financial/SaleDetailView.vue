<template>
  <Layout>
    <Title title="销售明细"></Title>
    <div class="filter">
      <div class="line-item">
        <span>起止时间：</span>
        <el-input type="date" v-model="begin" style="width: 20%;"></el-input>
        <span style="font-size: 2rem;">~</span>
        <el-input type="date" v-model="end" style="width: 20%;"></el-input>
      </div>
      <div class="line-item">
        <span>商品名：</span>
        <el-input type="text" v-model="name" style="width: 40%;"></el-input>
      </div>

      <div class="line-item">
        <span>客户：</span>
        <el-select v-model="supplier">
          <el-option
              v-for="item in customers"
              :key="item.id"
              :label="item.name"
              :value="item.id">
          </el-option>
        </el-select>
      </div>
      <div class="line-item">
        <span>操作员：</span>
        <el-input type="text" v-model="operator" style="width: 40%;"></el-input>
      </div>

      <el-button type="primary" size="medium" @click="submit" style="left: 0;bottom: 0;position: relative">筛选</el-button>
    </div>
    <div class="body">
          <div>
            <sale-detail-list :list="resultList" :type="1" @refresh="getAllSaleDetail"/>
          </div>
    </div>
  </Layout>
</template>

<script>
import saleDetailList from "./components/SaleDetailList";
import Layout from "@/components/content/Layout";
import Title from "@/components/content/Title";
import {getSaleDetail} from "@/network/financial";
import {getAllCustomer} from "@/network/sale";

export default {
  name: "SaleDetailView",
  components: {
    Layout,
    Title,
    saleDetailList
  },
  data() {
    return {
      resultList: [],
      customers:[],
      //filters:
      begin:'',
      end:'',
      name:'',
      supplier:'',
      operator:'',
    }
  },
  async mounted() {
    await getAllCustomer({ params : { type: 'SUPPLIER' } }).then(_res => {
      this.customers= this.customers.concat(_res.result)
    })
    await getAllCustomer({ params : { type: 'SELLER' } }).then(_res => {
      this.customers = this.customers.concat(_res.result)
    })
    await this.getAllSaleDetail()
  },
  methods:{
    getAllSaleDetail(){
      let config = {
      }
      getSaleDetail(config).then(res => {
        console.log(res.result)
        this.resultList = res.result
      })
    },
    getSelectedDetail(){
      let config = {}
      if(this.begin !==''){
        config.begin = this.begin+'T'+"00:00:00.00"
      }
      if(this.end !==''){
        config.end = this.end+'T'+"23:59:59.00"
      }
      if(this.name !==''){
        config.name = this.name
      }
      if(this.supplier !==''){
        config.supplier = this.supplier
      }
      if(this.operator !==''){
        config.operator = this.operator
      }

      console.log(config)
      getSaleDetail(config).then(res => {
        console.log(res.result)
        this.resultList = res.result
      })
    },
    submit(){
      this.getSelectedDetail()
    }
  }
}
</script>

<style lang="scss" scoped>
.body {
  margin: 10px auto 0;
  height: 80vh;
  overflow-y: auto;
  width: 100%;
  background: rgba($color: #fff, $alpha: 0.5);
}

.filter{
  background: rgba(255,255,255,0.5);
  padding: 10px 50px;
  line-height: 20px;
  flex-direction: column;
}

.filter .line-item{
  position: relative;
  margin-top: 10px;
  margin-bottom: 10px;
  left: 0;
}
</style>