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
  Menu,
  Dropdown,
  Checkbox,
  Form,
  message,
} from 'antd';
import { browserHistory } from 'react-router';
import Navbar from '../../components/nav_bar';
import styles from './register.css';

const FormItem = Form.Item;
class RegisterFrom extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      butt: '1',
      m: 0,
      checked: false,
      disabled: true,
    };
  }
  // 点击发送验证码，触发这个方法，
  onchange() {
    const pay = this.props.form.getFieldsValue();
    console.log(pay.phoneNo, 11111111);
    if (pay.phoneNo != null) {
      this.props.dispatch({
        type: 'register/Get',
        payload: {
          tenantNo: 1101001001,
          phoneNo: pay.phoneNo,
          flag: 3,
        },
      });
      this.daojishi(60);
    } else {
      message.error('请输入手机号');
    }
  }
// 倒计时验证码，默认为60秒
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
    const { getFieldDecorator } = this.props.form;
    let t;
    let d;
    if (this.state.m === 0) {
      t = '发送验证码';
      d = false;
    } else {
      d = true;
      t = this.state.m + '秒后重发验证码';
    }
    const handleMenuClick = (e) => {
      this.setState({
        butt: e.key,
      });
    };
    const onChange = () => {
      if (this.state.checked === false) {
        this.setState({
          checked: true,
          disabled: false,
        });
      } else if (this.state.checked === true) {
        this.setState({
          checked: false,
          disabled: true,
        });
      }
    };

    const onClick = () => {
      this.props.form.validateFields((err) => {
        if (err) {
          message.error('请输入您的信息');
        }
        const pay = this.props.form.getFieldsValue();
        pay.cusType = this.state.butt;
        console.log(pay, 22222222);
        if (pay.password === pay.pass) {
          this.props.dispatch({
            type: 'register/ValidateVarCode',
            payload: pay,
          });
        } else {
          message.error(' 亲！两次密码不一致，请重新输入');
        }
      });
    };
    const titl = [
      '0', '个人', '企业',
    ];
    const titlo = [
      '0', '真实姓名', '企业名称',
    ];
    const titll = [
      '0', '请填写身份证号', '请填入社会统一信用代码',
    ];
    const menu = (
      <Menu onClick={handleMenuClick}>
        <Menu.Item key="1">个人</Menu.Item>
        <Menu.Item key="2">企业</Menu.Item>
      </Menu>
    );
    const onbush = () => {
      browserHistory.push('/registeragreement');
    };
    return (
      <div>
        <div >
          <Navbar title={'注册'} />
        </div>
        <div className={styles.input}>
          <Form onSubmit={this.handleSubmit}>
            <FormItem>
              {getFieldDecorator('nickName', {
                rules: [{ required: true }],
              })(
                <Input
                  placeholder="昵称"
                  prefix={
                    <div >
                      <Icon type="user" className={styles.icon} />
                    </div>}
                  className={styles.input1}
                />,
              )}
            </FormItem>
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
              {getFieldDecorator('pass', {
                rules: [{ required: true }],
              })(
                <Input
                  placeholder="请输入密码"
                  type="password"
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
              {getFieldDecorator('password', {
                rules: [{ required: true }],
              })(
                <Input
                  placeholder="请再次输入密码"
                  type="password"
                  prefix={
                    <div >
                      <Icon type="lock" className={styles.icon} />
                    </div>
                  }
                  className={styles.input1}
                />,
              )}
            </FormItem>
            <div className={styles.boder}>
              <Row>
                <Col span={8} className={styles.left}>
                  <text className={styles.text}>客户类型:</text>
                </Col>
                <Col span={16} className={styles.right}>
                  <Dropdown overlay={menu}>
                    <Button className={styles.xzq}>
                      <text className={styles.text1}>{titl[this.state.butt]}</text>
                      <Icon type="down" className={styles.icon1} />
                    </Button>
                  </Dropdown>
                </Col>
              </Row>
            </div>
            <FormItem>
              {getFieldDecorator('certNo', {
                rules: [{ required: true }],
              })(
                <Input
                  placeholder={titll[this.state.butt]}
                  prefix={
                    <div >
                      <Icon type="idcard" className={styles.icon} />
                    </div>
                  }className={styles.input1}
                  style={{ marginTop: 10 }}
                />,
              )}
            </FormItem>
            <FormItem>
              {getFieldDecorator('cusName', {
                rules: [{ required: true }],
              })(
                <Input
                  placeholder={titlo[this.state.butt]}
                  prefix={
                    <div >
                      <Icon type="user" className={styles.icon} />
                    </div>
                  }className={styles.input1}
                  style={{ marginTop: 10 }}
                />,
              )}
            </FormItem>
            <FormItem>
              {getFieldDecorator('varCode', {
              })(
                <Input
                  placeholder="邀请码"
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
              {getFieldDecorator('inviteCode', {
                rules: [{ required: true }],
              })(
                <Input
                  placeholder="请输入验证码"
                  prefix={
                    <div >
                      <Icon type="idcard" className={styles.icon} />
                    </div>
                  }
                  suffix={<Button type="primary" disabled={d} onClick={this.onchange.bind(this)}>
                    {t}
                  </Button>}
                  className={styles.input1}
                />,
              )}
            </FormItem>
          </Form>
        </div>
        <div className={styles.danxuan}>
          <Row>
            <Col span={12} className={styles.danz}>
              <Checkbox className={styles.xmz} checked={this.state.checked} onChange={onChange}>
                同意
              </Checkbox>
            </Col>
            <Col span={12} className={styles.dany} onClick={onbush}>
              <text className={styles.zutext}>《注册协议》</text>
            </Col>
          </Row>
        </div>
        <div className={styles.zhuce}>
          <Button className={styles.zhuce1} type="primary" onClick={onClick} disabled={this.state.disabled}>注册</Button>
        </div>
        <div className={styles.zhuce}>
          <Icon type="safety" className={styles.xmz} />
          <text className={styles.xmz}>乌鲁木齐商业银行专项账号监管</text>
        </div>
      </div>
    );
  }
}
const RForm = Form.create()(RegisterFrom);
function Register({ register, dispatch }) {
  return (
    <div>
      <RForm register={register} dispatch={dispatch} />
    </div>
  );
}
function mapStateToProps(state) {
  return {
    register: state.register,
  };
}

export default connect(mapStateToProps)(Register);
