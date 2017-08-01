import request from '../../utils/request';
// 投资
export function doInvest(params) {
  return request('/api/invest/doInvest', 'POST', params);
}
// 获取产品信息列表
export function getAllPrdinfoList(params) {
  return request('/api/invest/getAllPrdinfoList', 'POST', params);
}
// 我的投资记录列表
export function invList(params) {
  return request('/api/myInv/invList', 'POST', params);
}
// 获取单个产品信息
export function getPrdinfo(params) {
  return request('/api/invest/getPrdinfo', 'POST', params);
}
// 转让申请
export function transApp(params) {
  return request('/api/myInv/transApp', 'POST', params);
}
// 验证交易密码
export function validateTranPswd(params) {
  return request('/api/invest/validateTranPswd', 'POST', params);
}
