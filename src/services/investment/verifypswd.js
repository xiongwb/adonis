/**
 * Created by zhangle on 2017/6/19.
 */

import request from '../../utils/request';
// 投资
export function DoInvest(params) {
  return request('/api/invest/doInvest', 'POST', params);
}

// 验证交易密码
export function ValidateTranPswd(params) {
  return request('/api/invest/validateTranPswd', 'POST', params);
}

