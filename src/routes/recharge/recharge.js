/**
 * Created by cyt on 2017/5/24.
 */
import React from 'react';
import { Row, Col, Icon, Button, Spin, message } from 'antd';
import { browserHistory } from 'react-router';
import { connect } from 'dva';
import styles from './recharge.css';
import wbankcard from '../../assets/wbank_card.png';
import NavBar from '../../components/nav_bar';
import tenant from '../../constant/common_config';

function Recharge({ recharge, dispatch }) {
  if (recharge.data.length === 0) {
    return (<div className={styles.spin}><Spin style={{ marginTop: '70%' }} /></div>);
  }
  const onClick = () => {
    console.log(recharge.money, 10101011);
    if (recharge.money) {
      browserHistory.push('/recharge/recharge_pwd');
    } else {
      message.error('金额不能为空');
    }
  };
  const option = () => {
    console.log(123);
    browserHistory.push('/recharge/option_bank');
  };
  const money = (e) => {
    const reg = new RegExp(/^\+?[1-9][0-9]*$/);
    if (!reg.test(e.target.value)) {
      message.error('请输入大于0的数字');
      dispatch({
        type: 'recharge/save',
        payload: { money: '' },
      });
    } else {
      dispatch({
        type: 'recharge/getFee',
        payload: { money: e.target.value, type: 2, tenantNo: tenant.tenantNo },
      });
    }
  };
  if (recharge.data.bindList.length) {
    return (
      <div >
        <NavBar title={'充值'} />
        <div style={{ marginTop: '5.5rem' }} />
        <Row>
          <div className={styles.line1} />
          <div className={styles.bodyDiv}>
            <Row type="flex">
              <Col>
                <img src={wbankcard} alt="banner" className={styles.img} />
              </Col>
              <Col span={15}>
                <div className={styles.bankName}>
                  {recharge.card.openbank}
                </div >
                <div className={styles.bankNo}>
                  {recharge.card.acctno}
                </div>
              </Col>
              <Col>
                <Icon onClick={option} type="right" className={styles.icon} />
              </Col>
            </Row>
          </div>
        </Row>
        <div className={styles.line2} />
        <div className={styles.line3} />
        <div className={styles.inputDiv}>
          <text className={styles.text} >充值金额：</text><input type="number" value={recharge.money} onChange={money} placeholder={'最多充值' + recharge.card.singlelimit + '元'} className={styles.input} />
        </div>
        <div className={styles.line4} />
        <div>
          <Row type="flex">
            <Col span={12}>
              <div className={styles.title}>充值费用：{recharge.feeSum}</div>
            </Col>
            <Col span={12}>
              <div className={styles.title}>实际到账：{recharge.money}</div>
            </Col>
          </Row>
        </div>
        <Button onClick={onClick} className={styles.button}>
            确认充值
          </Button>
      </div>
    );
  } else {
    return (
      <div >
        <NavBar title={'充值'} />
        <div className={styles.prompt}>
          <text >您还没有绑卡哦！</text>
        </div>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    recharge: state.recharge,
  };
}
export default connect(mapStateToProps)(Recharge);
