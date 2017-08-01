/**
 * Created by cyt on 2017/6/6.
 */
import request from '../../utils/request';

// 我的基本信息
export async function getInfo(params) {
  return request('/api/myInfo/getInfo', 'POST', params);
}

// 获取开户行
export function getBankList(params) {
  return request('/api/bindCard/getBankList', 'POST', params);
}

// 根据卡号获取开户行
export function getBankCode(params) {
  return request('/api/bindCard/getBankCode', 'POST', params);
}
// 取联行号
export function getInterBankNo(params) {
  return request('/api/bindCard/getInterBankNo', 'POST', params);
}
// 验证交易密码
export function validateTranPswd(params) {
  return request('/api/invest/validateTranPswd', 'POST', params);
}

// 绑卡
export async function bind(params) {
  return request('/api/bindCard/bind ', 'POST', params);
}
// 协议
export async function protocolget(params) {
  return request('/api/finApply/protocol_get', 'POST', params);
}
