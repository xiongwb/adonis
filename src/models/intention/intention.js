/**
 * Created by cyt on 2017/6/8.
 */

import {
  message,
} from 'antd';
import { browserHistory } from 'react-router';
import * as service from '../../services/intention/intention';
import date from '../../utils/date';
import tenant from '../../constant/common_config';

export default {
  namespace: 'intention',
  state: {
    data: [],
    obj: {
      cusname: '',
      telno: '',
      toinvsum: '',
      expprofit: '',
      invterm: '',
      email: '',
      notes: '',
    },
    disabled: true,
  },
  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    },
  },
  effects: {
    // 投资意向征集
    *invInt({ payload }, { call }) {
      payload.regdate = date.currentDate();
      payload.tenantno = tenant.tenantNo;
      console.log(11111, 222);
      const { data } = yield call(service.invInt, payload);
      console.log(data, 222);
      if (data && data.retCode === 1) {
        message.success(data.retMsg);
        browserHistory.push('/');
      } else if (data) {
        message.error(data.retMsg);
      } else {
          // status ！= 200
        message.error('请检查您的网络');
      }
    },
  },
};
