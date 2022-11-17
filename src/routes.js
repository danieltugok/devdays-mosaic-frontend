export default [
  {
    path: "",
    name: "SiteChoose",
    component: () =>
      import(/* webpackChunkName: "auth" */ "@/pages/ChooseSite.vue"),
    meta: {
      requiresAuth: false,
    },
  },
  {
    path: '',
    component: () => import('@/layouts/MainLayout.vue'),
    meta: {
      requiresAuth: false,
  },
    children: [
      {
        path: "admin",
        name: "Admin",
        component: () =>
          import(/* webpackChunkName: "auth" */ "@/pages/AdminSite.vue"),
        meta: {
          requiresAuth: false,
        },
      },     
      {
        path: "fan",
        name: "Fan",
        component: () =>
          import(/* webpackChunkName: "auth" */ "@/pages/FanSite.vue"),
        meta: {
          requiresAuth: false,
        },
      },     
    ],    
  }, 
];