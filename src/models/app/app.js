/**
 * Created by zhangle on 2017/5/15.
 */
import { message } from 'antd';
import { browserHistory } from 'react-router';
import * as service from '../../services/app/app';

// import { getLocalStorage } from '../../utils/helper';
// import Storage from '../../utils/storage';

export default {
  namespace: 'app', // 唯一的
  state: {
    data: [],
    date: [],
    log: [],
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
    query1(state, action) {
      console.log(action, 111111);
      return { ...state, ...action.payload, loading: true };
    },
    query2(state, action) {
      console.log(action, 111111);
      return { ...state, ...action.payload, loading: true };
    },
    findPrd(state, action) {
      console.log(action, 12);
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
    // 热门推荐
    *Prdinfolist({ payload }, { call, put }) {
      const { data } = yield call(service.Prdinfolist, payload);
      console.log(data.list[1].prdname, 33333333333333);
      if (data && data.retCode === 1) {
        yield put({
          type: 'query1',
          payload: {
            data,
          },
        });
      } else if (data) {
        message.error(data.retMsg);
      } else { // status ！= 200
        message.error('请检查您的网络111111');
      }
    },
    // 退出登录
    *Signout({ payload }, { call }) {
      console.log(1212121);
      const { data } = yield call(service.Signout, payload);
      console.log(data, 123121);
      if (data && data.retCode === 1) {
        message.success('退出成功');
        browserHistory.push('/');
      } else if (data) {
        message.error(data.retMsg);
      } else {
          // status ！= 200
        message.error('请检查您的网络');
      }
    },
    // 用户签到
    *Seal({ payload }, { call }) {
      console.log(1212121);
      const { data } = yield call(service.Seal, payload);
      console.log(data, 123121);
      if (data && data.retCode === 1) {
        message.success('签到成功');
      } else if (data) {
        message.error(data.retMsg);
      } else {
          // status ！= 200
        message.error('请检查您的网络');
      }
    },
    // //判断是否登录
    // *GetLoginStatus({ payload }, { call, put }) {
    //   console.log(1212121);
    //   const { data } = yield call(service.GetLoginStatus,payload);
    //   console.log(data,123121);
    //   if(data && data.retCode === 1) {
    //
    //     yield put({
    //       type: 'query2',
    //       payload: {
    //         log:data,
    //       },
    //     });
    //
    //   }else {
    //     if (data) {
    //       message.error(data.retMsg);
    //     }else {
    //       // status ！= 200
    //       message.error('请检查您的网络');
    //
    //     }
    //
    //   }
    // },
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
          },
        });
        yield put({
          type: 'GetPrdinfo',
          payload: {
            prdcode: payload.prdcode,
            phoneNo: payload.telNo,
          },
        });
      } else if (data) {
        message.error(data.retMsg);
      } else {
        // status ！= 200
        message.error('请检查您的网络');
      }
    },
    // 查看产品详情
    *GetPrdinfo({ payload }, { call, put }) {
      const { data } = yield call(service.GetPrdinfo, payload);
      console.log(data, 6666666666);
      if (data && data.retCode === 1) {
        yield put({
          type: 'GetInfo',
          payload: {
            telno: payload.phoneNo,
          },
        });
        yield put({
          type: 'query',
          payload: {
            prd: data,
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
        if (location.pathname === '/') {
          dispatch({
            type: 'Prdinfolist',
            payload: {
              tenantNo: 1101001001,
            },
          });
        }
      });
    },
  },


};
