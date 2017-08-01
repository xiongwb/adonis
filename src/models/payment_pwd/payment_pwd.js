/**
 * Created by cyt on 2017/6/7.
 */
import {
  message,
} from 'antd';
import { browserHistory } from 'react-router';
import * as service from '../../services/payment_pwd/payment_pwd';


export default {
  namespace: 'paymentPwd',
  state: {
    data: [],
  },
  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    },
  },
  effects: {
    // 获取我的信息数据
    *getInfo({ payload }, { call }) {
      console.log(11111, 222);
      const { data } = yield call(service.getInfo, payload);
      console.log(data, 222);
      if (data && data.retCode === 1) {
        if (data.settranpswdflag === 0) {
          browserHistory.push('/payment_pwd/set_pwd');
        } else {
          message.error('您已经设置支付密码,请选择修改或重置支付密码');
        }
      } else if (data) {
        message.error(data.retMsg);
      } else {
          // status ！= 200
        message.error('请检查您的网络');
      }
    },
  },
};
