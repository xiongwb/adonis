/**
 * Created by zhangle on 2017/5/25.
 */
import React from 'react';
import { connect } from 'dva';
import {
  Form,
  Input,
  Button,
  Select,
  Cascader,
  Checkbox,
  Row,
  Col,
} from 'antd';
import { browserHistory } from 'react-router';
import date from '../../utils/date';
import { getLocalStorage } from '../../utils/helper';
import Storage from '../../utils/storage';
import Navbar from '../../components/nav_bar';
import cityData from '../../utils/region';
import styles from './loanapply.css';

const FormItem = Form.Item;
const Option = Select.Option;
class SetupForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      checked: false,
      disabled: true,
    };
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 7 },
      wrapperCol: { span: 15 },
    };
    const onbush = () => {
      const pp = {};
      pp.tenantNo = 1101001001;
      pp.proType = 3;
      pp.returnType = 3;
      this.props.dispatch({
        type: 'loanagreement/findPrd',
        payload: {
          record: pp,
        },
      });
      browserHistory.push('/loanagreement');
    };
    const onClick = () => {
      console.log(getLocalStorage(Storage.DID_LOGIN), 111111111);
      this.props.form.validateFields((err) => {
        if (err) {
          return;
        }
        const pay = this.props.form.getFieldsValue();
        pay.tenantno = '1101001001';
        pay.applydate = date.getDate();
        console.log(pay, 123);
        this.props.dispatch({
          type: 'loan/Finapply',
          payload: pay,
        });
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
    return (
      <div>
        <div className={styles.rf}>
          <Form >
            <FormItem
              {...formItemLayout}
              label="申请人姓名"
            >
              {getFieldDecorator('financier', {
                initialValue: getLocalStorage(Storage.DID_LOGIN).cusname,
              })(<Input disabled />)}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="手机号码"
            >
              {getFieldDecorator('telno', {
                initialValue: getLocalStorage(Storage.DID_LOGIN).retMsg,
              })(
                <Input disabled />)}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="选择区域"
            >
              {getFieldDecorator('areacode', {
                rules: [{ required: true }],
              })(
                <Cascader size="large" options={cityData} />)}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="详细地址"
            >
              {getFieldDecorator('address', {
                initialValue: '',
              })(<Input />)}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="主营业务"
            >
              {getFieldDecorator('business', {
                initialValue: '',
              })(
                <Input />)}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="融资用途"
            >
              {getFieldDecorator('finpurpose', {
                rules: [{ required: true }],
              })(
                <Input type="textarea" rows={3} />)}
            </FormItem>

            <FormItem
              {...formItemLayout}
              label="期望融资金额"
            >
              {getFieldDecorator('expfinsum', {
                initialValue: '',
              })(
                <Input />)}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="期望融资利率"
            >
              {getFieldDecorator('expfinrate', {
                initialValue: '',
              })(
                <Input className={styles.model} />)}
              <text > %</text>
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="投资期限"
            >
              {getFieldDecorator('finterm', {
                rules: [{ required: true }],
              })(
                <Select >
                  <Option value="1">3个月</Option>
                  <Option value="2">6个月</Option>
                  <Option value="3">9个月</Option>
                  <Option value="4">1年以上</Option>
                </Select>)}

            </FormItem>
            <FormItem
              {...formItemLayout}
              label="贷款产品"
            >
              {getFieldDecorator('loanprod', {
                rules: [{ required: true }],
              })(
                <Select >
                  <Option value="1">个人住房贷款</Option>
                  <Option value="2">汽车抵押</Option>
                  <Option value="3">信用贷款</Option>
                </Select>)}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label="其他融资说明"
            >
              {getFieldDecorator('notes', {
                initialValue: '',
              })(
                <Input type="textarea" rows={4} />)}
            </FormItem>
          </Form>
        </div>
        <div className={styles.rf1}>
          <Row>
            <Col span={8} >
              <Checkbox checked={this.state.checked} onChange={onChange}>同意</Checkbox>
            </Col>
            <Col span={16} onClick={onbush} >
              <text className={styles.zutext}>《 融资协议 》</text>
            </Col>
          </Row>
        </div>
        <div className={styles.rf2}>
          <Button className={styles.button} type="primary" onClick={onClick} disabled={this.state.disabled}>确认</Button>
        </div>
      </div>
    );
  }
}

const RForm = Form.create()(SetupForm);

function Loanapply({ loan, dispatch }) {
  return (
    <div >
      <div >
        <Navbar title={'融资申请登记'} />
      </div>
      <div >
        <RForm loan={loan} dispatch={dispatch} />
      </div>

    </div>
  );
}
function mapStateToProps(state) {
  return {
    loan: state.loan,
  };
}

export default connect(mapStateToProps)(Loanapply);
