<template>
    <div class="pd-12">
        <!-- 筛选 -->
        <div class="text-left">
            <el-input v-model="name" style="width: 180px;" placeholder="请输入姓名" clearable></el-input>
            <el-select class="mg-l-10" clearable style="width: 180px;" v-model="roleIds" multiple placeholder="选择角色">
                <el-option
                        v-for="item in roleList"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id">
                </el-option>
            </el-select>
            <el-button class="mg-l-10" type="primary" @click="getData">
                <i class="el-icon-search"></i> 查询
            </el-button>
        </div>
        <!--工具条-->
        <div class="row flex-row space-between mg-t-20">
            <div class="text-left">
                <el-button type="primary" plain @click="visible = true" size="medium">
                    <i class="el-icon-edit"></i> 新建
                </el-button>
            </div>
        </div>
        <el-table class="mg-t-10" :data="userList" border style="width: 100%;" stripe>
            <el-table-column type="index" label="序号" width="100" align="center"></el-table-column>
            <el-table-column prop="username" label="姓名" align="center"></el-table-column>
            <el-table-column prop="roleList" label="角色" align="center" :formatter="roleListFormat"></el-table-column>
            <el-table-column label="操作" align="center">
                <template slot-scope="scope">
                    <el-button size="mini" type="primary" plain @click="editUser(scope.row)">编辑</el-button>
                    <el-button size="mini" type="danger" @click="deleteUser(scope.row.id)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <Pagination :total="total" :pageNum="pageNum" :pageSize="pageSize" @pageChange="pageChange"/>

        <el-dialog :visible.sync="visible" :title="userId === ''? '新增用户':'编辑用户'" append-to-body @close="closeDiaLog">
            <el-form :model="form" ref="userForm" :rules="fieldRules">
                <el-form-item label="姓名" prop="username" :label-width="formLabelWidth">
                    <el-input clearable v-model="form.username" maxlength="20" placeholder="请输入姓名"
                              style="width: 280px;"></el-input>
                </el-form-item>
                <el-form-item label="角色" :label-width="formLabelWidth" prop="roleIds">
                    <el-select multiple clearable v-model="form.roleIds" style="width: 280px;" placeholder="选择角色">
                        <el-option
                                v-for="item in roleList"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button size="small" @click="visible = false">取 消</el-button>
                <el-button size="small" type="primary" @click="submitForm('userForm')">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "user",
        data() {
            return {
                userList: [],
                roleList: [],
                pageSize: 10,
                pageNum: 1,
                total: 0,
                name: "",
                roleIds: [], // 支持多选
                visible: false,
                form: {
                    username: "",
                    roleIds: [],
                },
                fieldRules: {
                    username: [{required: true, message: "请输入姓名", trigger: "blur"}],
                    roleIds: [{required: true, message: "请选择角色", trigger: "blur"}]
                },
                formLabelWidth: "140px",
                userId: "",
            }
        },
        mounted() {
            this.getRoleList();
            this.getData();
        },
        methods: {
            roleListFormat(row, column) {
                let list = row[column.property];
                let roleName = [];
                list.forEach(item => {
                    roleName.push(item.name);
                })
                return roleName.join(",");
            },
            getRoleList() {
                // 查询自己所有的标签
                this.$api.sys.getAllRoleList().then(res => {
                    if (res.code === 0) {
                        this.roleList = res.data;
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
                    roleIds: this.roleIds.join(","),
                };
                this.$api.sys.getUserList(params).then(res => {
                    if (res.code === 0) {
                        this.userList = res.data.records;
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
            closeDiaLog() {
                this.userId = "";
                this.form.roleIds = [];
                this.form.username = "";
                this.$refs['userForm'].resetFields();
            },
            editUser(row) {
                this.visible = true;
                this.$nextTick(()=>{
                    row.roleList.forEach(item => {
                        this.form.roleIds.push(item.id);
                    })
                    this.userId = row.id;
                    this.form.username = row.username;
                })
            },
            deleteUser(userId) {
                this.$confirm("此操作将永久删除用户信息, 是否继续?", "提示", {
                    type: "warning"
                })
                    .then(() => {
                        this.$api.sys.deleteUserById({userId}).then(res => {
                            if (res.code === 0) {
                                this.$message({
                                    type: "success",
                                    message: "删除成功!"
                                });
                                this.getData();
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
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        let params = {
                            userId: this.userId,
                            name: this.form.username,
                            roleIds: this.form.roleIds.join(","),
                        };
                        this.$api.sys.saveUser(params).then(res => {
                            if (res.code === 0) {
                                this.$message({
                                    type: "success",
                                    message: "保存成功!"
                                });
                                this.visible = false;
                                this.getData();
                            } else {
                                this.$message.error({
                                    message: res.message
                                });
                            }
                        });
                    } else {
                        return false;
                    }
                });
            },
        }
    };
</script>

<style scoped lang="scss">
</style>
