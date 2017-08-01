/**
 * Created by zhangle on 2017/5/16.
 */
import request from '../../utils/request';
// 融资申请的接口
export function Finapply(params) {
  return request('/api/finApply/fin_apply', 'POST', params);
}
export function Finadvertise(params) {
  return request('/api/finApply/getFinAdvertise', 'POST', params);
}
