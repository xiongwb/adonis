/**
 * Created by zhangle on 2017/6/7.
 */
/**
 * Created by zhangle on 2017/5/19.
 */
import { message } from 'antd';
import * as service from '../../services/investment/investmentmessage';

export default {
  namespace: 'investmentmessage', // 唯一的
  state: {
    data: [],
    date: [],
    retCode: 0,
    put: [],
    visible: false,
    mone: [],
    prd: [],
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
    // 查看产品详情
    *GetPrdinfo({ payload }, { call, put, select }) {
      const prdcode = yield select(({ investmentmessage }) => investmentmessage.record.prdcode);
      const { data } = yield call(service.GetPrdinfo, { prdcode: prdcode });
      if (data && data.retCode === 1) {
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
    // 投资
    *DoInvest({ payload }, { call, put }) {
      console.log(payload, 1111111111);
      const { data } = yield call(service.DoInvest, payload);
      console.log(data, 123121);
      if (data && data.retCode === 1) {
        yield put({
          type: 'query1',
          payload: {
            data,
          },
        });
        message.error(data.retMsg);
      } else if (data) {
        message.error(data.retMsg);
      } else {
        // status ！= 200
        message.error('请检查您的网络');
      }
    },
    // 我的基本信息
    *GetInfo({ payload }, { call, put }) {
      const { data } = yield call(service.GetInfo, payload);
      console.log(data, 111111111);
      if (data && data.retCode === 1) {
        yield put({
          type: 'query',
          payload: {
            date: data,
            visible: true,
          },
        });
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
      console.log(data, 44444444);
      if (data && data.retCode === 1) {
        yield put({
          type: 'DoInvest',
          payload: {
            phoneNo: payload.telNo,
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
    // 投资验证。
    *ValidateInv({ payload }, { call, put }) {
      yield put({
        type: 'showLoad',
      });
      const { data } = yield call(service.ValidateInv, payload);
      if (data && data.retCode === 1) {
        yield put({
          type: 'Myasset',
          payload: {
            telno: payload.phoneNo,
            prdcode: payload.prdcode,
          },
        });
        yield put({
          type: 'save',
          payload: {
            put: payload,
          },
        });
      } else if (data) {
        message.error(data.retMsg);
      } else {
        // status ！= 200
        message.error('请检查您的网络');
      }
      yield put({
        type: 'hideLoad',
      });
    },
    // 查看金额
    *Myasset({ payload }, { call, put }) {
      const { data } = yield call(service.Myasset, payload);
      console.log(data, 123121);
      if (data && data.retCode === 1) {
        yield put({
          type: 'query',
          payload: {
            mone: data,
            visible: true,
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
        if (location.pathname === '/investment/message') {
          dispatch({
            type: 'GetPrdinfo',

          });
        }
      });
    },
  },


};
