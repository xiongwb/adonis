/**
 * Created by cyt on 2017/5/11.
 */

import React from 'react';
import { connect } from 'dva';
import {
} from 'antd';
// import { browserHistory } from 'react-router';
import styles from './financing_detail.css';
import StringUtils from '../../utils/string_utils';
import NavBar from '../../components/nav_bar';

function FinancingDetail({ financing }) {
  const data = financing.curDetail;
  const finsum = StringUtils.moneyFormatData2Money(data.finsum);
  const paidfee = StringUtils.moneyFormatData2Money(data.paidfee);
  const topayfee = StringUtils.moneyFormatData2Money(data.topayfee);
  const paidint = StringUtils.moneyFormatData2Money(data.paidint);
  const topayint = StringUtils.moneyFormatData2Money(data.topayint);
  const nextpaysum = StringUtils.moneyFormatData2Money(data.nextpaysum);
  let finstatus = '';
  switch (data.finstatus) {
    case '1':
      finstatus = '正常';
      break;
    case '2':
      finstatus = '逾期';
      break;
    case '9':
      finstatus = '结清';
      break;
    default:
      finstatus = '';
  }
  return (
    <div className={styles.root}>
      <NavBar title="融资详情" />
      <div className={styles.detailDiv}>
        <text className={styles.nameText}>{data.prdinfo.prdname}</text>
        <text className={styles.itemText}>融资日期：{data.findate}</text>
        <text className={styles.itemText}>到期日期：{data.expdate}</text>
        <text className={styles.itemText}>融资金额：{finsum}</text>
        <text className={styles.itemText}>融资状态：{finstatus}</text>
        <text className={styles.itemText}>已支付手续费：{paidfee}</text>
        <text className={styles.itemText}>待支付手续费：{topayfee}</text>
        <text className={styles.itemText}>已支付利息：{paidint}</text>
        <text className={styles.itemText}>待支付利息：{topayint}</text>
        <text className={styles.itemText}>下次付款日：{data.nextpaydate}</text>
        <text className={styles.itemText}>下次付款金额：{nextpaysum}</text>
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    financing: state.financing,
  };
}


export default connect(mapStateToProps)(FinancingDetail);

