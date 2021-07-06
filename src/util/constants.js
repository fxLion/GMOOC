// 这是一个全局变量
// 后台地址
let JS_CONTEXT = window.localStorage.getItem('PROTOCOL') + '://' +
  window.localStorage.getItem('IP') + ':' +
  window.localStorage.getItem('PORT') + '/' +
  window.localStorage.getItem('PROJECT')
// 是否开启AES加解密
let ENABLE_AES_CODE = false
let SUCCESS_CODE = 20000

export default {
  JS_CONTEXT: JS_CONTEXT,
  ENABLE_AES_CODE: ENABLE_AES_CODE,
  SUCCESS_CODE: SUCCESS_CODE
}
