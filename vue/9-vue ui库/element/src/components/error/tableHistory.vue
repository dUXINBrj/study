<template>
  <div id="fireTableNow">
    <el-table
      :data="tableData"
      border
      style="width: 100%"
      @row-click="alertWindow">
      <el-table-column
        fixed
        prop="errorcaseid"
        label="故障编号">
      </el-table-column>
      <el-table-column
        prop="buildingname"
        label="所属建筑">
      </el-table-column>
      <el-table-column
        prop="casebegintime"
        :formatter="time"
        label="故障发生时间">
      </el-table-column>
      <el-table-column
        prop="errorrealtimestatus"
        :formatter="realtimeStatus"
        label="上报状态">
      </el-table-column>
      <el-table-column
        prop="isteststatus"
        :formatter="teststatus"
        label="模式">
      </el-table-column>
    </el-table>
    <el-dialog
      title="详细信息"
      :visible.sync="dialogVisible"
      width="50%">
      <p>故障编号：{{detailData.errorcaseid}}</p>
      <p>故障类型：{{detailData.errorcasetype | errorcasetype}}</p>
      <p>设备编码：{{detailData.devicecode}}</p>
      <p>设备系统：{{detailData.devicetype_name}}</p>
      <p>设备类别：{{detailData.devicesubtypename}}</p>
      <p>设备名称：{{detailData.errordevicename}}</p>
      <p>所属建筑：{{detailData.buildingname}}</p>
      <p>社会单位：{{detailData.fireserviceorgname}}</p>
      <p>服务单位：{{detailData.userorgname}}</p>
      <p>模式：{{detailData.isteststatus | isteststatus}}</p>
      <p>故障发生时间：{{detailData.casebegintime | date}}</p>
      <p>故障关闭时间：{{detailData.caseendtime | date}}</p>
      <p>关闭人：{{detailData.dealwithusername}}</p>
      <p>当前上报状态：{{detailData.errorrealtimestatus | errorrealtimestatus}}</p>
      <p>故障状态：{{detailData.errorcasestatus | errorcasestatus}}</p>
      <p>模式：{{detailData.isteststatus | isteststatus}}</p>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">关 闭</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
  export default {
    props:['tableData'],
    data(){
      return{
        dialogVisible:false,
        detailData:'',
        CloseCaseId:'',
      }
    },
    filters:{
      errorcasestatus(val){
        if(val==0){
          return '关闭';
        } else if(val==1){
          return '开启';
        } else if(val==null){
          return ' ';
        }
      },
      errorcasetype(val){
        if(val==1){
          return '设备故障';
        } else if(val==2){
          return '主机故障';
        }
      },
      errorrealtimestatus(statu){
        if(statu==0){
          return '已恢复';
        }else if(statu==1){
          return '未恢复';
        }
      },
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
        let d=newDate.format('yyyy-MM-dd');
        return d;
      },
      realtimeStatus(row){
        let statu=row.errorrealtimestatus;
        if(statu==0){
          return '已恢复';
        }else if(statu==1){
          return '未恢复';
        }
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
      }
    }
  }
</script>
<style scoped>
  .red{
    font-style: normal;
    color: red;
  }
</style>
