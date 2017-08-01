/**
 * Created by zhangle on 2017/5/27.
 */
import React from 'react';
import { connect } from 'dva';
import Navbar from '../../components/nav_bar';
import red from '../../assets/coupon_red.png';
import blue from '../../assets/coupon_blue.png';
import grey from '../../assets/coupon_grey.png';
import styles from './mygiftbag_message.css';

class Mygiftbagmessage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <div className={styles.root}>
        <div>
          <Navbar title={'卡卷'} />
        </div>
        <div className={styles.div1}>
          <div className={styles.login}>
            <text className={styles.text}>历史记录---- <text className={styles.text1}>卡卷</text></text>
          </div>
          <div className={styles.img}>
            <img src={red} className={styles.img1} alt="xuan" />
          </div>
          <div className={styles.img}>
            <img src={grey} className={styles.img1} alt="xuan" />
          </div>
          <div className={styles.img}>
            <img src={blue} className={styles.img1} alt="xuan" />
          </div>
        </div>
      </div>
    );
  }
}


export default connect()(Mygiftbagmessage);
