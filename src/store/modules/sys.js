export default {
  // 初始化状态
  state: {
    sysName: "何 为", // 应用名称
    themeColor: "rgb(63, 69, 54)", // 主题颜色
    oldThemeColor: "rgb(63, 69, 54)", // 上一次主题颜色
    collapse: false, // 导航栏收缩状态
    menuRouteLoaded: false, // 菜单和路由是否已经加载
    asideTree: [] // 菜单
  },
  // 相当于store的计算属性，数据源发生变化时，返回经过处理后的值，
  getters: {
    collapse(state) {
      // 对应着上面state
      return state.collapse;
    }
  },
  // 处理状态 类似于事件，对应的回调函数到状态进行处理，必须通过store.commit的方式手动触发
  mutations: {
    onCollapse(state) {
      // 改变收缩状态
      state.collapse = !state.collapse;
    },
    setThemeColor(state, themeColor) {
      // 改变主题颜色
      state.oldThemeColor = state.themeColor;
      state.themeColor = themeColor;
    },
    menuRouteLoaded(state, menuRouteLoaded) {
      // 改变菜单和路由的加载状态
      state.menuRouteLoaded = menuRouteLoaded;
    },
    setAsideTree(state, asideTree) {
      // 设置导航菜单树
      state.asideTree = asideTree;
    }
  },
  // 提交改变后的状态Action 类似于 mutation，不同在于：
  // Action 提交的是 mutation，而不是直接变更状态。
  // Action 可以包含任意异步操作。
  // 利用commit提交mutation,可以执行异步操作，通过 store.dispatch方式触发
  actions: {}
};
