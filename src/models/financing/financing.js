/**
 * Created by cyt on 2017/5/16.
 */

import { message } from 'antd';
import * as service from '../../services/financing/financing';
import { getLocalStorage } from '../../utils/helper';
import Storage from '../../utils/storage';


export default {
  namespace: 'financing',
  state: {
    data: [],
    loading: false,
    repayModelVisible: false,
    repayAllModelVisible: false,
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
      const { data } = yield call(service.finList, payload);
      if (data && data.retCode === 1) {
        yield put({
          type: 'hideLoad',
        });
        yield put({
          type: 'save',
          payload: {
            financingList: data.finRcdVOList,
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
    *repaymentList({ payload }, { call, put, select }) {
      yield put({
        type: 'showLoad',
      });
      const prdcode = yield select(({ financing }) => financing.curRepay.prdcode);
      const { data } = yield call(service.repaymentList, { prdcode: prdcode });
      if (data && data.retCode === 1) {
        yield put({
          type: 'hideLoad',
        });
        yield put({
          type: 'save',
          payload: {
            repaymentList: data.list,
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
        const finpayrcdid = yield select(({ financing }) => financing.finpayrcdid);
        yield put({
          type: 'transApp',
          payload: {
            businessSeqNo: data.businessSeqNo,
            finpayrcdid: finpayrcdid,
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
      const { data } = yield call(service.finPay, payload);
      if (data && data.retCode === 1) {
        yield put({
          type: 'hideLoad',
        });
        alert('还款成功！');
        browserHistory.push('/financing/repayment');
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
    *getPrePayStatus({ payload }, { call, put }) {
      yield put({
        type: 'showLoad',
      });
      const { data } = yield call(service.getPrePayStatus, payload);
      if (data && data.retCode === 1) {
        yield put({
          type: 'hideLoad',
        });
        yield put({
          type: 'save',
          payload: {
            repayAllMoney: data.map.paytot,
            finprepayappid: data.map.finprepayappid,
            repayAllModelVisible: true,
          },
        });
      } else if (data && data.retCode === -1) {
        browserHistory.push('/financing/repayAllApply');
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
    *tradePasswordValidateRepayAll({ payload }, { call, put, select }) {
      yield put({
        type: 'showLoad',
      });
      const { data } = yield call(service.validateTranPswd, payload);
      if (data && data.retCode === 1) {
        const finprepayappid = yield select(({ financing }) => financing.finprepayappid);
        yield put({
          type: 'finPrePay',
          payload: {
            businessSeqNo: data.businessSeqNo,
            finprepayappid: finprepayappid,
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
    *finPrePay({ payload }, { call, put }) {
      const { data } = yield call(service.finPrePay, payload);
      if (data && data.retCode === 1) {
        yield put({
          type: 'hideLoad',
        });
        alert('已结清！');
        browserHistory.push('/financing/financingRecord');
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
    *getFeeType({ payload }, { call, put }) {
      const { data } = yield call(service.getFeeType, payload);
      if (data && data.retCode === 1) {
        yield put({
          type: 'save',
          payload: {
            feeTypeList: data.list,
          },
        });
      } else if (data) {
        message.error(data.retMsg);
      } else {
        // status ！= 200
        message.error('请检查您的网络');
      }
    },
    *getSumFee({ payload }, { call, put }) {
      const { data } = yield call(service.getSumFee, payload);
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
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen((location) => {
        if (location.pathname === '/financing/financingRecord') {
          dispatch({
            type: 'finList',
            payload: {
              telno: getLocalStorage(Storage.DID_LOGIN).retMsg,
              pageNum: 0,
              count: 1000,
            },
          });
        } else if (location.pathname === '/financing/repayment') {
          dispatch({
            type: 'repaymentList',
          });
        } else if (location.pathname === '/financing/payFee') {
          dispatch({
            type: 'getFeeType',
            payload: {
              dictCode: 'FinFeeType',
            },
          });
        }
      });
    },
  },

};

