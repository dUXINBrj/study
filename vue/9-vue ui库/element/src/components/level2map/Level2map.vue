<template>
  <div class="content" v-loading='isloading'>
    <div class="sidebar">
      <div class="treeBox" v-loading="treeBuildingBtnLoading">
        <el-tree
          @node-click="getCurrentNode"
          :data="buildingTree"
          :props="defaultProps"
          lazy
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
    <div class="level2Content" v-loading="mapLoading">

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
          mapLoading:false,
          defaultProps: {
            children: 'children',
            label: 'text',
            isLeaf:'leaf'
          },
          treeDblClick:false,
          treeBuildingBtnLoading:false,
          buildingTree:[]
        }
      },
      created(){

        this.getTreeBuilding();
      },
      methods:{
        getBuildingStatu(value,onlineStatu){
          let BuildingStatu="normal";
          switch (value){
            case 2:BuildingStatu="fire";break;
            case 0:onlineStatu==0 ? BuildingStatu="offline":BuildingStatu="normal";break;
            case 1:BuildingStatu="error";break;
            case 7:BuildingStatu="warn";break;
            default:break;
          }
          return BuildingStatu;
        },
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
                _this.$msg({
                  message: '获取建筑信息失败',
                  type: 'error'
                });
                return false;
              }
              let treeArr=new Array;
              let getTreeArr=res.data.treeNodeList;
              getTreeArr.forEach((element,index) => {
                let { text, id ,fire='',warn='',error='',offline='',leaf,gisx,gisy} = element;
                treeArr[index]={
                  text,
                  id,
                  fire,
                  warn,
                  error,
                  offline,
                  leaf,
                  gisx,
                  gisy
                }
              });
              _this.buildingTree=treeArr;
            })
            .catch(function(err){
              _this.isloading=false;
              _this.treeBuildingBtnLoading=false;
              _this.$msg({
                message: '获取建筑信息失败',
                type: 'error'
              });
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
          if(!data.leaf){
            return false;
          }
          if(!this.treeDblClick){ //element ui的树形节点未提供双击事件的钩子函数 因此用定时器模拟双事件
            this.treeDblClick=true;
            let _this=this;
            setTimeout(function () {
              _this.treeDblClick=false;
            },300)
          }else{
            console.log(1);
            return false;
          }
          this.map.panTo(new BMap.Point(data.gisx,data.gisy));
          let overlays=this.map.getOverlays();
          for(let i=0;i<overlays.length;i++){ //点击树形节点建筑 遍历当前地图上的遮盖物 触发点击事件
            if(overlays[i].point.lat==data.gisy && overlays[i].point.lng==data.gisx){
              overlays[i].V.click();
              break;
            }
          }
        },
        handler({BMap, map}){
          //地图加载完成 callback
//          console.log(BMap, map);
          this.BMap=BMap;
          this.map=map;
        }
      },
      watch:{

      },
      computed:{

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
  .level2Content{
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
  .treeBox{
    height: auto;
    overflow-y: auto;
  }
</style>
