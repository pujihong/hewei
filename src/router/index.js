import Vue from "vue";
import VueRouter from "vue-router";
import Home from "@/views/Index.vue";
import Login from "@/views/login/Login.vue";
import NotFound from "@/views/error/404.vue";
import store from "@/store/index";
import api from "../apis";
import { Message } from "element-ui";
import blogRoutes from "./modules/blog";
import HelloWorld from "../components/HelloWorld";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    component: Home,
    // name: "首页",
    children: [
      {
        path: "",
        name: "首页",
        component: HelloWorld
      }
    ]
  },
  {
    path: "/login",
    name: "Login",
    component: Login
  },
  blogRoutes,
  {
    path: "/404",
    name: "404",
    component: NotFound
  },
  {
    path: "*",
    name: "NotFound",
    component: NotFound
  }
];

const router = new VueRouter({
  //  base: "hewei",
  mode: "history", //  去掉 http://localhost:8080/#的#
  routes
});

/**
 to: Route: 即将要进入的目标 路由对象
 from: Route: 当前导航正要离开的路由
 next: Function: 一定要调用该方法来 resolve 这个钩子。执行效果依赖 next 方法的调用参数。
 next(): 进行管道中的下一个钩子。如果全部钩子执行完了，则导航的状态就是 confirmed (确认的)。
 next(false): 中断当前的导航。如果浏览器的 URL 改变了 (可能是用户手动或者浏览器后退按钮)，那么 URL 地址会重置到 from 路由对应的地址。
 */

router.beforeEach((to, from, next) => {
  let token = sessionStorage.getItem("token");
  if (to.path === "/login") {
    // 如果是访问登录界面，如果用户会话信息存在，代表已登录过，跳转到主页
    if (token) {
      next({ path: "/" });
    } else {
      next();
    }
  } else {
    if (!token) {
      // 如果访问非登录界面，且户会话信息不存在，代表未登录，则跳转到登录界面
      next({ path: "/login" });
    } else {
      // 之前加载过菜单就不用加载了
      if (store.state.sys.menuRouteLoaded) {
        next();
      } else {
        // 加载动态菜单和路由
        addDynamicMenuAndRoutes(token, to, from);
        next();
      }
    }
  }
});

/**
 * 添加动态(菜单)路由
 * @param {*} menuList 菜单列表
 * @param {*} routes 递归创建的动态(菜单)路由
 */

function addDynamicRoutes(menuList, routes) {
  let temp = [];
  for (var i = 0; i < menuList.length; i++) {
    if (menuList[i].children && menuList[i].children.length >= 1) {
      temp = temp.concat(menuList[i].children);
    } else if (menuList[i].url && /\S/.test(menuList[i].url)) {
      let url = menuList[i].url;
      // 创建路由配置 url第一位必须带/
      if (url.substr(0, 1) !== "/") {
        url = "/" + url;
      }
      let route = {
        path: url,
        component: resolve => require([`@/views${url}`], resolve),
        name: menuList[i].name,
        meta: {
          icon: menuList[i].icon,
          index: menuList[i].id
        }
      };
      // 根据菜单URL动态加载vue组件，这里要求vue组件须按照url路径存储
      // 如url="sys/user"，则组件路径应是"@/views/sys/User.vue",否则组件加载不到
      routes.push(route);
    }
  }
  if (temp.length >= 1) {
    addDynamicRoutes(temp, routes);
  }
  return routes;
}

router.selfAddRoutes = function(params) {
  router.matcher = new VueRouter({ mode: "history", routes: [] }).matcher;
  router.addRoutes(params);
};
/**
 * 加载动态菜单和路由
 */
function addDynamicMenuAndRoutes(token) {
  api.sys.getUserMenuList({ token }).then(res => {
    if (res.code === 0) {
      let routeList = addDynamicRoutes(res.data, []);
      if (router.options.routes[0].children) {
        router.options.routes[0].children = router.options.routes[0].children.concat(
          routeList
        );
      } else {
        router.options.routes[0].children = routeList;
      }
      /**
       * 这样会重复添加路由
       */
      router.selfAddRoutes(router.options.routes);
      // 保存加载状态
      store.commit("menuRouteLoaded", true);
      // 保存菜单树
      store.commit("setAsideTree", res.data);
    } else {
      Message.error("获取菜单失败");
    }
  });
}

// Vue-router在3.1之后把$router.push()方法改为了Promise。所以假如没有回调函数，错误信息就会交给全局的路由错误处理，
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject)
    return originalPush.call(this, location, onResolve, onReject);
  return originalPush.call(this, location).catch(err => err);
};
export default router;
