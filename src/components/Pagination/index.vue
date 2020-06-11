<template>
  <div class="pagination">
    <el-pagination
      @current-change="handleCurrentChange"
      @size-change="handleSizeChange"
      :page-sizes="pageSizesArr"
      :total="total"
      :current-page="currentPage"
      :page-size="pageSize"
      :layout="layout"
    ></el-pagination>
  </div>
</template>

<script>
export default {
  name: "Pagination",
  props: {
    // 总页数
    total: {
      type: Number,
      default: 0
    },
    // 当前页
    currentPage: {
      type: Number,
      default: 1
    },
    // 每页显示条数
    pageSize: {
      type: Number,
      default: 10
    },
    pageSizesArr: {
      type: Array,
      default() {
        return [10, 20, 30, 50];
      }
    },
    layout: {
      type: String,
      default: "total, sizes, prev, pager, next, jumper"
    }
  },
  data() {
    return {
      page: {
        _pageSize: this.pageSize,
        _currentPage: this.currentPage
      }
    };
  },
  methods: {
    //  每页查看条数变化
    handleSizeChange(val) {
      console.log(val);
      this.page._pageSize = val;
      this.$emit("pageChange", this.page);
    },
    // 当前页码变化
    handleCurrentChange(val) {
      this.page._currentPage = val;
      this.$emit("pageChange", this.page);
    }
  }
};
</script>

<style scoped lang="scss">
.pagination {
  margin: 20px 0;
}
</style>
