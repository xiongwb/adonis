/**
 * Created by cyt on 2017/5/26.
 */
import React from 'react';
import { Row, Col, Progress, Spin, Form } from 'antd';
import { connect } from 'dva';
import NavBar from '../../components/nav_bar';
import StringUtils from '../../utils/string_utils';
import styles from './total_amount.css';

class TotalAmountFrom extends React.Component {

  render() {
    const { totalAmount } = this.props;
    // 金额为NULL是初始化为0
    const Initialization = (e) => {
      if (e) {
        return StringUtils.moneyFormatData2Money(e);
      } else {
        return '0.0';
      }
    };
    return (
      <div>
        <div className={styles.total}>
          <Progress status="exception" type="circle" percent={100} width={'12rem'} format={() => <div className={styles.format}>总资产(元)<br /><br />{Initialization(totalAmount.data.acctnoReturnVo.totasset)}</div>} />
        </div>
        <div className={styles.root}>
          <Row className={styles.root1}>
            <Col span={8}>
              <Row>
                <Col span={4} className={styles.zuo}>
                  <div className={styles.yuanq} />
                </Col>
                <Col span={20} className={styles.you}>
                  <text className={styles.text}>可用余额</text>
                </Col>
              </Row>
            </Col>
            <Col span={8}>
              <Row>
                <Col span={8} className={styles.zuo}>
                  <div className={styles.yuanq1} />
                </Col>
                <Col span={16} className={styles.you}>
                  <text className={styles.text}>已投余额</text>
                </Col>
              </Row>
            </Col>
            <Col span={8}>
              <Row>
                <Col span={10} className={styles.zuo}>
                  <div className={styles.yuanq2} />
                </Col>
                <Col span={14} className={styles.you}>
                  <text className={styles.text}>待收益余额</text>
                </Col>
              </Row>
            </Col>
          </Row>
          <Row className={styles.root1}>
            <Col span={8}>
              <Row>
                <Col span={4} className={styles.zuo}>
                  <div className={styles.yuanq3} />
                </Col>
                <Col span={20} className={styles.you}>
                  <text className={styles.text}>可提余额</text>
                </Col>
              </Row>
            </Col>
            <Col span={8}>
              <Row>
                <Col span={8} className={styles.zuo}>
                  <div className={styles.yuanq4} />
                </Col>
                <Col span={16} className={styles.you}>
                  <text className={styles.text}>在投余额</text>
                </Col>
              </Row>
            </Col>
            <Col span={8}>
              <Row>
                <Col span={10} className={styles.zuo}>
                  <div className={styles.yuanq5} />
                </Col>
                <Col span={14} className={styles.you}>
                  <text className={styles.text}>已收益余额</text>
                </Col>
              </Row>
            </Col>
          </Row>
        </div>
        <div className={styles.login}>
          <div className={styles.login1}>
            <Row>
              <Col span={8}>
                <text className={styles.text1}>可用余额:</text>
              </Col>
              <Col span={16} className={styles.text2}>
                <text>{Initialization(totalAmount.data.acctnoReturnVo.availablesum)}元</text>
              </Col>
            </Row>
          </div>
          <div className={styles.login1}>
            <Row>
              <Col span={8}>
                <text className={styles.text1}>已投金额:</text>
              </Col>
              <Col span={16} className={styles.text2}>
                <text>{Initialization(totalAmount.data.acctnoReturnVo.investedsum)}元</text>
              </Col>
            </Row>
          </div>
          <div className={styles.login1}>
            <Row>
              <Col span={8}>
                <text className={styles.text1}>待收益金额:</text>
              </Col>
              <Col span={16} className={styles.text2}>
                <text>{Initialization(totalAmount.data.acctnoReturnVo.toearnsum)}元</text>
              </Col>
            </Row>
          </div>
          <div className={styles.login1}>
            <Row>
              <Col span={8}>
                <text className={styles.text1}>可提金额:</text>
              </Col>
              <Col span={16} className={styles.text2}>
                <text>{Initialization(totalAmount.data.acctnoReturnVo.candrawsum)}元</text>
              </Col>
            </Row>
          </div>
          <div className={styles.login1}>
            <Row>
              <Col span={8}>
                <text className={styles.text1}>在投金额:</text>
              </Col>
              <Col span={16} className={styles.text2}>
                <text>{Initialization(totalAmount.data.acctnoReturnVo.cannotdrawsum)}元</text>
              </Col>
            </Row>
          </div>
          <div className={styles.login1}>
            <Row>
              <Col span={8}>
                <text className={styles.text1}>已收益金额:</text>
              </Col>
              <Col span={16} className={styles.text2}>
                <text>{Initialization(totalAmount.data.acctnoReturnVo.toearnsum)}元</text>
              </Col>
            </Row>
          </div>
        </div>
      </div>
    );
  }
}
const RForm = Form.create()(TotalAmountFrom);
function TotalAmount({ totalAmount }) {
  if (totalAmount.data.length === 0) {
    return (
      <div className={styles.spin}>
        <Spin style={{ marginTop: '50%' }} />
      </div>
    );
  } else {
    console.log(totalAmount.data, 1111111111111);
    return (
      <div>
        <div >
          <NavBar title={'总资产'} />
        </div>
        <div>
          <RForm totalAmount={totalAmount} />
        </div>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    totalAmount: state.totalAmount,
  };
}

export default connect(mapStateToProps)(TotalAmount);
