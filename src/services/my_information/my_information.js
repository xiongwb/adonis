/**
 * Created by cyt on 2017/6/8.
 */
import request from '../../utils/request';

// 我的基本信息
export function getInfo(params) {
  return request('/api/myInfo/getInfo', 'POST', params);
}
// 修改我的基本信息
export function updInfo(params) {
  return request('/api/myInfo/updInfo', 'POST', params);
}
// 退出登陆
export function signout(params) {
  return request('/api/login/sign_out', 'POST', params);
}
