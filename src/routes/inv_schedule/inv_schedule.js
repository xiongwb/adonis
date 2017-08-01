/**
 * Created by cyt on 2017/5/31.
 */
import React from 'react';
import { Spin } from 'antd';
import { connect } from 'dva';
import styles from './inv_schedule.css';
import NavBar from '../../components/nav_bar';

function InvSchedule({ invSchedule }) {
  if (invSchedule.data.length === 0) {
    return (<div className={styles.spin}><Spin style={{ marginTop: '70%' }} /></div>);
  }
  if (invSchedule.data.retCode) {
    return (
      <div >
        <NavBar title={'转让申请进度'} />
        <div className={styles.top}>
          <div className={styles.line1} />
          <div className={styles.inputDiv1}>
            <text className={styles.text}>申请日期：{invSchedule.data.appdate}</text>
          </div>
        </div>
        <div className={styles.line2} />
        <div >
          <div className={styles.inputDiv1}>
            <text className={styles.text}>产品名称：{invSchedule.data.tranprdname}</text>
          </div>
          <div className={styles.line2} />
        </div>
        <div >
          <div className={styles.inputDiv1}>
            <text className={styles.text}>申请状态：{invSchedule.data.appstatus}</text>
          </div>
          <div className={styles.line2} />
        </div>
        <div >
          <div className={styles.inputDiv1}>
            <text className={styles.text}>审核意见：{invSchedule.data.chknote}</text>
          </div>
          <div className={styles.line2} />
        </div>
        <div >
          <div className={styles.inputDiv1}>
            <text className={styles.text}>发布日期：{invSchedule.data.issuedate}</text>
          </div>
          <div className={styles.line2} />
        </div>
        <div >
          <div className={styles.inputDiv1}>
            <text className={styles.text}>成立日期：{invSchedule.data.transeffdate}</text>
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
          <text >您还没有转让申请哦！</text>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    invSchedule: state.invSchedule,
  };
}
export default connect(mapStateToProps)(InvSchedule);
