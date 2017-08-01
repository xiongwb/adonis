/**
 * Created by cyt on 2017/6/8.
 */
import {
  message,
} from 'antd';

import * as service from '../../services/withdrawals_log/withdrawals_log';
import { getLocalStorage } from '../../utils/helper';
import Storage from '../../utils/storage';

export default {
  namespace: 'withdrawalsLog',
  state: {
    data: [],
  },
  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    },
  },
  effects: {
    // 提现记录
    *drawList({ payload }, { call, put }) {
      console.log(11111, 222);
      const { data } = yield call(service.drawList, payload);
      console.log(data, 222);
      if (data && data.retCode === 1) {
        yield put({
          type: 'save',
          payload: {
            data,
          },
        });
      } else if (data) {
        message.error(data.retMsg);
      } else {
          // status ！= 200
        message.error('请检查您的网络');
      }
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen((location) => {
        if (location.pathname === '/withdrawals_log') {
          dispatch({
            type: 'drawList',
            payload: {
              telno: getLocalStorage(Storage.DID_LOGIN).retMsg,
              pageNum: 0,
            },
          });
        }
      });
    },
  },
};

