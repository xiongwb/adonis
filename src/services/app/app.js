/**
 * Created by zhangle on 2017/6/6.
 */


import request from '../../utils/request';
// 热门推荐
export function Prdinfolist(params) {
  return request('/api/invest/getPrdinfoList', 'POST', params);
}
export function Signout(params) {
  return request('/api/login/sign_out', 'POST', params);
}
export function GetLoginStatus(params) {
  return request('/api/login/getLoginStatus', 'POST', params);
}
// 用户签到
export function Seal(params) {
  return request('/api/index/seal', 'POST', params);
}
// 投资
export function DoInvest(params) {
  return request('/api/invest/doInvest', 'POST', params);
}
// 获取基本信息
export function GetInfo(params) {
  return request('/api/myInfo/getInfo', 'POST', params);
}
// 验证交易密码
export function ValidateTranPswd(params) {
  return request('/api/invest/validateTranPswd', 'POST', params);
}
// 投资验证
export function ValidateInv(params) {
  return request('/api/invest/validateInv', 'POST', params);
}
// 资产负债总览
export function Myasset(params) {
  return request('/api/myAsset/asset_total', 'POST', params);
}
// 查看产品详情
export function GetPrdinfo(params) {
  return request('/api/invest/getPrdinfo', 'POST', params);
}
