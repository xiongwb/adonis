/**
 * Created by cyt on 2017/6/6.
 */
import request from '../../utils/request';
// 银行可列表
export function bindList(params) {
  return request('/api/bindCard/bindList', 'POST', params);
}
// 验证交易密码
export function validateTranPswd(params) {
  return request('/api/invest/validateTranPswd', 'POST', params);
}
// 计算费用
export function getFee(params) {
  return request('/api/invest/getFee', 'POST', params);
}
// 充值
export function withdrawals(params) {
  return request('/api/invest/withdrawals', 'POST', params);
}
// 资产负债总览
export function assetTotal(params) {
  return request('/api/myAsset/asset_total', 'POST', params);
}
