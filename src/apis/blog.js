import http from "../plugins/axios";

// 查询自己所有的标签
export function getUserBlogLabel(params) {
  return http.post("/blog/getUserBlogLabel", params);
}

// 保存博客
export function saveBlogArticle(params) {
  return http.post("/blog/saveBlogArticle", params);
}