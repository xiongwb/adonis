/**
 * Created by zhangle on 2017/5/25.
 */
import React from 'react';
import { connect } from 'dva';
import {
  Form,
  Input,
  Button,
  message,
  Spin,
} from 'antd';
import Navbar from '../../components/nav_bar';
import { hexMD5 } from '../../utils/md5';
import styles from './setuppwd.css';

const FormItem = Form.Item;
class SetupForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  };
  render() {
    const { setuppwd } = this.props;
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 8 },
      wrapperCol: { span: 14 },
    };
    const onClick = () => {
      this.props.form.validateFields((err) => {
        if (err) {
          return;
        }
        const pay = this.props.form.getFieldsValue();
        if (pay.Pwd === pay.newPswd) {
          console.log(pay, 42323145555);
          this.props.dispatch({
            type: 'setuppwd/UpdateTranPswd',
            payload: {
              newPswd: hexMD5(pay.newPswd),
              type: 1,
              checkCode: setuppwd.data.map.checkCode,
            },
          });
        } else {
          message.error('交易密码不一样，亲！请看清哟');
        }
      });
    };
    return (
      <div>
        <Form onSubmit={this.handleSubmit} >
          <FormItem
            {...formItemLayout}
            label="交易密码"
            className={styles.input}
          >{getFieldDecorator('Pwd', {
            rules: [{ required: true }],
          })(
            <Input placeholder="输入交易密码" />)}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="确认交易密码"
            className={styles.input}
          >
            {getFieldDecorator('newPswd', {
              rules: [{ required: true }],
            })(
              <Input placeholder="再次输入交易密码" />)}
          </FormItem>
        </Form>
        <div className={styles.rf1}>
          <Button className={styles.button} type="primary" onClick={onClick}>确认</Button>
        </div>
      </div>
    );
  }
}

const RForm = Form.create()(SetupForm);

function Setuppwd({ setuppwd, dispatch }) {
  if (setuppwd.data.length === 0) {
    return (
      <div className={styles.spin}>
        <Spin style={{ marginTop: '50%' }} />
      </div>
    );
  } else {
    return (
      <div >
        <div >
          <Navbar title={'设置交易密码'} />
        </div>
        <div className={styles.rf}>
          <RForm setuppwd={setuppwd} dispatch={dispatch} />
        </div>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    setuppwd: state.setuppwd,
  };
}

export default connect(mapStateToProps)(Setuppwd);
