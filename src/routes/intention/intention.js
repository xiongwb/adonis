/**
 * Created by cyt on 2017/6/1.
 */
import React from 'react';
import { Row, Col, Button, message } from 'antd';
import { connect } from 'dva';
import NavBar from '../../components/nav_bar';
import styles from './intention.css';


function Intention({ intention, dispatch }) {
  const isShow = () => {
    for (const i in intention.obj) {
      if (intention.obj[i] === '') {
        return true;
      }
    }
    return false;
  };
  const onChange = (value, key) => {
    intention.obj[key] = value.target.value;
    dispatch({
      type: 'intention/save',
      payload: { disabled: isShow() },
    });
  };
  const onClick = () => {
    if (intention.obj.toinvsum < 100) {
      message.error('可投资金额不能小于100');
      return;
    }
    dispatch({
      type: 'intention/invInt',
      payload: intention.obj,
    });
  };
  return (
    <div >
      <NavBar title={'投资意向征集'} />
      <div className={styles.line1} />
      <div className={styles.inputDiv}>
        <Row type="flex">
          <Col span={9}>
            <div className={styles.text} >联系人：</div>
          </Col>
          <Col span={13}>
            <input value={intention.obj.cusname} onChange={e => onChange(e, 'cusname')} placeholder="请输入联系人" className={styles.input} />
          </Col>
        </Row>
      </div>
      <div className={styles.line2} />
      <div className={styles.inputDiv}>
        <Row type="flex">
          <Col span={9}>
            <div className={styles.text} >手机号：</div>
          </Col>
          <Col span={13}>
            <input value={intention.obj.telno} onChange={e => onChange(e, 'telno')} placeholder="请输入手机号码" className={styles.input} />
          </Col>
        </Row>
      </div>
      <div className={styles.line2} />
      <div className={styles.inputDiv}>
        <Row type="flex">
          <Col span={9}>
            <div className={styles.text} >邮箱：</div>
          </Col>
          <Col span={13}>
            <input value={intention.obj.email} type="email" onChange={e => onChange(e, 'email')} placeholder="请输入邮箱地址" className={styles.input} />
          </Col>
        </Row>
      </div>
      <div className={styles.line2} />
      <div className={styles.inputDiv}>
        <Row type="flex">
          <Col span={9}>
            <div className={styles.text} >投资期限：</div>
          </Col>
          <Col span={13}>
            <select onChange={e => onChange(e, 'invterm')} className={styles.input} >
              <option value="" >请选择</option >
              <option value="1" >3个月</option >
              <option value="2" >6个月</option >
              <option value="3" >9个月</option >
              <option value="4" >一年以上</option >
            </select>
          </Col>
        </Row>
      </div>
      <div className={styles.line2} />
      <div className={styles.inputDiv}>
        <Row type="flex">
          <Col span={10}>
            <div className={styles.text} >可投资金额：</div>
          </Col>
          <Col span={7}>
            <input value={intention.obj.toinvsum} onChange={e => onChange(e, 'toinvsum')} placeholder="最低100" className={styles.input} />
          </Col>
          <Col span={7}>
            <div className={styles.textDiv}>元</div>
          </Col>
        </Row>
      </div>
      <div className={styles.line2} />
      <div className={styles.inputDiv}>
        <Row type="flex">
          <Col span={11}>
            <div className={styles.text}>期望年华收益率：</div>
          </Col>
          <Col span={7}>
            <input value={intention.obj.expprofit} onChange={e => onChange(e, 'expprofit')} className={styles.input} />
          </Col>
          <Col span={6}>
            <div className={styles.textDiv}>%以上</div>
          </Col>
        </Row>
      </div>
      <div className={styles.line2} />
      <div className={styles.inputDiv}>
        <Row type="flex">
          <Col span={11}>
            <div className={styles.text} >其他投资需求：</div>
          </Col>
          <Col span={13}>
            <input value={intention.obj.notes} onChange={e => onChange(e, 'notes')} className={styles.input} />
          </Col>
        </Row>
      </div>
      <div className={styles.line2} />
      <Button onClick={onClick} disabled={intention.disabled} className={styles.button}>提交</Button>
    </div>
  );
}
function mapStateToProps(state) {
  return {
    intention: state.intention,
  };
}
export default connect(mapStateToProps)(Intention);
