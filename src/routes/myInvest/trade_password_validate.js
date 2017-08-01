/**
 * Created by cyt on 2017/5/11.
 */

import React from 'react';
import { connect } from 'dva';
import {
  Spin,
} from 'antd';
import styles from './trade_password_validate.css';
import NavBar from '../../components/nav_bar';
import { getLocalStorage } from '../../utils/helper';
import Storage from '../../utils/storage';

function TradePasswordValidate({ invest, dispatch }) {
  const setPassword = (e) => {
    const value = e.target.value;
    if (value) {
      const text = value.length > 6 ? value.substring(0, 6) : value;
      dispatch({
        type: 'myInvest/save',
        payload: {
          transPswd: text,
        },
      });
    } else {
      dispatch({
        type: 'myInvest/save',
        payload: {
          transPswd: null,
        },
      });
    }
  };
  const submit = () => {
    dispatch({
      type: 'myInvest/tradePasswordValidate',
      payload: {
        busiType: 'T06',
        transPswd: invest.transPswd,
        money: 0,
        telno: getLocalStorage(Storage.DID_LOGIN).retMsg,
      },
    });
  };
  return (
    <Spin spinning={invest.loading}>
      <div className={styles.root}>
        <NavBar title="验证交易密码" />
        <div className={styles.bodyDiv} />
        <div className={styles.inputDiv}>
          <text className={styles.inputName}>交易密码：</text>
          <input type="password" onChange={setPassword} value={invest.transPswd} placeholder="请输入六位交易密码" className={styles.input} />
        </div>
        <div className={styles.btnDiv} onClick={submit}>
          <text className={styles.btnText}>确定</text>
        </div>
      </div>
    </Spin>
  );
}

function mapStateToProps(state) {
  return {
    invest: state.myInvest,
  };
}


export default connect(mapStateToProps)(TradePasswordValidate);

