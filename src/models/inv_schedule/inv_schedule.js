/**
 * Created by zhangle on 2017/6/5.
 */

import {
  message,
} from 'antd';
import * as service from '../../services/inv_schedule/inv_schedule';
import { getLocalStorage } from '../../utils/helper';
import Storage from '../../utils/storage';

export default {
  namespace: 'invSchedule',
  state: {
    data: [],
  },
  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    },
  },
  effects: {
    // 申请进度查询
    *transAppProgress({ payload }, { call, put }) {
      const { data } = yield call(service.transAppProgress, payload);
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
        if (location.pathname === '/inv_schedule') {
          dispatch({
            type: 'transAppProgress',
            payload: {
              telNo: getLocalStorage(Storage.DID_LOGIN).retMsg,
            },
          });
        }
      });
    },
  },
};

