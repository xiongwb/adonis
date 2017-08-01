/**
 * Created by cyt on 2017/5/11.
 */

import React from 'react';
import { connect } from 'dva';
import {
  Spin,
} from 'antd';
import { browserHistory } from 'react-router';
import styles from './financing_record.css';
import StringUtils from '../../utils/string_utils';
import NavBar from '../../components/nav_bar';

function FinancingRecord({ financing, dispatch }) {
  if (financing.financingList == null) {
    return (
      <Spin spinning={financing.loading}>
        <div >
          <NavBar title="融资记录" />
        </div>
      </Spin>
    );
  }
  // console.log(financing.financingList, 'financing.financingList')
  const renderList = (list) => {
    const rows = [];
    for (const i in list) {
      if (list[i] != null) {
        const rowData = list[i];
        const moneyStr = rowData.finsum != null ? StringUtils.moneyFormatData2Money(rowData.finsum) : '0.00';
        let status = '';
        switch (rowData.finstatus) {
          case '1':
            status = '正常';
            break;
          case '2':
            status = '逾期';
            break;
          case '9':
            status = '结清';
            break;
          default:
            status = '';
        }
        // let disabled = rowData.finstatus === '9' ? true : false
        rows.push(
          <div key={i} className={styles.rowDiv}>
            <div className={styles.prdnameDiv}>
              <text className={styles.prdname}>{rowData.prdinfo.prdname}</text>
            </div>
            <div className={styles.detailDiv} onClick={() => toDetail(rowData)}>
              <div className={styles.detailItemDiv}>
                <text className={styles.detailName}>融资金额</text>
                <text className={styles.detailContent}>{moneyStr}</text>
              </div>
              <div className={styles.detailItemDiv}>
                <text className={styles.detailName}>融资日期</text>
                <text className={styles.detailContent}>{rowData.findate}</text>
              </div>
              <div className={styles.statusDiv}>
                <text className={styles.statusText}>{status}</text>
              </div>
            </div>
            <div className={styles.footDiv}>
              <text className={styles.expdate}>到期日期:{rowData.expdate}</text>
              <div>
                <div className={styles.btnDiv} onClick={() => toRepayment(rowData)}>
                  <text className={styles.btnText}>还款</text>
                </div>
              </div>
            </div>
          </div>,
        );
      }
    }
    return rows;
  };

  const toDetail = (rowData) => {
    dispatch({
      type: 'financing/save',
      payload: { curDetail: rowData },
    });
    browserHistory.push('/financing/financingDetail');
  };

  const toRepayment = (rowData) => {
    dispatch({
      type: 'financing/save',
      payload: { curRepay: rowData },
    });
    browserHistory.push('/financing/repayment');
  };

  return (
    <Spin spinning={financing.loading}>
      <div className={styles.root}>
        <NavBar title="融资记录" />
        <div className={styles.listDiv}>
          {renderList(financing.financingList)}
        </div>
      </div>
    </Spin>
  );
}

function mapStateToProps(state) {
  return {
    financing: state.financing,
  };
}


export default connect(mapStateToProps)(FinancingRecord);

