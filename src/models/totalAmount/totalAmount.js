/**
 * Created by zhangle on 2017/5/15.
 */
import { message } from 'antd';
import * as service from '../../services/totalAmount/totalAmount';
// import { browserHistory } from 'react-router';
import { getLocalStorage } from '../../utils/helper';
import Storage from '../../utils/storage';

export default {
  namespace: 'totalAmount', // 唯一的
  state: {
    data: [],
  },
  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    },
  },
  effects: {
    //  我的基本信息
    *GetMyInfo({ payload }, { call, put }) {
      const { data } = yield call(service.GetMyInfo, payload);
      console.log(data, 33333333333333);
      if (data && data.retCode === 1) {
        yield put({
          type: 'save',
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
  },

  subscriptions: {
    setup({ dispatch, history }) {
      history.listen((location) => {
        if (location.pathname === '/total_amount') {
          dispatch({
            type: 'GetMyInfo',
            payload: {
              phoneNo: getLocalStorage(Storage.DID_LOGIN).retMsg,
            },
          });
        }
      });
    },
  },


};
