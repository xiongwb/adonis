/**
 * Created by cyt on 2017/5/16.
 */

// import { message } from 'antd';
// import * as service from '../../services/financing/financing';
// import { getLocalStorage } from '../../utils/helper';
// import Storage from '../../utils/storage';


export default {
  namespace: 'personal',
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

  },
  subscriptions: {
  },

};

