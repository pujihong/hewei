<template>
  <!--<div>
    <div v-html="value"></div>
  </div>-->
  <div>
    <el-table :data="articleList" style="width: 100%;" stripe>
      <el-table-column type="index" label="序号" width="80"></el-table-column>
      <el-table-column
        prop="title"
        label="标题"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="createTime"
        label="日期"
        :formatter="dateFormat"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="description"
        label="描述"
        align="center"
      ></el-table-column>
      <el-table-column
        prop="content"
        label="内容"
        align="center"
      ></el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.row.id)"
            >编辑</el-button
          >
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.row.id)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import moment from "moment";

export default {
  name: "Article",
  data() {
    return {
      articleList: []
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    getData() {
      this.$api.blog.getUserBlogArticleList().then(res => {
        if (res.code === 0) {
          this.articleList = res.data.records;
        } else {
          this.$message.error({
            message: res.message
          });
        }
      });
    },
    dateFormat(row, column) {
      var date = row[column.property];
      if (date === undefined) {
        return "";
      }
      return moment(date).format("YYYY-MM-DD");
    },
    handleEdit(articleId) {
      this.$router.push({
        name: "writeBlog",
        params: { articleId: articleId }
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
    }
  }
};
</script>

<style scoped lang="scss">
.my-profile-box {
  box-sizing: border-box;
  height: 400px;
  border: 1px solid #eaeaea;
  box-shadow: 0 2px 5px 0 rgba(33, 22, 22, 0.2),
    0 2px 10px 0 rgba(0, 0, 0, 0.12);
  padding: 15px;
}
</style>
