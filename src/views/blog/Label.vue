<template>
    <div>
        <el-button type="primary" plain size="medium" @click="addLabel">新增</el-button>
        <el-table :data="labelList" class="mg-t-10" style="width: 100%" border stripe>
            <el-table-column type="index" label="序号" width="80" align="center"></el-table-column>
            <el-table-column prop="name" label="名称" align="center">
                <template slot-scope="scope">
                    <el-input placeholder="名称" size="small" v-show="scope.row.show" v-model="scope.row.name"></el-input>
                    <span v-show="!scope.row.show">{{scope.row.name}}</span>
                </template>
            </el-table-column>
            <el-table-column label="操作" align="center" width="180">
                <template slot-scope="scope">
                    <el-button v-if="!scope.row.show" size="mini" @click="handleEdit(scope.$index)">编辑</el-button>
                    <el-button v-if="scope.row.show" size="mini" @click="handleEdit(scope.$index)">取消</el-button>
                    <el-button v-if="scope.row.show" type="primary" size="mini" @click="saveLabel(scope.row)">保存
                    </el-button>
                    <el-button v-if="!scope.row.show" type="danger" size="mini" @click="deleteLabel(scope.row.id)">删除
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
    export default {
        name: "Label",
        data() {
            return {
                labelList: []
            }
        },
        mounted() {
            this.getData();
        },
        methods: {
            getData() {
                // 查询自己所有的标签
                this.$api.blog.getUserAllBlogLabelList().then(res => {
                    if (res.code === 0) {
                        let list = res.data;
                        // 给每个对象加个属性
                        list.forEach(item => {
                            item["show"] = false
                        });
                        this.labelList = list;
                    } else {
                        this.$message.error({
                            message: res.message
                        });
                    }
                });
            },
            handleEdit(index) {
                // 对数组元素直接辅助是没有做响应式的
                // https://cn.vuejs.org/v2/guide/reactivity.html#%E5%A6%82%E4%BD%95%E8%BF%BD%E8%B8%AA%E5%8F%98%E5%8C%96
                // row.show = true; 这样是不行的
                let data = this.labelList[index];
                data = {
                    id: data.id,
                    name: data.name,
                    show: !data.show
                }
                this.$set(this.labelList, index, data)
            },
            addLabel() {
                let label = {
                    show: true
                };
                this.labelList.unshift(label); // 移到第一行
            },
            deleteLabel(labelId) {
                this.$confirm("删除后，该标签下的文章标签会清空，确认删除?", "提示", {
                    type: "warning"
                })
                    .then(() => {
                        this.$api.blog.deleteBlogLabelById({labelId}).then(res => {
                            if (res.code === 0) {
                                this.$message({
                                    type: "success",
                                    message: "删除成功!"
                                });
                                this.getData();
                                this.$emit("refreshData");
                            } else {
                                this.$message.error({
                                    message: res.message
                                });
                            }
                        });
                    })
                    .catch(() => {
                        this.$message({
                            type: "info",
                            message: "已取消删除"
                        });
                    });
            },
            saveLabel(row) {
                console.log(row);
                let param = {
                    labelId: row.id,
                    name: row.name
                }
                this.$api.blog.saveBlogLabel(param).then(res => {
                    if (res.code === 0) {
                        this.$message({
                            message: '保存成功',
                            type: 'success'
                        })
                        this.getData();
                    } else {
                        this.$message.error({
                            message: res.message
                        });
                    }
                });

            }
        }
    }
</script>

<style scoped>

</style>