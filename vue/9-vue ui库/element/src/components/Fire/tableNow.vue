<template>
  <el-table
    :data="tableData"
    border
    style="width: 100%">
    <el-table-column
      fixed
      prop="date"
      label="火警编号"
      width="150">
    </el-table-column>
    <el-table-column
      prop="name"
      label="火警发生时间"
      width="120">
    </el-table-column>
    <el-table-column
      prop="province"
      label="设备编码"
      width="120">
    </el-table-column>
    <el-table-column
      prop="city"
      label="设备系统"
      width="120">
    </el-table-column>
    <el-table-column
      prop="address"
      label="设备类别"
      width="300">
    </el-table-column>
    <el-table-column
      prop="zip"
      label="设备名称"
      width="120">
    </el-table-column>
    <el-table-column
      prop="zip"
      label="所属建筑"
      width="120">
    </el-table-column>
    <el-table-column
      prop="zip"
      label="设备名称"
      width="120">
    </el-table-column>
    <el-table-column
      prop="zip"
      label="所属服务单位"
      width="120">
    </el-table-column>
    <el-table-column
      prop="zip"
      label="所属社会单位"
      width="120">
    </el-table-column>
    <el-table-column
      prop="zip"
      label="处理状态"
      width="120">
    </el-table-column>
    <el-table-column
      prop="zip"
      label="上报状态"
      width="120">
    </el-table-column>
    <el-table-column
      prop="zip"
      label="模式"
      width="120">
    </el-table-column>
    <el-table-column
      prop="zip"
      label="备注"
      width="120">
    </el-table-column>
    <el-table-column
      fixed="right"
      label="操作"
      width="100">
      <template slot-scope="scope">
        <el-button type="text" size="small">处理</el-button>
        <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>
<script>
  export default {
    methods: {
      handleClick(row) {
        console.log(row);
      }
    },

    data() {
      return {
        tableData: [{
          date: '2016-05-03',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }, {
          date: '2016-05-02',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }, {
          date: '2016-05-04',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }, {
          date: '2016-05-01',
          name: '王小虎',
          province: '上海',
          city: '普陀区',
          address: '上海市普陀区金沙江路 1518 弄',
          zip: 200333
        }]
      }
    }
  }
</script>
<style>

</style>
