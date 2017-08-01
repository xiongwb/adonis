/**
 * Created by cyt on 2017/5/26.
 */
import React from 'react';
import { Row, Col, Button, Spin, message } from 'antd';
import { browserHistory } from 'react-router';
import { connect } from 'dva';
import styles from './withdrawals.css';
import wbankcard from '../../assets/wbank_card.png';
import NavBar from '../../components/nav_bar';
import tenant from '../../constant/common_config';

function Withdrawals({ withdrawals, dispatch }) {
  if (withdrawals.data.length === 0 || withdrawals.quota.length === 0) {
    return (<div className={styles.spin}><Spin style={{ marginTop: '70%' }} /></div>);
  }
  const onClick = () => {
    browserHistory.push('/withdrawals/withdrawals_pwd');
  };
  const money = (e) => {
    const reg = new RegExp(/^\+?[1-9][0-9]*$/);
    if (!reg.test(e.target.value)) {
      message.error('请输入大于0的数字');
      dispatch({
        type: 'withdrawals/save',
        payload: { money: '' },
      });
    } else {
      dispatch({
        type: 'withdrawals/getFee',
        payload: { money: e.target.value, type: 1, tenantNo: tenant.tenantNo },
      });
    }
  };
  const whole = () => {
    dispatch({
      type: 'withdrawals/save',
      payload: { money: withdrawals.quota.acctnoEntity.candrawsum },
    });
  };
  if (withdrawals.data.bindList.length) {
    return (
      <div >
        <NavBar title={'提现'} />
        <Row>
          <div className={styles.line1} />
          <div className={styles.bodyDiv}>
            <Row type="flex">
              <Col>
                <img src={wbankcard} alt="banner" className={styles.img} />
              </Col>
              <Col span={15}>
                <div className={styles.bankName}>
                  {withdrawals.card.openbank}
                </div >
                <div className={styles.bankNo}>
                  {withdrawals.card.acctno}
                </div>
              </Col>
            </Row>
          </div>
        </Row>
        <div className={styles.line2} />
        <div className={styles.prompt}>
          <Row>
            <Col span={15}>
              <text className={styles.text1}>
                可提现金额：{withdrawals.quota.acctnoEntity.candrawsum}
              </text>
            </Col>
            <Col span={9}>
              <div onClick={whole} className={styles.text2}>全部提现</div>
            </Col>
          </Row>
        </div>
        <div className={styles.line3} />
        <div className={styles.inputDiv}>
          <text className={styles.text1}>提现金额：</text>
          <input type="number" value={withdrawals.money} onChange={money} className={styles.input} />
        </div>
        <div className={styles.line4} />
        <div>
          <Row type="flex">
            <Col span={12}>
              <div className={styles.title}>提现费用：{withdrawals.feeSum}</div>
            </Col>
            <Col span={12}>
              <div className={styles.title}>实际到账：{withdrawals.money}</div>
            </Col>
          </Row>
        </div>
        <Button onClick={onClick} className={styles.button}>
          确认提现
        </Button>
      </div>
    );
  } else {
    return (
      <div >
        <NavBar title={'提现'} />
        <div className={styles.prompt}>
          <text >您还没有绑卡哦！</text>
        </div>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    withdrawals: state.withdrawals,
  };
}
export default connect(mapStateToProps)(Withdrawals);
