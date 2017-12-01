<template>
  <div class="content" v-loading='isloading'>
    <div class="sidebar">
      <div class="treeTool">
        <el-input placeholder="输入关键字进行过滤" v-model="filterText"></el-input>
        <div class="btnGroup">
          <el-button type="primary" icon="el-icon-caret-bottom" size="mini">展开</el-button>
          <el-button type="primary" icon="el-icon-caret-top" size="mini">收起</el-button>
          <el-button @click="treeBuilding" :loading="treeBuildingBtnLoading" type="primary" icon="el-icon-view" size="mini">建筑</el-button>
        </div>
      </div>
      <div class="treeBox">
        <el-tree
          @node-click="getCurrentNode"
          :data="buildingTree"
          :props="defaultProps"
          node-key="id"
          :default-expand-all='false'
          :expand-on-click-node="true"
          :filter-node-method="filterNode"
          ref="buildingTree"
          :highlight-current="true"
          :render-content="renderContent">
        </el-tree>
      </div>
    </div>
    <div class="level1Content">
      <baidu-map class="bm-view"
                 :dragging="true"
                 :double-click-zoom="false"
                 :center="mapCenter"
                 :map-click="false"
                 :zoom="15"
                 :keyboard="false"
                 :max-zoom="20"
                 :min-zoom="10"
                 :scroll-wheel-zoom="true"
                 :pinch-to-zoom="false"
                 @ready="handler">
        <bm-map-type :map-types="['BMAP_NORMAL_MAP', 'BMAP_SATELLITE_MAP']" anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-map-type>
        <bm-marker v-if="showMarker" :position="mapCenter" :dragging="false" animation="BMAP_ANIMATION_BOUNCE" :icon="iconOpt"></bm-marker>
        <bm-control>
          <div class="mapCheckGroup">
            <el-checkbox v-model="fireCheck">火警<span class="red"></span></el-checkbox>
          <el-checkbox v-model="warnCheck">告警<span class="orange"></span></el-checkbox>
          <el-checkbox v-model="errorCheck">故障<span class="yellow"></span></el-checkbox>
          <el-checkbox v-model="offlineCheck">离线<span class="grey"></span></el-checkbox>
          <el-checkbox v-model="normalCheck">正常<span class="green"></span></el-checkbox>
          </div>
        </bm-control>
      </baidu-map>
    </div>
  </div>
</template>

<script>
  import RedCircle from '../circle/RedCircle.vue';
  import OrangeCircle from '../circle/OrangeCircle.vue';
  import YellowCircle from '../circle/YellowCircle.vue';
  import GreyCircle from '../circle/GreyCircle.vue';
    export default {
      data(){
        return{
          isloading:false,
          defaultProps: {
            children: 'children',
            label: 'label'
          },
          filterText:'',
          treeBuildingBtnLoading:false,
          buildingTree:[],
          isAllBuilding:'',//用于判断是否为只看建筑模式
          fireCheck:true,
          warnCheck:true,
          errorCheck:true,
          offlineCheck:true,
          normalCheck:true,
          mapCenter:{
            lng: 116.404,
            lat: 39.915
          },
          showMarker:false,
          iconOpt:{
            url: '',
            size: {width: 32, height: 32}
          }
        }
      },
      created(){
        this.getTreeBuilding();
      },
      methods:{
        filterNode(value, data) {
          if (!value) return true;
          return data.label.indexOf(value) !== -1;
        },
        getTreeBuilding(){
          this.treeBuildingBtnLoading=true;
          this.isloading=true;
          let _this=this;
          this.$http.get(_this.$lib.dashBoard.getTree)
            .then(function(res){
              _this.isloading=false;
              _this.treeBuildingBtnLoading=false;
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
              _this.buildingTree=treeArr;
            })
            .catch(function(err){
              _this.isloading=false;
              _this.treeBuildingBtnLoading=false;
              toastr.error("网络请求失败","提示");
            });
        },
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
        treeBuilding(){
          this.getTreeBuilding();
        },
        getCurrentNode(data){

        },
        handler({BMap, map}){
          //地图加载完成 callback
          console.log(BMap, map);
        }
      },
      watch:{
        filterText(val) {
          this.$refs.buildingTree.filter(val);
        },
      }
    }
</script>

<style scoped>
  .sidebar{
    display: block;
    position: absolute;
    width: 290px;
    left: 0;
    top: 0;
    bottom:0;
    background: #324157;
    color: #333;
    overflow-y: auto;
  }
  .level1Content{
    background: none repeat scroll 0 0 #e0e0e0;
    position: absolute;
    left: 290px;
    right: 0;
    top: 0;
    bottom:0;
    width: auto;
    padding:0;
    box-sizing: border-box;
    overflow-y: auto;
  }
  .treeTool{
    height:90px;
    padding: 10px;
  }
  .treeBox{
    height: auto;
    overflow-y: auto;
  }
  .btnGroup{
    text-align: center;
    margin-top: 10px;
  }
  .bm-view{
    height: 100%;
    width: 100%;
  }
  .mapCheckGroup{
    background: rgba(255,255,255,0.7);
    border-radius: 3px;
    padding: 5px;
    margin-left: 10px;
    margin-top: 10px;
  }
  .mapCheckGroup .el-checkbox__label span{
    display: inline-block;
    width: 14px;
    height: 14px;
    border-radius: 50%;
    margin-left: 5px;
    vertical-align: middle;
  }
  .red{
    background-color: #C42525;
  }
  .orange{
    background-color: #F28F43;
  }
  .yellow{
    background-color: #FFEB3B;
  }
  .grey{
    background-color: #D1D1D1;
  }
  .green{
    background-color: #00bb29;
  }
</style>
