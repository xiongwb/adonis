/**
 * Created by cyt on 2017/6/8.
 */

import {
  message,
} from 'antd';
import { browserHistory } from 'react-router';
import * as service from '../../services/my_information/my_information';
import { getLocalStorage } from '../../utils/helper';
import Storage from '../../utils/storage';

export default {
  namespace: 'myInformation',
  state: {
    data: [],
    obj: {},
  },
  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    },
  },
  effects: {
    // 获取我的信息数据
    *getInfo({ payload }, { call, put }) {
      console.log(11111, 222);
      const { data } = yield call(service.getInfo, payload);
      console.log(data, 222);
      if (data && data.retCode === 1) {
        const obj = {
          nickname: data.nickname,
          wechat: data.wechat,
          qq: data.qq,
          email: data.email,
          income: data.income,
          address: data.address,
          invexp: data.invexp,
        };
        yield put({
          type: 'save',
          payload: {
            data,
            obj,
          },
        });
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
    *updInfo({ payload }, { call, put }) {
      const { data } = yield call(service.updInfo, payload);
      console.log(data);
      if (data && data.retCode === 1) {
        browserHistory.push('/login');
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
    *signout({ payload }, { call, put }) {
      const { data } = yield call(service.signout, payload);
      console.log(data);
      if (data && data.retCode === 1) {
        message.success(data.retMsg);
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
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen((location) => {
        if (location.pathname === '/my_information') {
          dispatch({
            type: 'getInfo',
            payload: {
              telno: getLocalStorage(Storage.DID_LOGIN).retMsg,
            },
          });
        }
      });
    },
  },
};

