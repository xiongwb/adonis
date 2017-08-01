/**
 * Created by cyt on 2017/6/7.
 */
import request from '../../utils/request';
// 设置交易密码
export function updateTranPswd(params) {
  return request('/api/register/updateTranPswd', 'POST', params);
}
// 发送短信验证
export function get(params) {
  return request('/api/varCode/get', 'POST', params);
}
// 验证手机验证码是否正确
export function validateVarCode(params) {
  return request('/api/varCode/validateVarCode ', 'POST', params);
}
