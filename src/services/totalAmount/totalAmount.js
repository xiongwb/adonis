/**
 * Created by zhangle on 2017/6/8.
 */
import request from '../../utils/request';

export function GetMyInfo(params) {
  return request('/api/login/getMyInfo', 'POST', params);
}
