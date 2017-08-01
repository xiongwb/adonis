/**
 * Created by cyt on 2017/5/11.
 */

import React from 'react';
import { connect } from 'dva';
import {
  Spin,
} from 'antd';
import { browserHistory } from 'react-router';
import styles from './risk_assessment.css';
import NavBar from '../../components/nav_bar';
import riskAssessment from '../../assets/risk_assessment01.png';
import prompt from '../../assets/prompt.png';

function RiskAssessment({ risk }) {
  const toRiskQuestion = () => {
    browserHistory.push('/risk_assessment/riskQuestion');
  };
  return (
    <Spin spinning={risk.loading}>
      <div className={styles.root}>
        <NavBar title="风险评估" />
        <div className={styles.msgDiv}>
          <img className={styles.assessmentPhoto} src={riskAssessment} alt="risk_assessment" />
          <text className={styles.msgText}>1分钟了解您的风险承受能力</text>
          <text className={styles.msgText}>获得更好的投资服务、更科学的资产配置建议</text>
          <div className={styles.btnDiv} onClick={toRiskQuestion}>
            <text className={styles.btnText}>开始评估</text>
          </div>
          <text className={styles.alertText}>
            如果不评估，您的风险承受能力将默认为
            <text className={styles.alertRedText}>安益型</text>
          </text>
        </div>
        <div className={styles.remindDiv}>
          <img src={prompt} alt="prompt" />
          <text className={styles.remindText}>{risk.riskTemp != null ? risk.riskTemp.remarks : ''}</text>
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


export default connect(mapStateToProps)(RiskAssessment);

