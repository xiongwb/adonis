
import request from '../../utils/request';

// 我的融资记录列表
export function finList(params) {
  return request('/api/myFin/finList', 'POST', params);
}
// 获取每个融资记录的还款计划
export function repaymentList(params) {
  return request('/api/myFin/getFinPayPlan', 'POST', params);
}
// 获取还款计划的状态
export function getPrePayStatus(params) {
  return request('/api/myFin/getPrePayStatus', 'POST', params);
}
// 验证密码
export function validateTranPswd(params) {
  return request('/api/invest/validateTranPswd', 'POST', params);
}
// 还款
export function finPay(params) {
  return request('/api/myFin/finPay', 'POST', params);
}
// 还款：查询支付费用类型
export function getFeeType(params) {
  return request('/api/index/getDictList', 'POST', params);
}
// 还款：查询支付费用
export function getSumFee(params) {
  return request('/api/myFin/sumFee', 'POST', params);
}
// 还款：支付费用
export function finFee(params) {
  return request('/api/myFin/finFee', 'POST', params);
}
// 还款：提前结清申请
export function finPrePayApp(params) {
  return request('/api/myFin/finPrePayApp', 'POST', params);
}
// 提前结清还款
export function finPrePay(params) {
  return request('/api/myFin/finPrePay', 'POST', params);
}
