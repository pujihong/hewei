<template>
    <div class="pd-12">
        <!-- 筛选 -->
        <div class="text-left">
            <el-input v-model="name" style="width: 180px;" placeholder="请输入名称" clearable></el-input>
            <el-select class="mg-l-10" clearable style="width: 180px;" v-model="level" placeholder="选择菜单等级">
                <el-option
                        v-for="item in levelList"
                        :key="item.level"
                        :label="item.name"
                        :value="item.level">
                </el-option>
            </el-select>
            <el-select class="mg-l-10 mg-r-10" clearable style="width: 180px;" v-model="status" placeholder="选择菜单状态">
                <el-option
                        v-for="item in statusList"
                        :key="item.value"
                        :label="item.text"
                        :value="item.value">
                </el-option>
            </el-select>
            <el-button type="primary" @click="getData">
                <i class="el-icon-search"></i> 查询
            </el-button>
        </div>
        <el-table class="mg-t-20" :data="menuList" border style="width: 100%;" stripe>
            <el-table-column type="index" label="序号" width="100" align="center"></el-table-column>
            <el-table-column prop="name" label="名称" align="center">
                <template slot-scope="scope">
                    <el-input placeholder="请输入名称" size="small" v-show="scope.row.show" v-model="scope.row.name"></el-input>
                    <span v-show="!scope.row.show">{{scope.row.name}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="status" label="状态" align="center">
                <template slot-scope="scope">
                    <i :class="scope.row.icon"> </i>
                </template>
            </el-table-column>
            <el-table-column prop="levelName" label="等级" align="center"></el-table-column>
            <el-table-column prop="status" label="状态" align="center">
                <template slot-scope="scope">
                    <el-switch v-model="scope.row.status" :active-value="0"
                               :inactive-value="1" disabled>
                    </el-switch>
                </template>
            </el-table-column>
            <el-table-column label="操作" align="center" width="180">
                <template slot-scope="scope">
                    <el-button v-if="!scope.row.show" size="mini" @click="handleEdit(scope.$index)">编辑</el-button>
                    <el-button v-if="scope.row.show" size="mini" @click="handleEdit(scope.$index,'cancel')">取消</el-button>
                    <el-button v-if="scope.row.show" type="primary" size="mini" @click="saveMenu(scope.row)">保存
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <Pagination :total="total" :pageNum="pageNum" :pageSize="pageSize" @pageChange="pageChange"/>
    </div>
</template>

<script>
    export default {
        name: "Menu",
        data() {
            return {
                pageSize: 10,
                pageNum: 1,
                total: 0,
                name: "",
                status: "",
                level: "",
                menuList: [],
                levelList: [],
                statusList: [
                    {value: 0, text: "正常"},
                    {value: 1, text: "未激活"}
                ],
                oldName: ""
            }
        },
        mounted() {
            this.getLevelList();
            this.getData();
        },
        methods: {
            getLevelList() {
                this.$api.sys.getMenuLevelList().then(res => {
                    if (res.code === 0) {
                        this.levelList = res.data;
                    } else {
                        this.$message.error({
                            message: res.message
                        });
                    }
                });
            },
            getData() {
                let params = {
                    pageNum: this.pageNum,
                    pageSize: this.pageSize,
                    name: this.name,
                    level: this.level,
                    status: this.status
                };
                this.$api.sys.getMenuList(params).then(res => {
                    if (res.code === 0) {
                        let list = res.data.records;
                        // 给每个对象加个属性
                        list.forEach(item => {
                            item["show"] = false
                        });
                        this.menuList = list;
                        this.total = res.data.total;
                    } else {
                        this.$message.error({
                            message: res.message
                        });
                    }
                });
            },
            pageChange(page) {
                this.pageSize = page._pageSize;
                this.pageNum = page._currentPage;
                this.getData();
            },

            handleEdit(index,cancel) {
                let data = this.menuList[index];
                if(cancel && cancel === 'cancel') {
                    data.name = this.oldName;
                } else {
                    this.oldName = data.name;
                }
                data = {
                    id: data.id,
                    name: data.name,
                    icon: data.icon,
                    level: data.level,
                    levelName: data.levelName,
                    status: data.status,
                    show: !data.show
                }
                this.$set(this.menuList, index, data)
            },
            saveMenu(row) {
                if(row.name === '') {
                    this.$message.error("请输入名称");
                    return;
                }
                let param = {
                    menuId: row.id,
                    name: row.name,
                }
                this.$api.sys.saveMenu(param).then(res => {
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
    };
</script>

<style scoped></style>
