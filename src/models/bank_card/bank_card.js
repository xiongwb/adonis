/**
 * Created by cyt on 2017/6/6.
 */
/**
 * Created by zhangle on 2017/6/5.
 */

import {
  message,
} from 'antd';
import * as service from '../../services/bank_card/bank_card';
import { getLocalStorage } from '../../utils/helper';
import Storage from '../../utils/storage';

export default {
  namespace: 'bankCard',
  state: {
    data: [],
    card: '',
    acctno: '',
  },
  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    },
  },
  effects: {
    // 银行卡列表
    *bindList({ payload }, { call, put }) {
      const { data } = yield call(service.bindList, payload);
      console.log(data, 123456);
      if (data && data.retCode === 1) {
        let card;
        for (let i = 0; i < data.bindList.length; i++) {
          if (data.bindList[i].mainflag === '1') {
            card = data.bindList[i];
            data.bindList[i] = data.bindList[0];
            data.bindList[0] = card;
          }
        }
        console.log(card, 123456);
        yield put({
          type: 'save',
          payload: {
            data,
            card,
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
        if (location.pathname === '/bank_card') {
          dispatch({
            type: 'bindList',
            payload: {
              telno: getLocalStorage(Storage.DID_LOGIN).retMsg,
            },
          });
        }
      });
    },
  },
};
