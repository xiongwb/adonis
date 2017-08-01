/**
 * Created by zhangle on 2017/5/22.
 */
import { message } from 'antd';
// import { browserHistory } from 'react-router';
import * as service from '../../services/modifyloginpwd/modifyloginpwd';
import { getLocalStorage } from '../../utils/helper';
import Storage from '../../utils/storage';

export default {
  namespace: 'modifyloginpwd', // 唯一的
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
    que(state, action) {
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
      console.log(payload, 11111111111);
      const { data } = yield call(service.ValidateVarCode, payload);
      if (data && data.retCode === 1) {
        console.log(data, 222222222222);
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
// 修改登录密码
    *UpdatePswd({ payload }, { call, select }) {
      console.log(payload, 123121);
      payload.token = yield select(({ modifyloginpwd }) => modifyloginpwd.data.token);
      const { data } = yield call(service.UpdatePswd, payload);
      console.log(data, 123121);
      if (data && data.retCode === 1) {
        console.log(1111111);
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
        if (location.pathname === '/modifyloginpwd') {
          console.log(getLocalStorage(Storage.DID_LOGIN).retMsg, 1111111111);
          dispatch({
            type: 'Get',
            payload: {
              tenantNo: 1101001001,
              phoneNo: getLocalStorage(Storage.DID_LOGIN).retMsg,
              flag: 4,
            },
          });
        }
      });
    },
  },

};
