/**
 * Created by zhangle on 2017/5/27.
 */
import React from 'react';
import { connect } from 'dva';
import {
  Icon,
} from 'antd';
import { browserHistory } from 'react-router';
import Navbar from '../../components/nav_bar';
import styles from './mygiftbag.css';

class Mygiftbag extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const onClick = () => {
      browserHistory.push('/mygiftbag/message');
    };
    return (
      <div>
        <div>
          <Navbar title={'我的礼包'} />
        </div>
        <div className={styles.root}>
          <text className={styles.title1}>
            如要查看已过期或已使用卡卷，请点击-<text className={styles.title2} onClick={() => onClick()}>历史记录</text>
          </text>
        </div>
        <div className={styles.div}>
          <div >
            <Icon type="exclamation-circle-o" className={styles.login} />
          </div>
          <div className={styles.login1}>
            <text className={styles.text}>您还没有可用的卡卷!</text>
          </div>
        </div>
      </div>
    );
  }
}


export default connect()(Mygiftbag);
