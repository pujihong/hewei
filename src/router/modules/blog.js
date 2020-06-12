import BlogIndex from "@/views/blog/Index.vue";

const blogRoutes = {
  path: "/blog",
  component: BlogIndex,
  children: [
    {
      path: "index",
      component: () => import("@/views/blog/Header.vue"),
      children: [
        {
          path: "",
          name: "BLogHome",
          component: () => import("@/views/blog/Home.vue")
        }
      ]
    },
    {
      path: "articleContent",
      name: "articleContent",
      component: () => import("@/views/blog/ArticleContent.vue")
    },
    {
      path: "writeArticle",
      name: "writeArticle",
      component: () => import("@/views/blog/WriteArticle.vue")
    }
  ]
};
export default blogRoutes;
