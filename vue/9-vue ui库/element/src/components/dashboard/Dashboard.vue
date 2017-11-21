<template>
    <div id="dashboard">
        <el-container>
            <el-aside width="250px">
              <vue-tree :tree-data="treeData"
                            :options="options"
                            @add-a-child="addAChild"
                            @item-click="itemClick"
                            @item-edit="itemEdit"
                            @item-delete="itemDelete">
                  </vue-tree>
            </el-aside>
            <el-main>Main</el-main>
        </el-container>
    </div>
</template>

<script>
//todo
//element 自定义节点内容 render-content
export default {
  name: "dashboard",
      data() {
        return {
          treeData:[{
                name: '根目录[1]<span>1</span>',
                id: 1,
                children: [
                    {
                        name: '一级节点[4]<span>1</span>', id: 4,
                        children: [
                            {
                                name: '二级节点[5]<span>1</span>', id: 5,
                                children: [
                                    { name: '三级节点[6]<span>1</span>', id: 6},
                                    { name: '三级节点[8]', id: 8},
                                    { name: '三级节点[30]', id: 30},
                                    {
                                        name: '三级节点[31]',
                                        id: 31,
                                        children: [
                                            { name: '四级节点[36]', id: 36},
                                            { name: '四级节点[38]', id: 38},
                                            { name: '四级节点[39]', id: 39},
                                            { name: '四级节点[48]', id: 48},
                                        ]
                                    }
                                ]
                            },
                            { name: '二级节点[9]', id: 9},
                            { name: '二级节点[10]', id: 10},
                            {
                                name: '二级节点[11]', id: 11,
                                children: [
                                    { name: '三级节点[12]', id: 12},
                                    { name: '三级节点[13]', id: 13},
                                    {
                                        name: '三级节点[14]', id: 14,
                                        children: [
                                            { name: '四级节点[15]', id: 15},
                                            { name: '四级节点[16]', id: 16},
                                            { name: '四级节点[17]', id: 17},
                                            { name: '四级节点[18]', id: 18},
                                            {
                                                name: '四级节点[19]', id: 19,
                                                children: [
                                                    { name: '五级节点[20]', id: 20},
                                                    { name: '五级节点[21]', id: 21},
                                                    { name: '五级节点[22]', id: 22},
                                                    { name: '五级节点[23]', id: 23},
                                                    { name: '五级节点[24]', id: 24},
                                                ]
                                            },
                                        ]
                                    }
                                ]
                            }
                        ]
                    },
                    { name: '一级节点[2]', id: 2},
                    {
                        name: '一级节点[59]', id: 59,
                        children: [
                            { name: '二级节点[60]', id: 60},
                            { name: '二级节点[61]', id: 61},
                            { name: '二级节点[62]', id: 62},
                            { name: '二级节点[63]', id: 63},
                            { name: '二级节点[64]', id: 64},
                        ]
                    },
                    { name: '一级节点[3]', id: 3},
                ]
            },
            {
                name: '根目录[99]',
                id: 99,
                children: [
                    { name: '二级节点[70]', id: 70},
                    { name: '二级节点[71]', id: 71},
                    { name: '二级节点[72]', id: 72},
                    { name: '二级节点[73]', id: 73},
                    {
                        name: '二级节点[74]',
                        id: 74,
                        children: [
                            { name: '三级节点[82]', id: 82},
                            { name: '三级节点[83]', id: 83}
                            ]
                    },
                ]
            }],
            options: {
                itemName: 'name',
                checkbox: false,
                checkedIds: [8,10,12],
                checkedOpen: true,
                folderBold: true,
                showAdd: false,
                showEdit: false,
                showDelete: false,
                addClass: 'fa fa-plus-square-o',
                editClass: 'fa fa-edit',
                deleteClass: 'fa fa-trash-o',
                openClass: 'fa fa-angle-right',
                closeClass: 'fa fa-angle-down'
            },
            message: []
        }
    },
    methods:{
        addAChild(id) {
            this.message.push('点击了添加子节点按钮，父节点ID[' + id + ']')
        },
        itemClick(id) {
            this.message.push('点击了节点，节点ID[' + id + ']')
        },
        itemEdit(id) {
            this.message.push('点击了编辑按钮，节点ID[' + id + ']')
        },
        itemDelete(id) {
            this.message.push('点击了删除按钮，节点ID[' + id + ']')
        }
    }
};
</script>

<style scoped>
#dashboard {
  height: 100%;
}
</style>