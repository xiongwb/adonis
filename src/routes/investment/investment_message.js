/**
 * Created by zhangle on 2017/5/26.
 */
import React from 'react';
import { connect } from 'dva';
import {
  Row,
  Col,
  Progress,
  Tabs,
  Button,
  Form,
  Spin,
  Modal,
  Checkbox,
} from 'antd';
import { browserHistory } from 'react-router';
import StringUtils from '../../utils/string_utils';
import { getLocalStorage } from '../../utils/helper';
import Storage from '../../utils/storage';
import Navbar from '../../components/nav_bar';
import styles from './investment_message.css';

const TabPane = Tabs.TabPane;
class InvestmentMessageFrom extends React.Component {
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
    const { investmentmessage } = this.props;
    // 金额为NULL是初始化为0
    const Initialization = (e) => {
      if (e) {
        return StringUtils.moneyFormatData2Money(e);
      } else {
        return '0.0';
      }
    };
    // 点击投资按钮 ，调用该方法。
    const showModal = () => {
      if (investmentmessage.money == null) {
        message.error('请输入投资金额');
      } else if (getLocalStorage(Storage.DID_LOGIN) == null) {
        message.error('请先登录');
      } else {
        this.props.dispatch({
          type: 'investmentmessage/ValidateInv',
          payload: {
            money: investmentmessage.money,
            phoneNo: getLocalStorage(Storage.DID_LOGIN).retMsg,
            prdInfoID: investmentmessage.data.prdinfo.prdinfoid,
            busiType: 'T01',
          },
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
    // 输入金额，调用这个方法。
    const money = (e) => {
      this.props.dispatch({
        type: 'investmentmessage/findPrd',
        payload: {
          money: e.target.value },
      });
    };
    const ontouzi = () => {
      if (investmentmessage.date.nopswdflag === '1') {
        this.props.dispatch({
          type: 'investmentmessage/DoInvest',
          payload: {
            phoneNo: getLocalStorage(Storage.DID_LOGIN).retMsg,
            prdInfoID: investmentmessage.data.prdinfo.prdinfoid,
            channel: 2,
            money: investmentmessage.put.money,
          },
        });
      } else {
        this.props.dispatch({
          type: 'verifypswd/save',
          payload: investmentmessage.put,
        });
        browserHistory.push('/verifypswd');
        this.props.dispatch({
          type: 'investmentmessage/findPrd',
          payload: {
            visible: false,
          },
        });
      }
    };
    // 弹出框
    const onmodel = () => {
      if (investmentmessage.mone.length !== 0) {
        console.log(investmentmessage.mone, 9999999);
        let dayAndRate = '';
        let m = '';
        if (investmentmessage.data.prdinfo.calcintmann === '1' &&
            investmentmessage.data.prdinfo.prdmonths != null) {
          dayAndRate = investmentmessage.data.prdinfo.prdmonths + '个月';
            // 预期收益：投资金额*年收益率*天数/(360*100)，四舍五入到分
          m = (this.state.invmoney *
            investmentmessage.data.prdinfo.prdmonths) / (12 * 100);
        }
        if (investmentmessage.data.prdinfo.calcintmann === '2' &&
          investmentmessage.data.prdinfo.prddays != null) {
          dayAndRate = investmentmessage.data.prdinfo.prddays + '天';
            // 预期收益：投资金额*年收益率*天数/(360*100)，四舍五入到分
          m = (investmentmessage.put.money *
            investmentmessage.data.prdinfo.prddays) / (360 * 100);
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
              visible={investmentmessage.visible}
              footer={null}
            >
              <div>
                <div className={styles.root1}>
                  <Row>
                    <Col span={8}>
                      <text className={styles.text3}>项目名称:</text>
                    </Col>
                    <Col span={16}>
                      <text className={styles.text4}>{investmentmessage.data.prdinfo.prdname}</text>
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
                      <text className={styles.text4}>
                        {investmentmessage.data.prdinfo.yearprofitrate}%
                      </text>
                    </Col>
                  </Row>
                </div>
                <div className={styles.root1}>
                  <text className={styles.text3}>投资金额（元）</text>
                </div>
                <div className={styles.root2}>
                  <text className={styles.text4}>{investmentmessage.put.money}</text>
                </div>
                <div className={styles.root1}>
                  <Row className={styles.root3}>
                    <Col span={12}>
                      <div>
                        <text className={styles.text5}>可用余额（元）</text>
                      </div>
                      <div>
                        <text className={styles.text6}>
                          {Initialization(investmentmessage.mone.acctnoEntity.availablesum)}
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
    };
    const oncha = () => {
      return (
        <div className={styles.zdiv}>
          <Row className={styles.sxju}>
            <Col span={8}>
              <text>产品性质:</text>
            </Col>
            <Col span={16}>
              <text>{investmentmessage.data.prdinfo.prdtypename}</text>
            </Col>
          </Row>
          <Row className={styles.sxju}>
            <Col span={8}>
              <text>产品额度:</text>
            </Col>
            <Col span={16}>
              <text>{Initialization(investmentmessage.data.prdinfo.prdquota)}</text>
            </Col>
          </Row>
          <Row className={styles.sxju}>
            <Col span={8}>
              <text>剩余额度:</text>
            </Col>
            <Col span={16}>
              <text>{Initialization(investmentmessage.data.prdinfo.remainquota)}</text>
            </Col>
          </Row>
          <Row className={styles.sxju}>
            <Col span={8}>
              <text>起投金额:</text>
            </Col>
            <Col span={16}>
              <text>{Initialization(investmentmessage.data.prdinfo.buyminamt)}</text>
            </Col>
          </Row>
          <Row className={styles.sxju}>
            <Col span={8}>
              <text>风险级别:</text>
            </Col>
            <Col span={16}>
              <text>{investmentmessage.data.prdinfo.prorisklel}</text>
            </Col>
          </Row>
          <Row className={styles.sxju}>
            <Col span={8}>
              <text>认购开始时间:</text>
            </Col>
            <Col span={16}>
              <text>{investmentmessage.data.prdinfo.buystartdate}</text>
            </Col>
          </Row>
          <Row className={styles.sxju}>
            <Col span={8}>
              <text>认购结束时间:</text>
            </Col>
            <Col span={16}>
              <text>{investmentmessage.data.prdinfo.buyenddate}</text>
            </Col>
          </Row>
          <Row className={styles.sxju}>
            <Col span={8}>
              <text>起息日期:</text>
            </Col>
            <Col span={16}>
              <text>{investmentmessage.data.prdinfo.issuedate}</text>
            </Col>
          </Row>
          <Row className={styles.sxju}>
            <Col span={8}>
              <text>项目状态:</text>
            </Col>
            <Col span={16}>
              <text>{investmentmessage.data.prdinfo.prostatus}</text>
            </Col>
          </Row>
          <Row className={styles.sxju}>
            <Col span={8}>
              <text>能否转让:</text>
            </Col>
            <Col span={16}>
              <text>{investmentmessage.data.prdinfo.transflag}</text>
            </Col>
          </Row>
          <Row className={styles.sxju}>
            <Col span={8}>
              <text>能否提前还款:</text>
            </Col>
            <Col span={16}>
              <text>{investmentmessage.data.prdinfo.prepayflag}</text>
            </Col>
          </Row>
        </div>
      );
    };
    const oncha2 = () => {
      if (investmentmessage.data.prdinstructionList.length === 0) {
        console.log(investmentmessage.data, 76777786788);
        return (
          <div className={styles.kbj}>
            <text className={styles.kbj1}> 亲！没有内容哦！</text>
          </div>
        );
      } else {
        const kk = investmentmessage.data.prdinstructionList;
        const onbush = (s) => {
          return (
            <div >
              <div className={styles.ddiv}>
                <text className={styles.textx2}>{s.firleltitle}</text>
              </div>
              <div className={styles.ddiv}>
                <text className={styles.textx3}>{s.illustratecont}</text>
              </div>
            </div>
          );
        };
        return (
          <div>
            {kk.map((s, i) => onbush(s, i))}
          </div>
        );
      }
    };
    const oncha3 = () => {
      if (investmentmessage.data.invrcdList.length === 0) {
        return (
          <div className={styles.kbj}>
            <text> 亲！没有内容哦！</text>
          </div>
        );
      } else {
        const tt = investmentmessage.data.invrcdList;
        const onbush = (s) => {
          return (
            <div className={styles.ddiv}>
              <Row>
                <Col span={8}>
                  <text>{s.telno}</text>
                </Col>
                <Col span={6}>
                  <text>{s.invsum}</text>
                </Col>
                <Col span={10}>
                  <text>{s.invdate}</text>
                </Col>
              </Row>
            </div>
          );
        };
        return (
          <div>
            {tt.map((s, i) => onbush(s, i))}
          </div>
        );
      }
    };
    const onxim = () => {
      if (investmentmessage.data.prdinfo.prdsta === '1') {
        console.log(investmentmessage.data.prdinfo.prdsta, 13243542312);
        return (
          <Row>
            <Col span={16}>
              <input className={styles.input} placeholder="请输入投资金额" onChange={money} />
            </Col>
            <Col span={8} className={styles.bucol}>
              <Button className={styles.button} type="primary" onClick={showModal}>立即投资</Button>
            </Col>
          </Row>
        );
      } else if (investmentmessage.data.prdinfo.prdsta === '2') {
        return (
          <Row>
            <Col span={16}>
              <input className={styles.input} placeholder="请输入投资金额" disabled />
            </Col>
            <Col span={8} >
              <Button className={styles.button} type="primary" disabled >满标</Button>
            </Col>
          </Row>
        );
      } else if (investmentmessage.data.prdinfo.prdsta === '3') {
        return (
          <Row>
            <Col span={16}>
              <input className={styles.input} placeholder="请输入投资金额" disabled />
            </Col>
            <Col span={8} >
              <Button className={styles.button} type="primary" disabled >结束</Button>
            </Col>
          </Row>
        );
      }
    };
    return (
      <div className={styles.root}>
        <div>
          <Navbar title={'投资项目'} />
        </div>
        <div className={styles.div}>
          <text className={styles.text}>{investmentmessage.data.prdinfo.prdname}</text>
        </div>
        <div className={styles.div1}>
          <Row>
            <Col span={8} className={styles.col}>
              <Row >
                <Col>
                  <text className={styles.text1}>
                    {investmentmessage.data.prdinfo.yearprofitrate}%
                  </text>
                </Col>
                <Col>
                  <text className={styles.text2}>年化收益</text>
                </Col>
              </Row>
            </Col>
            <Col span={8} className={styles.col}>
              <Row >
                <Col>
                  <text className={styles.text1}>{investmentmessage.data.prdinfo.prddays}天</text>
                </Col>
                <Col>
                  <text className={styles.text2}>项目期限</text>
                </Col>
              </Row>
            </Col>
            <Col span={8} className={styles.col}>
              <Progress type="circle" percent={investmentmessage.data.prdinfo.percentage} width={50} />
            </Col>
          </Row>
        </div>
        <div className={styles.div4}>
          <Tabs defaultActiveKey="1" >
            <TabPane tab="产品规则" key="1">
              {oncha()}
            </TabPane>
            <TabPane tab="产品介绍" key="2">
              {oncha2()}
            </TabPane>
            <TabPane tab="投资记录" key="3">
              {oncha3()}
            </TabPane>
          </Tabs>
        </div>
        <div className={styles.div3}>
          {onxim()}
        </div>
        {onmodel()}
      </div>
    );
  }
}
const RForm = Form.create()(InvestmentMessageFrom);
function InvestmentMessage({ investmentmessage, dispatch }) {
  if (investmentmessage.data.length === 0) {
    return (
      <div className={styles.spin}>
        <Spin style={{ marginTop: '50%' }} />
      </div>
    );
  } else {
    console.log(investmentmessage.data, 11111111111111111111111);
    return (
      <div>
        <RForm investmentmessage={investmentmessage} dispatch={dispatch} />
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    investmentmessage: state.investmentmessage,
  };
}

export default connect(mapStateToProps)(InvestmentMessage);
