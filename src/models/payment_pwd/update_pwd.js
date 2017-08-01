/**
 * Created by cyt on 2017/6/7.
 */
import {
  message,
} from 'antd';
import { browserHistory } from 'react-router';
import * as service from '../../services/payment_pwd/set_pwd';


export default {
  namespace: 'updatePwd',
  state: {
    data: [],
    pwd1: '',
    pwd2: '',
    pwd3: '',
    disabled: true,
  },
  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    },
  },
  effects: {
    // 修改交易密码
    *updateTranPswd({ payload }, { call, put }) {
      console.log(11111, 222);
      const { data } = yield call(service.updateTranPswd, payload);
      console.log(data, 222);
      if (data && data.retCode === 1) {
        message.success(data.retMsg);
        browserHistory.push('/');
      } else {
        if (data) {
          message.error(data.retMsg);
        } else {
          // status ！= 200
          message.error('请检查您的网络');
        }
        yield put({
          type: 'hideLoad',
        });
      }
    },
  },
};
