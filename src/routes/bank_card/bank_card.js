/**
 * Created by cyt on 2017/5/26.
 */
import React from 'react';
import { Row, Col, Icon, Spin } from 'antd';
import { connect } from 'dva';
import { browserHistory } from 'react-router';
import styles from './bank_card.css';
import NavBar from '../../components/nav_bar';
import AddBank from '../../assets/add_bank.png';
import wbankcard from '../../assets/wbank_card.png';
import Change from '../../assets/change.png';

function BankCard({ bankCard, dispatch }) {
  if (bankCard.data.length === 0) {
    return (<div className={styles.spin}><Spin style={{ marginTop: '70%' }} /></div>);
  }
  const onClick = (e) => {
    dispatch({
      type: 'bankCard/save',
      payload: { acctno: e },
    });
    browserHistory.push('/bank_card/new_card');
  };
  const bank = (s) => {
    return (
      <div>
        <Row>
          <div className={styles.line1} />
          <div className={styles.bodyDiv}>
            <Row type="flex">
              <Col>
                <img src={wbankcard} alt="banner" className={styles.img1} />
              </Col>
              <Col span={15}>
                <div className={styles.bankName}>
                  {s.openbank}
                </div >
                <div className={styles.bankNo}>
                  {s.acctno}
                </div>
              </Col>
              <Col span={2}>
                <div onClick={() => onClick(s.acctno)}><img src={Change} alt="banner" className={styles.icon1} /></div>
              </Col>
            </Row>
          </div>
        </Row>
        <div className={styles.line2} />
      </div>
    );
  };
  return (
    <div>
      <NavBar title={'银行卡管理'} />
      <div style={{ marginTop: '4.5rem' }} />
      {bankCard.data.bindList.map((s, i) => bank(s, i))}
      <div className={styles.line3} />
      <div className={styles.div} onClick={() => browserHistory.push('/bank_card/cardadd')}>
        <Row type="flex">
          <Col span={4}>
            <img src={AddBank} alt="banner" className={styles.img2} />
          </Col>
          <Col span={6}>
            添加银行卡
          </Col>
          <Col span={14}>
            <Icon className={styles.icon2} type="right" />
          </Col>
        </Row>
      </div>
      <div className={styles.line4} />
    </div>
  );
}
function mapStateToProps(state) {
  return {
    bankCard: state.bankCard,
  };
}
export default connect(mapStateToProps)(BankCard);
