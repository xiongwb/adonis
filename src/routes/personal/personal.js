/**
 * Created by cyt on 2017/5/11.
 */

import React from 'react';
import { connect } from 'dva';
import {
  Button,
  Spin,
} from 'antd';
import { browserHistory } from 'react-router';
import styles from './personal.css';
// import StringUtils from '../../utils/string_utils';
import remind from '../../assets/remind.png';
import information from '../../assets/information.png';
import password from '../../assets/password.png';
import financingRcord from '../../assets/financing_record.png';
import query01 from '../../assets/query01.png';
import query02 from '../../assets/query02.png';
import selfInvest from '../../assets/self_invest.png';
import rechargeRecord from '../../assets/recharge_record.png';
import intentionSolicitation from '../../assets/intention_solicitation.png';
import valueVoucher from '../../assets/value_voucher.png';
import TabBar from '../../components/tab_bar';

function Personal() {
  const selectPhoto = () => {
    const inputObj = document.createElement('input');
    inputObj.setAttribute('id', '_ef');
    inputObj.setAttribute('type', 'file');
    inputObj.setAttribute('style', 'visibility:hidden');
    document.body.appendChild(inputObj);
    inputObj.click();
    // const value = inputObj.value;
  };
  return (
    <Spin spinning={false}>
      <div className={styles.root}>
        <div className={styles.perinfoDiv}>
          <div className={styles.headDiv}>
            <div className={styles.nameDiv}><text className={styles.name}>1234</text></div>
            <div className={styles.remindDiv}>
              <img src={remind} alt="remind" />
            </div>
          </div>
          <div className={styles.photoDiv} onClick={selectPhoto}>
            <text>选择头像</text>
          </div>
          <div className={styles.perinfo}>
            <text>15620528233</text>
            <div className={styles.assetsDiv}>
              <div className={styles.menoyDiv}>
                <text className={styles.money}>10000.00</text>
                <text className={styles.moneyUnit}>总资产（元）</text>
              </div>
              <div className={styles.operationDiv}>
                <Button className={styles.rechargeBtn}>充值</Button>
                <Button className={styles.withdrawBtn}>提现</Button>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.detailDiv}>
          <div className={styles.detailSideRowDiv}>
            <div className={styles.detailSideItemDiv}>
              <text className={styles.detailItemMoney}>123.00</text>
              <text className={styles.detailItemName}>已投金额</text>
            </div>
            <div className={styles.detailCenterItemDiv}>
              <text className={styles.detailItemMoney}>123.00</text>
              <text className={styles.detailItemName}>待收益金额</text>
            </div>
            <div className={styles.detailSideItemDiv}>
              <text className={styles.detailItemMoney}>123.00</text>
              <text className={styles.detailItemName}>可用余额</text>
            </div>
          </div>
          <div className={styles.detailCenterRowDiv}>
            <div className={styles.detailSideItemDiv}>
              <text className={styles.detailItemMoney}>123.00</text>
              <text className={styles.detailItemName}>可提金额</text>
            </div>
            <div className={styles.detailCenterItemDiv}>
              <text className={styles.detailItemMoney}>123.00</text>
              <text className={styles.detailItemName}>在途金额</text>
            </div>
            <div className={styles.detailSideItemDiv}>
              <text className={styles.detailItemMoney}>123.00</text>
              <text className={styles.detailItemName}>已收益金额</text>
            </div>
          </div>
          <div className={styles.detailSideRowDiv}>
            <div className={styles.detailSideItemDiv}>
              <text className={styles.detailItemMoney}>123.00</text>
              <text className={styles.detailItemName}>已融资金额</text>
            </div>
            <div className={styles.detailCenterItemDiv}>
              <text className={styles.detailItemMoney}>123.00</text>
              <text className={styles.detailItemName}>待收款金额</text>
            </div>
            <div className={styles.detailSideItemDiv}>
              <text className={styles.detailItemMoney}>123.00</text>
              <text className={styles.detailItemName}>已付利息及手续费</text>
            </div>
          </div>
        </div>
        <div className={styles.detailDiv}>
          <div className={styles.detailSideRowDiv}>
            <div className={styles.detailSideItemDiv} onClick={() => browserHistory.push('/my_information')}>
              <img src={information} alt="information" />
              <text className={styles.menuName}>我的信息</text>
            </div>
            <div className={styles.detailCenterItemDiv} onClick={() => browserHistory.push('/risk_assessment/riskRecord')}>
              <img src={password} alt="password" />
              <text className={styles.menuName} >资金交易密码</text>
            </div>
            <div className={styles.detailSideItemDiv} onClick={() => browserHistory.push('/myInvest/investRecord')}>
              <img src={financingRcord} alt="financingRcord" />
              <text className={styles.menuName}>投资记录</text>
            </div>
          </div>
          <div className={styles.detailCenterRowDiv}>
            <div className={styles.detailSideItemDiv} onClick={() => browserHistory.push('/inv_schedule')}>
              <img src={query01} alt="query01" />
              <text className={styles.menuName} >转让申请进度查询</text>
            </div>
            <div className={styles.detailCenterItemDiv} onClick={() => browserHistory.push('/financing_schedule')}>
              <img src={query02} alt="query02" />
              <text className={styles.menuName}>融资申请进度查询</text>
            </div>
            <div className={styles.detailSideItemDiv} onClick={() => browserHistory.push('/financing/financingRecord')}>
              <img src={selfInvest} alt="selfInvest" />
              <text className={styles.menuName}>融资记录</text>
            </div>
          </div>
          <div className={styles.detailSideRowDiv}>
            <div className={styles.detailSideItemDiv} onClick={() => browserHistory.push('/recharge_log')}>
              <img src={rechargeRecord} alt="rechargeRecord" />
              <text className={styles.menuName}>充值记录</text>
            </div>
            <div className={styles.detailCenterItemDiv} onClick={() => browserHistory.push('/withdrawals_log')}>
              <img src={intentionSolicitation} alt="intentionSolicitation" />
              <text className={styles.menuName}>提现记录</text>
            </div>
            <div className={styles.detailSideItemDiv}>
              <img src={valueVoucher} alt="valueVoucher" />
              <text className={styles.menuName}>我的礼包</text>
            </div>
          </div>
        </div>
        <div className={styles.btnBox}>
          <div className={styles.btnDiv}>
            <text className={styles.btnText}>更&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;多</text>
          </div>
        </div>
      </div>
      <TabBar title={'我的'} />
    </Spin>
  );
}

function mapStateToProps(state) {
  return {
    personal: state.personal,
  };
}


export default connect(mapStateToProps)(Personal);

