/**
 * Created by cyt on 2017/6/7.
 */
import {
  message,
} from 'antd';
import { browserHistory } from 'react-router';
import * as service from '../../services/payment_pwd/set_pwd';
import { getLocalStorage } from '../../utils/helper';
import Storage from '../../utils/storage';

export default {
  namespace: 'setPwd',
  state: {
    data: [],
    pwd1: '',
    pwd2: '',
    m: 0,
    varCode: '',
    disabled: true,
  },
  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    },
  },
  effects: {
    // 发送短信验证
    *get({ payload }, { call }) {
      console.log(payload, 222);
      const { data } = yield call(service.get, payload);
      console.log(data, 222);
      if (data && data.retCode) {
        message.success(data.retMsg);
      } else if (data) {
        message.error(data.retMsg);
      } else {
          // status ！= 200
        message.error('请检查您的网络');
      }
    },
    // 验证手机验证码是否正确
    *validateVarCode({ payload }, { call, put, select }) {
      console.log(11111, 222);
      const newPswd = yield select(({ setPwd }) => setPwd.pwd2);
      const { data } = yield call(service.validateVarCode, payload);
      console.log(data, 222);
      if (data && data.retCode === 1) {
        yield put({
          type: 'updateTranPswd',
          payload: {
            checkCode: data.map.checkCode,
            type: 1,
            newPswd,
            token: data.token,
            telno: getLocalStorage(Storage.DID_LOGIN).retMsg,
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
