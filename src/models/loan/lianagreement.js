/**
 * Created by zhangle on 2017/5/22.
 */
import { message } from 'antd';
import * as service from '../../services/loan/loanagreement';

export default {
  namespace: 'loanagreement', // 唯一的
  state: {
    data: [],

  },
  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    },
    findPrd(state, action) {
      console.log(action, 789789);
      return { ...state, ...action.payload };
    },

  },

  effects: {
    // 获取协议
    *Finapply({ payload }, { call, put, select }) {
      payload = yield select(({ loanagreement }) => loanagreement.record);
      console.log(payload, 123123);
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
        if (location.pathname === '/loanagreement') {
          dispatch({
            type: 'Finapply',
          });
        }
      });
    },
  },

};
