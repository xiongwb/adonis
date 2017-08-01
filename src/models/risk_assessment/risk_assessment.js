/**
 * Created by cyt on 2017/5/16.
 */

import { message } from 'antd';
import { browserHistory } from 'react-router';
import * as service from '../../services/risk_assessment/risk_assessment';
import { getLocalStorage } from '../../utils/helper';
import Storage from '../../utils/storage';
import COMMONCONFIG from '../../constant/common_config';

export default {
  namespace: 'risk',
  state: {
    data: [],
    loading: false,
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
      const { data } = yield call(service.riskList, payload);
      if (data && data.retCode === 1) {
        yield put({
          type: 'hideLoad',
        });
        yield put({
          type: 'save',
          payload: {
            riskRecord: data.myRiskRcdVOList,
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
    *getRiskDetail({ payload }, { call, put }) {
      yield put({
        type: 'showLoad',
      });
      const { data } = yield call(service.riskDet, payload);
      if (data && data.retCode === 1) {
        yield put({
          type: 'hideLoad',
        });
        yield put({
          type: 'save',
          payload: {
            curRiskDetail: data.riskrcddet,
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
    *getInfo({ payload }, { call, put }) {
      yield put({
        type: 'showLoad',
      });
      const { data } = yield call(service.getInfo, payload);
      if (data && data.retCode === 1) {
        yield put({
          type: 'getRiskTemp',
          payload: {
            tenantno: COMMONCONFIG.tenantNo,
            risktemptype: data.custype,
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
    *getRiskTemp({ payload }, { call, put }) {
      const { data } = yield call(service.riskTemp, payload);
      if (data && data.retCode === 1) {
        yield put({
          type: 'hideLoad',
        });
        yield put({
          type: 'save',
          payload: {
            riskTemp: data,
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
    *getRiskQuestion({ payload }, { call, put, select }) {
      yield put({
        type: 'showLoad',
      });
      const risktempid = yield select(({ risk }) => risk.riskTemp.risktempid);
      const { data } = yield call(service.riskTempDet, { risktempid: risktempid });
      if (data && data.retCode === 1) {
        yield put({
          type: 'hideLoad',
        });
        yield put({
          type: 'save',
          payload: {
            questionList: data.riskTempDetVOList,
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
    *newRiskRcd({ payload }, { call, put }) {
      yield put({
        type: 'showLoad',
      });
      const { data } = yield call(service.newRiskRcd, payload);
      if (data && data.retCode === 1) {
        yield put({
          type: 'hideLoad',
        });
        alert('提交成功');
        browserHistory.push('/risk_assessment/riskRecord');
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
        if (location.pathname === '/risk_assessment/riskRecord') {
          dispatch({
            type: 'finList',
            payload: {
              telno: getLocalStorage(Storage.DID_LOGIN).retMsg,
            },
          });
        } else if (location.pathname === '/risk_assessment/riskAssessment') {
          dispatch({
            type: 'getInfo',
            payload: {
              telno: getLocalStorage(Storage.DID_LOGIN).retMsg,
            },
          });
        } else if (location.pathname === '/risk_assessment/riskQuestion') {
          dispatch({
            type: 'getRiskQuestion',
          });
        }
      });
    },
  },

};

