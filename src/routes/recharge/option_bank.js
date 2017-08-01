/**
 * Created by cyt on 2017/5/24.
 */
import React from 'react';
import { Row, Col } from 'antd';
import { browserHistory } from 'react-router';
import { connect } from 'dva';
import styles from './recharge.css';
import wbankcard from '../../assets/wbank_card.png';
import NavBar from '../../components/nav_bar';

function OptionBank({ recharge, dispatch }) {
  const onClick = (e) => {
    dispatch({
      type: 'recharge/save',
      payload: { number: e },
    });
    browserHistory.push('/recharge');
  };
  const bank = (s) => {
    return (
      <div onClick={() => onClick(s)}>
        <Row>
          <div className={styles.line1} />
          <div className={styles.bodyDiv}>
            <Row type="flex">
              <Col>
                <img src={wbankcard} alt="banner" className={styles.img} />
              </Col>
              <Col span={15}>
                <div className={styles.bankName}>
                  {s.openbank}
                </div >
                <div className={styles.bankNo}>
                  {s.acctno}
                </div>
              </Col>
            </Row>
          </div>
          <div className={styles.line2} />
        </Row>
      </div>
    );
  };
  return (
    <div>
      <NavBar title={'选择银行卡'} />
      <div style={{ marginTop: '5.5rem' }} />
      {recharge.data.bindList.map((s, i) => bank(s, i))}
    </div>
  );
}
function mapStateToProps(state) {
  return {
    recharge: state.recharge,
  };
}
export default connect(mapStateToProps)(OptionBank);
