
import React from 'react';
import { connect } from 'dva';
import {
  Button,
  Form,
  Input,
} from 'antd';
import Navbar from '../../components/nav_bar';
import styles from './verifypswd.css';

class VerifypswdFrom extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  render() {
    const { verifypswd } = this.props;
    const transPswd = (e) => {
      this.props.dispatch({
        type: 'verifypswd/findPrd',
        payload: {
          transPswd: e.target.value },
      });
    };
    const onbush = () => {
      console.log(verifypswd, 33333333333);
      this.props.dispatch({
        type: 'verifypswd/ValidateTranPswd',
        payload: {
          transPswd: verifypswd.transPswd,
          busiType: 'T01',
          money: verifypswd.money,
          telno: verifypswd.phoneNo,
          prdInfoID: verifypswd.prdInfoID },
      });
    };
    return (
      <div className={styles.root}>
        <div className={styles.login}>
          <Input className={styles.input} placeholder="请输入交易密码" type="password" onChange={transPswd} />
        </div>
        <div className={styles.login1}>
          <Button className={styles.button} onClick={onbush} type="primary">确定</Button>
        </div>
      </div>
    );
  }
}
const RForm = Form.create()(VerifypswdFrom);

function Verifypswd({ verifypswd, dispatch }) {
  return (
    <div >
      <div >
        <Navbar title={'验证交易密码'} />
      </div>
      <div className={styles.root}>
        <RForm verifypswd={verifypswd} dispatch={dispatch} />
      </div>
    </div>
  );
}
function mapStateToProps(state) {
  return {
    verifypswd: state.verifypswd,
  };
}

export default connect(mapStateToProps)(Verifypswd);
