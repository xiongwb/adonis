
import { message } from 'antd';
import fetch from 'dva/fetch';
import { browserHistory } from 'react-router';
import { getLocalStorage, delegateLocalStorage } from './helper';
import Storage from '../utils/storage';

function parseJSON(response) {
  return response.json();
}


function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  const error = new Error(response.statusText);
  // console.log("失败"+error);
  error.response = response;
  return error;
}

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */

export default function request(url, method, params) {
  const formData = new FormData();
  const token = getLocalStorage(Storage.DID_LOGIN);
  if (params && !params.token) {
    if (!!token && token.token) {
      params.token = token.token;
    } else {
      params.token = 'fromWeb';
    }
  }

  for (const key in params) {
    if (params[key] != null) {
      const value = params[key];
      formData.append(key, value);
    }
  }
  console.log(params);
  console.log(formData);

  return fetch(url, {
    method: method,
    body: formData,

  }).then(checkStatus)
    .then(parseJSON)
    .then((data) => {
      console.log('promise回调');
      console.log(data);
      if (data.retCode === 9) {
        console.log('用户没有登录');
        delegateLocalStorage(Storage.DID_LOGIN);
        browserHistory.push('/login');
        message.error('登录已超时，请您重新登录');
      } else {
        return { data };
      }
    })
    .catch(err => ({ err }));

//  如果有get或者其他请求方式，需要判断
  // get请求
  // return fetch(url)
  //   .then(checkStatus)
  //   .then(parseJSON)
  //   .then(data => ({ data }))
  //   .catch(err => ({ err }));
}

