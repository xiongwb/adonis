import React from 'react';
import { browserHistory } from 'react-router';
import { connect } from 'dva';
import styles from './tab_bar.css';
import home from '../assets/home@3x.png';
import invest from '../assets/invest@3x.png';
import loan from '../assets/loan@3x.png';
import mine from '../assets/mine@3x.png';

import homeRed from '../assets/home_red@3x.png';
import investRed from '../assets/invest_red@3x.png';
import loanRed from '../assets/loan_red@3x.png';
import mineRed from '../assets/mine_red@3x.png';

class TabBar extends React.Component {

  render() {
    const toHome = () => {
      console.log(1);
      browserHistory.push('/');
    };

    const toInvest = () => {
      browserHistory.push('/myInvest');
    };

    const toLoan = () => {
      browserHistory.push('/loan');
    };

    const toMine = () => {
      browserHistory.push('/personal');
    };

    return (
      <div className={styles.tab}>
        <div className={styles.line} />
        <div className={styles.tabDiv} onClick={toHome}>
          {
            this.props.title === '首页' ? <img src={homeRed} className={styles.image} alt="首页" /> :
            <img src={home} className={styles.image} alt="首页" />
          }
          {
            this.props.title === '首页' ? <text className={styles.slectText}>首页</text> :
            <text className={styles.unselectText}>首页</text>
          }
        </div>
        <div className={styles.tabDiv} onClick={toInvest}>
          {
            this.props.title === '投资' ? <img src={investRed} className={styles.image} alt="投资" /> :
            <img src={invest} className={styles.image} alt="投资" />
          }
          {
            this.props.title === '投资' ? <text className={styles.slectText}>投资</text> :
            <text className={styles.unselectText}>投资</text>
          }
        </div>
        <div className={styles.tabDiv} onClick={toLoan}>
          {
            this.props.title === '借款' ? <img src={loanRed} className={styles.image} alt="借款" /> :
            <img src={loan} className={styles.image} alt="借款" />
          }
          {
            this.props.title === '借款' ? <text className={styles.slectText}>借款</text> :
            <text className={styles.unselectText}>借款</text>
          }
        </div>
        <div className={styles.tabDiv} onClick={toMine}>
          {
            this.props.title === '我的' ? <img src={mineRed} className={styles.image} alt="我的" /> :
            <img src={mine} className={styles.image} alt="我的" />
          }
          {
            this.props.title === '我的' ? <text className={styles.slectText}>我的</text> :
            <text className={styles.unselectText}>我的</text>
          }
        </div>
      </div>
    );
  }
}


export default connect()(TabBar);
