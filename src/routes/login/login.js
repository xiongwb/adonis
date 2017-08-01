/**
 * Created by zhangle on 2017/5/24.
 */
import React from 'react';
import { connect } from 'dva';
import {
  Icon,
  Input,
  Button,
  Row,
  Col,
} from 'antd';
import { browserHistory } from 'react-router';
import Navbar from '../../components/nav_bar';
import { hexMD5 } from '../../utils/md5';
import styles from './login.css';

function Login({ login, dispatch }) {
  const phone = (e) => {
    dispatch({
      type: 'login/que',
      payload: {
        phone: e.target.value,
        disabled: ishow(e.target.value, login.password),
      },
    });
  };
  const password = (e) => {
    dispatch({
      type: 'login/que',
      payload: { password: e.target.value, disabled: ishow(e.target.value, login.phone) },
    });
    console.log(hexMD5(e.target.value), 1111333333111);
  };

  const submit = () => {
    dispatch({
      type: 'login/login',
      payload: {
        tenantNo: 1101001001, phoneNo: login.phone, pswd: hexMD5(login.password), channel: 3 },
    });
  };
  const onClick = () => {
    browserHistory.push('/register');
  };
  const onClick1 = () => {
    browserHistory.push('/forgetpwd');
  };
  const ishow = (x, y) => {
    if (x === '' || y === '') {
      return true;
    } else {
      return false;
    }
  };
  return (
    <div>
      <div >
        <Navbar title={'登录'} />
      </div>
      <div className={styles.input}>
        <Input
          placeholder="Email/昵称/手机"
          value={login.phone}
          prefix={
            <div >
              <Icon type="user" className={styles.icon} />
            </div>
          } className={styles.input1}
          onChange={phone}
        />
        <Input
          placeholder="密码"
          type="password"
          value={login.password}
          prefix={
            <div >
              <Icon type="lock" className={styles.icon} />
            </div>
          }
          className={styles.input1}
          style={{ marginTop: 10 }}
          onChange={password}
        />
      </div>
      <div className={styles.button}>
        <Button className={styles.button1} type="primary" onClick={submit} disabled={login.disabled}>确定</Button>
      </div>
      <div className={styles.button}>
        <Row>
          <Col span={12} className={styles.left} onClick={() => onClick()}>
            <Icon type="edit" className={styles.icon} /><text className={styles.icon}>立即注册</text></Col>
          <Col span={12} className={styles.right} onClick={() => onClick1()}>忘记密码？</Col>
        </Row>
      </div>
    </div>
  );
}
function mapStateToProps(state) {
  return {
    login: state.login,
  };
}

export default connect(mapStateToProps)(Login);
