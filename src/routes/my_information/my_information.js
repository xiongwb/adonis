/**
 * Created by cyt on 2017/5/31.
 */

import React from 'react';
import { Row, Col, Icon, Button, Spin } from 'antd';
import { connect } from 'dva';
import { browserHistory } from 'react-router';
import account from '../../assets/account.png';
import phone from '../../assets/phone_number.png';
import certificate from '../../assets/certificate_number.png';
import name from '../../assets/name.png';
import wechat from '../../assets/wechat.png';
import qq from '../../assets/qq.png';
import postbox from '../../assets/postbox.png';
import money from '../../assets/money.png';
import prehome from '../../assets/prehome.png';
import investment from '../../assets/investment_experience.png';
import card from '../../assets/bank_card.png';
import password from '../../assets/login_password.png';
import risk from '../../assets/risk_assessment.png';
import NavBar from '../../components/nav_bar';
import styles from './my_information.css';


function MyInformation({ myInformation, dispatch }) {
  if (myInformation.data.length === 0) {
    return (<div className={styles.spin}><Spin style={{ marginTop: '70%' }} /></div>);
  }
  // 通过field1数组字段遍历出输入框
  const field1 = ['昵称', '手机号', '证件号码', '用户类型', '真实姓名', '微信号', 'QQ号', '邮箱', '月收入', '居住地址', '互联网投资经验'];
  // 通过field2数组的值赋值给onChange方法的key
  const field2 = ['nickname', 'loginno', 'certno', 'custype', 'cusname', 'wechat',
    'qq', 'email', 'income', 'address', 'invexp'];
  // 通过field3数组获取我的信息的数据遍历赋值给输入框
  const data = myInformation.data;
  const field3 = [data.nickname, data.loginno, data.certno, data.custype, data.cusname,
    data.wechat, data.qq, data.email, data.income, data.address, data.invexp];
  // 通过picture数组遍历给输入框加入图片
  const picture = [account, phone, certificate, name, name,
    wechat, qq, postbox, money, prehome, investment];
  // 修改的信息存入models中
  const onChange = (value, key) => {
    myInformation.data[key] = value.target.value;
    dispatch({
      type: 'myInformation/save',
    });
  };
  const onClick = () => {
    for (const i in myInformation.obj) {
      if (myInformation.data[i] !== myInformation.obj[i]) {
        dispatch({
          type: 'myInformation/updInfo',
          payload: myInformation.data,
        });
      }
    }
  };
  const end = () => {
    dispatch({
      type: 'myInformation/signout',
    });
  };
  const inputBox = (s, i) => {
    if (i > 0 && i < 5) {
      return (
        <div className={styles.top2} >
          <Row type="flex">
            <Col span={3}>
              <img src={picture[i]} alt="banner" className={styles.img} />
            </Col>
            <Col span={21}>
              <div>
                <Row type="flex">
                  <Col span={12}>
                    <div className={styles.text} >{s}：</div>
                  </Col>
                  <Col span={12}>
                    <div className={styles.text}>{field3[i]}</div>
                  </Col>
                </Row>
              </div>
              <div className={styles.line1} />
            </Col>
          </Row>
        </div>
      );
    } else {
      return (
        <div className={styles.top2} >
          <Row type="flex">
            <Col span={3}>
              <img src={picture[i]} alt="banner" className={styles.img} />
            </Col>
            <Col span={21}>
              <div>
                <Row type="flex">
                  <Col span={12}>
                    <div className={styles.text} >{s}：</div>
                  </Col>
                  <Col span={12}>
                    {s === '互联网投资经验' ?
                      <select
                        className={styles.input}
                        value={field3[i]} onChange={e => onChange(e, field2[i])}
                      >
                        <option value="" >请选择</option >
                        <option value="2" >一年以下</option >
                        <option value="3" >1-3年</option >
                        <option value="4" >3年以上</option >
                      </select>
                      :
                      <input
                        placeholder="非必填项"
                        value={field3[i]}
                        onChange={e => onChange(e, field2[i])} className={styles.input}
                      />
                    }
                  </Col>
                </Row>
              </div>
              <div className={styles.line1} />
            </Col>
          </Row>
        </div>
      );
    }
  };
  return (
    <div className={styles.top1}>
      <NavBar title={'我的信息'} onClick={onClick} />
      <div className={styles.top3}>
        <div className={styles.line} />
        { field1.map((s, i) => inputBox(s, i)) }
        <div className={styles.top2} >
          <Row type="flex">
            <Col span={3}>
              <img src={money} alt="banner" className={styles.img} />
            </Col>
            <Col span={21}>
              <div>
                <Row type="flex">
                  <Col span={12}>
                    <div className={styles.text} >我的积分：</div>
                  </Col>
                  <Col span={12}>
                    <div className={styles.text}>{myInformation.data.accuscore}</div>
                  </Col>
                </Row>
              </div>
            </Col>
          </Row>
        </div>
        <div className={styles.line2} />
      </div>
      <div className={styles.top3}>
        <div className={styles.line1} />
        <div className={styles.top2} onClick={() => browserHistory.push('/bank_card')}>
          <Row type="flex">
            <Col span={3}>
              <img src={card} alt="banner" className={styles.img} />
            </Col>
            <Col span={21}>
              <Row type="flex">
                <Col span={20}>
                  <div className={styles.text} >银行卡管理：</div>
                </Col>
                <Col span={2}>
                  <Icon className={styles.icon} type="right" />
                </Col>
              </Row>
              <div className={styles.line1} />
            </Col>
          </Row>
        </div>
        <div className={styles.top2} >
          <Row type="flex">
            <Col span={3}>
              <img src={password} alt="banner" className={styles.img} />
            </Col>
            <Col span={21}>
              <Row type="flex">
                <Col span={20}>
                  <div className={styles.text} >风险评估等级：</div>
                </Col>
                <Col span={2}>
                  <Icon className={styles.icon} type="right" />
                </Col>
              </Row>
            </Col>
          </Row>
        </div>
        <div className={styles.line2} />
      </div>
      <div className={styles.top3}>
        <div className={styles.line1} />
        <div className={styles.top2} onClick={() => browserHistory.push('/intention')}>
          <Row type="flex">
            <Col span={3}>
              <img src={card} alt="banner" className={styles.img} />
            </Col>
            <Col span={21}>
              <Row type="flex">
                <Col span={20}>
                  <div className={styles.text} >投资意向征集：</div>
                </Col>
                <Col span={2}>
                  <Icon className={styles.icon} type="right" />
                </Col>
              </Row>
              <div className={styles.line1} />
            </Col>
          </Row>
        </div>
        <div className={styles.top2} >
          <Row type="flex">
            <Col span={3}>
              <img src={risk} alt="banner" className={styles.img} />
            </Col>
            <Col span={21}>
              <Row type="flex">
                <Col span={20}>
                  <div className={styles.text} >修改登陆密码：</div>
                </Col>
                <Col span={2}>
                  <Icon className={styles.icon} type="right" />
                </Col>
              </Row>
            </Col>
          </Row>
        </div>
        <div className={styles.line2} />
      </div>
      <Button onClick={end} className={styles.button}>退出登陆</Button>
    </div>
  );
}
function mapStateToProps(state) {
  return {
    myInformation: state.myInformation,
  };
}
export default connect(mapStateToProps)(MyInformation);
