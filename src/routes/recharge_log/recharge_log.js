/**
 * Created by cyt on 2017/5/26.
 */
import React from 'react';
import { Row, Col, Spin } from 'antd';
import { connect } from 'dva';
import styles from './recharge_log.css';
import NavBar from '../../components/nav_bar';

function RechargeLog({ rechargeLog }) {
  if (rechargeLog.data.length === 0) {
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
                <div className={styles.title2} >充值金额</div>
              </Col>
              <Col span={8}>
                <div className={styles.title2}>充值手续费</div>
              </Col>
              <Col span={11}>
                <div className={styles.title2}>充值日期</div>
              </Col>
            </Row>
            <Row type="flex">
              <Col span={5}>
                <div className={styles.title2} >{s.supsum}</div>
              </Col>
              <Col span={8}>
                <div className={styles.title2}>{s.supfee}</div>
              </Col>
              <Col span={11}>
                <div className={styles.title2}>{s.supdate}</div>
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
  if (rechargeLog.data.supplementVOList.length) {
    return (
      <div >
        <NavBar title={'充值记录'} />
        <div className={styles.top} />
        { rechargeLog.data.supplementVOList.map(s => data(s)) }
      </div>
    );
  } else {
    return (
      <div >
        <NavBar title={'充值记录'} />
        <div className={styles.prompt}>
          <text >您还没有充值记录哦！</text>
        </div>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    rechargeLog: state.rechargeLog,
  };
}
export default connect(mapStateToProps)(RechargeLog);
