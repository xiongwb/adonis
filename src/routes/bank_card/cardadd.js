/**
 * Created by cyt on 2017/5/25.
 */
import React from 'react';
import { Form, Input, Select, Button, Icon, Cascader, Spin, message, Radio } from 'antd';
import { connect } from 'dva';
import { browserHistory } from 'react-router';
import styles from './cardadd.css';
import NavBar from '../../components/nav_bar';
import cityDataForBindCard from '../../utils/region';

const FormItem = Form.Item;
const Option = Select.Option;
class CardAddForm extends React.Component {
  // 输入卡号后食物焦点时获取开户行名称
  onBlur() {
    console.log(this.props.form.getFieldValue('cityCode'), 99999);
    this.props.dispatch({
      type: 'cardadd/getBankCode',
      payload: { acctno: this.props.form.getFieldValue('acctno') },
    });
  }
  // 选择区域调用联行号接口
  onChange(e) {
    this.props.dispatch({
      type: 'cardadd/getInterBankNo',
      payload: { cityCode: e[2], bankcode: this.props.cardadd.bankcode },
    });
  }
  onFocus() {
    this.props.form.resetFields(['openbank']);
  }
  // 选择开户行时把开户行和开户行代码保存到dva状态上
  openBank(key, value) {
    console.log(value, key);
    this.props.dispatch({
      type: 'cardadd/save',
      payload: { bankcode: key, openbank: value.props.children },
    });
  }
  // 选择开户网点时把开户网点和开户网点代码保存到dva状态上
  openBranch(key, value) {
    this.props.dispatch({
      type: 'cardadd/save',
      payload: { interbankno: key, openbranch: value.props.children },
    });
  }
  // 点击确认验证交易密码,acctno和telno传到dva上密码验证成功后当作数据之一传到后台
  submit() {
    if (!this.props.cardadd.checked) {
      message.error('请同意银行卡协议');
      return;
    }
    this.props.form.validateFields((err) => {
      if (err) {
        return;
      }
      this.props.dispatch({
        type: 'cardadd/bind',
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
      type: 'cardadd/save',
      payload: { checked: !this.props.cardadd.checked },
    });
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    const { cardadd } = this.props;
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
              <text className={styles.text2}>{cardadd.data.cusname}</text>,
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label={<text className={styles.text1}>证件号码</text>}
          >
            {getFieldDecorator('number', {})(
              <text className={styles.text2}>{cardadd.data.certno}</text>,
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label={<text className={styles.text1}>手机号</text>}
          >
            {getFieldDecorator('telno', {
              initialValue: cardadd.data.loginno,
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
              initialValue: cardadd.bankcode,
              rules: [{
                required: true, message: '请输入开户行',
              }],
            })(
              <Select className={styles.text2} showSearch onSelect={this.openBank.bind(this)}>
                {cardadd.bank.list.map(s => this.option1(s))}
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
                {cardadd.place.map(s => this.option2(s))}
              </Select>,
            )}
          </FormItem>
        </Form>
        <div className={styles.radio} ><Radio checked={cardadd.checked} onChange={this.checked.bind(this)} >同意<text onClick={() => browserHistory.push('/recharge/protocol2')}>《{cardadd.protocol.protocoltitle}》</text></Radio></div>
        <Button className={styles.button} onClick={this.submit.bind(this)}>绑卡</Button>
        <div className={styles.title}>支持的银行卡及总额</div>
        <div className={styles.iconTitle}><Icon type="info-circle" className={styles.icon} />手机号,户名,银行卡卡号，证件号码必须与银行开户时一致.</div>
      </div>
    );
  }
}
const CrdAddForm = Form.create()(CardAddForm);

function CardAdd({ cardadd, dispatch }) {
  if (cardadd.data.length === 0 || cardadd.bank.length === 0) {
    return (<div className={styles.spin}><Spin style={{ marginTop: '70%' }} /></div>);
  }
  return (
    <div>
      <NavBar title={'添加银行卡'} />
      <CrdAddForm cardadd={cardadd} dispatch={dispatch} />
    </div>
  );
}
function mapStateToProps(state) {
  return {
    cardadd: state.cardadd,
  };
}
export default connect(mapStateToProps)(CardAdd);

