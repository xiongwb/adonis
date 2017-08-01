import { message } from 'antd';
import { browserHistory } from 'react-router';
import * as service from '../../services/recharge/recharge';
import Storage from '../../utils/storage';
import { getLocalStorage } from '../../utils/helper';

export default {
  namespace: 'recharge',
  state: {
    data: [],
    money: '',
    transPswd: '',
    feeSum: '',
    card: '',
    number: '',
  },
  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    },
  },
  effects: {
    // 银行卡列表
    *bindList({ payload }, { call, put, select }) {
      const number = yield select(({ recharge }) => recharge.number);
      const { data } = yield call(service.bindList, payload);
      console.log(data, 123456);
      console.log(data, 123456);
      if (data && data.retCode === 1) {
        let card;
        if (number) {
          card = number;
        } else {
          for (let i = 0; i < data.bindList.length; i++) {
            if (data.bindList[i].mainflag === '1') {
              card = data.bindList[i];
            }
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
      const feeSum = yield select(({ recharge }) => recharge.feeSum);
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
            type: 'recharge',
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
      if (data && data.retCode === 1) {
        console.log(payload, 9999911119);
        yield put({
          type: 'recharge',
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
    // 充值
    *recharge({ payload }, { call, select }) {
      const cardNo = yield select(({ recharge }) => recharge.card.acctno);
      const phoneNo = getLocalStorage(Storage.DID_LOGIN).retMsg;
      const { data } = yield call(service.recharge, { cardNo: cardNo,
        money: payload.money,
        phoneNo: phoneNo,
        businessSeqNo1: payload.data.businessSeqNo,
        businessSeqNo2: payload.businessSeqNo,
      });
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
        if (location.pathname === '/recharge') {
          dispatch({
            type: 'bindList',
            payload: {
              telno: getLocalStorage(Storage.DID_LOGIN).retMsg,
            },
          });
        }
      });
    },
  },
};
