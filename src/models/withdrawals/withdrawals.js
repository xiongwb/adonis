import { message } from 'antd';
import { browserHistory } from 'react-router';
import * as service from '../../services/withdrawals/withdrawals';
import Storage from '../../utils/storage';
import { getLocalStorage } from '../../utils/helper';

export default {
  namespace: 'withdrawals',
  state: {
    data: [],
    money: '',
    transPswd: '',
    feeSum: '',
    card: '',
    number: '',
    quota: [],
    allMoney: '',
  },
  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    },
    hideLoad(state) {
      return { ...state, loading: false };
    },
    showLoad(state, action) {
      return { ...state, ...action.payload, loading: true };
    },
  },
  effects: {
    // 获取负债总览数据
    *assetTotal({ payload }, { call, put }) {
      const { data } = yield call(service.assetTotal, payload);
      console.log(data, 123456);
      if (data && data.retCode === 1) {
        yield put({
          type: 'save',
          payload: {
            quota: data,
          },
        });
      } else if (data) {
        message.error(data.retMsg);
      } else {
          // status ！= 200
        message.error('请检查您的网络');
      }
    },
    // 银行卡列表
    *bindList({ payload }, { call, put }) {
      const { data } = yield call(service.bindList, payload);
      console.log(data, 123456);
      if (data && data.retCode === 1) {
        let card;
        for (let i = 0; i < data.bindList.length; i++) {
          if (data.bindList[i].mainflag === '1') {
            card = data.bindList[i];
          }
        }
        console.log(card, 123456);
        yield put({
          type: 'save',
          payload: {
            data,
            card,
          },
        });
      } else if (data) {
        message.error(data.retMsg);
      } else {
        // status ！= 200
        message.error('请检查您的网络');
      }
    },
    // 密码验证1
    *validateTranPswd1({ payload }, { call, put, select }) {
      console.log(123456);
      if (payload.transPswd === '' || payload.money === '') {
        message.error('金额或密码不能为空');
        return;
      }
      payload.telno = getLocalStorage(Storage.DID_LOGIN).retMsg;
      console.log(payload, 123456);
      const { data } = yield call(service.validateTranPswd, payload);
      console.log(data, 123456);
      const feeSum = yield select(({ withdrawals }) => withdrawals.feeSum);
      if (data && data.retCode === 1) {
        if (feeSum) {
          payload.busiType = 'T99';
          yield put({
            type: 'validateTranPswd2',
            payload: {
              payload,
              data,
            },
          });
        } else {
          yield put({
            type: 'withdrawals',
            payload: {
              data,
              money: payload.money,
              businessSeqNo: '',
            },
          });
        }
      } else if (data) {
        message.error(data.retMsg);
      } else {
        // status ！= 200
        message.error('请检查您的网络');
      }
    },
    // 密码验证2
    *validateTranPswd2({ payload }, { call, put }) {
      const { data } = yield call(service.validateTranPswd, payload.payload);
      console.log(data, 123456);
      if (data && data.retCode === 1) {
        yield put({
          type: 'withdrawals',
          payload: {
            data: payload.data,
            money: payload.payload.money,
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
    // 计算费用
    *getFee({ payload }, { call, put }) {
      yield put({
        type: 'save',
        payload: {
          money: payload.money,
        },
      });
      console.log(payload, 123456);
      const { data } = yield call(service.getFee, payload);
      console.log(data, 123456);
      if (data && data.retCode === 1) {
        yield put({
          type: 'save',
          payload: {
            feeSum: data.feeSum,
          },

        });
      } else if (data) {
        message.error(data.retMsg);
      } else {
        // status ！= 200
        message.error('请检查您的网络');
      }
    },
    // 提现
    *withdrawals({ payload }, { call, select }) {
      const cardNo = yield select(({ withdrawals }) => withdrawals.card.acctno);
      const phoneNo = getLocalStorage(Storage.DID_LOGIN).retMsg;
      const { data } = yield call(service.withdrawals, { cardNo: cardNo,
        money: payload.money,
        phoneNo: phoneNo,
        businessSeqNo1: payload.data.businessSeqNo,
        businessSeqNo2: payload.businessSeqNo,
      });
      console.log(data, 7878787878);
      if (data && data.retCode === 1) {
        message.success(data.retMsg);
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
        if (location.pathname === '/withdrawals') {
          dispatch({
            type: 'bindList',
            payload: {
              telno: getLocalStorage(Storage.DID_LOGIN).retMsg,
            },
          });
          dispatch({
            type: 'assetTotal',
            payload: {
              telno: getLocalStorage(Storage.DID_LOGIN).retMsg,
            },
          });
        }
      });
    },
  },
};

