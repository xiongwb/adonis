/**
 * Created by zhangle on 2017/6/6.
 */

import { message } from 'antd';
import { browserHistory } from 'react-router';
import { hexMD5 } from '../../utils/md5';
import * as service from '../../services/login/forgetpwd';

export default {
  namespace: 'forgetpwd', // 唯一的
  state: {
    data: [],
    retCode: 0,
    date: [],
    setup: [],

  },
  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    },
    query(state, action) {
      return { ...state, ...action.payload, loading: true };
    },
    query1(state, action) {
      return { ...state, ...action.payload, loading: true };
    },
    query2(state, action) {
      console.log(action, 12);
      return { ...state, ...action.payload, loading: true };
    },
  },

  effects: {

    // 发送验证码
    *Get({ payload }, { call, put }) {
      const { data } = yield call(service.Get, payload);
      console.log(data, 123121);
      if (data && data.retCode === 1) {
        yield put({
          type: 'query1',
          payload: {
            data,
          },
        });
        message.success('发送成功');
      } else if (data) {
        message.error(data.retMsg);
      } else {
        // status ！= 200
        message.error('请检查您的网络');
      }
    },

    // 验证密码
    *ValidateVarCode({ payload }, { call, put, select }) {
      console.log(payload, 11111111111);
      payload.token = yield select(({ forgetpwd }) => forgetpwd.data.token);
      const { data } = yield call(service.ValidateVarCode, payload);
      if (data && data.retCode === 1) {
        console.log(data, 222222222222);
        message.success('验证成功');
        yield put({
          type: 'Findpswd',
          payload: {
            phoneNo: payload.phoneNo,
            newPswd: hexMD5(payload.newPswd),
            checkCode: data.map.checkCode,
            token: data.token,
          },
        });
      } else if (data) {
        message.error(data.retMsg);
      } else {
        // status ！= 200
        message.error('请检查您的网络');
      }
    },
// 忘记密码
    *Findpswd({ payload }, { call }) {
      console.log(payload, 1111111);
      const { data } = yield call(service.Findpswd, payload);
      console.log(data, 123121);
      if (data && data.retCode === 1) {
        browserHistory.push('/login');
      } else if (data) {
        message.error(data.retMsg);
      } else {
        // status ！= 200
        message.error('请检查您的网络');
      }
    },
  },

};
