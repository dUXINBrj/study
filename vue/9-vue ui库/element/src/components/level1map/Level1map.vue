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
    <div class="level1Content" v-loading="mapLoading">
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
        <div v-for="(val,index) in buildingData">
          <bm-marker :key="index"
                     v-if="val.iconCheck"
                     :position="val.position"
                     :dragging="false"
                     :animation="val.animate"
                     :icon="val.mapicon"
                     @click="infoWindowOpen(index,val.gisx,val.gisy)">
          </bm-marker>
          <bm-label :content="val.buildingname"
                    v-if="val.iconCheck"
                    :position="val.position"
                    :offset="{width: -20, height: 20}"
                    :labelStyle="{color: '#333',border:'1px solid #333',fontSize : '12px'}"/>
        </div>
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
          mapLoading:false,
          defaultProps: {
            children: 'children',
            label: 'label'
          },
          filterText:'',
          treeBuildingBtnLoading:false,
          buildingTree:[],
          isAllBuilding:'',//用于判断是否为只看建筑模式
          map:'',//百度地图实例
          BMap:'',
          fireCheck:true,
          warnCheck:true,
          errorCheck:true,
          offlineCheck:true,
          normalCheck:true,
          buildingInfo:[],
          mapCenter:{
            lng: 121.489191,
            lat: 31.239876
          },
          showMarker:false,
          iconOpt:{
            url: this.$lib.dashBoard.mapRedIcon,
            size: {width: 32, height: 32}
          }
        }
      },
      created(){
        this.getTreeBuilding();
        this.getAllBuildingInfo();
      },
      methods:{
        buildingStatu(value,onlineStatu){
          let iconCheck=this.normalCheck;
          let _this=this;
          switch (value){
            case 2:iconCheck=_this.fireCheck;break;
            case 0:onlineStatu==0 ? iconCheck=_this.offlineCheck:iconCheck=_this.normalCheck;break;
            case 1:iconCheck=_this.errorCheck;break;
            case 7:iconCheck=_this.warnCheck;break;
            default:break;
          }
          return iconCheck;
        },
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
              _this.$msg({
                message: '获取建筑信息失败',
                type: 'error'
              });
            });
        },
        getAllBuildingInfo(){
          this.mapLoading=true;
          this.$http.get(this.$lib.level1Map.getAllBuildingInfo)
            .then(function (res) {
              this.mapLoading=false;
              if(!res.data.WSListReturn.success){
                this.$msg({
                  message: '获取建筑信息失败',
                  type: 'error'
                });
                return false;
              }
              this.buildingInfo=res.data.WSListReturn.root[0];
            }.bind(this))
            .catch(function (err) {
              this.mapLoading=false;
              this.$msg({
                message: '获取建筑信息失败',
                type: 'error'
              });
            }.bind(this))
        },
        creatInfoWindow(index){
          let buildingCase=this.buildingData[index].building_case_status;
          let offlineStatu=this.buildingData[index].online_status;
          let buildingStatu=this.getBuildingStatu(buildingCase,offlineStatu);
          let _this=this;
          let root=this.buildingData[index];
          switch (buildingStatu){
            case "normal":return`
            <div style='width: 300px'>
				        <div style='margin: 10px;'>
				            <h3 class='mapCover'><img src='../../../static/img/map1-userorg.png'>社会单位：${root.userorg_name}</h3>
            	      <h3 class='mapCover'><img src='../../../static/img/map1-build.png'>建筑名称：${root.buildingname}</h3>
            	      <h3 class='mapCover'><img src='../../../static/img/map1-address.png'>建筑地址：${root.address}</h3>
				            <h3 class='mapCover'><img src='../../../static/img/map1-operator.png'>运维单位：${root.operator_name}</h3></div>
				        <div style='text-align:center;margin-top:20px;border-top:1px solid #ccc';padding:10px'>
				        <div id='gotoLevel2' style='margin-top:10px;margin-left:100px;float:left'>
				        <div style='height:14px;width:14px;float:left;margin-top:3px;margin-right:5px;background-image:url(../../../static/img/info.png)'></div><div style='float:left'>跳转详情</div>
                </div>
              </div>
            </div>`;
            break;
            case "fire":return`<div style='width: 300px'>
				<div style='margin: 10px;'>
				<h3 class='mapCover'><img src='../../../static/img/map1-userorg.png'>社会单位：${root.userorg_name}</h3>
				<h3 class='mapCover'><img src='../../../static/img/map1-build.png'>建筑名称：${root.buildingname}</h3>
            	<h3 class='mapCover'><img src='../../../static/img/map1-address.png'>建筑地址：${root.address}</h3>
				<h3 class='mapCover'><img src='../../../static/img/map1-floor.png'>楼层名称：${root.floorname_case_status}</h3>
				<h3 class='mapCover'><img src='../../../static/img/map1-device.png'>设备名称：${root.devicename_case_status} &nbsp（火警）</h3>
				<h3 class='mapCover'><img src='../../../static/img/map1-contact.png'>联系人：${root.firecontactname}"</h3>
				<h3 class='mapCover'><img src='../../../static/img/map1-phone.png'>联系电话：${root.firecontacttel}</h3>
				<h3 class='mapCover'><img src='../../../static/img/map1-operator.png'>运维单位：${root.operator_name}</h3></div>
				<div style='text-align:center;margin-top:20px;border-top:1px solid #ccc';padding:10px>
				<div style='margin-right:10px;border-right:1px solid #ccc;padding-right:35px;margin-left:60px;margin-top:10px;float:left'>
				<div style='height:14px;width:14px;margin-top:3px;float:left;margin-right:5px;background-image:url(../images/deal.png)'></div><div style='float:left'>处理</div></div>
				<div style='margin-top:10px;margin-left:30px;float:left'>
				<div style='height:14px;width:14px;float:left;margin-top:3px;margin-right:5px;background-image:url(../images/info.png)'></div><div style='float:left'>跳转详情</div></div></div></div>`;break;
            case "warn":return`<div>warn</div>`;break;
            case "error":return`<div>error</div>`;break;
            case "offline":return`<div>offline</div>`;break;
            default:break;
          }
        },
        infoWindowOpen (index,x,y) {
          this.map.panTo(new BMap.Point(x,y));
          let point=new BMap.Point(x,y);
          let infoWindowHtml=this.creatInfoWindow(index);
          let infoWindow=new BMap.InfoWindow(infoWindowHtml);
          this.map.openInfoWindow(infoWindow,point);
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
//          console.log(BMap, map);
          this.BMap=BMap;
          this.map=map;
        }
      },
      watch:{
        filterText(val) {
          this.$refs.buildingTree.filter(val);
        }
      },
      computed:{
        buildingData(){
          let _this=this;
          let obj=new Object;
          obj=this.buildingInfo;
//          if(obj.length!=0){
//            this.mapCenter={
//              lng: obj[0].gisx,
//                lat: obj[0].gisy
//            }
//          }
          obj.forEach((val,index)=>{
            let mapIcon=this.$lib.dashBoard.mapRedIcon;
            let animate='';
            let _this=this;
            switch (val.building_case_status){
              case 2:mapIcon=_this.$lib.dashBoard.mapRedIcon;animate="BMAP_ANIMATION_BOUNCE";break;
              case 0:if(val.online_status==0){
                mapIcon=_this.$lib.dashBoard.mapGreyIcon;
                animate="BMAP_ANIMATION_BOUNCE";
              }else{
                mapIcon=_this.$lib.dashBoard.mapGreenIcon;
                animate="";
              };break;
              case 1:mapIcon=_this.$lib.dashBoard.mapYellowIcon;animate="BMAP_ANIMATION_BOUNCE";break;
              case 7:mapIcon=_this.$lib.dashBoard.mapOrangeIcon;animate="BMAP_ANIMATION_BOUNCE";break;
              default:break;
            }
            val.animate=animate;
            val.mapicon={
              url: mapIcon,
              size: {width: 32, height: 32}
            };
            val.position={
              lng: val.gisx,
              lat: val.gisy
            };
            val.iconCheck=this.buildingStatu(val.building_case_status,val.online_status);//过滤建筑物状态 与checkbox状态绑定
          });
          return obj;
        }
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
