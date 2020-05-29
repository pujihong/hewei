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
      path: "writeBlog",
      name: "writeBlog",
      component: () => import("@/views/blog/WriteBlog.vue")
    }
  ]
};
export default blogRoutes;
