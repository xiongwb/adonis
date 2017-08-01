/**
 * Created by cyt on 2017/5/31.
 */
import React from 'react';
import { Spin } from 'antd';
import { connect } from 'dva';
import styles from './financing_schedule.css';
import NavBar from '../../components/nav_bar';

function FinancingSchedule({ financingSchedule }) {
  console.log(financingSchedule, 123456);
  if (financingSchedule.data.length === 0) {
    return (<div className={styles.spin}><Spin style={{ marginTop: '70%' }} /></div>);
  }
  if (financingSchedule.data.retCode) {
    return (
      <div >
        <NavBar title={'融资申请进度'} />
        <div className={styles.top}>
          <div className={styles.line1} />
          <div className={styles.inputDiv1}>
            <text className={styles.text} >申请日期：{financingSchedule.data.appdate}</text>
          </div>
        </div>
        <div className={styles.line2} />
        <div >
          <div className={styles.inputDiv1}>
            <text className={styles.text} >贷款产品：{financingSchedule.data.loanprod}</text>
          </div>
          <div className={styles.line2} />
        </div>
        <div >
          <div className={styles.inputDiv1}>
            <text className={styles.text} >期望融资金额：{financingSchedule.data.expfinsum}</text>
          </div>
          <div className={styles.line2} />
        </div>
        <div >
          <div className={styles.inputDiv1}>
            <text className={styles.text} >融资期限：{financingSchedule.data.finterm}</text>
          </div>
          <div className={styles.line2} />
        </div>
        <div >
          <div className={styles.inputDiv1}>
            <text className={styles.text} >申请状态：{financingSchedule.data.appsta}</text>
          </div>
          <div className={styles.line2} />
        </div>
      </div>
    );
  } else {
    return (
      <div >
        <NavBar title={'转让申请进度'} />
        <div className={styles.title}>
          <text >您还没有融资申请哦！</text>
        </div>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    financingSchedule: state.financingSchedule,
  };
}
export default connect(mapStateToProps)(FinancingSchedule);

