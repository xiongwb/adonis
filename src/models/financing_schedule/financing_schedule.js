/**
 * Created by cyt on 2017/6/7.
 */

import {
  message,
} from 'antd';
import * as service from '../../services/financing_schedule/financing_schedule';
import { getLocalStorage } from '../../utils/helper';
import Storage from '../../utils/storage';

export default {
  namespace: 'financingSchedule',
  state: {
    data: [],
  },
  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    },
  },
  effects: {
    // 融资进度查询
    *finAppProgress({ payload }, { call, put }) {
      const { data } = yield call(service.finAppProgress, payload);
      console.log(data, 123456);
      if (data && data.retCode === 1) {
        yield put({
          type: 'save',
          payload: {
            data,
          },
        });
      } else if (data) {
        message.error(data.retMsg);
        yield put({
          type: 'save',
          payload: {
            data,
          },
        });
      } else {
        // status ！= 200
        message.error('请检查您的网络');
      }
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen((location) => {
        if (location.pathname === '/financing_schedule') {
          dispatch({
            type: 'finAppProgress',
            payload: {
              telNo: getLocalStorage(Storage.DID_LOGIN).retMsg,
            },
          });
        }
      });
    },
  },
};

