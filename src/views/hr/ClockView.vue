<template>
    <Layout>
      <Title title="员工打卡管理"></Title>
      <el-select v-model="employee">
        <el-option
          v-for="it in employeeList"
          :label="it.employeeName"
          :key="it.employeeId"
          :value="it.employeeName"></el-option>
      </el-select>
      <el-button type="primary" @click="showClock">查询</el-button>
      <div style="margin-top: 10px">
        <el-table
            :data="clockList"
            stripe
            style="width: 100%"
            :header-cell-style="{'text-align':'center'}"
            :cell-style="{'text-align':'center'}">
          <el-table-column
              prop="employeeName"
              label="员工姓名"
              width="70">
          </el-table-column>
          <el-table-column
              prop="clockTimes"
              label="已打卡次数"
              width="100">
          </el-table-column>
          <el-table-column
              prop="absenceTimes"
              label="缺勤次数"
              width="200">
          </el-table-column>
          <el-table-column
              prop="lastClockTime"
              label="上次打卡时间"
              width="150">
          </el-table-column>
          <el-table-column
              prop="time"
              label="打卡月份"
              width="150">
          </el-table-column>
        </el-table>
      </div>
  </layout>
</template>

<script>
import Layout from "@/components/content/Layout";
import Title from "@/components/content/Title";
import {getAllEmployee} from "@/network/hr";
import {getClock} from "@/network/hr";

export default {
  name: "ClockView",
  components: {Title,Layout},
  data(){
    return{
      employeeList: [],
      employee:'',
      clockList:[],
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
  methods:{
    showClock(){
      getClock({params:{
          employName:this.employee
        }
      }).then(res => {
        this.clockList = res.result.map(item =>{
          console.log(item)
          item.time = item.yearAndMonth.substr(0,4)+"年"+item.yearAndMonth.substr(4)+'月'
          return item
        })
      }).catch(err =>{
        console.log(err)
      })
    }
  },
  computed:{
  }
}
</script>

<style scoped>

</style>