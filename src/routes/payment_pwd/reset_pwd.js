/**
 * Created by cyt on 2017/5/27.
 */
import React from 'react';
import { Row, Col, Button, message } from 'antd';
import { connect } from 'dva';
import styles from './pwd.css';
import NavBar from '../../components/nav_bar';
import { getLocalStorage } from '../../utils/helper';
import Storage from '../../utils/storage';
import tenant from '../../constant/common_config';
import { hexMD5 } from '../../utils/md5';

function ResetPwd({ resetPwd, dispatch }) {
  const isShow = (x, y, z) => {
    if (x === '' || y === '' || z === '') {
      return true;
    } else {
      return false;
    }
  };
  const pwd1 = (e) => {
    dispatch({
      type: 'resetPwd/save',
      payload: { pwd1: hexMD5(e.target.value),
        disabled: isShow(e.target.value,
          resetPwd.pwd2, resetPwd.varCode) },
    });
  };
  const pwd2 = (e) => {
    dispatch({
      type: 'resetPwd/save',
      payload: { pwd2: hexMD5(e.target.value),
        disabled: isShow(e.target.value,
          resetPwd.pwd1, resetPwd.varCode) },
    });
  };
  const varCode = (e) => {
    dispatch({
      type: 'resetPwd/save',
      payload: { varCode: e.target.value,
        disabled: isShow(e.target.value,
          resetPwd.pwd1, resetPwd.pwd2) },
    });
  };
  const onClick = () => {
    if (resetPwd.pwd1 === resetPwd.pwd2) {
      dispatch({
        type: 'resetPwd/validateVarCode',
        payload: {
          varCode: resetPwd.varCode,
          phoneNo: getLocalStorage(Storage.DID_LOGIN).retMsg,
        },
      });
    } else {
      message.error('2次密码不一致');
    }
  };
  // 点击发送验证码，触发这个方法，
  const onchange = () => {
    dispatch({
      type: 'resetPwd/get',
      payload: {
        tenantNo: tenant.tenantNo,
        phoneNo: getLocalStorage(Storage.DID_LOGIN).retMsg,
        flag: 5,
      },
    });
    daojishi(60);
  };
// 倒计时验证码，默认为60秒
  const daojishi = (m) => {
    if (m > 0) {
      setTimeout(() => {
        m -= 1;
        dispatch({
          type: 'resetPwd/save',
          payload: { m: m },
        });
        daojishi(m);
      }, 1000);
    }
  };
  let t;
  let d;

  if (resetPwd.m === 0) {
    t = '发送验证码';
    d = false;
  } else {
    d = true;
    t = resetPwd.m + '秒后重发验证码';
  }
  return (
    <div >
      <NavBar title={'设置密码'} />
      <div className={styles.top}>
        <div className={styles.line1} />
        <div className={styles.inputDiv1}>
          <text className={styles.text} >交易密码：</text><input value={resetPwd.pwd1} onChange={pwd1} type="password" placeholder="请输入六位交易密码" className={styles.input1} />
        </div>
        <div className={styles.line2} />
      </div>
      <div>
        <div className={styles.inputDiv1}>
          <text className={styles.text} >确认密码：</text>
          <input value={resetPwd.pwd2} onChange={pwd2} type="password" placeholder="请输入六位交易密码" className={styles.input1} />
        </div>
        <div className={styles.line2} />
      </div>
      <div >
        <div className={styles.inputDiv2}>
          <Row type="flex">
            <Col span={6}>
              <div className={styles.div}>
                <text className={styles.text} >验证码：</text>
              </div>
            </Col>
            <Col span={7}>
              <input onChange={varCode} className={styles.input2} style={{ width: '100%' }} />
            </Col>
            <Col span={10}>
              <Button disabled={d} className={styles.button1} onClick={onchange}>{t}</Button>
            </Col>
          </Row>
        </div>
        <div className={styles.line2} />
      </div>
      <Button disabled={resetPwd.disabled} className={styles.button2} onClick={onClick}>确定</Button>
    </div>
  );
}
function mapStateToProps(state) {
  return {
    resetPwd: state.resetPwd,
  };
}
export default connect(mapStateToProps)(ResetPwd);
