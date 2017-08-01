/**
 * Created by cyt on 2017/5/11.
 */

import React from 'react';
import { connect } from 'dva';
import {
  Spin,
} from 'antd';
// import { browserHistory } from 'react-router';
import styles from './risk_detail.css';
import NavBar from '../../components/nav_bar';

function RiskDetail({ risk }) {
  if (risk.curRiskDetail == null) {
    return (
      <Spin spinning={risk.loading}>
        <div >
          <NavBar title="评估详情" />
        </div>
      </Spin>
    );
  }

  const renderList = (list) => {
    const rows = [];
    for (const i in list) {
      if (list[i] != null) {
        rows.push(
          <div key={i} className={styles.rowDiv}>
            <div className={styles.questionDiv}>
              <text className={styles.question}>{list[i].sn + '、' + list[i].quename}</text>
            </div>
            <div className={styles.rowContentDiv} onClick={() => toRiskDetail(list[i].riskrcdid)}>
              <div className={styles.rowItemDiv}>
                <text className={styles.rowItemName}>选项</text>
                <text className={styles.rowItemValue}>{list[i].answopt}</text>
              </div>
              <div className={styles.answerDiv}>
                <text className={styles.rowItemName}>答案</text>
                <text className={styles.rowItemValue}>{list[i].answer}</text>
              </div>
              <div className={styles.rowItemDiv}>
                <text className={styles.rowItemName}>得分</text>
                <text className={styles.rowItemValue}>{list[i].score}</text>
              </div>
            </div>
          </div>,
        );
      }
    }
    return rows;
  };

  return (
    <Spin spinning={risk.loading}>
      <div className={styles.root}>
        <NavBar title="评估详情" />
        <div className={styles.listDiv}>
          {renderList(risk.curRiskDetail)}
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


export default connect(mapStateToProps)(RiskDetail);

