<template>
    <div class="pd-12">
        <!-- 筛选 -->
        <div class="text-left">
            <el-input v-model="name" style="width: 180px;" placeholder="请输入名称" clearable></el-input>
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
        <!-- 工具栏 -->
        <div class="mg-t-20 text-left">
            <el-button type="primary" plain size="medium" @click="addRole">新增</el-button>
        </div>
        <el-table class="mg-t-20" :data="roleList" border style="width: 100%;" stripe>
            <el-table-column type="index" label="序号" width="100" align="center"></el-table-column>
            <el-table-column prop="name" label="名称" align="center">
                <template slot-scope="scope">
                    <el-input placeholder="请输入名称" size="small" v-show="scope.row.show"
                              v-model="scope.row.name"></el-input>
                    <span v-show="!scope.row.show">{{scope.row.name}}</span>
                </template>
            </el-table-column>
            <el-table-column prop="code" label="编码" align="center">
                <template slot-scope="scope">
                    <el-input placeholder="请输入编码" size="small" v-show="scope.row.show"
                              v-model="scope.row.code"></el-input>
                    <span v-show="!scope.row.show">{{scope.row.code}}</span>
                </template>
            </el-table-column>
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
                    <el-button v-if="scope.row.show" size="mini" @click="handleEdit(scope.$index,'cancel')">取消
                    </el-button>
                    <el-button v-if="scope.row.show" type="primary" size="mini" @click="saveRole(scope.row)">保存
                    </el-button>
                    <el-button v-if="!scope.row.show" type="primary" size="mini" @click="setMenu(scope.row.id)">授权
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
        <Pagination :total="total" :pageNum="pageNum" :pageSize="pageSize" @pageChange="pageChange"/>

        <el-dialog :visible.sync="visible" title="菜单授权" @close="checkedKeys = []" append-to-body>
            <el-tree class="mg-l-20"
                     ref="tree"
                     :data="menuList"
                     show-checkbox
                     default-expand-all
                     check-on-click-node
                     node-key="id"
                     :default-checked-keys="checkedKeys"
                     @check="check"
                     :props="defaultProps">
            </el-tree>
            <span slot="footer" class="dialog-footer">
                <el-button size="small" @click="visible = false">取 消</el-button>
                <el-button size="small" type="primary" @click="saveRoleMenu">确 定</el-button>
              </span>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "Role",
        data() {
            return {
                pageSize: 10,
                pageNum: 1,
                total: 0,
                name: "",
                status: "",
                roleList: [],
                statusList: [
                    {value: 0, text: "正常"},
                    {value: 1, text: "未激活"}
                ],
                tempRoleList: [],
                boolAdd: false,
                visible: false,
                menuList: [],
                defaultProps: {
                    children: 'children',
                    label: 'name'
                },
                checkedKeys: [], // 已配置的菜单
                checkedMenuIds: [],
                roleId: "",
            }
        },
        mounted() {
            this.getData();
            this.$api.sys.getAllMenuList().then(res => {
                if (res.code === 0) {
                    this.menuList = res.data;
                } else {
                    this.$message.error({
                        message: res.message
                    });
                }
            });
        },
        methods: {
            getData() {
                let params = {
                    pageNum: this.pageNum,
                    pageSize: this.pageSize,
                    name: this.name,
                    status: this.status
                };
                this.$api.sys.getRoleList(params).then(res => {
                    if (res.code === 0) {
                        let list = res.data.records;
                        list.forEach(item => {
                            item["show"] = false
                        });
                        this.roleList = list;
                        this.tempRoleList = JSON.parse(JSON.stringify(list));
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

            handleEdit(index, cancel) {
                let data = this.roleList[index];
                if (cancel && cancel === 'cancel') {
                    data.name = this.tempRoleList[index].name;
                    if (this.boolAdd) {
                        this.getData();
                        this.boolAdd = false;
                    }
                }
                data = {
                    id: data.id,
                    name: data.name,
                    code: data.code,
                    status: data.status,
                    show: !data.show
                }
                this.$set(this.roleList, index, data)
            },
            addRole() {
                let role = {
                    show: true,
                    status: 0
                };
                this.boolAdd = true;
                this.roleList.unshift(role); // 移到第一行
            },
            saveRole(row) {
                if (row.name === '') {
                    this.$message.error("请输入名称");
                    return;
                }
                let param = {
                    roleId: row.id,
                    name: row.name,
                    code: row.code,
                }
                this.$api.sys.saveRole(param).then(res => {
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
            },
            setMenu(roleId) {
                this.visible = true;
                this.roleId = roleId;
                // 查询已配置的菜单
                this.$api.sys.getRoleMenuList({roleId}).then(res => {
                    if (res.code === 0) {
                        let list = res.data;
                        list.forEach(item => {
                            this.checkedKeys.push(item.id);
                        })
                        this.$refs.tree.setCheckedKeys(this.checkedKeys);
                    } else {
                        this.$message.error({
                            message: res.message
                        });
                    }
                });
            },
            check(menuData, checkedData) {
                this.checkedMenuIds = checkedData.checkedKeys.concat(checkedData.halfCheckedKeys);
            },
            saveRoleMenu() {
                let param = {
                    menuIds: this.checkedMenuIds.join(","),
                    roleId: this.roleId
                }
                this.$api.sys.saveRoleMenu(param).then(res => {
                    if (res.code === 0) {
                        this.$message({
                            type: "success",
                            message: "保存成功!"
                        });
                        this.roleId = "";
                        this.checkedMenuIds = [];
                        this.visible = false;
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
