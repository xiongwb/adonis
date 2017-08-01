/**
 * Created by cyt on 2017/6/7.
 */

import React from 'react';
import { Form, Input, Select, Button, Radio, Icon, Cascader, Spin, message } from 'antd';
import { connect } from 'dva';
import { browserHistory } from 'react-router';
import styles from './new_card.css';
import NavBar from '../../components/nav_bar';
import cityDataForBindCard from '../../utils/region';

const FormItem = Form.Item;
const Option = Select.Option;

class NewCardForm extends React.Component {
  // 输入卡号后食物焦点时获取开户行名称
  onBlur() {
    console.log(this.props.form.getFieldValue('cityCode'), 99999);
    this.props.dispatch({
      type: 'newCard/getBankCode',
      payload: { acctno: this.props.form.getFieldValue('acctno') },
    });
  }
  // 选择区域调用联行号接口
  onChange(e) {
    this.props.dispatch({
      type: 'newCard/getInterBankNo',
      payload: { cityCode: e[2], bankcode: this.props.newCard.bankcode },
    });
  }
  onFocus() {
    this.props.form.resetFields(['openbank']);
  }
  // 选择开户行时把开户行和开户行代码保存到dva状态上
  openBank(key, value) {
    console.log(value, key);
    this.props.dispatch({
      type: 'newCard/save',
      payload: { bankcode: key, openbank: value.props.children },
    });
  }
  // 选择开户网点时把开户网点和开户网点代码保存到dva状态上
  openBranch(key, value) {
    this.props.dispatch({
      type: 'newCard/save',
      payload: { interbankno: key, openbranch: value.props.children },
    });
  }
  // 点击确认验证交易密码,acctno和telno传到dva上密码验证成功后当作数据之一传到后台
  submit() {
    if (!this.props.newCard.checked) {
      message.error('请同意银行卡协议');
      return;
    }
    this.props.form.validateFields((err) => {
      if (err) {
        return;
      }
      this.props.dispatch({
        type: 'newCard/changeCard',
        payload: { acctno: this.props.form.getFieldValue('acctno'), telno: this.props.form.getFieldValue('telno') },
      });
    });
  }
  option1(s) {
    return (
      <Option className={styles.text2} value={`${s.bankcode}`}>{s.bankname}</Option>
    );
  }
  option2(s) {
    return (
      <Option className={styles.text2} value={`${s.interbankno}`}>{s.branchname}</Option>
    );
  }
  checked() {
    this.props.dispatch({
      type: 'newCard/save',
      payload: { checked: !this.props.newCard.checked },
    });
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    const { newCard } = this.props;
    const formItemLayout = {
      labelCol: { span: 5 },
      wrapperCol: { span: 16 },
    };
    return (
      <div className={styles.top} >
        <Form>
          <FormItem
            {...formItemLayout}
            label={<text className={styles.text1}>客户名称</text>}
          >
            {getFieldDecorator('dictKey', {})(
              <text className={styles.text2}>{newCard.data.cusname}</text>,
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label={<text className={styles.text1}>证件号码</text>}
          >
            {getFieldDecorator('number', {})(
              <text className={styles.text2}>{newCard.data.certno}</text>,
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label={<text className={styles.text1}>手机号</text>}
          >
            {getFieldDecorator('telno', {
              initialValue: newCard.data.loginno,
              rules: [{
                required: true, message: '请输入手机号',
              }],
            })(
              <Input className={styles.text2} />,
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label={<text className={styles.text1}>卡号</text>}
          >
            {getFieldDecorator('acctno', {
              rules: [{
                required: true, message: '请输入卡号',
              }],
            })(
              <Input
                className={styles.text2}
                onFocus={this.onFocus.bind(this)} onBlur={this.onBlur.bind(this)}
              />,
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label={<text className={styles.text1}>开户行</text>}
          >
            {getFieldDecorator('openbank', {
              initialValue: newCard.bankcode,
              rules: [{
                required: true, message: '请输入开户行',
              }],
            })(
              <Select className={styles.text2} showSearch onSelect={this.openBank.bind(this)}>
                {newCard.bank.list.map(s => this.option1(s))}
              </Select>,
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label={<text className={styles.text1}>区域</text>}
          >
            {getFieldDecorator('cityCode', {
              rules: [{
                required: true, message: '请输入区域',
              }],
            })(
              <Cascader className={styles.text2} onChange={this.onChange.bind(this)} size="large" options={cityDataForBindCard} />,
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label={<text className={styles.text1}>开户网点</text>}
          >
            {getFieldDecorator('openbranch', {
              rules: [{
                required: true, message: '请输入开户网点',
              }],
            })(
              <Select className={styles.text2} showSearch onSelect={this.openBranch.bind(this)}>
                {newCard.place.map(s => this.option2(s))}
              </Select>,
            )}
          </FormItem>
        </Form>
        <div className={styles.radio} ><Radio checked={newCard.checked} onChange={this.checked.bind(this)} >同意<text onClick={() => browserHistory.push('/recharge/protocol2')}>《{newCard.protocol.protocoltitle}》</text></Radio></div>
        <Button className={styles.button} onClick={this.submit.bind(this)}>变更</Button>
        <div className={styles.title}>支持的银行卡及总额</div>
        <div className={styles.iconTitle}><Icon type="info-circle" className={styles.icon} />手机号,户名,银行卡卡号，证件号码必须与银行开户时一致.</div>
      </div>
    );
  }
}
const NewCrdForm = Form.create()(NewCardForm);
function NewCard({ newCard, dispatch }) {
  if (newCard.data.length === 0 || newCard.bank.length === 0) {
    return (<div className={styles.spin}><Spin style={{ marginTop: '70%' }} /></div>);
  }
  return (
    <div>
      <NavBar title={'变更银行卡'} />
      <NewCrdForm newCard={newCard} dispatch={dispatch} />
    </div>
  );
}
function mapStateToProps(state) {
  return {
    newCard: state.newCard,
  };
}
export default connect(mapStateToProps)(NewCard);

