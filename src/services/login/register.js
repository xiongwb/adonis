/**
 * Created by zhangle on 2017/6/5.
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
// 注册
export function Reg(params) {
  return request('/api/register/reg', 'POST', params);
}
// 设置交易密码
export function UpdateTranPswd(params) {
  return request('/api/register/updateTranPswd', 'POST', params);
}
// 登录
export function login(params) {
  return request('/api/login/sign_in', 'POST', params);
}
