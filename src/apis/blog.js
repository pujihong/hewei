import http from "../plugins/axios";

// 查询自己所有的标签
export function getUserAllBlogLabelList(params) {
  return http.post("/blog/getUserAllBlogLabelList", params);
}

// 保存博客
export function saveBlogArticle(params) {
  return http.post("/blog/saveBlogArticle", params);
}

// 分页查询博客列表
export function getUserBlogArticleList(params) {
  return http.post("/blog/getUserBlogArticleList", params);
}

// 查询博客详情
export function getBlogArticleById(params) {
  return http.post("/blog/getBlogArticleById", params);
}

// 删除博客信息
export function deleteBlogArticleById(params) {
  return http.post("/blog/deleteBlogArticleById", params);
}

// 发布博客信息
export function saveBlogArticlePublishById(params) {
  return http.post("/blog/saveBlogArticlePublishById", params);
}