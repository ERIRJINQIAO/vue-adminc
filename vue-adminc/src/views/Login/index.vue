<template>
  <div id="login">
    <div class="login-wrap">
      <ul class="menu-tab">
        <li
          v-for="item in menuTab"
          :key="item.id"
          :class="{'current':item.current}"
          @click="toggleMenu(item)"
        >{{ item.txt }}</li>
      </ul>
      <!-- form表单开始 -->
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="loginForm"
        class="login-form"
        size="mini"
      >
        <el-form-item prop="username" class="item-form">
          <label>邮箱</label>
          <el-input type="text" v-model="ruleForm.username" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item prop="password" class="item-form">
          <label>密码</label>
          <el-input
            type="text"
            v-model="ruleForm.password"
            autocomplete="off"
            minlength="6"
            maxlength="16"
          ></el-input>
        </el-form-item>

        <el-form-item prop="passwords" class="item-form" v-show="model === 'register'">
          <label>重复密码</label>
          <el-input
            type="text"
            v-model="ruleForm.passwords"
            autocomplete="off"
            minlength="6"
            maxlength="16"
          ></el-input>
        </el-form-item>

        <el-form-item prop="code" class="item-form">
          <label>验证码</label>
          <el-row :gutter="10">
            <el-col :span="15">
              <el-input v-model="ruleForm.code"></el-input>
            </el-col>
            <el-col :span="9">
              <el-button
                type="success"
                class="block"
                @click="getSums()"
                :disabled="codeButtonStatus.status"
              >{{ codeButtonStatus.text }}</el-button>
            </el-col>
          </el-row>
        </el-form-item>

        <el-form-item>
          <el-button
            type="danger"
            @click="submitForm('loginForm')"
            class="login-btn block"
            :disabled="loginButtonStatus"
          >{{ model === "login" ? "登录" : "注册" }}</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import sha1 from "js-sha1";
import { Message } from "element-ui";
import { GetSms, Register, Login } from "@/api/login";
import { reactive, ref, onMounted, root } from "@vue/composition-api";
import {
  stripscript,
  validateMail,
  validatePass,
  validateVCode
} from "@/utils/validate.js";
export default {
  name: "login",
  // setup(props, context) {
  /**
     * attrs: (...) this.$attrs
      emit: (...) this.$emit
      listeners: (...) this.$listeners
      parent: (...) this.$parent
      refs: (...) this.$refs
      root: (...) this
     */
  setup(props, { refs, root }) {
    //验证用户名
    let validateUsername = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入用户名"));
      } else if (validateMail(value)) {
        callback(new Error("用户名格式错误"));
      } else {
        callback();
      }
    };
    //验证密码
    let validatePassword = (rule, value, callback) => {
      ruleForm.password = stripscript(value);
      value = ruleForm.password;
      if (value === "") {
        callback(new Error("请输入密码"));
      } else if (validatePass(value)) {
        callback(new Error("密码长度为6-16位数字或者字母"));
      } else {
        callback();
      }
    };
    //验证重复密码
    let validatePasswords = (rule, value, callback) => {
      //如果被隐藏，直接默认可以提交
      if (model.value == "login") {
        callback();
      }
      ruleForm.passwords = stripscript(value);
      value = ruleForm.passwords;
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value != ruleForm.password) {
        callback(new Error("两次输入密码不一致"));
      } else {
        callback();
      }
    };

    //验证验证码
    let validateCode = (rule, value, callback) => {
      if (!value) {
        callback(new Error("验证码不能为空"));
      } else if (validateVCode(value)) {
        callback(new Error("验证码输入错误"));
      } else {
        callback();
      }
    };

    /*******************************************************************************************
     * 声明数据
     */
    //这里放置data数据，生命周期，自定义函数
    const menuTab = reactive([
      { txt: "登录", current: true, type: "login" },
      { txt: "注册", current: false, type: "register" }
    ]);
    //模块值 基础类型 取值model.value
    const model = ref("login");
    //登录按钮状态
    const loginButtonStatus = ref(true);
    //验证码的按钮状态
    const codeButtonStatus = reactive({
      status: false,
      text: "获取验证码"
    });
    //定义定时器
    const timer = ref(null);

    //表单绑定数据
    const ruleForm = reactive({
      username: "",
      password: "",
      passwords: "",
      code: ""
    });

    //表单的验证
    const rules = reactive({
      username: [{ validator: validateUsername, trigger: "blur" }],
      password: [{ validator: validatePassword, trigger: "blur" }],
      passwords: [{ validator: validatePasswords, trigger: "blur" }],
      code: [{ validator: validateCode, trigger: "blur" }]
    });
    /************************************************************************************************************************
     * 声明函数
     */
    const toggleMenu = data => {
      menuTab.forEach(elem => {
        return (elem.current = false);
      });
      data.current = true;
      model.value = data.type;
      reserFormData();
      clearcountDown();
    };
    //重置表单
    const reserFormData = () => {
      //this.$refs[formName].resetFields(); //2.0写法
      refs.loginForm.resetFields();
    };
    //跟新按钮的状态
    const updateButtonStatus = params => {
      codeButtonStatus.status = params.status;
      codeButtonStatus.text = params.text;
    };
    /**
     * 获取验证码
     */
    const getSums = () => {
      //验证邮箱不能为空
      if (ruleForm.username == "") {
        root.$message.error("邮箱不能为空");
        return false;
      }
      //验证邮箱格式
      if (validateMail(ruleForm.username)) {
        root.$message.error("邮箱格式有误，请重新填写");
        return false;
      }
      //请求接口，验证验证码
      let requestData = {
        username: ruleForm.username,
        module: model.value
      };
      //修改获取验证码按钮状态
      updateButtonStatus({
        status: true,
        text: "发送中"
      });
      GetSms(requestData)
        .then(response => {
          let data = response.data;
          root.$message({
            message: data.message,
            type: "success"
          });
          //启用登录注册按钮
          loginButtonStatus.value = false;
          //调用倒定时
          countDown(60);
        })
        .catch(error => {
          console.log(error);
        });
    };
    /**
     * 提交表单
     */
    const submitForm = formName => {
      refs[formName].validate(valid => {
        if (valid) {
          //表单验证成功
          model.value === "login" ? login() : register();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    };
    /**
     * 登录
     */
    const login = () => {
      let requestData = {
        username: ruleForm.username,
        password: sha1(ruleForm.password),
        code: ruleForm.code
      };
      Login(requestData)
        .then(response => {
          let data = response.data;
          root.$message({
            message: data.message,
            type: "success"
          });
          //页面跳转
          root.$router.push({
            name: "Console"
          })
        })
        .catch(error => {});
    };

    /**
     * 注册
     */
    const register = () => {
      let requestData = {
        username: ruleForm.username,
        password: sha1(ruleForm.password),
        code: ruleForm.code,
        module: "register"
      };
      Register(requestData)
        .then(response => {
          console.log(response);
          let data = response.data;
          root.$message({
            message: data.message,
            type: "success"
          });
          //注册成功切换状态，初始化按钮
          toggleMenu(menuTab[0]);
          clearcountDown();
        })
        .catch(error => {});
    };
    /**
     * 倒计时
     */
    const countDown = number => {
      //判断定时器是否存在，存在就清除
      if (timer.value) {
        clearIntervla(timer.value);
      }
      let time = number;
      timer.value = setInterval(() => {
        time--;
        if (time === 0) {
          clearInterval(timer.value);
          updateButtonStatus({
            status: false,
            text: "再次获取"
          });
        } else {
          codeButtonStatus.text = `倒计时${time}秒`; //es5 '倒计时'+time+'秒'
        }
      }, 1000);
    };

    /**
     * 清理倒计时
     */

    const clearcountDown = () => {
      updateButtonStatus({
        status: false,
        text: "获取验证码"
      });
      //清理定时器
      clearInterval(timer.value);
    };
    /**
     * 生命周期
     */
    //挂载完成后
    onMounted(() => {});
    return {
      menuTab,
      model,
      loginButtonStatus,
      codeButtonStatus,
      ruleForm,
      rules,
      toggleMenu,
      submitForm,
      getSums,
      timer
    };
  }
};
</script>

<style lang="scss" scoped>
#login {
  height: 100vh;
  background-color: #344a5f;
}
.login-wrap {
  width: 330px;
  margin: auto;
  .menu-tab {
    text-align: center;
    li {
      width: 88px;
      display: inline-block;
      line-height: 36px;
      font-size: 14px;
      color: #fff;
      border-radius: 2px;
      cursor: pointer;
    }
    .current {
      background-color: rgba(0, 0, 0, 0.1);
    }
  }
  .login-form {
    margin-top: 29px;
    label {
      display: block;
      margin-bottom: 3px;
      font-size: 14px;
      color: #fff;
    }
    .item-form {
      margin-bottom: 13px;
    }
    .block {
      width: 100%;
      display: block;
    }
    .login-btn {
      margin-top: 19px;
    }
  }
}
</style>
