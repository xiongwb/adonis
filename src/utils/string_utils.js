
/**
*  封装一些字符串处理的小方法
*  by fushang318
*/
export default class StringUtils {
  /**
  * "132 3321 1111" -> "13233211111"
  */
  static phoneNumberHuman2Data(humanPhoneNumber) {
    return humanPhoneNumber.replace(/ /g, '');
  }

  /**
  * "13233211111" -> "132 3321 1111"
  */
  static phoneNumberData2Human(dataPhoneNumber) {
    const str = this.phoneNumberHuman2Data(dataPhoneNumber);
    str.match(/([0-9]{3})([0-9]{4})([0-9]{4})/);
    return `${RegExp.$1} ${RegExp.$2} ${RegExp.$3}`;
  }

  static bankCardNumberData2Human(bankCardNumber) {
    const str = bankCardNumber;
    str.match(/([0-9]{4})([0-9]{4})([0-9]{4})([0-9]{4})/);
    return `${RegExp.$1} ${RegExp.$2} ${RegExp.$3} ${RegExp.$4}`;
  }

  /* 保留两位小数
   * "25000" -> "25,000.00"
   */
  static moneyFormatData2Money(moneyData) {
    moneyData = moneyData.toString().replace(/\$|\,/g, '');
    if (isNaN(moneyData)) {
      moneyData = '0';
    }

    const sign = (moneyData === (moneyData = Math.abs(moneyData)));
    moneyData = Math.floor(moneyData * 100 + 0.50000000001);
    let cents = moneyData % 100;
    moneyData = Math.floor(moneyData / 100).toString();

    if (cents < 10) {
      cents = '0' + cents;
    }

    for (let i = 0; i < Math.floor((moneyData.length - (1 + i)) / 3); i++) {
      moneyData = moneyData.substring(0, moneyData.length - (4 * i + 3)) + ',' +
        moneyData.substring(moneyData.length - (4 * i + 3));
    }

    return (((sign) ? '' : '') + moneyData + '.' + cents);
  }
}
