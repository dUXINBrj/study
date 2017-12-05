<template>
  <div class="searchContent">
    <el-row :gutter="20">
      <el-col :span="5">
        <el-tooltip class="item" effect="dark" content="请输入火警编号" placement="bottom">
        <el-input placeholder="请输入火警编号" v-model="firecaseid"></el-input>
        </el-tooltip>
      </el-col>
      <el-col :span="5">
        <el-tooltip class="item" effect="dark" content="请输入设备编码" placement="bottom">
        <el-input placeholder="请输入设备编码" v-model="devicecode"></el-input>
        </el-tooltip>
      </el-col>
      <el-col :span="5">
        <el-tooltip class="item" effect="dark" content="请输入设备名称" placement="bottom">
        <el-input placeholder="请输入设备名称" v-model="devicename"></el-input>
        </el-tooltip>
      </el-col>
      <el-col :span="4">
        <el-tooltip class="item" effect="dark" content="请选择处理状态" placement="bottom">
        <el-select v-model="firecasestatus" clearable placeholder="请选择处理状态">
          <el-option
            v-for="item in firecasestatusOption"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        </el-tooltip>
      </el-col>
      <el-col :span="3">
        <el-button icon="el-icon-arrow-down" v-if="!showMore" @click="showMore=!showMore">更多选项</el-button>
        <el-button icon="el-icon-arrow-up" v-if="showMore" @click="showMore=!showMore">收起选项</el-button>
      </el-col>
      <el-col :span="2">
        <el-button type="primary" @click="search">查 询</el-button>
      </el-col>
    </el-row>
    <el-row :gutter="20" v-show="showMore">
      <el-col :span="5">
        <el-tooltip class="item" effect="dark" content="请选择设备系统" placement="bottom">
        <el-select v-model="value4" clearable placeholder="请选择设备系统">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        </el-tooltip>
      </el-col>
      <el-col :span="5">
        <el-tooltip class="item" effect="dark" content="请选择设备类别" placement="bottom">
        <el-select v-model="value4" clearable placeholder="请选择设备类别">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        </el-tooltip>
      </el-col>
      <el-col :span="5">
        <el-tooltip class="item" effect="dark" content="请选择服务单位" placement="bottom">
        <el-select v-model="fireserviceorgid" clearable placeholder="请选择服务单位">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        </el-tooltip>
      </el-col>
      <el-col :span="4">
        <el-tooltip class="item" effect="dark" content="请选择社会单位" placement="bottom">
        <el-select v-model="userorgid" clearable placeholder="请选择社会单位">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        </el-tooltip>
      </el-col>
      <el-col :span="5">
        <el-tooltip class="item" effect="dark" content="请选择建筑物" placement="bottom">
        <el-select v-model="buildingid" clearable placeholder="请选择建筑物">
          <el-option
            v-for="item in options"
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
        <el-tooltip class="item" effect="dark" content="请选择上报状态" placement="bottom">
        <el-select v-model="value4" clearable placeholder="请选择上报状态">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        </el-tooltip>
      </el-col>
      <el-col :span="5">
        <el-tooltip class="item" effect="dark" content="请选择模式" placement="bottom">
        <el-select v-model="isteststatus" clearable placeholder="请选择模式">
          <el-option
            v-for="item in isteststatusOption"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
        </el-tooltip>
      </el-col>
      <el-col :span="5">
        <el-tooltip class="item" effect="dark" content="请选择处理人" placement="bottom">
        <el-select v-model="dealwithuserid" clearable placeholder="请选择处理人">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
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
  </div>
</template>
<script>
export default {
  props:['searchData'],
  data(){
    return{
      showMore:false,
      options: [{
        value: '选项1',
        label: '黄金糕'
      }, {
        value: '选项2',
        label: '双皮奶'
      }, {
        value: '选项3',
        label: '蚵仔煎'
      }, {
        value: '选项4',
        label: '龙须面'
      }, {
        value: '选项5',
        label: '北京烤鸭'
      }],
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
      value4: '',
      firecaseid:'',
      devicecode:'',
      devicename:'',
      firecasestatus:'',
      fireserviceorgid:'',
      userorgid:'',
      buildingid:'',
      isteststatus:'',
      dealwithuserid:'',
      casebegintime:[]
    }
  },
  methods:{
    search(){
      let obj=new Object;
      obj.firecaseid=this.firecaseid;
      obj.devicecode=this.devicecode;
      obj.devicename=this.devicename;
      obj.firecasestatus=this.firecasestatus;
      obj.fireserviceorgid=this.fireserviceorgid;
      obj.userorgid=this.userorgid;
      obj.buildingid=this.buildingid;
      obj.isteststatus=this.isteststatus;
      obj.dealwithuserid=this.dealwithuserid;
      obj.casebegintime=this.casebegintime;
      if(this.casebegintime.length!=0){
        obj.casebegintime=this.casebegintime[0];
        obj.casebegintimeend=this.casebegintime[1];
      }else{
        obj.casebegintime='';
        obj.casebegintimeend='';
      }
      this.searchData.data=obj;
      console.log(this.searchData);
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
