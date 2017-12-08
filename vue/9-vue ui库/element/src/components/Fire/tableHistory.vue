<template>
  <div id="fireTableHistory">
    <el-table
      :data="tableData"
      border
      style="width: 100%"
    @row-click="alertWindow">
      <el-table-column
        prop="devicefirecaseid"
        label="火警编号">
      </el-table-column>
      <el-table-column
        prop="casebegintime"
        :formatter="time"
        label="火警发生时间">
      </el-table-column>
      <el-table-column
        prop="buildingname"
        label="所属建筑">
      </el-table-column>
      <el-table-column
        prop="firecasestatus"
        :formatter="caseStatus"
        label="处理状态"
        width="120">
      </el-table-column>
      <el-table-column
        prop="caseclosetime"
        :formatter="caseclosetime"
        label="关闭时间"
        width="120">
      </el-table-column>
      <el-table-column
        prop="isrealfire"
        :formatter="isrealfire"
        label="实警/误报"
        width="120">
      </el-table-column>
      <el-table-column
        prop="firerealtimestatus"
        :formatter="realtimeStatus"
        label="上报状态"
        width="120">
      </el-table-column>
      <el-table-column
        prop="isteststatus"
        :formatter="teststatus"
        label="模式"
        width="120">
      </el-table-column>
    </el-table>
    <el-dialog
      title="详细信息"
      :visible.sync="dialogVisible"
      width="50%">
      <p>火警编号：{{detailData.devicefirecaseid}}</p>
      <p>发生时间：{{detailData.casebegintime | date}}</p>
      <p>设备编码：{{detailData.devicecode}}</p>
      <p>设备系统：{{detailData.devicetype_name}}</p>
      <p>设备类别：{{detailData.devicesubtype_name}}</p>
      <p>设备名称：{{detailData.devicename}}</p>
      <p>所属建筑：{{detailData.buildingname}}</p>
      <p>社会单位：{{detailData.fireserviceorgname}}</p>
      <p>服务单位：{{detailData.userorgname}}</p>
      <p>处理时间：{{detailData.casedealwithtime | date}}</p>
      <p>处理状态：{{detailData.firecasestatus | firecasestatus}}</p>
      <p>处理人：{{detailData.dealwithusername}}</p>
      <p>当前上报状态：{{detailData.firerealtimestatus | firerealtimestatus}}</p>
      <p>实警/误报：{{detailData.isrealfire | isrealfire}}</p>
      <p>关闭时间：{{detailData.caseclosetime | date}}</p>
      <p>关闭人：{{detailData.closeusername}}</p>
      <p>模式：{{detailData.isteststatus | isteststatus}}</p>
      <p>备注：{{detailData.firedesc}}</p>
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
        devicefirecaseid:'',
      }
    },
    filters:{
      firecasestatus(val){
        if(val==0){
          return '已完成';
        } else if(val==2){
          return '待处理';
        } else if(val==3){
          return '待关闭';
        }
      },
      firerealtimestatus(statu){
        if(statu==0){
          return '已恢复';
        }else if(statu==2){
          return '未恢复';
        }
      },
      isteststatus(statu){
        if(statu==0){
          return '监管模式';
        }else if(statu==1){
          return '测试模式';
        }
      },
      isrealfire(statu){
        if(statu==0){
          return '误报';
        }else if(statu==1){
          return '实警';
        }
      }
    },
    methods: {
      time(row){
        let newDate=new Date(row.casebegintime);
        let d=newDate.format('yyyy-MM-dd');
        return d;
      },
      DealTime(row){
        let newDate=new Date(row.casedealwithtime);
        let d=newDate.format('yyyy-MM-dd');
        return d;
      },
      caseclosetime(row){
        let newDate=new Date(row.caseclosetime);
        let d=newDate.format('yyyy-MM-dd');
        return d;
      },
      caseStatus(row,column){
        let statu=row.firecasestatus;
        if(statu==0){
          return '已完成';
        } else if(statu==2){
          return '待处理';
        } else if(statu==3){
          return '待关闭';
        }
      },
      realtimeStatus(row){
        let statu=row.firerealtimestatus;
        if(statu==0){
          return '已恢复';
        }else if(statu==2){
          return '未恢复';
        }
      },
      isrealfire(row){
        let statu=row.isrealfire;
        if(statu==0){
          return '误报';
        }else if(statu==1){
          return '实警';
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
      alertWindow(row, event, column){
        this.detailData=row;
        this.dialogVisible=true;
      }
    }
  }
</script>
<style scoped>
  .el-dialog__body p{
    width: 100%;
    height: auto;
    word-wrap:break-word;
    word-break:break-all;
    overflow: hidden;
  }
</style>
