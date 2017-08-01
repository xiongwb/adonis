/**
 * Created by cyt on 2017/5/11.
 */

import React from 'react';
import { connect } from 'dva';
import {
  Spin,
  Modal,
  Row,
  Col,
  Icon,
} from 'antd';
import { browserHistory } from 'react-router';
import styles from './repayment.css';
import StringUtils from '../../utils/string_utils';

class NavBar extends React.Component {
  render() {
    const onClick = () => {
      browserHistory.goBack();
    };
    return (
      <div className={styles.head}>
        <Row >
          <Col span={6}>
            <div className={styles.top1}>
              <Icon onClick={onClick} type="left" className={styles.icon} />
            </div>
          </Col>
          <Col span={10}>
            <div className={styles.top2}>{this.props.title}</div>
          </Col>
          <Col span={8}>
            <div className={styles.top3} onClick={this.props.onClick}>{this.props.right}</div>
          </Col>
        </Row>
      </div>
    );
  }
}

function Repayment({ financing, dispatch }) {
  if (financing.repayList == null) {
    return (
      <div >
        <Spin spinning={financing.loading}>
          <NavBar title="还款记录" />
        </Spin>
      </div>
    );
  }

  const renderList = (list) => {
    const rows = [];
    for (const i in list) {
      if (list[i] != null) {
        const rowData = list[i];
        const planpaydue = rowData.planpaydue != null ? StringUtils.moneyFormatData2Money(rowData.planpaydue) : '0.00';
        const planpayint = rowData.planpayint != null ? StringUtils.moneyFormatData2Money(rowData.planpayint) : '0.00';
        // let disabled = rowData.finstatus === '9' ? true : false
        rows.push(
          <div key={i} className={styles.rowDiv}>
            <div className={styles.prdnameDiv}>
              <text className={styles.prdname}>期次{rowData.payorder}</text>
            </div>
            <div className={styles.detailDiv} >
              <div className={styles.detailItemDiv}>
                <text className={styles.detailName}>应还日期</text>
                <text className={styles.detailContent}>{rowData.planpaydate}</text>
              </div>
              <div className={styles.detailItemDiv}>
                <text className={styles.detailName}>应还本金</text>
                <text className={styles.detailContent}>{planpaydue}</text>
              </div>
              <div className={styles.detailItemDiv}>
                <text className={styles.detailName}>应还利息</text>
                <text className={styles.detailContent}>{planpayint}</text>
              </div>
            </div>
            <div className={styles.footDiv}>
              <div className={styles.paystatusDiv}>
                <text className={styles.paystatusname}>{rowData.paystatusname}</text>
              </div>
              <div className={styles.rowBtnDiv}>
                <div className={styles.btnDiv} onClick={() => repay(list[i])}>
                  <text className={styles.btnText}>还款</text>
                </div>
                <div className={styles.btnDiv} onClick={() => payFee(list[i])}>
                  <text className={styles.btnText}>支付费用</text>
                </div>
              </div>
            </div>
          </div>,
        );
      }
    }
    return rows;
  };

  const repay = (rowData) => {
    const planPayDue = rowData.planpaydue != null ? rowData.planpaydue : 0;
    const planPayInt = rowData.planpayint != null ? rowData.planpayint : 0;
    const money = planPayDue + planPayInt;
    dispatch({
      type: 'financing/save',
      payload: {
        repayModelVisible: true,
        repayMoney: money,
        finpayrcdid: rowData.finpayrcdid,
      },
    });
  };

  const repaySubmit = () => {
    dispatch({
      type: 'financing/save',
      payload: { repayModelVisible: false },
    });
    browserHistory.push('/financing/tradePasswordValidate');
  };

  const repayAll = () => {
    dispatch({
      type: 'financing/save',
      payload: { prdCode: financing.curRepay.prdcode },
    });
  };

  const repayAllSubmit = () => {
    dispatch({
      type: 'financing/save',
      payload: { repayAllModelVisible: false },
    });
    browserHistory.push('/financing/tradePasswordValidateRepayAll');
  };

  const payFee = (rowData) => {
    dispatch({
      type: 'financing/save',
      payload: {
        prdcodePayFee: financing.curRepay.prdcode,
      },
    });
    if (rowData) {
      dispatch({
        type: 'financing/sumFee ',
        payload: {
          finpayrcdid: rowData.finpayrcdid,
        },
      });
    }
    browserHistory.push('/financing/payFee');
  };

  const closeRepayModel = () => {
    dispatch({
      type: 'financing/save',
      payload: { repayModelVisible: false },
    });
  };

  const list = financing.repaymentList;
  let num = 0;
  for (const i in list) {
    if (list[i] != null) {
      if (list[i].isallowpay === '1') { // 可还款
        num += 1;
      }
    }
  }
  return (
    <Spin spinning={financing.loading}>
      <div className={styles.root}>
        {num > 1 ?
          <NavBar
            title="还款记录"
            right={
              <div className={styles.rightDiv}>
                <text className={styles.rightText1} onClick={repayAll}>提前结清</text>
                <text className={styles.rightText2} onClick={payFee}>支付费用</text>
              </div>}
          />
          :
          <NavBar title="还款记录" />
        }
        <div className={styles.listDiv}>
          {renderList(financing.repaymentList)}
        </div>
        <Modal
          title="提示"
          visible={financing.repayModelVisible}
          onOk={repaySubmit}
          onCancel={closeRepayModel}
        >
          <text className={styles.modelText}>还款金额：{financing.repayMoney != null ? StringUtils.moneyFormatData2Money(financing.repayMoney) : '0.00'}</text>
        </Modal>
        <Modal
          title="提示"
          visible={financing.repayAllModelVisible}
          onOk={repayAllSubmit}
          onCancel={closeRepayModel}
        >
          <text className={styles.modelText}>还款金额：{financing.repayAllMoney != null ? StringUtils.moneyFormatData2Money(financing.repayAllMoney) : '0.00'}</text>
        </Modal>
      </div>
    </Spin>
  );
}

function mapStateToProps(state) {
  return {
    financing: state.financing,
  };
}


export default connect(mapStateToProps)(Repayment);

