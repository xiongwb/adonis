/**
 * Created by cyt on 2017/5/11.
 */

import React from 'react';
import { connect } from 'dva';
import {
  Spin,
  Select,
} from 'antd';
import styles from './pay_fee.css';
import NavBar from '../../components/nav_bar';

const Option = Select.Option;

function PayFee({ financing }) {
  const renderOptions = () => {
    const options = [];
    const types = financing.feeTypeList;
    for (const i in types) {
      if (types[i] != null) {
        options.push(<Option value={types[i].dictkey}>{types[i].dictvalue}</Option>);
      }
    }
    return options;
  };
  let month = new Date().getMonth() + 1;
  if (month.toString.length === 1) {
    month = '0' + month;
  }
  const date = new Date().getFullYear() + '-' + month + '-' + new Date().getDate();
  return (
    <Spin spinning={financing.loading}>
      <div className={styles.root}>
        <NavBar title="支付费用" />
        <div className={styles.inputBox}>
          <div className={styels.dataDiv}>
            <div className={styels.dataNameDiv}><text className={styles.dataName}>支付日期：</text></div>
            <div className={styels.dataValueDiv}><text className={styles.dataValue}>{date}</text></div>
          </div>
          <div className={styles.typeDiv}>
            <div className={styels.dataNameDiv}><text className={styles.dataName}>费用类型：</text></div>
            <div className={styels.dataValueDiv}>
              <Select>
                {renderOptions()}
              </Select>
            </div>
          </div>
          <div className={styles.moneyDiv}>
            <div className={styels.dataNameDiv}><text className={styles.dataName}>费   用：</text></div>
            <div className={styels.dataValueDiv}>
              <input type="password" onChange={setMoney} value={financing.money} placeholder="请输入支付费用" className={styles.input} />
            </div>
          </div>
        </div>
        <div className={styles.btnDiv}>
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


export default connect(mapStateToProps)(PayFee);

