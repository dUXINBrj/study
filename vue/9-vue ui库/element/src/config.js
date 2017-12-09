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
  },
  level1Map:{
    getAllBuildingInfo:'/static/store/allBuildingInfo.json',
    // mapAddressIcon:'./static/img/map1-address.png',
    // mapBuildIcon:_baseUrl+'/static/img/map1-build.png',
    // mapContactIcon:_baseUrl+'/static/img/map1-contact.png',
    // mapDeviceIcon:_baseUrl+'/static/img/map1-device.png',
    // mapFloorIcon:_baseUrl+'/static/img/map1-floor.png',
    // mapHostIcon:_baseUrl+'/static/img/map1-host.png',
    // mapOperatorIcon:_baseUrl+'/static/img/map1-operator.png',
    // mapPhoneIcon:_baseUrl+'/static/img/map1-phone.png',
    // mapUserorgIcon:_baseUrl+'/static/img/map1-userorg.png',
    // mapInfoIcon:_baseUrl+'/static/img/info.png',
  },
  fire:{
    getSociety:'/static/store/getSociety.json',
    getUserorg:'/static/store/getUserorg.json',
    getDeviceType:'/static/store/getDeviceType.json',
    getDeviceSubType:'/static/store/getDeviceSubType.json',
    findBuildingInfo:'/static/store/findBuildingInfo.json',
    findDealWithUsername:'/static/store/findDealWithUsername.json',
    findCloseUsername:'/static/store/findCloseUsername.json',
    findDeviceFireCasePage:'/static/store/findDeviceFireCasePage.json'
  },
  warn:{
    findDeviceWarningCase:'/static/store/finddevicewarningcase.json'
  },
  error:{
    findErrorCase:'/static/store/finderrorcase.json'
  }
}
