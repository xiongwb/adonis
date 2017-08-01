import request from '../../utils/request';

// 我的风险评估列表
export function riskList(params) {
  return request('/api/myRiskRcd/riskList', 'POST', params);
}
// 我的风险评估详情
export function riskDet(params) {
  return request('/api/myRiskRcd/riskDet', 'POST', params);
}
// 取风险评估模板
export function riskTemp(params) {
  return request('/api/myRiskRcd/riskTemp', 'POST', params);
}
// 取风险评估模板题目
export function riskTempDet(params) {
  return request('/api/myRiskRcd/riskTempDet', 'POST', params);
}
// 新增风险评估
export function newRiskRcd(params) {
  return request('/api/myRiskRcd/newRiskRcd', 'POST', params);
}
// 获取我的基本信息
export function getInfo(params) {
  return request('/api/myInfo/getInfo', 'POST', params);
}
