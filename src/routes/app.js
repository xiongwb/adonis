import React from 'react';
import { connect } from 'dva';
import {
  Carousel,
  Row,
  Col,
  Button,
  Spin,
  Progress,
  Icon,
  Form,
  Checkbox,
  message,
  Modal,
} from 'antd';
import { browserHistory } from 'react-router';
import { getLocalStorage } from '../utils/helper';
import Storage from '../utils/storage';

import styles from './app.css';
import NavBar from '../components/nav_bar';
import TabBar from '../components/tab_bar';
import { hexMD5 } from '../utils/md5';
import StringUtils from '../utils/string_utils';
import card from '../assets/card@3x.png';
import rechager from '../assets/recharge@3x.png';
import withdrew from '../assets/withdraw_cash@3x.png';
import property from '../assets/property@3x.png';
import assignment from '../assets/assignment@3x.png';
import sign from '../assets/sign@3x.png';
import gift from '../assets/gift@3x.png';


class AppFrom extends React.Component {
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
    const { app } = this.props;
    const onChange = () => {
      console.log(hexMD5('12345'));
    };
    const onClick = () => {
      browserHistory.push('/login');
    };
    // 金额为NULL是初始化为0
    const Initialization = (e) => {
      if (e) {
        return StringUtils.moneyFormatData2Money(e);
      } else {
        return '0.0';
      }
    };
    const onsesl = () => {
      this.props.dispatch({
        type: 'app/Seal',
        payload: {},
      });
    };
    const onsesl1 = () => {
      browserHistory.push('/total_amount');
    };
    const onsesl2 = () => {
      browserHistory.push('/mygiftbag');
    };
    // 点击列表 调用这个方法 跳转到详情页面
    const onClick1 = (s) => {
      this.props.dispatch({
        type: 'investmentmessage/findPrd',
        payload: {
          record: s },
      });
      browserHistory.push('/investment/message');
    };
    // 点击投资按钮 ，调用该方法。
    const showModal = (s) => {
      if (app.money == null) {
        message.error('请输入投资金额');
      } else if (getLocalStorage(Storage.DID_LOGIN) == null) {
        message.error('请先登录');
      } else {
        s.money = app.money;
        s.phoneNo = getLocalStorage(Storage.DID_LOGIN).retMsg;
        s.prdInfoID = s.prdinfoid;
        s.busiType = 'T01';
        this.props.dispatch({
          type: 'app/ValidateInv',
          payload: s,
        });
      }
    };
    // 选择框 跳用这个方法，判断是否选择。
    const onChange2 = () => {
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
    // 输入金额，调用这个方法。
    const money = (e) => {
      this.props.dispatch({
        type: 'app/findPrd',
        payload: {
          money: e.target.value },
      });
    };
    const ontouzi = () => {
      if (app.date.length !== 0) {
        console.log(app.date, 111111);
        if (app.date.nopswdflag === '1') {
          this.props.dispatch({
            type: 'app/DoInvest',
            payload: {
              phoneNo: getLocalStorage(Storage.DID_LOGIN).retMsg,
              prdInfoID: app.prd.prdinfo.prdinfoid,
              channel: 2,
              money: app.put.money,
            },
          });
        } else {
          this.props.dispatch({
            type: 'verifypswd/save',
            payload: app.put,
          });
          browserHistory.push('/verifypswd');
          this.props.dispatch({
            type: 'app/findPrd',
            payload: {
              visible: false,
            },
          });
        }
      }
    };
    // 弹出框
    const onmodel = () => {
      if (app.mone.length !== 0) {
        console.log(app.mone, 9999999);
        if (app.prd.length !== 0) {
          console.log(app.prd, 9999999);
          let dayAndRate = '';
          let m = '';
          if (app.prd.prdinfo.calcintmann === '1' &&
            app.prd.prdinfo.prdmonths != null) {
            dayAndRate = app.prd.prdinfo.prdmonths + '个月';
            // 预期收益：投资金额*年收益率*天数/(360*100)，四舍五入到分
            m = (app.put.money * app.prd.prdinfo.prdmonths) / (12 * 100);
          }
          if (app.prd.prdinfo.calcintmann === '2' && app.prd.prdinfo.prddays != null) {
            dayAndRate = app.prd.prdinfo.prddays + '天';
            // 预期收益：投资金额*年收益率*天数/(360*100)，四舍五入到分
            m = (app.put.money * app.put.prddays) / (360 * 100);
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
                visible={app.visible}
                footer={null}
              >
                <div>
                  <div className={styles.root1}>
                    <Row>
                      <Col span={8}>
                        <text className={styles.text3}>项目名称:</text>
                      </Col>
                      <Col span={16}>
                        <text className={styles.text4}>{app.put.prdname}</text>
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
                        <text className={styles.text4}>{app.put.yearprofitrate}%</text>
                      </Col>
                    </Row>
                  </div>
                  <div className={styles.root1}>
                    <text className={styles.text3}>投资金额（元）</text>
                  </div>
                  <div className={styles.root2}>
                    <text className={styles.text4}>{app.put.money}</text>
                  </div>
                  <div className={styles.root1}>
                    <Row className={styles.root3}>
                      <Col span={12}>
                        <div>
                          <text className={styles.text5}>可用余额（元）</text>
                        </div>
                        <div>
                          <text className={styles.text6}>
                            {Initialization(app.mone.acctnoEntity.availablesum)}
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
                        <Checkbox checked={this.state.checked} onChange={onChange2}>
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
    const kk = app.data.list;
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
                  <input className={styles.input1} placeholder="请输入投资金额" disabled />
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
                  <Button className={styles.button} type="primary" disabled >已结束</Button>
                </Col>
              </Row>
            </div>
          );
        } else if (s.prdsta === '0') {
          return (
            <div className={styles.div3}>
              <Row>
                <Col span={16}>
                  <input className={styles.input1} placeholder="请输入投资金额" disabled />
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
              <Col span={4} className={styles.col} onClick={() => onClick1(s)}>
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
    // 判断是否登录.
    const onnaber = () => {
      if (getLocalStorage(Storage.DID_LOGIN) === null) {
        return (
          <NavBar
            title={'金融资产交易平台'}
            left={
              <div />
            }
            right={
              <div onClick={onClick}>登录/注册</div>
            }
          />
        );
      } else {
        return (
          <NavBar
            title={'金融资产交易平台'}
            left={
              <div />
          }
            right={
              <text>{getLocalStorage(Storage.DID_LOGIN).cusname}</text>
          }
          />);
      }
    };
    return (
      <div>
        <div>
          {onmodel()}
          <div>
            {onnaber()}
          </div>
          <div className={styles.bodyDiv}>
            <Carousel afterChange={onChange}>
              <div>
                <img src="https://zos.alipayobjects.com/rmsportal/hzPBTkqtFpLlWCi.jpg" className={styles.image} alt="banner" />
              </div>
              <div>
                <img src="https://zos.alipayobjects.com/rmsportal/hzPBTkqtFpLlWCi.jpg" className={styles.image} alt="banner" />
              </div>
            </Carousel>
          </div>
          <table className={styles.func} scrolling="no">
            <th>
              <div className={styles.some} onClick={() => browserHistory.push('/bank_card')}>
                <img src={card} alt="绑卡" style={{ height: '2rem', width: '3rem' }} />
                <text className={styles.listText}>绑卡</text>
              </div>
            </th>
            <th>
              <div className={styles.some} onClick={() => browserHistory.push('/recharge')} >
                <img src={rechager} alt="充值" style={{ height: '2.3rem', width: '2.6rem', marginTop: '-0.3rem' }} />
                <text className={styles.listText}>充值</text>
              </div>
            </th>
            <th>
              <div className={styles.some} onClick={() => browserHistory.push('/withdrawals')} >
                <img src={withdrew} alt="提现" style={{ height: '2.3rem', width: '2.3rem', marginTop: '-0.3rem' }} />
                <text className={styles.listText}>提现</text>
              </div>
            </th>
            <th>
              <div className={styles.some} onClick={onsesl1}>
                <img src={property} alt="我的资产" style={{ height: '2.3rem', width: '2.3rem', marginTop: '-0.3rem' }} />
                <text className={styles.listText}>我的资产</text>
              </div>
            </th>
            <th>
              <div className={styles.some}>
                <img src={assignment} alt="转让" style={{ height: '2.3rem', width: '2.3rem', marginTop: '-0.3rem' }} />
                <text className={styles.listText}>转让</text>
              </div>
            </th>
            <th>
              <div className={styles.some}>
                <img src={property} alt="还款" style={{ height: '2.3rem', width: '2.3rem', marginTop: '-0.3rem' }} />
                <text className={styles.listText}>还款</text>
              </div>
            </th>
            <th>
              <div className={styles.some} onClick={onsesl}>
                <img src={sign} alt="签到" style={{ height: '2.3rem', width: '2.3rem', marginTop: '-0.3rem' }} />
                <text className={styles.listText}>签到</text>
              </div>
            </th>
            <th>
              <div className={styles.some} onClick={onsesl2}>
                <img src={gift} alt="我的礼包" style={{ height: '2.3rem', width: '2.3rem', marginTop: '-0.3rem' }} />
                <text className={styles.listText}>我的礼包</text>
              </div>
            </th>
          </table>
        </div>
        <div >
          {kk.map((s, i) => onbush(s, i))}
        </div>
        <div className={styles.xbianju} />
        <TabBar title={'首页'} />
      </div>
    );
  }
}
const AForm = Form.create()(AppFrom);
function App({ app, dispatch }) {
  if (app.data.length === 0) {
    return (
      <div className={styles.spin}>
        <Spin style={{ marginTop: '50%' }} />
      </div>
    );
  } else {
    console.log(app.data, 111111111111111);
    return (
      <div>
        <AForm app={app} dispatch={dispatch} />
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    app: state.app,
  };
}

export default connect(mapStateToProps)(App);
