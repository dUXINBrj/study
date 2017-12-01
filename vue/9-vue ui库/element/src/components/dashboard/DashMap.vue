<template>
    <el-card class="box-card">
        <div slot="header" class="clearfix">
        <span>地图</span>
        <el-button style="float: right; padding: 3px 0" type="text">操作按钮</el-button>
        </div>
        <baidu-map class="bm-view"
                   :dragging="false"
                   :double-click-zoom="false"
                   :center="mapCenter"
                   :map-click="false"
                   :zoom="20"
                   :keyboard="false"
                   :pinch-to-zoom="false"
                   @ready="handler">
          <bm-marker v-if="showMarker" :position="mapCenter" :dragging="false" animation="BMAP_ANIMATION_BOUNCE" :icon="iconOpt"></bm-marker>
        </baidu-map>
    </el-card>
</template>

<script>
    export default {
      props:['buildingInfo'],
      data(){
        return{
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
      watch:{
        buildingInfo:{
          handler(options){
            if(options.length!=0){
              this.mapCenter.lng=options[0].gisx;
              this.mapCenter.lat=options[0].gisy;
              let _this=this;
              let dashBmapIcon;
              let dashBuildingStatus=options[0].building_case_status;
              let dashBuildingOnlineStatus=options[0].online_status;
              switch (dashBuildingStatus){
                case 2:dashBmapIcon=_this.$lib.dashBoard.mapRedIcon;break;
                case 0:dashBuildingOnlineStatus==0 ? dashBmapIcon=_this.$lib.dashBoard.mapGreyIcon:dashBmapIcon=_this.$lib.dashBoard.mapGreenIcon;break;
                case 1:dashBmapIcon=_this.$lib.dashBoard.mapYellowIcon;break;
                case 7:dashBmapIcon=_this.$lib.dashBoard.mapOrangeIcon;break;
                default:break;
              }
              this.iconOpt.url=dashBmapIcon;
              this.showMarker=true;
            }else{
              this.showMarker=false;
            }
          },
          deep:true
        }
      },
      methods:{
        handler ({BMap, map}) {
//          地图加载完成 callback
        }
      }
    }
</script>

<style scoped>
  .el-card{
    height: 100%;
  }
  .bm-view{
    width: 100%;
    height: 100%;
  }
</style>
