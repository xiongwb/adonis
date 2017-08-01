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

function TradePasswordValidate({ financing, dispatch }) {
  const setPassword = (e) => {
    const value = e.target.value;
    if (value) {
      const text = value.length > 6 ? value.substring(0, 6) : value;
      dispatch({
        type: 'financing/save',
        payload: {
          transPswd: text,
        },
      });
    } else {
      dispatch({
        type: 'financing/save',
        payload: {
          transPswd: null,
        },
      });
    }
  };
  const submit = () => {
    dispatch({
      type: 'financing/tradePasswordValidate',
      payload: {
        busiType: 'T04',
        transPswd: financing.transPswd,
        money: financing.repayMoney,
        telno: getLocalStorage(Storage.DID_LOGIN).retMsg,
      },
    });
  };
  return (
    <Spin spinning={financing.loading}>
      <div className={styles.root}>
        <NavBar title="验证交易密码" />
        <div className={styles.bodyDiv} />
        <div className={styles.inputDiv}>
          <text className={styles.inputName}>交易密码：</text>
          <input type="password" onChange={setPassword} value={financing.transPswd} placeholder="请输入六位交易密码" className={styles.input} />
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
    financing: state.financing,
  };
}


export default connect(mapStateToProps)(TradePasswordValidate);

