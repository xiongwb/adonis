/**
 * Created by zhangle on 2017/6/19.
 */

import { message } from 'antd';
import { browserHistory } from 'react-router';
import * as service from '../../services/investment/verifypswd';

export default {
  namespace: 'verifypswd', // 唯一的
  state: {
    data: [],
  },
  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    },
    query(state, action) {
      return { ...state, ...action.payload, loading: true };
    },
    findPrd(state, action) {
      return { ...state, ...action.payload };
    },
    hideLoad(state) {
      return { ...state, loading: false };
    },
    showLoad(state) {
      return { ...state, loading: true };
    },
  },
  effects: {
    // 投资
    *DoInvest({ payload }, { call, put }) {
      const { data } = yield call(service.DoInvest, payload);
      console.log(data, 123121);
      if (data && data.retCode === 1) {
        yield put({
          type: 'query1',
          payload: {
            data,
          },
        });
        browserHistory.push('/investment');
        message.error(data.retMsg);
      } else if (data) {
        message.error(data.retMsg);
      } else {
        // status ！= 200
        message.error('请检查您的网络');
      }
    },
    // 验证交易密码。
    *ValidateTranPswd({ payload }, { call, put }) {
      const { data } = yield call(service.ValidateTranPswd, payload);
      if (data && data.retCode === 1) {
        yield put({
          type: 'DoInvest',
          payload: {
            phoneNo: payload.telno,
            prdInfoID: payload.prdInfoID,
            channel: 2,
            money: payload.money,
            businessSeqNo: data.businessSeqNo,
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
};
