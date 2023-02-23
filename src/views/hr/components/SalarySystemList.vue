<template>
  <div class="card">
    <el-card v-for="(item, index) in list" :index="item.index" :key="item.id" shadow="hover">
      <template #header>
        <el-row>
          <el-col :span="18">
            <span><strong>岗位名称: </strong>{{item.stationName}}</span>
            <el-button v-if="authorization() === 1" style="margin-left: 10px"
                       type="success" icon="el-icon-check" circle size="mini" @click="approval(item)"></el-button>
            <el-button v-if="authorization() === 1"
                       type="danger" icon="el-icon-close" circle size="mini" @click="deny(item)"></el-button>
            <el-button v-if="authorization() === 2" style="margin-left: 10px"
                       type="primary" icon="el-icon-check" circle size="mini" @click="approval(item)"></el-button>
            <el-button v-if="authorization() === 2"
                       type="danger" icon="el-icon-close" circle size="mini" @click="deny(item)"></el-button>
            <span style="margin-left: 10px">
              <el-tag v-if="type === 3" effect="dark" type='success'>审核通过</el-tag>
              <el-tag v-if="type === 4" effect="dark" type='danger'>审核未通过</el-tag>
            </span>
          </el-col>
        </el-row>
      </template>
      <div>
        <el-row>
          <el-col :span="3">
            <span><strong>岗位级别: </strong>{{item.stationLevel}}</span>
          </el-col>
          <el-col :span="3">
            <span><strong>基本工资: </strong>{{item.basisSalary}}</span>
          </el-col>
          <el-col :span="3">
            <span><strong>岗位工资: </strong>{{item.stationSalary}}</span>
          </el-col>
          <el-col :span="6">
            <span><strong>薪资计算方式: </strong>{{item.salaryCalculationType}}</span>
          </el-col>
          <el-col :span="6">
            <span><strong>薪资发放方式: </strong>{{item.payMethod}}</span>
          </el-col>
          <el-col :span="6">
            <span><strong>纳税种类: </strong>{{item.taxType}}</span>
          </el-col>
        </el-row>
      </div>
    </el-card>

  </div>


</template>

<script>
import {firstApproval, secondApproval} from '@/network/hr'


export default {
  name: 'SalarySystemList',
  props: {
    list: Array,
    type: Number
  },
  data() {
    return {
    }
  },
  mounted() {

  },
  methods: {
    authorization() {
      if(this.type === 10){
        return 10
      }
      if (this.type === 1 && sessionStorage.getItem('role') === 'HR') {
        return 1
      } else if (this.type === 2 && sessionStorage.getItem('role') === 'GM') {
        return 2
      }
    },
    approval(item) {
      let config = {
        params: {
          name: item.stationName,
          level: Number(item.stationLevel),
          state: this.type === 1 ? 'PENDING_LEVEL_2' : 'SUCCESS'
        }
      }
      console.log(config)
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
    deny(item) {
      let config = {
        params: {
          name: item.stationName,
          level: Number(item.stationLevel),
          state: 'FAILURE',
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