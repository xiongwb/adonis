/**
 * Created by cyt on 2017/6/6.
 */


import {
  message,
} from 'antd';
import { browserHistory } from 'react-router';
import * as service from '../../services/bank_card/new_card';
import { getLocalStorage } from '../../utils/helper';
import Storage from '../../utils/storage';
import tenant from '../../constant/common_config';

export default {
  namespace: 'newCard',
  state: {
    data: [],
    card: '',
    place: [],
    bankcode: '',
    openbranch: '',
    interbankno: '',
    openbank: '',
    bank: [],
    protocol: '',
    checked: false,
  },
  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    },
    que(state, action) {
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
        yield put({
          type: 'save',
          payload: {
            data,
            loading: false,
          },
        });
      } else if (data) {
        message.error(data.retMsg);
      } else {
          // status ！= 200
        message.error('请检查您的网络');
      }
    },
    // 协议
    *protocolget({ payload }, { call, put }) {
      yield put({
        type: 'showLoad',
      });
      console.log(11111, 222);
      const { data } = yield call(service.protocolget, payload);
      console.log(data, 222);
      if (data && data.retCode === 1) {
        yield put({
          type: 'save',
          payload: {
            protocol: data,
            loading: false,
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
    // 获取开户行列表
    *getBankList({ payload }, { call, put }) {
      console.log(payload);
      const { data } = yield call(service.getBankList, {});
      console.log(data, 222);
      if (data && data.retCode === 1) {
        yield put({
          type: 'save',
          payload: {
            bank: data,
            loading: false,
          },
        });
      } else if (data) {
        message.error(data.retMsg);
      } else {
        // status ！= 200
        message.error('请检查您的网络');
      }
    },
    // 根据卡号获取开户行
    *getBankCode({ payload }, { call, put }) {
      console.log(payload, 33333);
      const { data } = yield call(service.getBankCode, payload);
      console.log(data, 222);
      if (data && data.retCode === 1) {
        yield put({
          type: 'save',
          payload: {
            bankcode: data.map.bankcode,
            openbank: data.map.bankname,
          },

        });
      } else if (data) {
        message.error(data.retMsg);
      } else {
        // status ！= 200
        message.error('请检查您的网络');
      }
    },
    // 取联行号
    *getInterBankNo({ payload }, { call, put }) {
      console.log(payload, 222);
      const { data } = yield call(service.getInterBankNo, payload);
      console.log(data, 222);
      if (data && data.retCode === 1) {
        yield put({
          type: 'save',
          payload: {
            place: data.list,
          },

        });
      } else if (data) {
        message.error(data.retMsg);
      } else {
        // status ！= 200
        message.error('请检查您的网络');
      }
    },
    // 改绑
    *changeCard({ payload }, { call, select }) {
      // 以下的属性向后台发送的表单
      console.log(payload, 222);
      const oldacctno = yield select(({ bankCard }) => bankCard.acctno);
      const openbranch = yield select(({ newCard }) => newCard.openbranch);
      const interbankno = yield select(({ newCard }) => newCard.interbankno);
      const openbank = yield select(({ newCard }) => newCard.openbank);
      const bankcode = yield select(({ newCard }) => newCard.bankcode);
      const acctno = payload.acctno;
      const telno = payload.telno;
      console.log(oldacctno, 222);
      const { data } = yield call(service.changeCard, { oldacctno,
        openbranch,
        interbankno,
        openbank,
        bankcode,
        acctno,
        telno,
      });
      console.log(data, 123456);
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
        if (location.pathname === '/bank_card/new_card') {
          dispatch({
            type: 'getInfo',
            payload: {
              telno: getLocalStorage(Storage.DID_LOGIN).retMsg,
            },
          });
          dispatch({
            type: 'getBankList',
          });
          dispatch({
            type: 'protocolget',
            payload: {
              proType: 4,
              tenantNo: tenant.tenantNo,
              returnType: 3,
            },
          });
        }
      });
    },
  },
};
