<template>
  <div id="fireTableNow">
    <el-table
      :data="tableData"
      border
      style="width: 100%"
      :row-class-name="tableRowClassName"
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
        label="操作"
        width="120">
        <template slot-scope="scope">
          <el-button type="text" @click.stop="dealFire(scope.row)" v-show="scope.row.firecasestatus!=0" size="small">处理</el-button>
          <el-button @click.stop="handleClick(scope.row)" type="text" size="small">查看</el-button>
        </template>
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
      <p>模式：{{detailData.isteststatus | isteststatus}}</p>
      <p>备注：{{detailData.firedesc}}</p>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">关 闭</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="处理火警"
      :visible.sync="dealFireWin"
      width="30%">
      <p style="text-align: center">
        <el-radio v-model="isrealfire" label="1">实警</el-radio>
        <el-radio v-model="isrealfire" label="0">误报</el-radio>
      </p>
      <p><i class="red">*</i>说明(300字以内)：</p>
      <p>
        <el-input
          type="textarea"
          :rows="4"
          :maxlength=300
          placeholder="请输入内容"
          v-model="textarea">
        </el-input>
      </p>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitDealFire">提 交</el-button>
        <el-button @click="closeDealFireWin">关 闭</el-button>
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
        dealFireWin:false,
        isrealfire:"1",
        dealFireCaseId:'',
        textarea:''
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
        this.detailData=row;
        this.dialogVisible=true;
      },
      handleClick(scope) {
        console.log(row);
      },
      dealFire(scope){
        this.dealFireCaseId=scope.devicefirecaseid
        this.dealFireWin=true;
      },
      submitDealFire(){
        if(this.textarea==''){
          this.$msg({
            message: '请输入说明',
            type: 'warning'
          });
          return false;
        }
        this.dealFireWin=false;
        this.isrealfire="1";
        this.dealFireCaseId='';
        this.textarea='';
      },
      closeDealFireWin(){
        this.dealFireWin=false;
        this.isrealfire="1";
        this.dealFireCaseId='';
        this.textarea='';
      }
    }
  }
</script>
<style scoped>
.red{
  font-style: normal;
  color: red;
}
.el-dialog__body p{
  width: 100%;
  height: auto;
  word-wrap:break-word;
  word-break:break-all;
  overflow: hidden;
}
</style>
