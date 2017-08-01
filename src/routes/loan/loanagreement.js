
import React from 'react';
import { connect } from 'dva';
import {
  Spin,
} from 'antd';
import Navbar from '../../components/nav_bar';
import styles from './loanagreement.css';


function Loanagreement({ loanagreement }) {
  if (loanagreement.data.length === 0) {
    return (
      <div className={styles.spin}>
        <Spin style={{ marginTop: '50%' }} />
      </div>
    );
  } else {
    return (
      <div>
        <div >
          <Navbar title={loanagreement.data.protocoltitle} />
        </div>
        <div className={styles.root}>
          <text className={styles.text}>{loanagreement.data.protocolcontent}</text>
        </div>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    loanagreement: state.loanagreement,
  };
}

export default connect(mapStateToProps)(Loanagreement);
