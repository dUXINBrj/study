
// page001 level1map
var mapcitytreeLoader;
var mapcityrootNode;
var dirtree;
var mapPanel;
var map;
// websocket 
var websocket = null;
var preUrl;

// page002 level2map
var treeLoader;
var rootNode;
var page002panel;
var treeLoaderright;
var rootNoderight;
var tree;
var page002map;
var page002searchFormmap;
var ds_devicemap;
var page12resultlistmap;
var levelmapdevice;

// page003 error manage
var page003searchForm;
var ds_errorcase;
var page003resultlist;

// page004 firealarm manage
var page004searchForm;
var store4;
var ds_firecase;
var page004resultlist;

//page005 reportquery manage
var page005searchForm;
var ds_reportquery;
var page005resultlist;
var page005columnChart;

// page006 manage
var page006levellist;
var page006map;

// page006 user manage
var page006searchForm;
var ds_user;
var page006resultlist;

//page007 operateorg manage
var page007searchForm;
var ds_operateorg;
var page007resultlist;

// page008 fireorg manage
var page008searchForm;
var ds_fireorg;
var page008resultlist;

//page009 userorg manage
var page009searchForm;
var page009resultlist;
var page009addForm;
var ds_userorg;

//page010 building manage
var page010searchForm;
var ds_building;
var page010resultlist;
var buildingmap;

//page011 floor manage
var page011searchForm;
var ds_floor;
var page011resultlist;

//page012 device manage
var page012searchForm;
var ds_device;
var page012resultlist;

//page013 building manage
var page013searchForm;
var ds_13building;
var page013resultlist;

// page014 district manage
var districttreeLoader;
var districtrootNode;
var districttree;
var ds_district;
var page14resultlist;
var page014searchForm;
var page14panel;
var districttreecheckedid;
//page15权限数据
var PermissionJsonson;
var showPermissionJson;
//搜索框高度
var SEARCH_HEIGHT_ONE=110;
var SEARCH_HEIGHT_TWO=160;
var SEARCH_HEIGHT_TREE=190;
var SEARCH_HEIGHT_FOUR=200;
//session退出
function SetSessionTimeout()
{
	Ext.Ajax.on('requestcomplete',checkUserSessionStatus, this); 
};

function checkUserSessionStatus(conn,response,options)
{ 
	if(response.hasOwnProperty("getResponseHeader")){
		var sessionStatus = response.getResponseHeader("sessionstatus");
		if(typeof(sessionStatus) != "undefined")
		{    
			top.window.location = "/fireinfo/redirect_index.jsp";
		}       	
	}
};

//page015 permission manage
var permission_101=101;
var permission_102=102;
var permission_103=103;
var permission_104=104;
var permission_105=105;
var permission_106=106;
var permission_107=107;
var permission_108=108;
var permission_109=109;
var permission_119=119;
var permission_113=113;
var permission_115=115;
var permission_116=116;
var hmRolePermL2;
var permission_11='11';//百度地图api
var permission_109='109';
var permission_110='110';
var permission_111='111';
var permission_112='112';
var permission_103='103';
var permission_119='119';
var permission_121='121';
var permission_122='122';
var tree_hover_2=false;
var tree_hover_3=false;
var tree_hover_4=false;
var tree_hover_9=false;
//角色传值
var permission_id=[11,12,13,14,15,16,17,18,21,22,23,101,102,103,104,105,106,107,108,109,110,111,112,113,114,115,116,117,118,119];

//权限页面
var permission_obj_tab=new Object();
permission_obj_tab[12]='permission_building';
permission_obj_tab[13]='permission_fire';
permission_obj_tab[14]='permission_error';
permission_obj_tab[15]='permission_reportquery';
permission_obj_tab[16]='permission_user';
permission_obj_tab[17]='permission_manager';
permission_obj_tab[18]='permission_setting';
//权限增加，修改，删除按钮
var permission_add_mod_del=new Object();
permission_add_mod_del[109]='permission_user_button';
permission_add_mod_del[110]='permission_operatorg_button';
permission_add_mod_del[111]='permission_fireorg';
permission_add_mod_del[112]='permission_userorg_button';
permission_add_mod_del[113]='permission_building_button';
permission_add_mod_del[114]='permission_floor_button';
permission_add_mod_del[115]='permission_host_button';
permission_add_mod_del[116]='permission_device_button';
permission_add_mod_del[117]='permission_tree_button';
permission_add_mod_del[118]='permission_per_button';
permission_add_mod_del[120]='permission_house_button';

//导出按钮
var permission_export = new Object();
permission_export[106]='permission_fire_export_button';
permission_export[108]='permission_error_export_button';

//隐藏tab函数
function permission_tabside(id){
	Ext.getCmp(id).hide(true);
	Ext.getCmp('tab').remove(Ext.getCmp(id));
}

//隐藏增加，修改，删除
function permission_button(id){
	Ext.getCmp(id).hide(true);
}

//字符串转换成数组
function changeStrToArray(str){
	var array = [];
	if(str){
		str = str.substring(1,str.length-1);
		array = str.split(',');
	}
	var array_pp=[];
	for(var i=0;i<array.length;i++){
		var array_list=array[i].trim();
		array_pp.push(array_list);
		
	}
	return array_pp;
}

//筛选出需要隐藏的id
function permission_obj_nohide(objprop,obj){
	var notExistArr = [];
	for(var prop in objprop){
		if(!isExists(prop,obj)){
			notExistArr.push(prop);
		}
	}
	return notExistArr;
}

function isExists(prop,array){
	var flag = false;
	for(var i in array){
		if(prop == array[i]){
			flag = true;
			break;
		}
	}
	return flag;
}

function isSend(data){
	
	//社会单位用户
	if(role_rolelevel==3){
		return checkEqual(userorgid,data.userorgid);
	}
	//服务单位用户
	else if(role_rolelevel==2){
		return checkEqual(fireserviceorgid,data.fireserviceorgid);
	}
	//运维单位用户
	else if(role_rolelevel==1){
		return checkEqual(operateorgid,data.operateorgid);
	}
	//平台用户
	else{
		return true;
	}
	
}

function checkEqual(value1,value2){
	if(value1==value2){
		return true;
	}else{
		return false;
	}
}

//ie11处理图片上传bug，用原始的传值，不用json
function subResponseTextStr(responseText){
	return responseText.substring(responseText.indexOf("{"),responseText.lastIndexOf("}")+1);
};

//ie11处理图片上传bug
function subResponseXMLMessage(responseXML){
	
	if(responseXML&&responseXML.lastIndexOf("errorcode=")!=-1){
		
		var message = '';
		var str = responseXML.substring(responseXML.indexOf("errorcode=")+10);
		if(str.lastIndexOf(",")!=-1){
			str = str.substring(0,str.indexOf(","));
		}else{
			str = str.substring(0,str.indexOf("]"));
		}
		
		if(str=='10006'){
			message = '关联社会单位不能为空';
		}else if(str == '10007'){
			message = '所属节点不存在';
		}else if(str == '10008'){
			message = '建筑编码已经存在';
		}else if(str == '10009'){
			message = '建筑不存在';
		}else if(str == '11005'){
			message = '楼层名称不能为空';
		}else if(str == '11006'){
			message = '楼层层数不能为空';
		}else if(str == '12007'){
			message = '楼层不存在';
		}else if(str == '11007'){
			message = '所属建筑物已被删除';
		}else if(str == '11008'){
			message = '建筑中已存在该楼层';
		}else if(str == '11009'){
            message = '楼宇中已存在该楼层';
        }else if(str == '17007'){
			message = '楼宇不存在';
		}else if(str == '2001'){
			message = '文件不存在';
		}else if(str == '2002'){
			message = '图片不能超过3M';
		}else if(str == '2003'){
			message = '文件名称不能为空';
		}else if(str == '2004'){
			message = '图片格式不正确';
		}else if(str == '2005'){
			message = '图片类型不正确';
		}else if(str == '2006'){
			message = '文件不能超过1M';
		}else if(str == '10010'){
			message = '建筑异常，无法编辑';
		}else if(str == '10011'){
			message = '建筑已禁用，无法编辑';
		}
		return message;
	}
	
	return null;
	
};

//图片加载
function getImgPath(){  
    //获取当前网址，如： http://localhost:8083/uimcardprj/share/meun.jsp  
    var curWwwPath=window.document.location.href;  
    //获取主机地址之后的目录，如： uimcardprj/share/meun.jsp  
    var pathName=window.document.location.pathname;  
    var pos=curWwwPath.indexOf(pathName);  
    //获取主机地址，如： http://localhost:8083  
    var localhostPaht=curWwwPath.substring(0,pos);  
    return(localhostPaht);  
} 

Date.prototype.Format = function (fmt) { 
    var o = {
        "M+": this.getMonth() + 1, //月份 
        "d+": this.getDate(), //日 
        "h+": this.getHours(), //小时 
        "m+": this.getMinutes(), //分 
        "s+": this.getSeconds(), //秒 
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
        "S": this.getMilliseconds() //毫秒 
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}

//判断第一个日期是否比第二个日期大
function compareDate(date1,date2){
	
    if(new Date(date1.Format("yyyy-MM-dd")).getTime() > new Date(date2.Format("yyyy-MM-dd")).getTime()){
        return true;
    } else {
        return false;
    }
}





