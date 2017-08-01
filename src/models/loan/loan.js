/**
 * Created by zhangle on 2017/6/6.
 */
import { message } from 'antd';
import * as service from '../../services/loan/loan';


export default {
  namespace: 'loan', // 唯一的
  state: {
    data: [],
    retCode: 0,
  },
  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    },
    query(state, action) {
      console.log(action, 12);
      return { ...state, ...action.payload, loading: true };
    },
  },

  effects: {
    // 融资申请
    *Finapply({ payload }, { call }) {
      const { data } = yield call(service.Finapply, payload);
      console.log(data, 123121);
      if (data && data.retCode === 1) {
        message.success('提交成功');
      } else if (data) {
        message.error(data.retMsg);
      } else {
          // status ！= 200
        message.error('请检查您的网络');
      }
    },
    // 融资宣传页文字
    *Finadvertise({ payload }, { call, put }) {
      const { data } = yield call(service.Finadvertise, payload);
      console.log(data, 123121);
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
  },
  // 进入我要借款页面 调用该方法
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen((location) => {
        if (location.pathname === '/loan') {
          dispatch({
            type: 'Finadvertise',
            payload: {
              tenantNo: 1101001001,
            },
          });
        }
      });
    },
  },


};
