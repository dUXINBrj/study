<template>
    <div id="dashboard">
        <el-container>
            <el-aside width="250px">
              <el-input placeholder="输入关键字进行过滤" v-model="filterText"></el-input>
              <el-tree
                :data="data4"
                :props="defaultProps"
                node-key="id"
                default-expand-all
                :expand-on-click-node="true"
                :filter-node-method="filterNode"
                ref="tree2"
                :render-content="renderContent">
              </el-tree>
            </el-aside>
            <el-main>Main</el-main>
        </el-container>
    </div>
</template>

<script>
import RedCircle from '../circle/RedCircle.vue';
import OrangeCircle from '../circle/OrangeCircle.vue';
import YellowCircle from '../circle/YellowCircle.vue';
import GreyCircle from '../circle/GreyCircle.vue';
export default {
  name: "dashboard",
  mounted(){
    console.log(11);
  },
  data() {
    return {
      filterText: '',
      data4: [{
        id: 1,
        label: '一级 1',
        children: [{
          id: 4,
          label: '二级 1-1',
          children: [{
            id: 9,
            label: '三级 1-1-1'
          }, {
            id: 10,
            label: '三级 1-1-2'
          }]
        }]
      }, {
        id: 2,
        label: '一级 2',
        children: [{
          id: 5,
          fire:5,
          warn:3,
          error:4,
          offline:1,
          label: '二级 2-1'
        }, {
          id: 6,
          fire:'',
          label: '二级 2-2'
        }]
      }, {
        id: 3,
        label: '一级 3',
        children: [{
          id: 7,
          label: '二级 3-1'
        }, {
          id: 8,
          label: '二级 3-2'
        }]
      }],
      defaultProps: {
        children: 'children',
        label: 'label'
      }
    }
  },
  components:{RedCircle,OrangeCircle,YellowCircle,GreyCircle},
  methods:{
    renderContent(h, { node, data, store }) {
        return(
          <span style="flex: 1; display: flex; align-items: center; justify-content: space-between; font-size: 14px; padding-right: 8px;">
        <span>
        <span>{node.label}</span>
      </span>
      <span>
      <RedCircle v-show={data.fire} caseNum={data.fire}></RedCircle>
      <OrangeCircle v-show={data.warn} caseNum={data.fire}></OrangeCircle>
      <YellowCircle v-show={data.error} caseNum={data.fire}></YellowCircle>
      <GreyCircle v-show={data.offline} caseNum={data.fire}></GreyCircle>
      </span>
      </span>
        )
    },
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
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
</style>
