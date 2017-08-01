/**
 * Created by zhangle on 2017/5/24.
 */
import React from 'react';
import { connect } from 'dva';
import {
  Form,
  Spin,
} from 'antd';
import { browserHistory } from 'react-router';
import Navbar from '../../components/nav_bar';
import { getLocalStorage } from '../../utils/helper';
import Storage from '../../utils/storage';
import TabBar from '../../components/tab_bar';
import ren from '../../assets/renw.png';
import styles from './loan.css';

class LoanFrom extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  render() {
    const { loan } = this.props;
    const onClick = () => {
      if (getLocalStorage(Storage.DID_LOGIN) != null) {
        browserHistory.push('/loanapply');
      } else {
        browserHistory.push('/login');
      }
    };
    return (
      <div>
        <div className={styles.sdao}>
          <img src={ren} className={styles.img} alt="xuan" />
        </div>
        <div className={styles.root}>
          <text className={styles.text}>{loan.data.model.title}</text>
        </div>
        <div className={styles.root1}>
          <text className={styles.text1}>
            {loan.data.model.content}
          </text>
        </div>
        <div className={styles.root4}>
          <div className={styles.root3} onClick={onClick}>
            <div className={styles.login}>
              <text className={styles.text2}>立即申请</text>
            </div>
          </div>
        </div>
        <TabBar title={'借款'} />
      </div>
    );
  }
}
const RForm = Form.create()(LoanFrom);

function Loan({ loan, dispatch }) {
  if (loan.data.length === 0) {
    return (
      <div className={styles.spin}>
        <Spin style={{ marginTop: '50%' }} />
      </div>
    );
  } else {
    console.log(loan.data.model, 123);
    return (
      <div >
        <div>
          <Navbar title={'借款项目'} left={<div />} />
        </div>
        <div className={styles.rf}>
          <RForm loan={loan} dispatch={dispatch} />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    loan: state.loan,
  };
}

export default connect(mapStateToProps)(Loan);
