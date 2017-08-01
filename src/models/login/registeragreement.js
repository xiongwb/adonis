/**
 * Created by zhangle on 2017/5/22.
 */
import { message } from 'antd';
import * as service from '../../services/login/registeragreement';

export default {
  namespace: 'registeragreement', // 唯一的
  state: {
    data: [],

  },
  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    },

  },

  effects: {

    // 发送验证码
    *Finapply({ payload }, { call, put }) {
      const { data } = yield call(service.Finapply, payload);
      console.log(data, 123121);
      if (data && data.retCode === 1) {
        message.success('发送成功');
        yield put({
          type: 'save',
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


  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen((location) => {
        if (location.pathname === '/registeragreement') {
          dispatch({
            type: 'Finapply',
            payload: {
              tenantNo: 1101001001,
              proType: 3,
              returnType: 3,
            },
          });
        }
      });
    },
  },

};
