import Vue from "vue";
import VueRouter from "vue-router";
import firebase from "firebase";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: () => import("../views/Home.vue"),
    
  },
  {
    path: "/register",
    name: "register",
    component: () => import("../components/Register.vue"),
    
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../components/Login.vue"),
    
  },
  {
    path: "/forgot-password",
    name: "forgot-password",
    component: () => import("../components/ForgotPassword.vue"),
    
  },
  {
    path: "/dashboard",
    name: "dashboard",
    component: () => import("../components/Dashboard.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/news",
    name: "news",
    component: () => import("../components/News.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/rssfeeds",
    name: "rssfeeds",
    component: () => import("../components/FeedComponent.vue"),
    meta: { requiresAuth: true },
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

// Nav Guard
router.beforeEach((to, from, next) => {
  const currentUser = firebase.auth().currentUser;
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);

  if (requiresAuth && !currentUser) {
    const loginpath = window.location.pathname;   
    next({ name: 'login', query: { from: loginpath } });
  } else if (!requiresAuth && currentUser) {
    next("/dashboard");
  } else {
    next();
  }
});

export default router;
