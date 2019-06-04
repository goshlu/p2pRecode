import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "Content",
      redirect: "/Home",
      component: () => import("@/components/Content"),
      children: [
        {
          path: "/Home",
          name: "Home",
          component: () => import("@/components/home"),
        }, 
        {
          path: "/PowerMa",
          name: "PowerMa",
          redirect: "/PowerMaBu",
          component: () => import("@/components/powerMa"),
          children:[
            {
              path: "/PowerMaBu",
              name: "PowerMaBu",
              component: () => import("@/components/powerMa/powerMaJueSe/PowerMaBu"),
            }
          ]
        }
      ],
    },
  ]
});
