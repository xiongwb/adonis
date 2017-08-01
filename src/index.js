import dva from 'dva';
import { browserHistory } from 'dva/router';
import './index.css';

// 1. Initialize
const app = dva({
  history: browserHistory,
});

// 2. Plugins
// app.use({});

// 3. Model
// app.model(require('./models/example'));
app.model(require('./models/financing/financing'));
app.model(require('./models/recharge/recharge'));
app.model(require('./models/bank_card/bank_card'));
app.model(require('./models/bank_card/new_card'));
app.model(require('./models/bank_card/cardadd'));
app.model(require('./models/inv_schedule/inv_schedule'));
app.model(require('./models/financing_schedule/financing_schedule'));
app.model(require('./models/withdrawals/withdrawals'));
app.model(require('./models/payment_pwd/payment_pwd'));
app.model(require('./models/payment_pwd/set_pwd'));
app.model(require('./models/payment_pwd/update_pwd'));
app.model(require('./models/payment_pwd/reset_pwd'));
app.model(require('./models/intention/intention'));
app.model(require('./models/my_information/my_information'));
app.model(require('./models/recharge_log/recharge_log'));
app.model(require('./models/withdrawals_log/withdrawals_log'));
app.model(require('./models/personal/personal'));
app.model(require('./models/myInvest/investment'));
app.model(require('./models/login/login'));
app.model(require('./models/risk_assessment/risk_assessment'));
app.model(require('./models/login/register'));
app.model(require('./models/login/setuppwd'));
app.model(require('./models/login/forgetpwd'));
app.model(require('./models/loan/loan'));
app.model(require('./models/investment/investment'));
app.model(require('./models/investment/investmentmessage'));
app.model(require('./models/modifyloginpwd/modifyloginpwd'));
app.model(require('./models/login/registeragreement'));
app.model(require('./models/app/app'));
app.model(require('./models/totalAmount/totalAmount'));
app.model(require('./models/loan/lianagreement'));
app.model(require('./models/investment/verifypswd'));
// 4. Router
app.router(require('./router'));

// 5. Start
app.start('#root');
