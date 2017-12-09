<template>
  <div class="searchContent">
    <el-row :gutter="20">
      <el-col :span="5">
        <el-tooltip class="item" effect="dark" content="请输入火警编号" placement="bottom">
        <el-input placeholder="请输入火警编号" v-model="searchData.data.firecaseid"></el-input>
        </el-tooltip>
      </el-col>
      <el-col :span="5">
        <el-tooltip class="item" effect="dark" content="请选择建筑物" placement="bottom">
          <el-select v-model="searchData.data.buildingid" filterable clearable placeholder="请选择建筑物">
            <el-option
              v-for="item in buildingidOption"
              :key="item.buildingid"
              :label="item.buildingname"
              :value="item.buildingid">
            </el-option>
          </el-select>
        </el-tooltip>
      </el-col>
      <el-col :span="5">
        <el-tooltip class="item" effect="dark" content="请选择模式" placement="bottom">
          <el-select v-model="searchData.data.isteststatus" clearable placeholder="请选择模式">
            <el-option
              v-for="item in isteststatusOption"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-tooltip>
      </el-col>
      <el-col :span="4">
        <el-tooltip class="item" effect="dark" content="请选择设备系统" placement="bottom">
          <el-select v-model="searchData.data.devicetypeid" clearable placeholder="请选择设备系统">
            <el-option
              v-for="item in devicetypeidOption"
              :key="item.id"
              :label="item.deviceTypes"
              :value="item.id">
            </el-option>
          </el-select>
        </el-tooltip>
      </el-col>
      <el-col :span="3">
        <el-button icon="el-icon-arrow-down" v-if="!showMore" @click="showMore=!showMore">更多选项</el-button>
        <el-button icon="el-icon-arrow-up" v-if="showMore" @click="showMore=!showMore">收起选项</el-button>
      </el-col>
      <el-col :span="2">
        <el-button type="primary" @click="search" :loading="isloading">查 询</el-button>
      </el-col>
    </el-row>
    <el-row :gutter="20" v-show="showMore">
      <el-col :span="5">
        <el-tooltip class="item" effect="dark" content="请选择设备类别" placement="bottom">
        <el-select v-model="searchData.data.devicesubtypeid" :disabled="typeDisabled" clearable placeholder="请选择设备类别">
          <el-option
            v-for="item in devicesubtypeidOption"
            :key="item.devicesubtypeid"
            :label="item.subtypename"
            :value="item.devicesubtypeid">
          </el-option>
        </el-select>
        </el-tooltip>
      </el-col>
      <el-col :span="5">
        <el-tooltip class="item" effect="dark" content="请选择处理状态" placement="bottom">
          <el-select v-model="searchData.data.firecasestatus" clearable placeholder="请选择处理状态">
            <el-option
              v-for="item in firecasestatusOption"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-tooltip>
      </el-col>
      <el-col :span="5">
        <el-tooltip class="item" effect="dark" content="请选择服务单位" placement="bottom">
        <el-select v-model="searchData.data.fireserviceorgid" clearable placeholder="请选择服务单位">
          <el-option
            v-for="item in fireserviceorgidOption"
            :key="item.fireserviceorgid"
            :label="item.orgname"
            :value="item.fireserviceorgid">
          </el-option>
        </el-select>
        </el-tooltip>
      </el-col>
      <el-col :span="4">
        <el-tooltip class="item" effect="dark" content="请选择社会单位" placement="bottom">
        <el-select v-model="searchData.data.userorgid" :disabled="userorgDisabled" clearable placeholder="请选择社会单位">
          <el-option
            v-for="item in userorgidOption"
            :key="item.fireserviceorgid"
            :label="item.orgname"
            :value="item.fireserviceorgid">
          </el-option>
        </el-select>
        </el-tooltip>
      </el-col>
      <el-col :span="5">
        <el-tooltip class="item" effect="dark" content="请选择上报状态" placement="bottom">
          <el-select v-model="searchData.data.firerealtimestatus" clearable placeholder="请选择上报状态">
            <el-option
              v-for="item in firerealtimestatusOption"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-tooltip>
      </el-col>
    </el-row>
    <el-row :gutter="20" v-show="showMore">
      <el-col :span="5">
        <el-tooltip class="item" effect="dark" content="请输入设备编码" placement="bottom">
          <el-input placeholder="请输入设备编码" v-model="searchData.data.devicecode"></el-input>
        </el-tooltip>
      </el-col>
      <el-col :span="5">
        <el-tooltip class="item" effect="dark" content="请输入设备名称" placement="bottom">
          <el-input placeholder="请输入设备名称" v-model="searchData.data.devicename"></el-input>
        </el-tooltip>
      </el-col>
      <el-col :span="5">
        <el-tooltip class="item" effect="dark" content="请选择处理人" placement="bottom">
        <el-select v-model="searchData.data.dealwithuserid" clearable placeholder="请选择处理人">
          <el-option
            v-for="item in dealwithuseridOption"
            :key="item.userid"
            :label="item.useraccount"
            :value="item.userid">
          </el-option>
        </el-select>
        </el-tooltip>
      </el-col>
      <el-col :span="9">
        <el-tooltip class="item" effect="dark" content="请选择日期" placement="bottom">
        <el-date-picker
          v-model="casebegintime"
          type="daterange"
          unlink-panels
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          value-format="yyyy-MM-dd"
          :picker-options="pickerOptions2">
        </el-date-picker>
        </el-tooltip>
      </el-col>
    </el-row>
    <el-row :gutter="20" v-show="showMore">
      <el-col :span="5">
        <el-tooltip class="item" effect="dark" content="请选择关闭人" placement="bottom">
        <el-select v-model="searchData.data.closeuserid" v-show="mode=='history'" clearable placeholder="请选择关闭人">
          <el-option
            v-for="item in closeuseridOption"
            :key="item.userid"
            :label="item.useraccount"
            :value="item.userid">
          </el-option>
        </el-select>
        </el-tooltip>
      </el-col>
      <el-col :span="5">
        <el-tooltip class="item" effect="dark" content="请选择实警/误报" placement="bottom">
        <el-select v-model="searchData.data.isrealfire" v-show="mode=='history'" clearable placeholder="请选择实警/误报">
          <el-option
            v-for="item in isrealfireOption"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        </el-tooltip>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  props:['searchData','mode','isloading'],
  data(){
    return{
      showMore:false,
      typeDisabled:true,
      userorgDisabled:true,
      fireserviceorgidOption:[],
      userorgidOption:[],
      devicetypeidOption:[],
      devicesubtypeidOption:[],
      buildingidOption:[],
      dealwithuseridOption:[],
      closeuseridOption:[],
      firecasestatusOption:[{
        value:2,
        label:'待处理'
      },{
        value:3,
        label:'待关闭'
      },{
        value:4,
        label:'全部'
      }],
      isteststatusOption:[{
        value:-1,
        label:'全部'
      },{
        value:0,
        label:'监管模式'
      },{
        value:-1,
        label:'测试模式'
      }],
      firerealtimestatusOption:[{
        value:-1,
        label:'全部'
      },{
        value:2,
        label:'未恢复'
      },{
        value:0,
        label:'已恢复'
      }],
      isrealfireOption:[{
        value:-1,
        label:'全部'
      },{
        value:0,
        label:'误报'
      },{
        value:1,
        label:'实警'
      }],
      pickerOptions2: {
        shortcuts: [{
          text: '最近一周',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近一个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近三个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
            picker.$emit('pick', [start, end]);
          }
        }]
      },
      casebegintime:null
    }
  },
  created(){
    let _this=this;
    this.$http.get(_this.$lib.fire.getSociety)
      .then(function(res){
        if(res.data.WSListReturn.success==false){
          _this.$msg({
            message: '获取数据失败',
            type: 'error'
          });
          return false;
        }
        let root=res.data.WSListReturn.root;
        _this.fireserviceorgidOption=root;
      })
      .catch(function(err){
        _this.$msg({
          message: '获取数据失败',
          type: 'error'
        });
      });
    this.getDeviceType();
    this.findBuildingInfo();
    this.findDealWithUsername();
  },
  methods:{
    search(){
      if(this.casebegintime!=null){
        this.searchData.data.casebegintime=this.casebegintime[0];
        this.searchData.data.casebegintime_end=this.casebegintime[1];
      }else{
        this.searchData.data.casebegintime='';
        this.searchData.data.casebegintime_end='';
      }
      //如果当前页为1则主动去触发搜索事件
      //不为1的情况下通过更改当前页 触发当前页更改事件 间接触发搜索
      //否则会产生两次搜索
      if(this.searchData.data.currentPageNow==1){
        Event.$emit('search');
      }else{
        this.searchData.data.currentPageNow=1;
      }
    },
    reset(){
      this.searchData.data.firecaseid='';
      this.searchData.data.devicecode='';
      this.searchData.data.devicename='';
      this.searchData.data.firecasestatus='';
      this.searchData.data.fireserviceorgid='';
      this.searchData.data.userorgid='';
      this.searchData.data.buildingid='';
      this.searchData.data.isteststatus='';
      this.searchData.data.dealwithuserid='';
      this.searchData.data.closeuserid='';
      this.searchData.data.devicetypeid='';
      this.searchData.data.devicesubtypeid='';
      this.searchData.data.firerealtimestatus='';
      this.searchData.data.isrealfire='';
      this.searchData.data.casebegintime='';
      this.searchData.data.casebegintime_end='';
      this.searchData.data.timestatus='';
      this.searchData.data.currentPageNow=1;
      this.casebegintime=null;
    },
    getUserorg(){
      let _this=this;
      this.$http.get(_this.$lib.fire.getUserorg,{fireserviceorgid:_this.fireserviceorgid})
        .then(function(res){
          if(res.data.WSListReturn.success==false){
            _this.$msg({
              message: '获取数据失败',
              type: 'error'
            });
            return false;
          }
          let root=res.data.WSListReturn.root;
          _this.userorgidOption=root;
        })
        .catch(function(err){
          _this.$msg({
            message: '获取数据失败',
            type: 'error'
          });
        });
    },
    getDeviceType(){
      let _this=this;
      this.$http.get(_this.$lib.fire.getDeviceType)
        .then(function(res){
          if(res.data.WSListReturn.success==false){
            _this.$msg({
              message: '获取数据失败',
              type: 'error'
            });
            return false;
          }
          let root=res.data.WSListReturn.root;
          _this.devicetypeidOption=root;
        })
        .catch(function(err){
          _this.$msg({
            message: '获取数据失败',
            type: 'error'
          });
        });
    },
    getDeviceSubType(){
      let _this=this;
      this.$http.get(_this.$lib.fire.getDeviceSubType,{devicetypeid:_this.devicetypeid})
        .then(function(res){
          if(res.data.WSListReturn.success==false){
            _this.$msg({
              message: '获取数据失败',
              type: 'error'
            });
            return false;
          }
          let root=res.data.WSListReturn.root;
          _this.devicesubtypeidOption=root;
        })
        .catch(function(err){
          _this.$msg({
            message: '获取数据失败',
            type: 'error'
          });
        });
    },
    findBuildingInfo(){
      let _this=this;
      this.$http.get(_this.$lib.fire.findBuildingInfo)
        .then(function(res){
          if(res.data.WSListReturn.success==false){
            _this.$msg({
              message: '获取数据失败',
              type: 'error'
            });
            return false;
          }
          let root=res.data.WSListReturn.root;
          _this.buildingidOption=root;
        })
        .catch(function(err){
          _this.$msg({
            message: '获取数据失败',
            type: 'error'
          });
        });
    },
    findDealWithUsername(){
      let _this=this;
      this.$http.get(_this.$lib.fire.findDealWithUsername,{type:'fireCase'})
        .then(function(res){
          if(res.data.WSListReturn.success==false){
            _this.$msg({
              message: '获取数据失败',
              type: 'error'
            });
            return false;
          }
          let root=res.data.WSListReturn.root;
          _this.dealwithuseridOption=root;
        })
        .catch(function(err){
          _this.$msg({
            message: '获取数据失败',
            type: 'error'
          });
        });
    },
    findCloseUsername(){
      let _this=this;
      this.$http.get(_this.$lib.fire.findCloseUsername)
        .then(function(res){
          if(res.data.WSListReturn.success==false){
            _this.$msg({
              message: '获取数据失败',
              type: 'error'
            });
            return false;
          }
          let root=res.data.WSListReturn.root;
          _this.closeuseridOption=root;
        })
        .catch(function(err){
          _this.$msg({
            message: '获取数据失败',
            type: 'error'
          });
        });
    }
  },
  watch:{
    devicetypeid(val){
      if(val){
        this.typeDisabled=false;
        this.getDeviceSubType();
      }else{
        this.typeDisabled=true;
        this.devicesubtypeid='';
      }
    },
    fireserviceorgid(val){
      if(val){
        this.userorgDisabled=false;
        this.getUserorg();
      }else{
        this.userorgDisabled=true;
        this.searchData.data.userorgid='';
      }
    },
    searchData:{
      handler(options){
        if(options.data.devicetypeid){
          this.typeDisabled=false;
          this.getDeviceSubType();
        }else{
          this.typeDisabled=true;
          options.data.devicesubtypeid='';
        }
        if(options.data.fireserviceorgid){
          this.userorgDisabled=false;
          this.getUserorg();
        }else{
          this.userorgDisabled=true;
          options.data.userorgid='';
        }
      },
      deep:true
    },
    mode(val){
      if(val=='now'){
        this.searchData.data.closeuserid='';
        this.searchData.data.isrealfire='';
      }else{
        this.findCloseUsername();
      }
      this.reset();
    }
  }
}
</script>
<style scoped>
  .el-select{
    width: 100%;
  }
  .el-date-editor{
    width: 100%;
  }
  .searchContent{
    border: 1px solid #b9b9b9;
    border-radius: 5px;
    padding: 10px;
  }
  .el-input-group__prepend{
    padding: 0 5px;
  }
  .el-row{
    margin-bottom: 10px;
  }
  .el-row:last-child{
    margin-bottom: 0;
  }
</style>
