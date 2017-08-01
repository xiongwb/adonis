/**
 * Created by cyt on 2017/6/8.
 */

/**
 *  封装一些字符串处理的小方法
 *  by fushang318
 */
export default class date {
  static currentDate() {
    let month = new Date().getMonth() + 1;
    if (month.toString.length === 1) {
      month = '0' + month;
    }
    return new Date().getFullYear() + '-' + month + '-' + new Date().getDate();
  }
}

