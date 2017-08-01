/**
 * Created by cyt on 2017/5/24.
 */
import React from 'react';
import { Button } from 'antd';
import { connect } from 'dva';
import { browserHistory } from 'react-router';
import styles from './recharge_pwd.css';
import NavBar from '../../components/nav_bar';
import { hexMD5 } from '../../utils/md5';


function RechargePwd({ recharge, dispatch }) {
  const transPswd = (e) => {
    dispatch({
      type: 'recharge/save',
      payload: { transPswd: e.target.value },
    });
  };
  const submit = () => {
    dispatch({
      type: 'recharge/validateTranPswd1',
      payload: { transPswd: hexMD5(recharge.transPswd), money: recharge.money, busiType: 'R01' },
    });
  };
  const onClick = () => {
    browserHistory.push('/payment_pwd');
  };
  return (
    <div>
      <NavBar title={'验证交易密码'} right={<div onClick={onClick}>忘记密码</div>} />
      <div className={styles.line1} />
      <div className={styles.inputDiv}>
        <text className={styles.text} >交易密码：</text><input onChange={transPswd} value={recharge.transPswd} placeholder="请输入六位交易密码" className={styles.input} />
      </div>
      <div className={styles.line2} />
      <Button className={styles.button} onClick={submit}>
          确定
        </Button>
    </div>
  );
}
function mapStateToProps(state) {
  return {
    recharge: state.recharge,
  };
}
export default connect(mapStateToProps)(RechargePwd);
