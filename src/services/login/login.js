/**
 * Created by zhangle on 2017/6/5.
 */
import request from '../../utils/request';

export function login(params) {
  return request('/api/login/sign_in', 'POST', params);
}
