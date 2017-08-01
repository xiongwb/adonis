/**
 * Created by cyt on 2017/5/31.
 */
import React from 'react';
import { Button, message } from 'antd';
import { connect } from 'dva';
import styles from './pwd.css';
import NavBar from '../../components/nav_bar';
import { getLocalStorage } from '../../utils/helper';
import Storage from '../../utils/storage';
import { hexMD5 } from '../../utils/md5';

function UpdatePwd({ updatePwd, dispatch }) {
  const isShow = (x, y, z) => {
    if (x === '' || y === '' || z === '') {
      return true;
    } else {
      return false;
    }
  };
  const pwd1 = (e) => {
    dispatch({
      type: 'updatePwd/save',
      payload: { pwd1: hexMD5(e.target.value),
        disabled: isShow(e.target.value,
          updatePwd.pwd2, updatePwd.pwd3) },
    });
  };
  const pwd2 = (e) => {
    dispatch({
      type: 'updatePwd/save',
      payload: { pwd2: hexMD5(e.target.value),
        disabled: isShow(e.target.value,
          updatePwd.pwd1, updatePwd.pwd3) },
    });
  };
  const pwd3 = (e) => {
    dispatch({
      type: 'updatePwd/save',
      payload: { pwd3: hexMD5(e.target.value),
        disabled: isShow(e.target.value,
          updatePwd.pwd1, updatePwd.pwd2) },
    });
  };
  const onClick = () => {
    if (updatePwd.pwd2 === updatePwd.pwd3) {
      dispatch({
        type: 'updatePwd/updateTranPswd', payload: { type: 2, telno: getLocalStorage(Storage.DID_LOGIN).retMsg, oldPswd: updatePwd.pwd1, newPswd: updatePwd.pwd2 },
      });
    } else {
      message.error('2次密码不一致');
    }
  };
  return (
    <div >
      <NavBar title={'修改交易密码'} />
      <div className={styles.top}>
        <div className={styles.line1} />
        <div className={styles.inputDiv1}>
          <text className={styles.text} >原始密码：</text><input value={updatePwd.pwd1} type="password" onChange={pwd1} placeholder="请输入六位交易密码" className={styles.input1} />
        </div>
        <div className={styles.line2} />
      </div>
      <div>
        <div className={styles.inputDiv1}>
          <text className={styles.text} >&emsp;新密码：</text>
          <input value={updatePwd.pwd2} type="password" onChange={pwd2} placeholder="请输入六位交易密码" className={styles.input1} />
        </div>
        <div className={styles.line2} />
      </div>
      <div>
        <div className={styles.inputDiv1}>
          <text className={styles.text} >确认密码：</text>
          <input value={updatePwd.pwd3} type="password" onChange={pwd3} placeholder="请输入六位交易密码" className={styles.input1} />
        </div>
        <div className={styles.line2} />
      </div>
      <Button disabled={updatePwd.disabled} className={styles.button2} onClick={onClick}>确定</Button>
    </div>
  );
}
function mapStateToProps(state) {
  return {
    updatePwd: state.updatePwd,
  };
}
export default connect(mapStateToProps)(UpdatePwd);
