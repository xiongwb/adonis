/**
 * Created by cyt on 2017/5/27.
 */
import React from 'react';
import { Row, Col, Icon } from 'antd';
import { connect } from 'dva';
import { browserHistory } from 'react-router';
import password from '../../assets/transaction_password.png';
import NavBar from '../../components/nav_bar';
import styles from './payment_pwd.css';
import { getLocalStorage } from '../../utils/helper';
import Storage from '../../utils/storage';

function PaymentPwd({ dispatch }) {
  const onClick = () => {
    dispatch({
      type: 'paymentPwd/getInfo',
      payload: {
        telno: getLocalStorage(Storage.DID_LOGIN).retMsg,
      },
    });
  };
  return (
    <div >
      <NavBar title={'资金交易密码'} />
      <div className={styles.top} onClick={onClick}>
        <Row type="flex">
          <Col span={3}>
            <img src={password} alt="banner" className={styles.img} />
          </Col>
          <Col span={21}>
            <Row type="flex">
              <Col span={20}>
                <div className={styles.title}>设置资金交易密码</div>
              </Col>
              <Col span={2}>
                <Icon className={styles.icon} type="right" />
              </Col>
            </Row>
            <div className={styles.line} />
          </Col>
        </Row>
      </div>
      <div onClick={() => browserHistory.push('/payment_pwd/update_pwd')}>
        <Row type="flex">
          <Col span={3}>
            <img src={password} alt="banner" className={styles.img} style={{ marginTop: '0.6rem' }} />
          </Col>
          <Col span={21}>
            <Row type="flex">
              <Col span={20}>
                <div className={styles.title} style={{ marginTop: '0.8rem' }} >修改资金交易密码</div>
              </Col>
              <Col span={2}>
                <Icon className={styles.icon} style={{ marginTop: '1.1rem' }} type="right" />
              </Col>
            </Row>
            <div className={styles.line} />
          </Col>
        </Row>
      </div>
      <div onClick={() => browserHistory.push('/payment_pwd/reset_pwd')}>
        <Row type="flex">
          <Col span={3}>
            <img src={password} alt="banner" className={styles.img} style={{ marginTop: '0.6rem' }} />
          </Col>
          <Col span={21}>
            <Row type="flex">
              <Col span={20}>
                <div className={styles.title} style={{ marginTop: '0.8rem' }}>重置资金交易密码</div>
              </Col>
              <Col span={2}>
                <Icon className={styles.icon} style={{ marginTop: '1.1rem' }} type="right" />
              </Col>
            </Row>
            <div className={styles.line} />
          </Col>
        </Row>
      </div>
    </div>
  );
}
function mapStateToProps(state) {
  return {
    paymentPwd: state.paymentPwd,
  };
}
export default connect(mapStateToProps)(PaymentPwd);
