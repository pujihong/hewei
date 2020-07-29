<template>
  <div class="pd-12">
    <!-- 筛选 -->
    <div class="text-left">
      <el-input v-model="title" style="width: 180px;" placeholder="请输入标题" clearable></el-input>
      <el-date-picker class="mg-l-10" style="width: 320px;"
        v-model="date"
        type="daterange"
        align="center"
        unlink-panels
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        :picker-options="pickerOptions">
      </el-date-picker>
      <el-select class="mg-l-10" clearable style="width: 180px;" v-model="labelIds" multiple placeholder="选择标签">
        <el-option
          v-for="item in labelList"
          :key="item.id"
          :label="item.name"
          :value="item.id">
        </el-option>
      </el-select>
      <el-select class="mg-l-10" clearable style="width: 180px;" v-model="boolPublish" placeholder="是否发布">
        <el-option
          v-for="item in boolList"
          :key="item.value"
          :label="item.text"
          :value="item.value">
        </el-option>
      </el-select>
      <el-button class="mg-l-10" type="primary" @click="getData">
        <i class="el-icon-search"></i> 查询</el-button>
    </div>
    <!--工具条-->
    <div class="mg-t-20">
      <div class="text-left">
        <el-button type="primary" plain @click="writeArticle" size="medium">
          <i class="el-icon-edit"></i> 写博客
        </el-button>
        <el-button type="primary" plain @click="handleLabel" size="medium">标签管理</el-button>
      </div>
    </div>
    <el-table class="mg-t-10" :data="articleList" border style="width: 100%;" stripe>
      <el-table-column type="index" label="序号" width="100" align="center"></el-table-column>
      <el-table-column prop="title" label="标题" align="center" :show-overflow-tooltip="true" width="240"></el-table-column>
      <el-table-column prop="labelName" label="标签"  align="center" width="120"></el-table-column>
      <el-table-column prop="createTime" label="日期" sortable :formatter="dateFormat" align="center" width="120"></el-table-column>
      <el-table-column prop="boolPublish" label="发布" align="center" :formatter="boolFormat" width="120"></el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button size="mini" plain @click="handleDetail(scope.row.id)">查看</el-button>
          <el-button size="mini" type="primary" plain @click="handleEdit(scope.row.id)">编辑</el-button>
          <el-button v-if="scope.row.boolPublish === 0" size="mini" type="success" plain @click="handlePublish(scope.row.id)">发布</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <Pagination :total="total" :pageNum="pageNum" :pageSize="pageSize" @pageChange="pageChange"/>

    <el-dialog :visible.sync="labelVisible"  title="标签管理 " append-to-body @close="refreshData" >
       <Label @refreshData="refreshData"></Label>
    </el-dialog>
  </div>
</template>
<script>
import moment from "moment";
import pickerOptions from "@/plugins/datePIckerOptions";
import Label from "./Label"

export default {
  name: "Article",
  components: {
    Label
  },
  data() {
    return {
      articleList: [],
      pageSize: 10,
      pageNum: 1,
      total: 0,
      title: "",
      labelIds: [], // 支持多选
      labelList: [],
      boolPublish: "",
      boolList: [
        { value: 0, text: "否" },
        { value: 1, text: "是" }
      ],
      date: "",
      pickerOptions: pickerOptions,
      labelVisible: false
    };
  },
  mounted() {
    this.getLabelData();
    this.getData();
  },
  methods: {
    getLabelData() {
      // 查询自己所有的标签
      this.$api.blog.getUserAllBlogLabelList().then(res => {
        if (res.code === 0) {
          this.labelList = res.data;
          // 增加没有标签的选择
          let label = {
            id: -1,
            name: " "
          }
          this.labelList.unshift(label);
        } else {
          this.$message.error({
            message: res.message
          });
        }
      });
    },
    getData() {
      let startDate = "";
      let endDate = "";
      if (this.date) {
        startDate = this.date[0];
        endDate = this.date[1];
      }
      let params = {
        pageNum: this.pageNum,
        pageSize: this.pageSize,
        title: this.title,
        boolPublish: this.boolPublish,
        labelIds: this.labelIds.join(","),
        startDate: startDate,
        endDate: endDate
      };
      this.$api.blog.getUserBlogArticleList(params).then(res => {
        if (res.code === 0) {
          this.articleList = res.data.records;
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
    dateFormat(row, column) {
      let date = row[column.property];
      if (date === undefined) {
        return "";
      }
      return moment(date).format("YYYY-MM-DD");
    },
    boolFormat(row, column) {
      let bool = row[column.property];
      return bool === 0 ? "否" : "是";
    },
    handleEdit(articleId) {
      this.$router.push({
        name: "writeArticle",
        params: { articleId: articleId }
      });
    },
    handleDetail(articleId) {
      this.$router.push({
        name: "articleContent",
        params: { articleId: articleId }
      });
    },
    handlePublish(articleId) {
      this.$confirm("是否发布文章?", "提示", {
        type: "warning"
      })
        .then(() => {
          this.$api.blog.saveBlogArticlePublishById({ articleId }).then(res => {
            if (res.code === 0) {
              this.$message({
                type: "success",
                message: "发布成功!"
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
            message: "已取消发布"
          });
        });
    },
    handleDelete(articleId) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        type: "warning"
      })
        .then(() => {
          this.$api.blog.deleteBlogArticleById({ articleId }).then(res => {
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
    writeArticle() {
      this.$router.push("/blog/writeArticle");
    },
    handleLabel() {
       this.labelVisible = true;
    },
    // 删除标签后刷新列表
    refreshData() {
      this.labelVisible = false;
      this.getLabelData();
      this.getData();
    }
  }
};
</script>

<style scoped lang="scss">
</style>
