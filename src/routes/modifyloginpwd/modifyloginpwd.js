/**
 * Created by zhangle on 2017/6/7.
 */
/**
 * Created by zhangle on 2017/5/24.
 */
import React from 'react';
import { connect } from 'dva';
import {
  Icon,
  Button,
  Row,
  Col,
  Form,
  Spin,
  message,
} from 'antd';
import Navbar from '../../components/nav_bar';
import { hexMD5 } from '../../utils/md5';
import { getLocalStorage } from '../../utils/helper';
import Storage from '../../utils/storage';
import styles from './modifyloginpwd.css';

class From extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  render() {
    const { modifyloginpwd } = this.props;
    const onchange = (e) => {
      this.props.dispatch({
        type: 'modifyloginpwd/que',
        payload: { oldPswd: e.target.value,
          disabled: ishow(e.target.value, modifyloginpwd.Pswd, modifyloginpwd.newPswd) },
      });
    };
    const onchange1 = (e) => {
      this.props.dispatch({
        type: 'modifyloginpwd/que',
        payload: { Pswd: e.target.value },
        disabled: ishow(e.target.value, modifyloginpwd.oldPswd, modifyloginpwd.newPswd),
      });
    };
    const onchange2 = (e) => {
      this.props.dispatch({
        type: 'modifyloginpwd/que',
        payload: {
          newPswd: e.target.value,
          disabled: ishow(e.target.value, modifyloginpwd.oldPswd, modifyloginpwd.Pswd),
        },
      });
    };
    const onClick = () => {
      console.log(modifyloginpwd.oldPswd, 44444444);
      if (modifyloginpwd.Pswd === modifyloginpwd.newPswd) {
        this.props.dispatch({
          type: 'modifyloginpwd/UpdatePswd',
          payload: {
            tenantNo: 1101001001,
            phoneNo: getLocalStorage(Storage.DID_LOGIN).retMsg,
            oldPswd: hexMD5(modifyloginpwd.oldPswd),
            newPswd: hexMD5(modifyloginpwd.newPswd) },
        });
      } else {
        message.error('交易密码不一样，亲！请看清哟');
      }
    };
    const ishow = (x, y, z) => {
      if (x === '' || y === '' || z === '') {
        return true;
      } else {
        return false;
      }
    };
    return (
      <div>
        <div className={styles.root}>
          <Row className={styles.bian} >
            <Col span={8}>
              <text className={styles.text}>原密码:</text>
            </Col>
            <Col span={16}>
              <input className={styles.input} type="password" name="password" placeholder="请输入原密码" value={modifyloginpwd.oldPswd} onChange={onchange} />
            </Col>
          </Row>
        </div>
        <div className={styles.root}>
          <Row className={styles.bian} >
            <Col span={8}>
              <text className={styles.text}>新密码:</text>
            </Col>
            <Col span={16}>
              <input className={styles.input} type="password" name="password" placeholder="请输入新密码" value={modifyloginpwd.Pswd} onChange={onchange1} />
            </Col>
          </Row>
        </div>
        <div className={styles.root}>
          <Row className={styles.bian} >
            <Col span={8}>
              <text className={styles.text}>确认密码:</text>
            </Col>
            <Col span={16}>
              <input className={styles.input} type="password" name="password" placeholder="请输入新密码" value={modifyloginpwd.newPswd} onChange={onchange2} />
            </Col>
          </Row>
        </div>
        <div className={styles.root1}>
          <Row >
            <Col span={2}>
              <Icon type="info-circle" className={styles.icon} />
            </Col>
            <Col span={22}>
              <text className={styles.text1}>
                提示：原密码输错5次将被锁定；新密码要求：密码必须为数字，字母的组合，长度为6-30位，且不能为连续的字母或数字。
              </text>
            </Col>
          </Row>
        </div>
        <div className={styles.root2}>
          <Button className={styles.button} type="primary" onClick={onClick} disabled={modifyloginpwd.disabled}>完成</Button>
        </div>
      </div>
    );
  }
}
const RForm = Form.create()(From);
function Modifyloginpwd({ modifyloginpwd, dispatch }) {
  if (modifyloginpwd.data.length === 0) {
    return (
      <div className={styles.spin}>
        <Spin style={{ marginTop: '50%' }} />
      </div>
    );
  } else {
    console.log(modifyloginpwd, 111111111111111);
    return (
      <div>
        <div >
          <Navbar title={'密码修改'} />
        </div>
        <div className={styles.hend}>
          <RForm modifyloginpwd={modifyloginpwd} dispatch={dispatch} />
        </div>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    modifyloginpwd: state.modifyloginpwd,
  };
}

export default connect(mapStateToProps)(Modifyloginpwd);
