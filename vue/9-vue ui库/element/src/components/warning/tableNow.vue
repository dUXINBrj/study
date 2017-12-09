<template>
  <div id="fireTableNow">
    <el-table
      :data="tableData"
      border
      style="width: 100%"
    @row-click="alertWindow">
      <el-table-column
        fixed
        prop="devicewarningcaseid"
        label="告警编号">
      </el-table-column>
      <el-table-column
        prop="buildingname"
        label="所属建筑">
      </el-table-column>
      <el-table-column
        prop="casebegintime"
        :formatter="time"
        label="告警发生时间">
      </el-table-column>
      <el-table-column
        prop="isteststatus"
        :formatter="teststatus"
        label="模式">
      </el-table-column>
      <el-table-column
        prop="mainattribute"
        label="主属性">
      </el-table-column>
      <el-table-column
        label="操作">
        <template slot-scope="scope">
          <el-button
            type="text"
            @click.stop="openEcharts(scope.row)"
            size="small">数据图</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      title="详细信息"
      :visible.sync="dialogVisible"
      width="50%">
      <p>告警编号：{{detailData.devicewarningcaseid}}</p>
      <p>设备编码：{{detailData.warningdeviceid}}</p>
      <p>设备系统：{{detailData.devicetype_name}}</p>
      <p>设备类别：{{detailData.devicesubtype_name}}</p>
      <p>设备名称：{{detailData.devicename}}</p>
      <p>所属建筑：{{detailData.buildingname}}</p>
      <p>社会单位：{{detailData.fireserviceorgname}}</p>
      <p>服务单位：{{detailData.userorgname}}</p>
      <p>模式：{{detailData.isteststatus | isteststatus}}</p>
      <p>告警发生时间：{{detailData.casebegintime | time}}</p>
      <p>主属性：{{detailData.mainattribute}}</p>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">关 闭</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="数据图"
      :visible.sync="showEcharts"
      @close="closeEcharts"
      width="50%">
      <div id="warnNowEchartsBox">
        <WarnLine v-if="!destroyCharts" :deviceCode="EchartsDeviceCode"></WarnLine>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="showEcharts = false">关 闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
  import WarnLine from './WarnLine.vue'
  export default {
    props:['tableData'],
    data(){
      return{
        dialogVisible:false,
        showEcharts:false,
        detailData:'',
        destroyCharts:true,
        EchartsDeviceCode:''
      }
    },
    components:{
      WarnLine
    },
    filters:{
      isteststatus(statu){
        if(statu==0){
          return '监管模式';
        }else if(statu==1){
          return '测试模式';
        }
      }
    },
    methods: {
      time(val){
        let newDate=new Date(val.casebegintime);
        let d=newDate.format('yyyy-MM-dd hh:mm:ss');
        return d;
      },
      teststatus(row){
        let statu=row.isteststatus;
        if(statu==0){
          return '监管模式';
        }else if(statu==1){
          return '测试模式';
        }
      },
      errorcasestatus(row){
        let statu=row.errorcasestatus;
        if(statu==0){
          return '关闭';
        }else if(statu==1){
          return '开启';
        }
      },
      alertWindow(row, event, column){
        this.detailData=row;
        this.dialogVisible=true;
      },
      openEcharts(scope){
        this.EchartsDeviceCode=scope.devicecode;
        this.destroyCharts=false;
        this.showEcharts=true;
      },
      closeEcharts(){
        this.showEcharts = false;
        this.destroyCharts=true;
      }
    }
  }
</script>
<style scoped>
  .red{
    font-style: normal;
    color: red;
  }
  #warnNowEchartsBox{
    width: 100%;
    height: 300px;
  }
</style>
