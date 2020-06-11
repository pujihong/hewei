import * as sys from "./sys";
import * as blog from "./blog";

// 后台服务器地址 http://101.200.125.41:8080/
export const baseUrl = "http://localhost:8088/pujh";
// 服务器
// export const baseUrl = "http://101.200.125.41/pujh";
// mock
export const mockUrl = "http://localhost:9000";

export default {
  sys,
  blog
};
