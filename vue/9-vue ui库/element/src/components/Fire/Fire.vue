<template>
  <div class="content" v-loading='isloading'>
    <div class="searchBox">
      <SearchFormNow></SearchFormNow>
    </div>
    <div class="tabContent">
      <el-tabs type="border-card" :value="tableMode">
        <el-tab-pane label="实 时" name="now">
          <TableNow></TableNow>
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPageNow"
            :page-sizes="[100, 200, 300, 400]"
            :page-size="100"
            layout="total, sizes, prev, pager, next, jumper"
            :total="400">
          </el-pagination>
        </el-tab-pane>
        <el-tab-pane label="历 史" name="history">历史状态</el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
  import SearchFormNow from './SearchFormNow.vue'
  import TableNow from './tableNow.vue'
  export default {
    data(){
      return{
        isloading:false,
        tableMode:'now',
        currentPageNow: 4
      }
    },
    components:{
      SearchFormNow,
      TableNow
    },
    methods:{
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      }
    }
  }
</script>
<style scoped>
.searchBox{
  padding: 10px;
}
.tabContent{
  padding: 10px;
}
.el-pagination{
  text-align: center;
}
</style>
