/**
 * Created by cyt on 2017/5/11.
 */

import React from 'react';
import { connect } from 'dva';
import {
  Spin,
  Icon,
} from 'antd';
import { browserHistory } from 'react-router';
import styles from './risk_record.css';
import NavBar from '../../components/nav_bar';

function RiskRecord({ risk, dispatch }) {
  if (risk.riskRecord == null) {
    return (
      <Spin spinning={risk.loading}>
        <div >
          <NavBar title="风险评估记录" right="新增评估" onClick={toRiskAssessment} />
        </div>
      </Spin>
    );
  }

  const toRiskDetail = (riskrcdid) => {
    dispatch({
      type: 'risk/getRiskDetail',
      payload: { riskrcdid: riskrcdid },
    });
    browserHistory.push('/risk_assessment/riskDetail');
  };

  const renderList = (list) => {
    const rows = [];
    for (const i in list) {
      if (list[i] != null) {
        rows.push(
          <div key={i} className={styles.rowDiv}>
            <div className={styles.rowContentDiv} onClick={() => toRiskDetail(list[i].riskrcdid)}>
              <div className={styles.rowItemDiv}>
                <text className={styles.rowItemName}>评估日期</text>
                <text className={styles.rowItemValue}>{list[i].evadate}</text>
              </div>
              <div className={styles.rowItemDiv}>
                <text className={styles.rowItemName}>得分</text>
                <text className={styles.rowItemValue}>{list[i].score}</text>
              </div>
              <div className={styles.rowItemDiv}>
                <text className={styles.rowItemName}>等级</text>
                <text className={styles.rowItemValue}>{list[i].riskgrade}</text>
              </div>
              <Icon type="right" />
            </div>
          </div>,
        );
      }
    }
    return rows;
  };

  const toRiskAssessment = () => {
    browserHistory.push('/risk_assessment/riskAssessment');
  };
  return (
    <Spin spinning={risk.loading}>
      <div className={styles.root}>
        <NavBar title="风险评估记录" right="新增评估" onClick={toRiskAssessment} />
        <div className={styles.listDiv}>
          {renderList(risk.riskRecord)}
        </div>
      </div>
    </Spin>
  );
}

function mapStateToProps(state) {
  return {
    risk: state.risk,
  };
}


export default connect(mapStateToProps)(RiskRecord);

