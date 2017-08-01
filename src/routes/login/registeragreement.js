
import React from 'react';
import { connect } from 'dva';
import {
  Spin,
} from 'antd';
import Navbar from '../../components/nav_bar';
import styles from './registeragreement.css';


function RegisterAgreement({ registeragreement }) {
  if (registeragreement.data.length === 0) {
    return (
      <div className={styles.spin}>
        <Spin style={{ marginTop: '50%' }} />
      </div>
    );
  } else {
    return (
      <div>
        <div >
          <Navbar title={'注册协议'} />
        </div>
        <div className={styles.root}>
          <text className={styles.text}>{registeragreement.data.protocolcontent}</text>
        </div>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    registeragreement: state.registeragreement,
  };
}

export default connect(mapStateToProps)(RegisterAgreement);
