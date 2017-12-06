<template>
  <div>
    <el-table
      :data="tableData"
      border
      style="width: 100%"
      :row-class-name="tableRowClassName"
    @row-click="alertWindow">
      <el-table-column
        fixed
        prop="devicefirecaseid"
        label="火警编号"
        width="150">
      </el-table-column>
      <el-table-column
        prop="casebegintime"
        :formatter="time"
        label="火警发生时间"
        width="120">
      </el-table-column>
      <el-table-column
        prop="devicecode"
        label="设备编码"
        width="120">
      </el-table-column>
      <el-table-column
        prop="devicetype_name"
        label="设备系统"
        width="120">
      </el-table-column>
      <el-table-column
        prop="devicesubtype_name"
        label="设备类别"
        width="300">
      </el-table-column>
      <el-table-column
        prop="devicename"
        label="设备名称"
        width="120">
      </el-table-column>
      <el-table-column
        prop="buildingname"
        label="所属建筑"
        width="120">
      </el-table-column>
      <el-table-column
        prop="fireserviceorgname"
        label="设备名称"
        width="120">
      </el-table-column>
      <el-table-column
        prop="userorgname"
        label="所属服务单位"
        width="120">
      </el-table-column>
      <el-table-column
        prop="userorgname"
        label="所属社会单位"
        width="120">
      </el-table-column>
      <el-table-column
        prop="casedealwithtime"
        :formatter="DealTime"
        label="处理时间"
        width="120">
      </el-table-column>
      <el-table-column
        prop="firecasestatus"
        :formatter="caseStatus"
        label="处理状态"
        width="120">
      </el-table-column>
      <el-table-column
        prop="dealwithusername"
        label="处理人"
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
      <el-table-column
        prop="firedesc"
        label="备注"
        width="120">
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="100">
        <template slot-scope="scope">
          <el-button type="text" v-show="scope.row.firecasestatus!=0" size="small">处理</el-button>
          <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      title="详细信息"
      :visible.sync="dialogVisible"
      width="30%">
      <p>火警编号：{{devicefirecaseid}}</p>
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
        devicefirecaseid:'',
      }
    },
    methods: {
      tableRowClassName({row, rowIndex}){
        if(row.firecasestatus!=0){
          return 'fire-red'
        }
      },
      time(val){
        let newDate=new Date(val.casebegintime);
        let d=newDate.format('yyyy-MM-dd');
        return d;
      },
      DealTime(val){
        let newDate=new Date(val.casedealwithtime);
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
      teststatus(row){
        let statu=row.isteststatus;
        if(statu==0){
          return '监管模式';
        }else if(statu==1){
          return '测试模式';
        }
      },
      alertWindow(row, event, column){
        this.devicefirecaseid=row.devicefirecaseid;
        this.dialogVisible=true;
      },
      handleClick(scope,row) {
        console.log(scope,row);
      }
    }
  }
</script>
<style scoped>

</style>
