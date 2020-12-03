/*
 * @Author: seven
 * @Date: 2020-11-10 19:18:24
 * @LastEditTime: 2020-11-14 16:01:20
 * @LastEditors: seven
 * @Description:
 * @FilePath: \BH_Middle_ground\OrganizationManger\src\api\api.js
 * @symbol_custom_string_obkoro1: 博虹出品，抄袭必究😄
 */
import request from "@/plugin/axios";

export function getOrglist(query) {
  return request({
    url: "/app-provider/v1/client/search",
    method: "get",
    params: query,
  });
}

export function createOrg(data) {
  return request({
    url: "/org-provider/v1/org/create",
    method: "post",
    data,
  });
}

//获取新闻列表
export function getList(params) {
  return request({
    url: "/getWangYiNews",
    method: "get",
    params: params,
  });
}

//获取段子列表
export function getJokeList(params) {
  return request({
    url: "/getJoke",
    method: "get",
    params: params,
  });
}
