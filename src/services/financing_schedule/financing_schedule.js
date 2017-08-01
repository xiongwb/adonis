/**
 * Created by cyt on 2017/6/7.
 */
import request from '../../utils/request';
// 融资申请进度
export function finAppProgress(params) {
  return request('/api/finApply/finAppProgress', 'POST', params);
}
