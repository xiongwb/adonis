/**
 * Created by cyt on 2017/6/6.
 */
import request from '../../utils/request';

// 银行可列表
export function bindList(params) {
  return request('/api/bindCard/bindList', 'POST', params);
}
