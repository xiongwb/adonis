/**
 * Created by cyt on 2017/6/7.
 */

import request from '../../utils/request';
// 转让申请进度
export function transAppProgress(params) {
  return request('/api/myInv/transAppProgress', 'POST', params);
}

