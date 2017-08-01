import React from 'react';
import { Router, Route } from 'dva/router';
import App from './routes/app';
import Login from './routes/login/login';
import Register from './routes/login/register';
import Recharge from './routes/recharge/recharge';
import RechargePwd from './routes/recharge/recharge_pwd';
import OptionBank from './routes/recharge/option_bank';
import CardAdd from './routes/bank_card/cardadd';
import NewCard from './routes/bank_card/new_card';
import BankCard from './routes/bank_card/bank_card';
import Protocol1 from './routes/bank_card/protocol1';
import Protocol2 from './routes/bank_card/protocol2';
import Setuppwd from './routes/login/setuppwd';
import Forgetpwd from './routes/login/forgetpwd';
import FinancingRecord from './routes/financing/financing_record';
import FinancingDetail from './routes/financing/financing_detail';
import Loan from './routes/loan/loan';
import Loanapply from './routes/loan/loanapply';
import Investment from './routes/investment/investment';
import InvestmentMessage from './routes/investment/investment_message';
import Withdrawals from './routes/withdrawals/withdrawals';
import WithdrawalsPwd from './routes/withdrawals/withdrawals_pwd';
import TotalAmount from './routes/total_amount/total_amount';
import RechargeLog from './routes/recharge_log/recharge_log';
import WithdrawalsLog from './routes/withdrawals_log/withdrawals_log';
import PaymentPwd from './routes/payment_pwd/payment_pwd';
import SetPwd from './routes/payment_pwd/set_pwd';
import ResetPwd from './routes/payment_pwd/reset_pwd';
import UpdatePwd from './routes/payment_pwd/update_pwd';
import InvSchedule from './routes/inv_schedule/inv_schedule';
import FinancingSchedule from './routes/financing_schedule/financing_schedule';
import MyInformation from './routes/my_information/my_information';
import Personal from './routes/personal/personal';
import Repayment from './routes/financing/repayment';
import InvestRecord from './routes/myInvest/invest_record';
import Intention from './routes/intention/intention';
import Mygiftbag from './routes/mygiftbag/mygiftbag';
import MygiftbagMessage from './routes/mygiftbag/mygiftbag_message';
import Modifyloginpwd from './routes/modifyloginpwd/modifyloginpwd';
import Registeragreement from './routes/login/registeragreement';
import Loanagreement from './routes/loan/loanagreement';
import RiskRecord from './routes/risk_assessment/risk_record';
import RiskDetail from './routes/risk_assessment/risk_detail';
import RiskAssessment from './routes/risk_assessment/risk_assessment';
import RiskQuestion from './routes/risk_assessment/risk_question';
import TradePasswordValidate from './routes/myInvest/trade_password_validate';
import PayFee from './routes/financing/pay_fee';
import Verifypswd from './routes/investment/verifypswd';
import TradePasswordValidateRepay from './routes/financing/trade_password_validate';

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Route path="/" component={App} />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <Route path="/recharge" component={Recharge} />
      <Route path="/recharge/recharge_pwd" component={RechargePwd} />
      <Route path="/recharge/option_bank" component={OptionBank} />
      <Route path="/recharge/protocol1" component={Protocol1} />
      <Route path="/recharge/protocol2" component={Protocol2} />
      <Route path="/bank_card" component={BankCard} />
      <Route path="/bank_card/cardadd" component={CardAdd} />
      <Route path="/bank_card/new_card" component={NewCard} />
      <Route path="/setuppwd" component={Setuppwd} />
      <Route path="/forgetpwd" component={Forgetpwd} />
      <Route path="/financing/financingRecord" component={FinancingRecord} />
      <Route path="/financing/financingDetail" component={FinancingDetail} />
      <Route path="/financing/repayment" component={Repayment} />
      <Route path="/loan" component={Loan} />
      <Route path="/loanapply" component={Loanapply} />
      <Route path="/investment" component={Investment} />
      <Route path="/investment/message" component={InvestmentMessage} />
      <Route path="/withdrawals" component={Withdrawals} />
      <Route path="/withdrawals/withdrawals_pwd" component={WithdrawalsPwd} />
      <Route path="/total_amount" component={TotalAmount} />
      <Route path="/recharge_log" component={RechargeLog} />
      <Route path="/withdrawals_log" component={WithdrawalsLog} />
      <Route path="/payment_pwd" component={PaymentPwd} />
      <Route path="/payment_pwd/set_pwd" component={SetPwd} />
      <Route path="/payment_pwd/update_pwd" component={UpdatePwd} />
      <Route path="/payment_pwd/reset_pwd" component={ResetPwd} />
      <Route path="/inv_schedule" component={InvSchedule} />
      <Route path="/financing_schedule" component={FinancingSchedule} />
      <Route path="/my_information" component={MyInformation} />
      <Route path="/personal" component={Personal} />
      <Route path="/myInvest/investRecord" component={InvestRecord} />
      <Route path="/intention" component={Intention} />
      <Route path="/mygiftbag" component={Mygiftbag} />
      <Route path="/mygiftbag/message" component={MygiftbagMessage} />
      <Route path="/modifyloginpwd" component={Modifyloginpwd} />
      <Route path="/registeragreement" component={Registeragreement} />
      <Route path="/loanagreement" component={Loanagreement} />
      <Route path="/risk_assessment/riskRecord" component={RiskRecord} />
      <Route path="/risk_assessment/riskDetail" component={RiskDetail} />
      <Route path="/risk_assessment/riskAssessment" component={RiskAssessment} />
      <Route path="/risk_assessment/riskQuestion" component={RiskQuestion} />
      <Route path="/myInvest/tradePasswordValidate" component={TradePasswordValidate} />
      <Route path="/financing/payFee" component={PayFee} />
      <Route path="/verifypswd" component={Verifypswd} />
      <Route path="/financing/tradePasswordValidate" component={TradePasswordValidateRepay} />
    </Router>
  );
}
export default RouterConfig;