<script>
  let complateUrl=window.location.href;
  let urlRoute=window.location.hash;
  let _baseUrl=complateUrl.substr(0,complateUrl.length-urlRoute.length);
  export default {
    baseUrl:_baseUrl,
    dashBoard:{
      getTree:'/static/store/tree.json',
      getPie:'/static/store/dashPie.json',
      getTable:'/static/store/dashDeviceTable.json',
      getLineDevice:'/static/store/dashLineDeviceList.json',
      getBuildingInfo:'/static/store/dashBuildingInfo.json',
      getLine:'/static/store/dashline.json',
      mapGreenIcon:_baseUrl+'/static/img/map-green.png',
      mapRedIcon:_baseUrl+'/static/img/map-red.png',
      mapOrangeIcon:_baseUrl+'/static/img/map-orange.png',
      mapYellowIcon:_baseUrl+'/static/img/map-yellow.png',
      mapGreyIcon:_baseUrl+'/static/img/map-grey.png',
    }
  }
</script>
