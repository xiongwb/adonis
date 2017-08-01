/**
 * Created by zhangle on 2017/6/5.
 */
import { message } from 'antd';
import { browserHistory } from 'react-router';
import * as service from '../../services/login/register';
import { setLocalStorage } from '../../utils/helper';
import { hexMD5 } from '../../utils/md5';
import Storage from '../../utils/storage';

export default {
  namespace: 'register',
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
    // 注册
    *Reg({ payload }, { call, put }) {
      const { data } = yield call(service.Reg, payload);
      if (data && data.retCode === 1) {
        message.success('注册成功');
        yield put({
          type: 'query2',
          payload: {
            data,
            setup: payload,
          },
        });
        yield put({
          type: 'login',
          payload: {
            tenantNo: 1101001001,
            phoneNo: payload.loginNo,
            pswd: payload.pswd,
          },
        });
      } else if (data) {
        message.error(data.retMsg);
      } else {
          // status ！= 200
        message.error('请检查您的网络');
      }
    },
    // 发送验证码
    *Get({ payload }, { call, put }) {
      const { data } = yield call(service.Get, payload);
      if (data && data.retCode === 1) {
        yield put({
          type: 'query1',
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

    // 验证密码
    *ValidateVarCode({ payload }, { call, put, select }) {
      payload.token = yield select(({ register }) => register.data.token);
      const { data } = yield call(service.ValidateVarCode, payload);
      console.log(data, 1111111);
      if (data && data.retCode === 1) {
        yield put({
          type: 'Reg',
          payload: {
            checkCode: data.map.checkCode,
            token: data.token,
            tenantNo: 1101001001,
            loginNo: payload.phoneNo,
            pswd: hexMD5(payload.password),
            channel: '3',
            nickName: payload.nickName,
            inviteCode: payload.inviteCode,
            certNo: payload.certNo,
            cusName: payload.cusName,
            cusType: payload.cusType,
          },
        });
      } else if (data) {
        message.error(data.retMsg);
      } else {
          // status ！= 200
        message.error('请检查您的网络');
      }
    },
    *login({ payload }, { call }) {
      const { data } = yield call(service.login, payload);
      if (data && data.retCode === 1) {
        console.log(data, 11111111113333333);
        setLocalStorage(Storage.DID_LOGIN, data);
        browserHistory.push('/setuppwd');
      } else if (data) {
        message.error(data.retMsg);
      } else {
          // status ！= 200
        message.error('请检查您的网络');
      }
    },

  },


};
