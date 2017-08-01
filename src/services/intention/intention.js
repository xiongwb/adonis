/**
 * Created by cyt on 2017/6/8.
 */
import request from '../../utils/request';
// 转让申请进度
export function invInt(params) {
  return request('/api/invInt/save ', 'POST', params);
}

