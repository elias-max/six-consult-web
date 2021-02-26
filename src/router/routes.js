
const routes = [
  {
    path: '/',
    component: () => import('layouts/BaseLayout.vue'),
    children: [
      { path: '', component: () => import('components/Login.vue') }
    ]
  },
  {
    path: '/main',
    component: () => import('layouts/MainLayout.vue'),
    meta: { requiresAuth: true },
    children: [
      { path: '', component: () => import('pages/Index.vue') },
      { path: 'profiles', component: () => import('components/Profile/List.vue') },
      { path: 'users', component: () => import('components/User/List.vue') },
      { path: 'customers', component: () => import('components/Customer/List.vue') }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
