/**
 * Created by cyt on 2017/5/11.
 */

import React from 'react';
import { connect } from 'dva';
import {
  Spin,
} from 'antd';
// import { browserHistory } from 'react-router';
import styles from './risk_question.css';
import NavBar from '../../components/nav_bar';
import COMMONCONFIG from '../../constant/common_config';

function RiskQuestion({ risk, dispatch }) {
  const renderRows = (list) => {
    const rows = [];
    for (const i in list) {
      if (list[i] != null) {
        const question = (parseInt(i) + 1) + '、' + list[i].riskquestionname;
        rows.push(
          <div key={'question' + i} className={styles.questionRowDiv}>
            <div className={styles.questionDiv}>
              <text className={styles.question}>{question}</text>
            </div>
            <div className={styles.answersDiv}>
              {renderAnswer(list[i].list, i)}
            </div>
          </div>,
        );
      }
    }
    return rows;
  };

  const renderAnswer = (list, index) => {
    const answerList = [];
    for (const i in list) {
      if (list[i] != null) {
        const idx = 'option' + index;
        if (risk[idx] === list[i].riskanswertype) {
          answerList.push(
            <div key={'answer' + i} className={styles.answerDiv} onClick={() => setAnswer(index, list[i])}>
              <text className={styles.answerSelected}>{list[i].riskanswertype + ' ' + list[i].riskanswername}</text>
            </div>,
          );
        } else {
          answerList.push(
            <div key={'answer' + i} className={styles.answerDiv} onClick={() => setAnswer(index, list[i])}>
              <text className={styles.answerUnselect}>{list[i].riskanswertype + ' ' + list[i].riskanswername}</text>
            </div>,
          );
        }
      }
    }
    return answerList;
  };
  const setAnswer = (index, answer) => {
    const obj = {};
    const idx1 = 'option' + index;
    obj[idx1] = answer.riskanswertype;
    const idx2 = 'score' + index;
    obj[idx2] = answer.riskanswerscore;
    const idx3 = 'answer' + index;
    obj[idx3] = answer.riskanswername;
    dispatch({
      type: 'risk/save',
      payload: obj,
    });
  };
  const submit = () => {
    let count = 0;
    const newRiskEvaDetVOList = [];
    let flag = true;
    for (let i = 0; i < risk.questionList.length; i++) {
      const idx1 = 'option' + i;
      const option = risk[idx1];
      const idx2 = 'score' + i;
      const score = risk[idx2];
      const idx3 = 'answer' + i;
      const answer = risk[idx3];
      if (option == null) {
        flag = false;
        alert('请回答第' + (i + 1) + '题');
        break;
      } else {
        count = parseInt(count) + parseInt(score);
        newRiskEvaDetVOList.push({
          sn: risk.questionList[i].sn,
          quename: risk.questionList[i].riskquestionname,
          answopt: option,
          answer: answer,
          score: score,
        });
      }
    }
    if (flag) {
      let month = new Date().getMonth() + 1;
      if (month.toString.length === 1) {
        month = '0' + month;
      }
      const date = new Date().getFullYear() + '-' + month + '-' + new Date().getDate();
      dispatch({
        type: 'risk/newRiskRcd',
        payload: {
          tenantno: COMMONCONFIG.tenantNo,
          telno: '15202207322',
          // getLocalStorage(Storage.DID_LOGIN).retMsg
          evadate: date,
          risktempid: risk.riskTemp.risktempid,
          score: count,
          newRiskEvaDetVOListStr: JSON.stringify(newRiskEvaDetVOList),
        },
      });
    }
  };
  return (
    <Spin spinning={risk.loading}>
      <div className={styles.root}>
        <NavBar title="风险评估" right="提交" onClick={() => submit()} />
        <div className={styles.remindDiv}>
          <text className={styles.remindText}>根据评估结果，您的风险承受能力将属于以下五种类型：安益型、保守型、稳健型、积极型、激进型。</text>
        </div>
        <div className={styles.countDiv}>
          <text className={styles.countText}>
            共{risk.questionList != null ? risk.questionList.length : 0}道题
          </text>
        </div>
        {renderRows(risk.questionList)}
      </div>
    </Spin>
  );
}

function mapStateToProps(state) {
  return {
    risk: state.risk,
  };
}


export default connect(mapStateToProps)(RiskQuestion);

