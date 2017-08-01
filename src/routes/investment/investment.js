
/**
 * Created by zhangle on 2017/5/24.
 */
import React from 'react';
import { connect } from 'dva';
import {
  Row,
  Col,
  Progress,
  Icon,
  Button,
  Form,
  Spin,
  Modal,
  Checkbox,
  message,
} from 'antd';
import { browserHistory } from 'react-router';
import StringUtils from '../../utils/string_utils';
import { getLocalStorage } from '../../utils/helper';
import Storage from '../../utils/storage';
import Navbar from '../../components/nav_bar';
import ren from '../../assets/inv_banner.png';
import styles from './investment.css';
import TabBar from '../../components/tab_bar';

class InvestmentFrom extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      checked: false,
      disabled: true,
    };
  }

  onbsh() {
    console.log(111111);
    const pp = {};
    pp.tenantNo = 1101001001;
    pp.proType = 1;
    pp.returnType = 3;
    this.props.dispatch({
      type: 'loanagreement/findPrd',
      payload: {
        record: pp,
      },
    });
    browserHistory.push('/loanagreement');
  }

  render() {
    const { investment } = this.props;
    // 点击页面 跳转到项目详情页
    const onClick = (s) => {
      this.props.dispatch({
        type: 'investmentmessage/findPrd',
        payload: {
          record: s },
      });
      browserHistory.push('/investment/message');
    };
    // 点击投资按钮 ，调用该方法。
    const showModal = (s) => {
      if (investment.money == null) {
        message.error('请输入投资金额');
      } else if (getLocalStorage(Storage.DID_LOGIN) == null) {
        message.error('请先登录');
      } else {
        s.money = investment.money;
        s.phoneNo = getLocalStorage(Storage.DID_LOGIN).retMsg;
        s.prdInfoID = s.prdinfoid;
        s.busiType = 'T01';
        this.props.dispatch({
          type: 'investment/ValidateInv',
          payload: s,
        });
      }
    };
    // 选择框 跳用这个方法，判断是否选择。
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

    // 金额为NULL是初始化为0
    const Initialization = (e) => {
      if (e) {
        return StringUtils.moneyFormatData2Money(e);
      } else {
        return '0.0';
      }
    };
    // 输入金额，调用这个方法。
    const money = (e) => {
      this.props.dispatch({
        type: 'investment/findPrd',
        payload: {
          money: e.target.value },
      });
    };
    const ontouzi = () => {
      if (investment.date.length !== 0) {
        console.log(investment.date, 111111);
        if (investment.date.nopswdflag === '1') {
          this.props.dispatch({
            type: 'investment/DoInvest',
            payload: {
              phoneNo: getLocalStorage(Storage.DID_LOGIN).retMsg,
              prdInfoID: investment.prd.prdinfo.prdinfoid,
              channel: 2,
              money: investment.put.money,
            },
          });
        } else {
          console.log(investment.put, 4567);
          this.props.dispatch({
            type: 'verifypswd/save',
            payload: investment.put,
          });
          browserHistory.push('/verifypswd');
          this.props.dispatch({
            type: 'investment/findPrd',
            payload: {
              visible: false,
            },
          });
        }
      }
    };
    // 弹出框
    const onmodel = () => {
      if (investment.mone.length !== 0) {
        console.log(investment.mone, 9999999);
        if (investment.prd.length !== 0) {
          console.log(investment.prd, 9999999);
          let dayAndRate = '';
          let m = '';
          if (investment.prd.prdinfo.calcintmann === '1' &&
            investment.prd.prdinfo.prdmonths != null) {
            dayAndRate = investment.prd.prdinfo.prdmonths + '个月';
            // 预期收益：投资金额*年收益率*天数/(360*100)，四舍五入到分
            m = (this.state.invmoney * yearprofitrate * data.prdinfo.prdmonths) / (12 * 100);
          }
          if (investment.prd.prdinfo.calcintmann === '2' && investment.prd.prdinfo.prddays != null) {
            dayAndRate = investment.prd.prdinfo.prddays + '天';
            // 预期收益：投资金额*年收益率*天数/(360*100)，四舍五入到分
            m = (investment.put.money * investment.put.prddays) / (360 * 100);
          }
          const preMoney = StringUtils.moneyFormatData2Money(m);
          return (
            <div>
              <Modal
                title={
                  <div className={styles.modeltitle}>
                    <text className={styles.modeltext}>确认投资</text>
                  </div>
              }
                visible={investment.visible}
                footer={null}
              >
                <div>
                  <div className={styles.root1}>
                    <Row>
                      <Col span={8}>
                        <text className={styles.text3}>项目名称:</text>
                      </Col>
                      <Col span={16}>
                        <text className={styles.text4}>{investment.put.prdname}</text>
                      </Col>
                    </Row>
                  </div>
                  <div className={styles.root1}>
                    <Row>
                      <Col span={12}>
                        <text className={styles.text3}>认购期限:</text>
                        <text className={styles.text4}>{dayAndRate}</text>
                      </Col>
                      <Col span={12}>
                        <text className={styles.text3}>年收益率:</text>
                        <text className={styles.text4}>{investment.put.yearprofitrate}%</text>
                      </Col>
                    </Row>
                  </div>
                  <div className={styles.root1}>
                    <text className={styles.text3}>投资金额（元）</text>
                  </div>
                  <div className={styles.root2}>
                    <text className={styles.text4}>{investment.put.money}</text>
                  </div>
                  <div className={styles.root1}>
                    <Row className={styles.root3}>
                      <Col span={12}>
                        <div>
                          <text className={styles.text5}>可用余额（元）</text>
                        </div>
                        <div>
                          <text className={styles.text6}>
                            {Initialization(investment.mone.acctnoEntity.availablesum)}
                          </text>
                        </div>
                      </Col>
                      <Col span={12}>
                        <div>
                          <text className={styles.text5}>预期收益（元）</text>
                        </div>
                        <div>
                          <text className={styles.text7}>{preMoney}</text>
                        </div>
                      </Col>
                    </Row>
                  </div>
                  <div className={styles.root1}>
                    <Row >
                      <Col span={12} className={styles.root5}>
                        <Checkbox checked={this.state.checked} onChange={onChange}>
                        我已阅读
                      </Checkbox>
                      </Col>
                      <Col span={12} className={styles.root6} >
                        <text className={styles.text7} onClick={this.onbsh.bind(this)}>《投资协议》</text>
                      </Col>
                    </Row>
                  </div>
                  <div className={styles.root7} >
                    <Button className={styles.modelbutton} type="primary" disabled={this.state.disabled} onClick={ontouzi}>立即投资</Button>
                  </div>
                </div>
              </Modal>
            </div>
          );
        }
      }
    };
    const kk = investment.data.list;
    const onbush = (s) => {
      const onxim = () => {
        if (s.prdsta === '1') {
          console.log(s.prdsta, 13243542312);
          return (
            <Row>
              <Col span={16}>
                <input className={styles.input1} placeholder="请输入投资金额" onChange={money} />
              </Col>
              <Col span={8} className={styles.bucol}>
                <Button className={styles.button} type="primary" onClick={() => showModal(s)}>立即投资</Button>
              </Col>
            </Row>
          );
        } else if (s.prdsta === '2') {
          return (
            <div className={styles.div3}>
              <Row>
                <Col span={16}>
                  <input className={styles.input1} placeholder="请输入投资金额" />
                </Col>
                <Col span={8} className={styles.bucol}>
                  <Button className={styles.button} type="primary" >满标</Button>
                </Col>
              </Row>
            </div>
          );
        } else if (s.prdsta === '3') {
          return (
            <div className={styles.div3}>
              <Row>
                <Col span={16}>
                  <input className={styles.input1} placeholder="请输入投资金额" disabled />
                </Col>
                <Col span={8} >
                  <Button className={styles.button} type="primary" disabled >结束</Button>
                </Col>
              </Row>
            </div>
          );
        } else if (s.prdsta === '0') {
          return (
            <div className={styles.div3}>
              <Row>
                <Col span={16}>
                  <input className={styles.input1} placeholder="请输入投资金额" />
                </Col>
                <Col span={8} className={styles.bucol} >
                  <Button className={styles.button} type="primary" >预热中</Button>
                </Col>
              </Row>
            </div>
          );
        }
      };
      return (
        <div className={styles.login} >
          <div className={styles.div}>
            <Row>
              <Col span={13} className={styles.zou}>
                <text className={styles.text}>{s.prdname}</text>
              </Col>
              <Col span={11} className={styles.you}>
                <text className={styles.text}>项目规模：{Initialization(s.prdquota)}元</text>
              </Col>
            </Row>
          </div>
          <div className={styles.login1}>
            <Row>
              <Col span={7} className={styles.col}>
                <Row>
                  <Col>
                    <text className={styles.text2}>{s.yearprofitrate}%</text>
                  </Col>
                  <Col>
                    <text className={styles.text1}>年化收益</text>
                  </Col>
                </Row>
              </Col>
              <Col span={7} className={styles.col}>
                <Row>
                  <Col>
                    <text className={styles.text2}>{s.prddays}天</text>
                  </Col>
                  <Col>
                    <text className={styles.text1}>项目期限</text>
                  </Col>
                </Row>
              </Col>
              <Col span={6} className={styles.col}>
                <Progress type="circle" percent={s.percentage} width={'4rem'} />
              </Col>
              <Col span={4} className={styles.col} onClick={() => onClick(s)}>
                <Icon type="right" className={styles.icon} />
              </Col>
            </Row>
          </div>
          <div className={styles.login3}>
            {onxim()}
          </div>
          <div className={styles.div1}>
            <Row>
              <Col span={12} className={styles.zou}>
                <text className={styles.xtext}>¥{Initialization(s.buyminamt)}元起投</text>
              </Col>
              <Col span={12} className={styles.you}>
                <text className={styles.xtext}>剩余可投：{Initialization(s.remainquota)}元</text>
              </Col>
            </Row>
          </div>
        </div>
      );
    };
    return (
      <div className={styles.root}>
        {onmodel()}
        <div className={styles.sdao}>
          <img src={ren} className={styles.img} alt="xuan" />
        </div>
        <div >
          {kk.map((s, i) => onbush(s, i))}
        </div>
        <div className={styles.huadong} />
        <TabBar title={'投资'} />
      </div>
    );
  }
}
const RForm = Form.create()(InvestmentFrom);

function Investment({ investment, dispatch }) {
  if (investment.data.length === 0) {
    return (
      <Spin />
    );
  } else {
    console.log(investment.data.list, 121212123244);
    return (
      <div >
        <div>
          <Navbar title={'投资项目'} left={<div />} />
        </div>
        <div>
          <RForm investment={investment} dispatch={dispatch} />
        </div>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    investment: state.investment,
  };
}

export default connect(mapStateToProps)(Investment);
