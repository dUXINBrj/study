<template>
  <div class="content" v-loading='isloading'>
    <div class="searchBox">
      <SearchForm :searchData="searchData" :mode="tableMode"></SearchForm>
    </div>
    <div class="tabContent">
      <el-tabs type="border-card" :value="tableMode" @tab-click="tabClick">
        <el-tab-pane label="实 时" name="now">
          <TableNow :tableData="tableData"></TableNow>
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
  import SearchForm from './SearchForm.vue'
  import TableNow from './tableNow.vue'
  export default {
    data(){
      return{
        isloading:false,
        tableMode:'now',
        currentPageNow: 4,
        searchData:{
          data:{
            firecaseid:'',
            devicecode:'',
            devicename:'',
            firecasestatus:'',
            fireserviceorgid:'',
            userorgid:'',
            buildingid:'',
            isteststatus:'',
            dealwithuserid:'',
            devicetypeid:'',
            devicesubtypeid:'',
            firerealtimestatus:'',
            closeuserid:'',
            isrealfire:'',
            casebegintime:'',
            casebegintimeend:''
          }
        },
        tableData:[]
      }
    },
    created: function () {
      Event.$on('search',function (val) {
        this.search();
      }.bind(this));
      this.search();
    },
    beforeDestroy: function () {
      Event.$off('search')
    },
    components:{
      SearchForm,
      TableNow
    },
    methods:{
      tabClick(scope){
        this.tableMode=scope.name;
      },
      search(){
        if(this.tableMode=='now'){
          this.searchData.data.device_list_type=0;
        }else{
          this.searchData.data.device_list_type=1;
        }
        let _this=this;
        this.$http.get(_this.$lib.fire.findDeviceFireCasePage,_this.searchData.data)
          .then(function(res){
            if(res.data.WSListReturn.success==false){
              _this.$msg({
                message: '获取数据失败',
                type: 'error'
              });
              return false;
            }
            let root=res.data.WSListReturn.root;
            _this.tableData=root;
          })
          .catch(function(err){
            _this.$msg({
              message: '获取数据失败',
              type: 'error'
            });
          });
      },
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
.content{
  overflow-y: auto;
}
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
