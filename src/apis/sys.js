import http from "../plugins/axios";

export function login(params) {
    return http.post("/sys/user/login", params);
}

export function logout(params) {
    return http.get("/sys/user/logout", params);
}

// 分页查询用户列表
export function getUserList(params) {
    return http.post("/sys/user/getUserList", params);
}

//  ---------------角色相关接口----------------
// 查询全部可用角色列表
export function getAllRoleList(params) {
    return http.get("/sys/role/getAllRoleList", params);
}
// 分页查询角色信息列表
export function getRoleList(params) {
    return http.post("/sys/role/getRoleList", params);
}

//  ---------------菜单相关接口----------------
// 查找导航菜单树 根据用户id查
export function getUserMenu(params) {
    return http.post("/sys/menu/getUserMenu", params);
}

// 查询菜单的级别列表
export function getMenuLevelList(params) {
    return http.get("/sys/menu/getMenuLevelList", params);
}

// 分页查询菜单信息列表
export function getMenuList(params) {
    return http.post("/sys/menu/getMenuList", params);
}

// 保存菜单 只提供编辑菜单名称
export function saveMenu(params) {
    return http.post("/sys/menu/saveMenu", params);
}
