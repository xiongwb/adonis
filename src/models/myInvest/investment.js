/**
 * Created by cyt on 2017/5/16.
 */

import { message } from 'antd';
import * as service from '../../services/myInvest/investment';

export default {
  namespace: 'myInvest',
  state: {
    loading: false,
    visible: false,
    selectedKey: '1',
  },
  reducers: {
    save(state, action) {
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
    *finList({ payload }, { call, put }) {
      yield put({
        type: 'showLoad',
      });
      const { data } = yield call(service.invList, payload);
      if (data && data.retCode === 1) {
        yield put({
          type: 'hideLoad',
        });
        const totalList = data.invRcdVOList;
        const list1 = [];// 投资中
        const list2 = [];// 已结清
        for (const i in totalList) {
          if (totalList[i].prdstatus === '9') {
            list2.push(totalList[i]);
          } else {
            list1.push(totalList[i]);
          }
        }
        yield put({
          type: 'save',
          payload: {
            list1: list1,
            list2: list2,
          },
        });
      } else {
        yield put({
          type: 'hideLoad',
        });
        if (data) {
          message.error(data.retMsg);
        } else {
          // status ！= 200
          message.error('请检查您的网络');
        }
      }
    },
    *getPrdinfo({ payload }, { call, put }) {
      yield put({
        type: 'showLoad',
      });
      const { data } = yield call(service.getPrdinfo, payload);
      if (data && data.retCode === 1) {
        yield put({
          type: 'hideLoad',
        });
        yield put({
          type: 'save',
          payload: {
            prdinfo: data.prdinfo,
          },
        });
      } else {
        yield put({
          type: 'hideLoad',
        });
        if (data) {
          message.error(data.retMsg);
        } else {
          // status ！= 200
          message.error('请检查您的网络');
        }
      }
    },
    *tradePasswordValidate({ payload }, { call, put, select }) {
      yield put({
        type: 'showLoad',
      });
      const { data } = yield call(service.validateTranPswd, payload);
      if (data && data.retCode === 1) {
        const state = yield select(({ myInvest }) => myInvest);
        yield put({
          type: 'transApp',
          payload: {
            invrcdid: state.invrcdid,
            tenantno: state.tenantno,
            telno: state.telno,
            cusname: state.cusname,
            appdate: state.date,
            tranprdcode: state.prdcode,
          },
        });
      } else {
        yield put({
          type: 'hideLoad',
        });
        if (data) {
          message.error(data.retMsg);
        } else {
          // status ！= 200
          message.error('请检查您的网络');
        }
      }
    },
    *transApp({ payload }, { call, put }) {
      const { data } = yield call(service.transApp, payload);
      if (data && data.retCode === 1) {
        yield put({
          type: 'hideLoad',
        });
        alert('申请成功！');
        browserHistory.push('/myInvest/investRecord');
      } else {
        yield put({
          type: 'hideLoad',
        });
        if (data) {
          message.error(data.retMsg);
        } else {
          // status ！= 200
          message.error('请检查您的网络');
        }
      }
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen((location) => {
        if (location.pathname === '/myInvest/investRecord') {
          dispatch({
            type: 'finList',
            payload: {
              telno: 15202207322, // getLocalStorage(Storage.DID_LOGIN).retMsg,
            },
          });
        }
      });
    },
  },

};

