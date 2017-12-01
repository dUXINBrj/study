<template>
    <el-card class="box-card dashTableCard">
        <div slot="header" class="clearfix">
        <span>实时动态</span>
        </div>
        <div id="dashTable">
            <el-table
                stripe
                :data="tableData3"
                border
                height="193"
                style="width: 100%">
                <el-table-column
                prop="subtypename"
                label="设备类型">
                </el-table-column>
                <el-table-column
                prop="housename"
                label="楼宇"
                width="120">
                </el-table-column>
                <el-table-column
                prop="floorno"
                label="楼层层数"
                width="80">
                </el-table-column>
                <el-table-column
                prop="casetype"
                label="状态"
                width="70">
                <template slot-scope="scope">
                    <span :class="scope.row.casetype === '火警' ? 'font-red' : ''">{{scope.row.casetype}}</span>
                </template>
                </el-table-column>
                <el-table-column
                label="处理"
                width="70">
                    <template slot-scope="scope">
                    <el-button
                    type="text"
                    size="mini"
                    @click="handleEdit(scope.$index, scope.row)">处理</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
    </el-card>
</template>

<script>
    export default {
        props:["tableData"],
        data(){
            return{
                tableData3: []
            }
        },
        methods:{
            handleEdit(index,row){
                console.log(row);
            }
        },
        watch:{
            tableData:{
                handler(options) {
                    this.tableData3=options;
                },
                deep:true
            }
        }
    }
</script>

<style>
#dashTable .el-table td,#dashTable .el-table th{
    padding: 0
}
.dashTableCard .el-card__body{
    padding: 10px
}
.el-card{
    height: 100%;
}
#dashTable{
    width: 100%;
    height: 100%;
}
#dashTable .el-button--mini, #dashTable .el-button--mini.is-round{
    padding: 2px 5px;
}
#dashTable .font-red{
    color: red;
}
</style>
