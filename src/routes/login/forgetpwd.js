/**
 * Created by zhangle on 2017/5/24.
 */
import React from 'react';
import { connect } from 'dva';
import {
  Icon,
  Input,
  Button,
  Form,
  message,
} from 'antd';
import Navbar from '../../components/nav_bar';
import styles from './forgetpwd.css';

const FormItem = Form.Item;
class ForgetpwdFrom extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      m: 0,
    };
  }
  // 点击发送验证码，触发这个方法，
  onchange() {
    const pay = this.props.form.getFieldsValue();
    console.log(pay.phoneNo, 11111111);
    if (pay.phoneNo != null) {
      this.props.dispatch({
        type: 'forgetpwd/Get',
        payload: {
          tenantNo: 1101001001,
          phoneNo: pay.phoneNo,
          flag: 4,
        },
      });
      this.daojishi(60);
    } else {
      message.error('请输入手机号');
    }
  }
  daojishi(m) {
    if (m > 0) {
      setTimeout(() => {
        m -= 1;
        this.setState({
          m: m,
        });
        this.daojishi(m);
      }, 1000);
    }
  }
  render() {
    let t;
    let d;
    if (this.state.m === 0) {
      t = '发送验证码';
      d = false;
    } else {
      d = true;
      t = this.state.m + '秒后重发验证码';
    }
    const { getFieldDecorator } = this.props.form;
    const onClick = () => {
      this.props.form.validateFields((err) => {
        if (err) {
          message.error('请输入您的信息');
        }
        const pay = this.props.form.getFieldsValue();
        console.log(pay, 22222222);
        if (pay.newPswd === pay.pwd) {
          this.props.dispatch({
            type: 'forgetpwd/ValidateVarCode',
            payload: pay,
          });
        } else {
          message.error(' 亲！两次密码不一致，请重新输入');
        }
      });
    };
    return (
      <div>

        <div className={styles.input}>
          <Form onSubmit={this.handleSubmit}>
            <FormItem>
              {getFieldDecorator('phoneNo', {
                rules: [{ required: true }],
              })(
                <Input
                  placeholder="请输入您的手机号"
                  prefix={
                    <div >
                      <Icon type="tablet" className={styles.icon} />
                    </div>
                  }
                  className={styles.input1}
                />,
              )}
            </FormItem>
            <FormItem>
              {getFieldDecorator('varCode', {
                rules: [{ required: true }],
              })(
                <Input
                  placeholder="请输入验证码"
                  prefix={
                    <div >
                      <Icon type="idcard" className={styles.icon} />
                    </div>
                  }
                  suffix={<Button type="primary" disabled={d} onClick={this.onchange.bind(this)} >
                    {t}
                  </Button>}
                  className={styles.input1}
                />,
              )}
            </FormItem>
            <FormItem>
              {getFieldDecorator('pwd', {
                rules: [{ required: true }],
              })(
                <Input
                  type="password"
                  placeholder="请输入新密码"
                  prefix={
                    <div >
                      <Icon type="lock" className={styles.icon} />
                    </div>
                  }
                  className={styles.input1}
                />,
              )}
            </FormItem>
            <FormItem>
              {getFieldDecorator('newPswd', {
                rules: [{ required: true }],
              })(
                <Input
                  type="password"
                  placeholder="请确认新密码"
                  prefix={
                    <div >
                      <Icon type="lock" className={styles.icon} />
                    </div>
                  }
                  className={styles.input1}
                />,
              )}
            </FormItem>
          </Form>
        </div>
        <div className={styles.zhuce}>
          <Button className={styles.zhuce1} type="primary" onClick={onClick}>提交</Button>
        </div>
      </div>
    );
  }
}
const RForm = Form.create()(ForgetpwdFrom);

function Forgetpwd({ forgetpwd, dispatch }) {
  return (
    <div >
      <div>
        <Navbar title={'忘记密码'} />
      </div>
      <div className={styles.rf}>
        <RForm setuppwd={forgetpwd} dispatch={dispatch} />
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    forgetpwd: state.forgetpwd,
  };
}

export default connect(mapStateToProps)(Forgetpwd);
