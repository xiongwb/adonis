/**
 * Created by zhangle on 2017/6/5.
 */

import {
  message,
} from 'antd';
import { browserHistory } from 'react-router';
import * as service from '../../services/login/login';
import { setLocalStorage } from '../../utils/helper';
import Storage from '../../utils/storage';

export default {
  namespace: 'login',
  state: {
    data: [],
    retCode: 0,
  },
  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    },
    que(state, action) {
      return { ...state, ...action.payload };
    },
  },
  effects: {
    *login({ payload }, { call }) {
      console.log(payload);
      const { data } = yield call(service.login, payload);
      console.log(data, 222);
      if (data && data.retCode === 1) {
        setLocalStorage(Storage.DID_LOGIN, data);
        browserHistory.push('/');
      } else if (data) {
        message.error(data.retMsg);
      } else {
          // status ！= 200
        message.error('请检查您的网络');
      }
    },
  },
};
