import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);

//引入布局组件
import Layout from "@/views/Layout/"; //此处index.vue 可以省略，但是必须确认有这个文件

const routes = [
  {
    path: "/",
    redirect: "login",
    hidden: true,
    meta: {
      name: "主页"
    }
  },
  {
    path: "/login",
    name: "Login",
    hidden: true,
    meta: {
      name: "登录"
    },
    component: () => import("../views/Login/index.vue")
  },
  {
    path: "/console",
    name: "Console",
    redirect: "index",
    meta: {
      name: "控制台"
    },
    component: Layout,
    children: [
      {
        path: "/index",
        name: "Index",
        meta: {
          name: "首页"
        },
        component: () => import("../views/Console/index.vue")
      }
    ]
  },
  /**
   * 信息列表
   */
  {
    path: "/info",
    name: "Info",
    meta: {
      name: "信息管理"
    },
    component: Layout,
    children: [
      {
        path: "/infoIndex",
        name: "index",
        meta: {
          name: "信息列表"
        },
        component: () => import("../views/Info/index.vue")
      },
      {
        path: "/infoCategory",
        name: "categoty",
        meta: {
          name: "信息分类"
        },
        component: () => import("../views/Info/categoty.vue")
      }
    ]
  },
  /**
   *用户管理
   */
  {
    path: "/user",
    name: "User",
    meta: {
      name: "用户管理"
    },
    component: Layout,
    children: [
      {
        path: "/userIndex",
        name: "UserIndex",
        meta: {
          name: "用户列表"
        },
        component: () => import("../views/User/index.vue")
      }
    ]
  }
];

const router = new VueRouter({
  routes
});

export default router;
