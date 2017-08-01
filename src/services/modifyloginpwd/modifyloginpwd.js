/**
 * Created by zhangle on 2017/6/6.
 */


import request from '../../utils/request';
// 发送验证码
export function Get(params) {
  return request('/api/varCode/get', 'POST', params);
}
// 验证验证码
export function ValidateVarCode(params) {
  return request('/api/varCode/validateVarCode', 'POST', params);
}

// 修改登录密码
export function UpdatePswd(params) {
  return request('/api/register/updatePswd', 'POST', params);
}
