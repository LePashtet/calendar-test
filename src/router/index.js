import Vue from "vue";
import VueRouter from "vue-router";
const Home = () => import("@/views/Home.vue");
const Calendar = () => import("@/views/Calendar.vue");

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/calendar",
    name: "Calendar",
    component: Calendar
  }
];

const router = new VueRouter({
  routes,
  history
});

export default router;
