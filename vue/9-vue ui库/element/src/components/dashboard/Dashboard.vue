<template>
    <div id="dashboard" v-loading='loading'>
        <el-container>
            <el-aside width="250px">
              <el-input placeholder="输入关键字进行过滤" v-model="filterText"></el-input>
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
            </el-aside>
            <el-main>
              <el-row :gutter="10">
                  <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                    <DashPie></DashPie>
                  </el-col>
                  <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                    <DashTable></DashTable>                    
                  </el-col>
                  <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
                    <DashLine></DashLine>
                  </el-col>
                  <el-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">                  
                    <DashMap></DashMap> 
                  </el-col>
                </el-row>
            </el-main>
        </el-container>
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
    this.$http.get('http://localhost:8086/static/store/tree.json')
    .then(function(res){
      _this.loading=false;
      if(res.data.success==false){
        toastr.error("获取数据失败","提示");
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
    })
    .catch(function(err){
      _this.loading=false;
      toastr.error("网络请求失败","提示");      
    });
  },
  data() {
    return {
      loading:true,
      filterText: '',
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
        // console.log(data);
      }
    }
  },
    watch: {
    filterText(val) {
      this.$refs.tree2.filter(val);
    }
  },
};
</script>

<style scoped>
#dashboard {
  height: 100%;
}
.el-container{
  height: 100%;
}
.el-aside {
    background-color: #324157;
    color: #333;
}
.el-main{
  background: #e0e0e0;
}
.el-row{
  height: 100%;
}
.el-col{
  margin-bottom: 10px;
  height: 48%;
  min-height: 200px;
}
</style>
