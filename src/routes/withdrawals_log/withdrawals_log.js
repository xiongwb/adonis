/**
 * Created by cyt on 2017/5/27.
 */
import React from 'react';
import { Row, Col, Spin } from 'antd';
import { connect } from 'dva';
import styles from './withdrawals_log.css';
import NavBar from '../../components/nav_bar';

function WithdrawalsLog({ withdrawalsLog }) {
  if (withdrawalsLog.data.length === 0) {
    return (<div className={styles.spin}><Spin style={{ marginTop: '70%' }} /></div>);
  }
  const data = (s) => {
    return (
      <Row type="flex" >
        <Col span={1}>
          <div className={styles.line_left} />
        </Col>
        <Col span={22}>
          <div className={styles.line_top} />
          <div className={styles.inputDiv}>
            <div className={styles.title1}>银行卡号:{s.acctno}</div>
            <div className={styles.line} />
            <Row type="flex">
              <Col span={5}>
                <div className={styles.title2} >提现金额</div>
              </Col>
              <Col span={8}>
                <div className={styles.title2}>提现手续费</div>
              </Col>
              <Col span={11}>
                <div className={styles.title2}>提现日期</div>
              </Col>
            </Row>
            <Row type="flex">
              <Col span={5}>
                <div className={styles.title2} >{s.drawsum}</div>
              </Col>
              <Col span={8}>
                <div className={styles.title2}>{s.drawfee}</div>
              </Col>
              <Col span={11}>
                <div className={styles.title2}>{s.drawdate}</div>
              </Col>
            </Row>
          </div>
          <div className={styles.line_bottom} />
        </Col>
        <Col span={1}>
          <div className={styles.line_right} />
        </Col>
      </Row>
    );
  };
  if (withdrawalsLog.data.drawVOList.length) {
    return (
      <div >
        <NavBar title={'提现记录'} />
        <div className={styles.top} />
        { withdrawalsLog.data.drawVOList.map(s => data(s)) }
      </div>
    );
  } else {
    return (
      <div >
        <NavBar title={'提现记录'} />
        <div className={styles.prompt}>
          <text >您还没有提现记录哦！</text>
        </div>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    withdrawalsLog: state.withdrawalsLog,
  };
}
export default connect(mapStateToProps)(WithdrawalsLog);
