import http from "../plugins/axios";

export function login(params) {
  return http.post("/sys/user/login", params);
}

export function logout() {
  return http.get("/sys/user/logout");
}

// 查找导航菜单树
export function getUserMenu(params) {
  return http.post("/sys/menu/getUserMenu", params);
}
