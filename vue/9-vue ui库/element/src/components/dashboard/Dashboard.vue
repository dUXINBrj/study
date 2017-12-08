<template>
    <div class="content" v-loading='loading'>
      <div class="sidebar">
        <div class="treeTool">
          <el-input placeholder="输入关键字进行过滤" v-model="filterText"></el-input>
        </div>
        <div class="treeBox">
          <el-tree
            @node-click="getCurrentNode"
            :data="data4"
            :props="defaultProps"
            node-key="id"
            :default-expand-all='false'
            :expand-on-click-node="true"
            :filter-node-method="filterNode"
            ref="tree2"
            :highlight-current="true"
            :render-content="renderContent">
          </el-tree>
        </div>
      </div>
      <div class="dashContent">
        <el-row :gutter="10">
            <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
              <DashPie :pieData="dashPieData"></DashPie>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
              <DashTable :tableData="dashTableData"></DashTable>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
              <DashLine :lineDeviceData="dashLineDeviceData" :deviceCode="deviceCode"></DashLine>
            </el-col>
            <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
              <DashMap :buildingInfo="dashBuildingInfo"></DashMap>
            </el-col>
          </el-row>
      </div>
    </div>
</template>

<script>
import RedCircle from '../circle/RedCircle.vue';
import OrangeCircle from '../circle/OrangeCircle.vue';
import YellowCircle from '../circle/YellowCircle.vue';
import GreyCircle from '../circle/GreyCircle.vue';
import DashMap from './DashMap.vue';
import DashPie from './DashPie.vue';
import DashLine from './DashLine.vue';
import DashTable from './DashTable.vue';

export default {
  name: "dashboard",
  created(){
    this.loading=true;
    let _this=this;
    this.$http.get(_this.$lib.dashBoard.getTree)
    .then(function(res){
      _this.loading=false;
      if(res.data.success==false){
        _this.$msg({
          message: '获取数据失败',
          type: 'error'
        });
        return false;
      }
      let treeArr=new Array;
      let getTreeArr=res.data.treeNodeList;
      getTreeArr.forEach((element,index) => {
        let { text: label, id ,fire='',warn='',error='',offline=''} = element;
        treeArr[index]={
          label,
          id,
          fire,
          warn,
          error,
          offline
        }
      });
      _this.data4=treeArr;
      setTimeout(function () { //加载完树形节点后 默认选中第一个
        let dom = _this.$refs.tree2;
        dom.$el.children[0].click();
      },500)
    })
    .catch(function(err){
      _this.loading=false;
      _this.$msg({
        message: '获取数据失败',
        type: 'error'
      });
    });
  },
  data() {
    return {
      loading:true,
      filterText: '',
      dashLineDeviceData:{},
      deviceCode:'',//传给折线图组件的设备code 用于选默认值
      dashPieData:{},
      dashTableData:{},
      dashBuildingInfo:'',
      data4: [],
      defaultProps: {
        children: 'children',
        label: 'label'
      }
    }
  },
  components:{
    RedCircle,
    OrangeCircle,
    YellowCircle,
    GreyCircle,
    DashMap,
    DashPie,
    DashLine,
    DashTable
  },
  methods:{
    renderContent(h, { node, data, store }) {
        return(
          <span style="flex: 1; display: flex; align-items: center; justify-content: space-between; font-size: 14px; padding-right: 8px;">
        <span>
        <span>{node.label}</span>
      </span>
      <span>
      <RedCircle v-show={data.fire} caseNum={data.fire}></RedCircle>
      <OrangeCircle v-show={data.warn} caseNum={data.warn}></OrangeCircle>
      <YellowCircle v-show={data.error} caseNum={data.error}></YellowCircle>
      <GreyCircle v-show={data.offline} caseNum={data.offline}></GreyCircle>
      </span>
      </span>
        )
    },
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
    getCurrentNode(data){
      if(data){
        if(data.id){
          this.loading=true;
          let _this=this;
          this.$http.all([
            this.$http.get(_this.$lib.dashBoard.getPie,{buildingid:data.id}),
            this.$http.get(_this.$lib.dashBoard.getTable,{buildingid:data.id}),
            this.$http.get(_this.$lib.dashBoard.getLineDevice,{buildingid:data.id}),
            this.$http.get(_this.$lib.dashBoard.getBuildingInfo,{buildingid:data.id})
          ])
          .then(this.$http.spread(function (pie, table,lineDevice,building) {
            _this.loading=false;
            _this.dashPieData=pie.data.stringReturn.reObject;
            _this.dashTableData=table.data.stringReturn.reObject;
            _this.dashLineDeviceData=lineDevice.data.stringReturn.reObject;
            _this.dashBuildingInfo=building.data.WSListReturn.root;
          }))
          .catch(this.$http.spread(function () {
            _this.loading=false;
            _this.$msg({
              message: '获取数据失败',
              type: 'error'
            });
          }));
        }
      }
    }
  },
  watch: {
    filterText(val) {
      this.$refs.tree2.filter(val);
    },
    dashLineDeviceData:{
      handler(options){
        if(options!=0){
          this.deviceCode=options[0].devicecode;
        }
      },
      deep:true
    }
  },
};
</script>

<style scoped>
.dashContent{
    background: none repeat scroll 0 0 #e0e0e0;
    position: absolute;
    left: 250px;
    right: 0;
    top: 0;
    bottom:0;
    width: auto;
    padding:20px;
    box-sizing: border-box;
    overflow-y: auto;
}
.sidebar{
    display: block;
    position: absolute;
    width: 250px;
    left: 0;
    top: 0;
    bottom:0;
    background: #324157;
    color: #333;
    overflow-y: auto;
}
.el-main{
  background: #e0e0e0;
  padding: 10px;
}
.el-row{
  height: 100%;
}
.el-col{
  margin-bottom: 10px;
  height: 48%;
  min-height: 200px;
}
.treeTool{
  /*height: 10%;*/
  min-height:40px;
  margin: 10px;
}
.treeBox{
  /*height: 90%;*/
  /*overflow-y: auto;*/
}
</style>
