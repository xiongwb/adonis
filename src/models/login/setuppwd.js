/**
 * Created by zhangle on 2017/5/22.
 */
import { message } from 'antd';
import { browserHistory } from 'react-router';
import * as service from '../../services/login/setuppwd';
import { getLocalStorage } from '../../utils/helper';
import Storage from '../../utils/storage';

export default {
  namespace: 'setuppwd', // 唯一的
  state: {
    data: [],
    retCode: 0,
    phoneno: [],
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
      return { ...state, ...action.payload, loading: true };
    },
  },

  effects: {

    // 发送验证码
    *Get({ payload }, { call, put }) {
      const { data } = yield call(service.Get, payload);
      if (data && data.retCode === 1) {
        message.success('发送成功');
        yield put({
          type: 'ValidateVarCode',
          payload: {
            phoneNo: getLocalStorage(Storage.DID_LOGIN).retMsg,
            varCode: 123456,
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

    // 验证密码
    *ValidateVarCode({ payload }, { call, put }) {
      const { data } = yield call(service.ValidateVarCode, payload);
      if (data && data.retCode === 1) {
        message.success('验证成功');
        yield put({
          type: 'query',
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
// 设置交易密码
    *UpdateTranPswd({ payload }, { call, select }) {
      payload.token = yield select(({ setuppwd }) => setuppwd.data.token);
      const { data } = yield call(service.UpdateTranPswd, payload);
      if (data && data.retCode === 1) {
        browserHistory.push('/');
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
        if (location.pathname === '/setuppwd') {
          dispatch({
            type: 'Get',
            payload: {
              tenantNo: 1101001001,
              phoneNo: getLocalStorage(Storage.DID_LOGIN).retMsg,
              flag: 5,
            },
          });
        }
      });
    },
  },

};
