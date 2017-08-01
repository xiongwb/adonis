/**
 * Created by zhangle on 2017/6/8.
 */

import request from '../../utils/request';
// 协议获取查看
export function Finapply(params) {
  return request('/api/finApply/protocol_get', 'POST', params);
}
