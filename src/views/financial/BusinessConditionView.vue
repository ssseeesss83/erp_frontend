<template>
  <layout>
    <Title title="经营情况查看"></Title>
    <div class="filter">
      <div style="flex-direction: row;width: 100%;margin: 10px 10px;">
        <span >选择经营年月: </span>
        <el-select v-model="year">
          <el-option v-for="it in years"
                     :key = "it"
                     :label = "it"
                     :value="it">
          </el-option>
        </el-select>
        <el-select v-model="month">
          <el-option v-for="it in months"
                     :key = "it"
                     :label = "it"
                     :value="it">
          </el-option>
        </el-select>
        <el-button style="width: 20%" type="primary" @click="show">查询</el-button>
        <el-button type="primary" size="medium" @click="exportExcel" style="left: 0;bottom: 0;position: relative">导出</el-button>
      </div>

    </div>

    <div class="top">
      <div style="height: 30%">
        <pie-chart :chart-data="inAndOutData" v-if="getData!==''"></pie-chart>
      </div>
      <div style="position: relative;left: 35%;">
        <div style="width: 30%;">
          <div class="line-item">
            <span>理论收入: </span>
            <span>{{this.getData.rawIncome}}</span>
          </div>
          <div class="line-item">
            <span>折让总额: </span>
            <span>{{this.getData.allowance}}</span>
          </div>
          <div class="line-item">
            <span>实际收入: </span>
            <span>{{this.getData.finalIncome}}</span>
          </div>
        </div>
      <div style="width: 30%;">
        <div class="line-item">
          <span>商品支出: </span>
          <span>{{this.getData.productTotalCost}}</span>
        </div>
        <div class="line-item">
          <span>人力支出: </span>
          <span>{{this.getData.employeeTotalCost}}</span>
        </div>
        <div class="line-item">
          <span>实际支出: </span>
          <span>{{this.getData.cost}}</span>
        </div>
        <div class="line-item">
          <span>利润: </span>
          <span>{{this.getData.profits}}</span>
        </div>
      </div>
      </div>
    </div>
  </layout>
</template>

<script>
import Title from "@/components/content/Title";
import Layout from "@/components/content/Layout";
import PieChart from "@/views/financial/components/PieChart";
import {exportBCExcel, getBusinessCondition} from "@/network/financial";

export default {
  name: "BusinessCondition",
  components: {PieChart, Layout,Title},
  data(){
    return{
      getData:'',
      //
      // rawIncome:0,
      // allowance:0,
      // finalIncome:0,
      // productTotalCost:0,
      // employeeTotalCost:0,
      // cost:0,
      // profits:0,

      years:[],
      months:[1,2,3,4,5,6,7,8,9,10,11,12],

      year:0,
      month:0,
    }
  },
  mounted() {
    let date = new Date()
    this.years=[date.getFullYear()-2,date.getFullYear()-1,date.getFullYear()]
  },
  methods:{
    exportExcel(){
      exportBCExcel({data:{
        start:this.year+'-'+ ((this.month+'').length===1?'0'+this.month:this.month) +'-01',
          end:this.year+'-'+((this.month+'').length===1?'0'+this.month:this.month)+'-31',
        },fileName:'经营情况.xlsx'})
    },
    show(){
      this.getData = ''
      let config = {
        params:{
          year:Number(this.year),
          month:Number(this.month),
        }
      }
      getBusinessCondition(config).then(res =>{
        this.getData=res.result;
        console.log(res.result)
      })
    },
  },
  computed:{
    inAndOutData(){
      return[{value:this.getData.finalIncome, name:'总收入'},{value:this.getData.cost, name:'总支出'}]
    },
    outData(){
      return[{value:this.getData.productTotalCost, name:'商品支出'},{value:this.getData.employeeTotalCost, name:'人力支出'}]
    },
  }
}
</script>

<style scoped>
.filter{
  width: 100%;
  flex-direction: row;
  font-size: 1.5rem;
  padding: 10px 10px;
  border-radius: 0.8rem;
}

.top{
  position: relative;
  justify-content: center;
  align-items: center;
  display: block;
  font-size: 1.5rem;
  padding: 10px 10px;
  line-height: 2rem;
  border-radius: 0.8rem;
}

.top .line-item{
  margin-top: 10px;
  margin-bottom: 10px;
  display: block;
  padding: 10px 10px;
  background: rgba(255,255,255,0.5);
  border-radius: 0.8rem;
}
</style>