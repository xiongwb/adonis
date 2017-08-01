/**
 * Created by cyt on 2017/6/8.
 */
import request from '../../utils/request';
// 提现记录
export function drawList(params) {
  return request('/api/myDraw/drawList', 'POST', params);
}

