// 这是一个封装的方法JS文件
import constants from '@/util/constants'
import CryptoJS from 'crypto-js/crypto-js'
import global from '@/main'
import axios from 'axios'
// import qs from 'qs'

axios.defaults.headers['Content-Type'] = 'application/json;charset=UTF-8'
axios.defaults.withCredentials = true
function myAjax (options) {
  let loading = options.loading === undefined || options.loading === true
  global.fullscreenLoading = loading
  let furl = options.url
  let tmpData = options.data === undefined ? {} : options.data
  // if (constants.ENABLE_AES_CODE) {
  //   let aesData = encryptAES(JSON.stringify(tmpData))
  //   tmpData = aesData
  // } else {
  //   tmpData = JSON.stringify(tmpData)
  // }
  let fsuccess = options.success
  let ferror = options.error === undefined ? function (err) {
    console.log(err)
  } : options.error
  let fbaseURL = options.baseURL === undefined ? constants.JS_CONTEXT : options.baseURL
  let fmethod = options.method === undefined ? 'post' : options.method
  let fresponseType = options.responseType === undefined ? 'json' : options.responseType
  // let fcontentType = options.contentType === undefined ? 'application/x-www-form-urlencoded' : options.contentType
  // let fcontentType = 'application/json'
  // let fdata = new URLSearchParams()
  // fdata.append('params', tmpData)
  // fdata.append('token', getCookie('token'))
  let fdata = tmpData
  axios({
    url: furl,
    method: fmethod,
    data: fdata,
    baseURL: fbaseURL,
    responseType: fresponseType
    // transformRequest: [function (data) {
    //   data = qs.stringify(data)
    //   return data
    // }]
  }).then(function (res) {
    let result = res.data
    if (constants.ENABLE_AES_CODE) {
      if (result.data !== null) {
        let data = decryptAES(decodeURIComponent(result.data))
        result.data = JSON.parse(data)
      }
    }
    if (result.message === 'token is null' || result.message === 'token is invalid') {
      global.$message.error('登陆失效，请重新登陆')
      clearLoginData()
      global.$router.push({path: `/`})
    } else {
      fsuccess(result)
    }
    global.fullscreenLoading = false
  }).catch(function (err) {
    // global.$message.error(err)
    ferror(err)
    global.fullscreenLoading = false
  })
}

let setLocalInfo = function (key, value) {
  let storage = window.localStorage
  let svalue = {
    data: value
  }
  storage.setItem(key, encryptAES(JSON.stringify(svalue)))
}
let getLocalInfo = function (key) {
  let storage = window.localStorage
  let svalue = storage.getItem(key)
  let value = ''
  if (svalue !== undefined && svalue !== null && svalue !== '') {
    let tmp = JSON.parse(decryptAES(svalue))
    value = tmp.data
  }
  return value
}
let removeLocalInfo = function (key) {
  let storage = window.localStorage
  storage.removeItem(key)
}

let setSessionInfo = function (key, value) {
  let storage = window.sessionStorage
  let svalue = {
    data: value
  }
  storage.setItem(key, encryptAES(JSON.stringify(svalue)))
}
let getSessionInfo = function (key) {
  let storage = window.sessionStorage
  let svalue = storage.getItem(key)
  let value = ''
  if (svalue !== undefined && svalue !== null && svalue !== '') {
    let tmp = JSON.parse(decryptAES(svalue))
    value = tmp.data
  }
  return value
}
let removeSessionInfo = function (key) {
  let storage = window.sessionStorage
  storage.removeItem(key)
}

let setCookie = function (cname, cvalue, exdays) {
  // cvalue = encodeURI(cvalue)
  let val = cname + '=' + cvalue
  if (exdays !== undefined && exdays !== null && exdays !== 0) {
    var d = new Date()
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000))
    var expires = 'expires=' + d.toUTCString()
    val = val + ';' + expires
  }
  document.cookie = val
}
let getCookie = function (cname) {
  let name = cname + '='
  let ca = document.cookie.split(';')
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i]
    while (c.charAt(0) === ' ') c = c.substring(1)
    // if (c.indexOf(name) !== -1) return decodeURI(c.substring(name.length, c.length))
    if (c.indexOf(name) !== -1) return c.substring(name.length, c.length)
  }
  return ''
}

let getMD5String = function (string) {
  return CryptoJS.MD5(string).toString()
}
let keyIv = 'geneplus-aduc001' // 必须为16位
let options = {
  iv: CryptoJS.enc.Utf8.parse(keyIv),
  mode: CryptoJS.mode.CBC,
  padding: CryptoJS.pad.ZeroPadding
}
let encryptAES = function (word) {
  let key = CryptoJS.enc.Utf8.parse(keyIv)
  let srcs = CryptoJS.enc.Utf8.parse(word)
  let encrypted = CryptoJS.AES.encrypt(srcs, key, options)
  return encrypted.toString()
}
let decryptAES = function (word) {
  let key = CryptoJS.enc.Utf8.parse(keyIv)
  let decrypt = CryptoJS.AES.decrypt(word, key, options)
  return CryptoJS.enc.Utf8.stringify(decrypt).toString()
}

let validatePhone = function (rule, value, callback) {
  if (value === '' || value === null || value === undefined) {
    callback()
  } else {
    let match = /(^(0[0-9]{2,3})?(-)?([2-9][0-9]{6,7})+(-[0-9]{1,4})?$)|(^((\d3)|(\d{3}-))?([14][345678]\d{9})$)/
    if (!(match.test(value))) {
      callback(new Error('格式错误'))
    } else {
      callback()
    }
  }
}
let validateEmail = function (rule, value, callback) {
  if (value === undefined || value === null || value === '') {
    callback()
    return
  }
  let reg = new RegExp('^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$') // 正则表达式
  if (!reg.test(value)) { // 正则验证不通过，格式不对
    callback(new Error('邮箱格式错误'))
  } else {
    callback()
  }
}
let phoneOrEmail = function (value) {
  let email = new RegExp('^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$') // 正则表达式
  let phone = /(^(0[0-9]{2,3})?(-)?([2-9][0-9]{6,7})+(-[0-9]{1,4})?$)|(^((\d3)|(\d{3}-))?([14][345678]\d{9})$)/
  if (email.test(value)) {
    return 'email'
  } else if (phone.test(value)) {
    return 'phone'
  }
  return null
}
let validatePhoneEmail = function (rule, value, callback) {
  if (value === undefined || value === null || value === '') {
    callback()
    return
  }
  let v = phoneOrEmail(value)
  if (v === 'phone' || v === 'email') {
    callback()
  } else {
    callback(new Error('格式错误'))
  }
}
let validatePassword = function (rule, value, callback) {
  let count = 0
  let regNum = /\d/
  if (regNum.test(value)) {
    count++
  }
  let regBug = new RegExp('^.*[A-Z].*')
  if (regBug.test(value)) {
    count++
  }
  let regMin = new RegExp('^.*[a-z].*')
  if (regMin.test(value)) {
    count = count + 1
  }
  let regSp = /^.*((?=[\x21-\x7e]+)[^A-Za-z0-9]).*/
  if (regSp.test(value)) {
    count = count + 1
  }
  if (count < 3) {
    callback(new Error('须大小写字母数字特殊字符三种组合'))
    return
  }
  let regChn = /[\u4e00-\u9fa5]+/
  if (regChn.test(value)) {
    callback(new Error('不能填写中文'))
    return
  }
  callback()
}
let identityNumberValid = function (code) {
  let city = {
    11: '北京',
    12: '天津',
    13: '河北',
    14: '山西',
    15: '内蒙古',
    21: '辽宁',
    22: '吉林',
    23: '黑龙江',
    31: '上海',
    32: '江苏',
    33: '浙江',
    34: '安徽',
    35: '福建',
    36: '江西',
    37: '山东',
    41: '河南',
    42: '湖北',
    43: '湖南',
    44: '广东',
    45: '广西',
    46: '海南',
    50: '重庆',
    51: '四川',
    52: '贵州',
    53: '云南',
    54: '西藏',
    61: '陕西',
    62: '甘肃',
    63: '青海',
    64: '宁夏',
    65: '新疆',
    71: '台湾',
    81: '香港',
    82: '澳门',
    91: '国外 '
  }
  let tip = ''
  let pass = true

  if (!code || !/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[12])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i.test(code)) {
    tip = '身份证号格式错误'
    pass = false
  } else if (!city[code.substr(0, 2)]) {
    tip = '地址编码错误'
    pass = false
  } else {
    // 18位身份证需要验证最后一位校验位
    if (code.length === 18) {
      // ∑(ai×Wi)(mod 11)
      // 加权因子
      let factor = [ 7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2 ]
      // 校验位
      let parity = [ 1, 0, 'X', 9, 8, 7, 6, 5, 4, 3, 2 ]
      let sum = 0
      let ai = 0
      let wi = 0
      for (let i = 0; i < 17; i++) {
        ai = code[i]
        wi = factor[i]
        sum += ai * wi
      }
      let last = parity[sum % 11] + ''
      if (last !== code[17]) {
        tip = '校验位错误'
        pass = false
      }
    }
  }
  return {
    pass: pass,
    message: tip
  }
}
let validateIdentityNumber = function (rule, value, callback) {
  let result = identityNumberValid(value)
  if (result.pass) {
    callback()
  } else {
    callback(new Error(result.message))
  }
}

let handleAddressItemChange = function (val, options) {
  if (val.length === 1) {
    myAjax({
      url: '/region/get_cities',
      data: {parentCode: val[0]},
      success: function (result) {
        options.forEach(function (v, i) {
          if (val[0] === v.value) {
            v.children = result.data
          }
        })
      }
    })
  } else if (val.length === 2) {
    myAjax({
      url: '/region/get_regions',
      data: {parentCode: val[1]},
      success: function (result) {
        options.forEach(function (v, i) {
          if (val[0] === v.value) {
            v.children.forEach(function (vv, ii) {
              if (val[1] === vv.value) {
                vv.children = result.data
              }
            })
          }
        })
      }
    })
  }
}

let setDefaultEmptyValueForObject = function (obj) {
  Object.keys(obj).forEach(function (key) {
    if (obj[key] === null || obj[key] === '') {
      obj[key] = '-'
    }
  })
}

let validateBlank = function (rule, value, callback) {
  if (value === '' || value === null || value === undefined) {
    callback()
    return
  }
  if (value.match(/^[\s]+.*$/) || value.match(/^.*?[\s]+$/)) {
    callback(new Error('数据前后不能有空格或空行'))
  } else {
    callback()
  }
}

let getBrowerInfo = function () {
  return {
    versions: (function () {
      let u = navigator.userAgent
      return {// 移动终端浏览器版本信息
        trident: u.indexOf('Trident') > -1, // IE内核
        presto: u.indexOf('Presto') > -1, // opera内核
        webKit: u.indexOf('AppleWebKit') > -1, // 苹果、谷歌内核
        gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') === -1, // 火狐内核
        mobile: !!u.match(/AppleWebKit.*Mobile.*/), // 是否为移动终端
        ios: !!u.match(/(i[^;]+;( U;))? CPU.+Mac OS X/), // ios终端
        android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, // android终端或者uc浏览器
        iPhone: u.indexOf('iPhone') > -1, // 是否为iPhone或者QQHD浏览器
        iPad: u.indexOf('iPad') > -1, // 是否iPad
        webApp: u.indexOf('Safari') === -1 // 是否web应该程序，没有头部与底部
      }
    }()),
    language: (navigator.browserLanguage || navigator.language).toLowerCase()
  }
}
let getQueryString = function () {
  let search = window.location.search
  let params = null
  if (search) {
    search = decodeURIComponent(search.substring(3))
    try {
      params = JSON.parse(decryptAES(search)).data
    } catch (error) {
      global.$message.error('参数解析失败')
      global.$router.push({path: `/`})
    }
  }
  return params
}
/*
防抖动函数
返回值为一个匿名函数
fn：实际业务操作函数
delay：延迟时间（毫秒）
immediate：是否立即执行（true/false）
 */
let debounce = function (fn, delay, immediate) {
  let timer = null
  return function () {
    let context = this
    let args = arguments
    if (timer) clearTimeout(timer)
    if (immediate) {
      let doNow = !timer
      timer = setTimeout(function () {
        timer = null
      }, delay)
      if (doNow) {
        fn.apply(context, args)
      }
    } else {
      timer = setTimeout(function () {
        fn.apply(context, args)
      }, delay)
    }
  }
}
/*
节流阀函数（有多种写法，这是其中一种）
返回值为一个匿名函数
fn：实际业务操作函数
delay：延迟时间（毫秒）
 */
let throttle = function (fn, delay) {
  let prev = Date.now()
  return function () {
    let context = this
    let args = arguments
    let now = Date.now()
    if (now - prev >= delay) {
      fn.apply(context, args)
      prev = Date.now()
    }
  }
}
let clearLoginData = function () {
  sessionStorage.clear()
  localStorage.clear()
  setCookie('token', '', -1)
}

let getPlaintext = function (type, status) {
  let plaintext = ''
  if (type === 'account_status') {
    if (status === 0) {
      plaintext = '禁用'
    } else if (status === 1) {
      plaintext = '启用'
    }
  } else if (type === 'role_status') {
    if (status === 0) {
      plaintext = '禁用'
    } else if (status === 1) {
      plaintext = '启用'
    }
  } else if (type === 'document_resource_type') {
    if (status === 0) {
      plaintext = '合同'
    } else if (status === 1) {
      plaintext = '进展汇报'
    } else if (status === 2) {
      plaintext = '会议讨论'
    } else if (status === 3) {
      plaintext = '结题报告'
    } else if (status === 4) {
      plaintext = '结题资料'
    }
  } else if (type === 'plan_status') {
    if (status === 0) {
      plaintext = '待完成'
    } else if (status === 1) {
      plaintext = '进行中'
    } else if (status === 2) {
      plaintext = '已超时'
    } else if (status === 3) {
      plaintext = '已完成'
    }
  } else if (type === 'group_status') {
    if (status === 0) {
      plaintext = '未入组'
    } else if (status === 1) {
      plaintext = '已入组'
    }
  } else if (type === 'client_type') {
    if (status === 0) {
      plaintext = '客户'
    } else if (status === 1) {
      plaintext = '参与人'
    }
  }
  return plaintext
}

export default {
  myAjax: myAjax,
  encryptAES: encryptAES,
  decryptAES: decryptAES,
  setLocalInfo: setLocalInfo,
  getLocalInfo: getLocalInfo,
  removeLocalInfo: removeLocalInfo,
  setSessionInfo: setSessionInfo,
  getSessionInfo: getSessionInfo,
  removeSessionInfo: removeSessionInfo,
  getCookie: getCookie,
  setCookie: setCookie,
  getMD5String: getMD5String,
  validatePhone: validatePhone,
  validateEmail: validateEmail,
  phoneOrEmail: phoneOrEmail,
  validatePhoneEmail: validatePhoneEmail,
  validatePassword: validatePassword,
  validateIdentityNumber: validateIdentityNumber,
  handleAddressItemChange: handleAddressItemChange,
  setDefaultEmptyValueForObject: setDefaultEmptyValueForObject,
  clearLoginData: clearLoginData,
  validateBlank: validateBlank,
  getPlaintext: getPlaintext,
  getBrowerInfo: getBrowerInfo,
  getQueryString: getQueryString,
  debounce: debounce,
  throttle: throttle
}
