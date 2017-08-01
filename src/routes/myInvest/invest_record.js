/**
 * Created by cyt on 2017/5/11.
 */

import React from 'react';
import { connect } from 'dva';
import {
  Spin,
  Modal,
  Row,
  Col,
} from 'antd';
import { browserHistory } from 'react-router';
import styles from './invest_record.css';
import NavBar from '../../components/nav_bar';
import arrowRight from '../../assets/arrow_right.png';
import StringUtils from '../../utils/string_utils';
import { getLocalStorage } from '../../utils/helper';
import Storage from '../../utils/storage';

class InvestMenu extends React.Component {
  render() {
    const selectedKey = this.props.selectedKey;
    return (
      <div className={styles.menuDiv}>
        {selectedKey === '1' ?
          <div className={styles.selectedMenu}>
            <text className={styles.selectedText}>投资中</text>
          </div>
          :
          <div className={styles.unselectMenu} onClick={() => this.props.onClick('1')}>
            <text className={styles.unselectText}>投资中</text>
          </div>
        }
        {selectedKey === '2' ?
          <div className={styles.selectedMenu}>
            <text className={styles.selectedText}>已结清</text>
          </div>
          :
          <div className={styles.unselectMenu} onClick={() => this.props.onClick('2')}>
            <text className={styles.unselectText}>已结清</text>
          </div>
        }
      </div>
    );
  }
}

function InvestRecord({ invest, dispatch }) {
  const renderList = () => {
    if (invest.selectedKey === '1') {
      const rows = [];
      const list = invest.list1;
      for (const i in list) {
        if (list[i] != null) {
          const invsumStr = list[i].invsum != null && list[i].invsum !== '' ? StringUtils.moneyFormatData2Money(list[i].invsum) : '0.00';
          let cantransflag = '';
          switch (list[i].cantransflag) {
            case '0':
              cantransflag = '不可转让';
              break;
            case '1':
              cantransflag = '可转让';
              break;
            default:
              cantransflag = '不可转让';
          }
          let transferflag = '';
          switch (list[i].transferflag) {
            case '0':
              transferflag = '未转让';
              break;
            case '1':
              transferflag = '已转让';
              break;
            default:
              transferflag = '未转让';
          }
          let flag = '';
          if (list[i].cantransflag === '1' && list[i].transferflag === '0') {
            flag = '1';
          } else if (list[i].cantransflag === '1' && list[i].transferflag !== '0') {
            flag = '2';
          } else if (list[i].cantransflag === '0') {
            flag = '3';
          }
          rows.push(
            <div key={'list1_' + i} className={styles.row1Div}>
              <div className={styles.prdnameDiv} onClick={() => showPrdDetail(list[i].prdcode)}>
                <text className={styles.prdname}>{list[i].prdname}</text>
                <img src={arrowRight} alt="arrowRight" />
              </div>
              <div className={styles.row1DetailDiv}>
                <div className={styles.row1DetailItemDiv}>
                  <text className={styles.row1DetailItemName}>投资金额</text>
                  <text className={styles.row1DetailItemValue}>{invsumStr}</text>
                </div>
                <div className={styles.row1DetailItemDiv}>
                  <text className={styles.row1DetailItemName}>预期收益率</text>
                  <text className={styles.row1DetailItemValue}>{list[i].expprofit}</text>
                </div>
                <div className={styles.row1DetailStatusDiv}>
                  <text className={styles.row1DetailStatus}>{cantransflag}</text>
                </div>
              </div>
              <div className={styles.row1FootDiv}>
                <text className={styles.row1FootItemText}>购买日期：{list[i].invdate}</text>
                {renderBtn(flag, transferflag, list[i])}
              </div>
            </div>,
          );
        }
      }
      return rows;
    } else {
      const rows = [];
      const list = invest.list2;
      for (const i in list) {
        if (list[i] != null) {
          const invsumStr = list[i].invsum != null && list[i].invsum !== '' ? StringUtils.moneyFormatData2Money(list[i].invsum) : '0.00';
          const earnedsum = list[i].earnedsum != null && list[i].earnedsum !== '' ? StringUtils.moneyFormatData2Money(list[i].earnedsum) : '0.00';
          rows.push(
            <div key={'list2_' + i} className={styles.row1Div}>
              <div className={styles.prdnameDiv} onClick={() => showPrdDetail(list[i].prdcode)}>
                <text className={styles.prdname}>{list[i].prdname}</text>
                <img src={arrowRight} alt="arrowRight" />
              </div>
              <div className={styles.row1DetailDiv}>
                <div className={styles.row1DetailItemDiv}>
                  <text className={styles.row1DetailItemName}>投资金额</text>
                  <text className={styles.row1DetailItemValue}>{invsumStr}</text>
                </div>
                <div className={styles.row1DetailItemDiv}>
                  <text className={styles.row1DetailItemName}>收益率</text>
                  <text className={styles.row1DetailItemValue}>{list[i].expprofit}</text>
                </div>
                <div className={styles.row1DetailItemDiv}>
                  <text className={styles.row1DetailItemName}>收益金额</text>
                  <text className={styles.row1DetailItemValue}>{earnedsum}</text>
                </div>
              </div>
              <div className={styles.row1FootDiv}>
                <text className={styles.row1FootItemText}>投资日期：{list[i].invdate}</text>
                <text className={styles.row1FootItemText}>结清日期：{list[i].invdate}</text>
              </div>
            </div>,
          );
        }
      }
      return rows;
    }
  };
  const showPrdDetail = (prdcode) => {
    dispatch({
      type: 'myInvest/getPrdinfo',
      payload: {
        prdcode: prdcode,
        phoneNo: getLocalStorage(Storage.DID_LOGIN).retMsg,
      },
    });
    dispatch({
      type: 'myInvest/save',
      payload: {
        visible2: true,
      },
    });
  };
  const renderBtn = (flag, transferflag, item) => {
    if (flag === '1') {
      return (
        <div
          className={styles.row1BtnDiv}
          onClick={() => transfer(item.invrcdid, item.prdcode, item.tenantno, item.prdname)}
        >
          <text className={styles.row1BtnText}>转让</text>
        </div>
      );
    } else if (flag === '2') {
      return (
        <div className={styles.row1BtnDisabledDiv}>
          <text className={styles.row1BtnText}>{transferflag}</text>
        </div>
      );
    } else if (flag === '3') {
      return (
        <div />
      );
    }
  };
  const transfer = (invrcdid, prdcode, tenantno, prdname) => {
    let month = new Date().getMonth() + 1;
    if (month.toString.length === 1) {
      month = '0' + month;
    }
    const date = new Date().getFullYear() + '-' + month + '-' + new Date().getDate();
    dispatch({
      type: 'myInvest/save',
      payload: {
        visible: true,
        invrcdid: invrcdid,
        prdcode: prdcode,
        tenantno: tenantno,
        prdname: prdname,
        cusname: getLocalStorage(Storage.DID_LOGIN).cusname,
        telno: getLocalStorage(Storage.DID_LOGIN).retMsg,
        date: date,
      },
    });
  };
  const switchMenu = (tab) => {
    dispatch({
      type: 'myInvest/save',
      payload: { selectedKey: tab },
    });
  };
  const closeModel = () => {
    dispatch({
      type: 'myInvest/save',
      payload: { visible: false },
    });
  };
  const closeModel2 = () => {
    dispatch({
      type: 'myInvest/save',
      payload: { visible2: false },
    });
  };
  const toTradePasswordValidate = () => {
    dispatch({
      type: 'myInvest/save',
      payload: {
        visible: false,
      },
    });
    browserHistory.push('/myInvest/tradePasswordValidate');
  };
  return (
    <div className={styles.root}>
      <NavBar title="融资记录" />
      <InvestMenu selectedKey={invest.selectedKey} onClick={tab => switchMenu(tab)} />
      <Spin spinning={invest.loading}>
        <div className={styles.listDiv}>{renderList()}</div>
        <Modal
          title={invest.prdinfo != null ? invest.prdinfo.prdname : '加载中...'}
          visible={invest.visible2}
          footer={null}
          onCancel={closeModel2}
        >
          <div className={styles.detailDiv}>
            <div>
              <Row>
                <Col span={12}><text className={styles.modelDetailName}>产品性质：</text></Col>
                <Col span={12}><text className={styles.modelDetailValue}>{invest.prdinfo != null ? invest.prdinfo.prdtypename : ''}</text></Col>
              </Row>
            </div>
            <div>
              <Row>
                <Col span={12}><text className={styles.modelDetailName}>产品额度：</text></Col>
                <Col span={12}><text className={styles.modelDetailValue}>{invest.prdinfo != null && invest.prdinfo.prdquota > 0 ? StringUtils.moneyFormatData2Money(invest.prdinfo.prdquota) : ''}</text></Col>
              </Row>
            </div>
            <div>
              <Row>
                <Col span={12}><text className={styles.modelDetailName}>成立日期：</text></Col>
                <Col span={12}><text className={styles.modelDetailValue}>{invest.prdinfo != null ? invest.prdinfo.issuedate : ''}</text></Col>
              </Row>
            </div>
            <div>
              <Row>
                <Col span={12}><text className={styles.modelDetailName}>到息日期：</text></Col>
                <Col span={12}><text className={styles.modelDetailValue}>{invest.prdinfo != null ? invest.prdinfo.winddate : ''}</text></Col>
              </Row>
            </div>
            <div>
              <Row>
                <Col span={12}><text className={styles.modelDetailName}>产品状态：</text></Col>
                <Col span={12}><text className={styles.modelDetailValue}>{invest.prdinfo != null ? invest.prdinfo.prostatus : ''}</text></Col>
              </Row>
            </div>
          </div>
        </Modal>
        <Modal
          title="确认申请转让"
          visible={invest.visible}
          footer={null}
          onCancel={closeModel}
        >
          <div className={styles.detailDiv}>
            <div>
              <Row>
                <Col span={12}>
                  <text className={styles.modelDetailName}>项目名称：</text>
                </Col>
                <Col span={12}>
                  <text className={styles.modelDetailValue}>{invest.prdname}</text>
                </Col>
              </Row>
            </div>
            <div>
              <Row>
                <Col span={12}>
                  <text className={styles.modelDetailName}>姓名：</text>
                </Col>
                <Col span={12}>
                  <text className={styles.modelDetailValue}>{invest.cusname}</text>
                </Col>
              </Row>
            </div>
            <div>
              <Row>
                <Col span={12}><text className={styles.modelDetailName}>手机号：</text></Col>
                <Col span={12}><text className={styles.modelDetailValue}>{invest.telno}</text></Col>
              </Row>
            </div>
            <div>
              <Row>
                <Col span={12}><text className={styles.modelDetailName}>申请日期：</text></Col>
                <Col span={12}><text className={styles.modelDetailValue}>{invest.date}</text></Col>
              </Row>
            </div>
          </div>
          <div className={styles.modelBtn} onClick={() => toTradePasswordValidate()}>
            <text className={styles.modelBtnText}>申 请 转 让</text>
          </div>
        </Modal>
      </Spin>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    invest: state.myInvest,
  };
}


export default connect(mapStateToProps)(InvestRecord);

