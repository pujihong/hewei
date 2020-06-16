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

// 保存角色
export function saveRole(params) {
    return http.post("/sys/role/saveRole", params);
}
// 给角色授权
export function saveRoleMenu(params) {
    return http.post("/sys/role/saveRoleMenu", params);
}


//  ---------------菜单相关接口----------------
// 查找导航菜单树 根据用户id查
export function getUserMenuList(params) {
    return http.post("/sys/menu/getUserMenuList", params);
}

// 查询菜单的级别列表
export function getMenuLevelList(params) {
    return http.get("/sys/menu/getMenuLevelList", params);
}

// 查询系统所有菜单列表 树形
export function getAllMenuList(params) {
    return http.get("/sys/menu/getAllMenuList", params);
}

// 查询角色已有菜单列表
export function getRoleMenuList(params) {
    return http.post("/sys/menu/getRoleMenuList", params);
}

// 分页查询菜单信息列表
export function getMenuList(params) {
    return http.post("/sys/menu/getMenuList", params);
}

// 保存菜单 只提供编辑菜单名称
export function saveMenu(params) {
    return http.post("/sys/menu/saveMenu", params);
}


