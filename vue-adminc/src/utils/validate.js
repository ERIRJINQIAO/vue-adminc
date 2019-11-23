/**
 * 过滤特殊字符
 */
export function stripscript(s) {
  var pattern = new RegExp(
    "[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）&;—|{ }【】‘；：”“'。，、？]"
  );
  var rs = "";
  for (var i = 0; i < s.length; i++) {
    rs = rs + s.substr(i, 1).replace(pattern, "");
  }
  return rs;
}

/**
 * 验证邮箱
 */
export function validateMail(value) {
  // eslint-disable-next-line no-useless-escape
  let reg = /^[A-Za-z\d]+[A-Za-z\d\-\.]*@([A-Za-z\d]+[A-Za-z\d\-]*\.)+[A-Za-z]{2,4}$/;
  return reg.test(value) ? false : true;
}

/**
 * 验证密码
 */
export function validatePass(value) {
  let reg = /^[\w_-]{6,16}$/;
  return reg.test(value) ? false : true;
}

/**
 * 验证验证码
 */
export function validateVCode(value) {
  let reg = /^[a-z0-9]{1,6}$/;
  return reg.test(value) ? false : true;
}
