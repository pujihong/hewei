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
          component: () => import("@/views/blog/Home.vue")
        }
      ]
    },
    {
      path: "writeBlog",
      component: () => import("@/views/blog/WriteBlog.vue")
    }
  ]
};
export default blogRoutes;
