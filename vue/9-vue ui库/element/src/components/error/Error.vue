<template>
  <div class="content">
    <div class="searchBox">
      <SearchForm :searchData="searchData" :mode="tableMode" :isloading="isloading"></SearchForm>
    </div>
    <div class="tabContent" v-loading='isloading'>
      <el-tabs type="border-card" :value="tableMode" @tab-click="tabClick">
        <el-tab-pane label="实 时" name="now">
          <TableNow :tableData="tableData"></TableNow>
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="searchData.data.currentPageNow"
            :page-sizes="[10, 20, 50, 100]"
            :page-size="searchData.data.limit"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total">
          </el-pagination>
        </el-tab-pane>
        <el-tab-pane label="历 史" name="history">
          <TableHistory :tableData="tableData"></TableHistory>
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="searchData.data.currentPageNow"
            :page-sizes="[10, 20, 50, 100]"
            :page-size="searchData.data.limit"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total">
          </el-pagination>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
  import SearchForm from './SearchForm.vue'
  import TableNow from './tableNow.vue'
  import TableHistory from './tableHistory.vue'
  export default {
    data(){
      return{
        isloading:false,
        tableMode:'now',
        pagesize:10,
        total:0,
        searchData:{
          data:{
            errorcaseid:'',
            devicecode:'',
            errordevicename:'',
            errorcasetype:'',
            devicetypeid:'',
            devicesubtypeid:'',
            fireserviceorgid:'',
            userorgid:'',
            buildingid:'',
            errorrealtimestatus:'',
            dealwithuserid:'',
            isteststatus:'',
            effective_status:'',//有效状态
            errorcasestatus:'',//实时/历史
            casebegintime:'',
            casebegintimeend:'',
            timestatus:5,
            limit:10,
            start:'',
            currentPageNow:1
          }
        },
        tableData:[]
      }
    },
    created: function () {
      if(this.$route.query.caseid){
        this.tableMode='history';
        this.searchData.data.errorcaseid=this.$route.query.caseid;
      }
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
      TableNow,
      TableHistory
    },
    methods:{
      tabClick(scope){
        this.tableMode=scope.name;
        if(this.searchData.data.currentPageNow==1){
          this.search();
        }else{
          this.searchData.data.currentPageNow=1;
        }
      },
      search(){
        this.isloading=true;
        if(this.tableMode=='now'){
          this.searchData.data.errorcasestatus=0;
        }else{
          this.searchData.data.errorcasestatus=1;
        }
        this.searchData.data.start=this.searchData.data.limit*(this.searchData.data.currentPageNow-1);
        let _this=this;
        console.log(this.searchData.data);
        this.$http.get(_this.$lib.error.findErrorCase,_this.searchData.data)
          .then(function(res){
            _this.isloading=false;
            if(res.data.WSListReturn.success==false){
              _this.$msg({
                message: '获取数据失败',
                type: 'error'
              });
              return false;
            }
            let root=res.data.WSListReturn.root;
            _this.total=res.data.WSListReturn.totalProperty;
            _this.tableData=root;
          })
          .catch(function(err){
            _this.isloading=false;
            _this.$msg({
              message: '获取数据失败',
              type: 'error'
            });
          });
      },
      handleSizeChange(val) {
        this.searchData.data.limit=val;
        if(this.searchData.data.currentPageNow==1){
          this.search();
        }else{
          this.searchData.data.currentPageNow=1;
        }
      },
      handleCurrentChange(val) {
        if(this.searchData.data.currentPageNow==val){
          this.search();
        }else{
          this.searchData.data.currentPageNow=val;
        }
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
