/**
 * Created by cyt on 2017/6/7.
 */
import request from '../../utils/request';

// 我的基本信息
export function getInfo(params) {
  return request('/api/myInfo/getInfo', 'POST', params);
}
