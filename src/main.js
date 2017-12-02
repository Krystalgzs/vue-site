// 1.0 导入vue.js  <script src="vue.js">
// import vue from 'vue'
// var vue  = require('vue');  //查找node_modules中的vue这个包
import Vue from 'vue';

// 2.0 导入app.vue组件对象
import App from './App.vue';   //当前目录下面查找app.vue这个组件

// 3.0 导入vue-router这个路由模块进行整个系统的路由控制
// 3.0.1 导入vue-router这个包
import VueRouter from 'vue-router';

// 3.0.0 将VueRouter对象通过Vue.use()使用一下
Vue.use(VueRouter);

// 3.0.2 导入组件对象
import layout from './components/layout.vue';
import goodslist from './components/goods/goodslist.vue';
import goodsinfo from './components/goods/goodsinfo.vue';
import car from './components/goods/car.vue';
import shopping from "./components/goods/shopping.vue";
import pay from "./components/goods/pay.vue";
import login from "./components/account/login.vue";

import payamount from "./components/pay/payamount.vue";
import paysuccess from "./components/pay/paysuccess.vue";
import vipcenter from "./components/vip/vipcenter.vue";
import myorders from "./components/vip/myorders.vue";
import orderinfo from "./components/vip/orderinfo.vue";
// 3.0.2 实例化对象并且定义路由规则
var router = new VueRouter({
    routes:[
        // 默认跳转的路由规则
        {name:'default',path:'/',redirect:'/site/goodslist'},
         // 由于payamount.vue是被手机打开的，所以不需要头部导航,所以路由规则注册在此处
        { name: 'payamount', path: '/payamount/:orderid', component: payamount },
        // 不需要头部导航
        { name: 'paysuccess', path: '/paysuccess', component: paysuccess },
        // 布局
        {name:'layout',path:'/site',component:layout,
        children:[
            {name:'login',path:'login',component:login,meta:{nosave:true}},
            {name:'goodslist',path:'goodslist',component:goodslist},
            {name:'goodsinfo',path:'goodsinfo/:id',component:goodsinfo},
            {name:"car",path:"car",component:car},
            {name:"shopping",path:"shopping/:ids",component:shopping,meta:{checklogin:true}},
            {name:"pay",path:"pay/:orderid",component:pay,meta:{checklogin:true}},
            {name:"pcpaysuccess",path:"pcpaysuccess",component:paysuccess},
            {name:"vipcenter",path:"vipcenter",component:vipcenter,meta:{checklogin:true}},
            {name:"myorders",path:"myorders",component:myorders,meta:{checklogin:true}},
            {name:"orderinfo",path:"orderinfo/:orderid",component:orderinfo,meta:{checklogin:true}},
        ]
    }
    ]
});
 
// 进行登录检查 使用全局守卫
router.beforeEach((to,from,next)=>{
    // 1.0在localStorage中记录用户访问的最后的那个页面 排除登录页面
    if(to.meta.nosave != true){
        console.log(to.path);
        // 保存到当前路由对象中的path
        localStorage.setItem("currentpath",to.path);
    }
    // 2.0进行登录检查
    if(to.meta.checklogin){
        axios.get("/site/account/islogin").then(res=>{
            if(res.data.code=="logined"){
                // 表示已经登录了 直接跳转到目标页面
                next();
            }else{
                // 表示还没有登录 则跳转到登录页面
                router.push({name:'login'});
            }
        })
    }else{
        next();
    }
})


// 4.0 导入vue的一个组件库:element-ui
import elementUI from 'element-ui';
// 导入自己编写的全局样式  
import '../statics/site/css/style.css';
// 绑定到vue中
Vue.use(elementUI);

// 使用iview中的affix组件
import { Affix } from 'iview';
Vue.component('Affix', Affix);

// 导入默认样式(由于咱们自己修改了样式所以要替换默认样式)
import '../statics/elementuiCss/index.css';
// 5.0导入axios
import axios from 'axios';
// 设定axios的默认请求域名 
// axios.defaults.baseURL = 'http://192.168.84.200';
// http://127.0.0.1:8899/admin/goods/getlist?pageIndex=1&pageSize=12&searchvalue=
axios.defaults.baseURL = 'http://127.0.0.1:8899';

// 配置axios在请求数据服务接口的时候 允许带上cookie(凭证)
axios.defaults.withCredentials = true;

// 将axios对象绑定到Vue的原型属性$ajax上
Vue.prototype.$ajax = axios;

Vue.filter("datafmt",(input,hms)=>{
    var date = new Date();
    var y = date.getFullYear();
    var m = date.getMonth();
    var d = date.getDate();
    var hh = date.getHours();
    var mm = date.getMinutes();
    var ss = date.getSeconds();
    if(hms=="YYYY-MM-DD HH:mm:ss"){
        return y + "-" + m + "-" + d + " " + hh + ":" + mm + ":" + ss;
    }else{
        return y + "-" + m + "-" + d;
    }
})

import vuex from "vuex";
import {setItem,getItem} from "./components/kits/localStorageHelper.js";
Vue.use(vuex);

// 定义vuex中的四个核心对象
// 1.0 定义需要全局保存的属性
var state = {
    buycount : 0,
}

// 2.0这个对象中定义的方法要通过actions中的方法触发
var mutations = {
    // 参数state：代表的是上面定义好的state对象
    // 参数parms:就是从程序员在调用的时候传入的
    changeCount(state,goodslist){
        // 修改state中的buyCount这个属性的值
        state.buycount += goodslist.count;

        // 将这个值存储在localStorage中
        setItem(goodslist);
    }
}
// 3.0actions在外部可以通过编写 this.$store.dispatch('action定义好的方法名称',传入参数)
var actions = {
    changeCount({commit},goodslist){
        commit("changeCount",goodslist);
    }
}
// 4.0对state中的某个属性进行封装处理
var getters = {
    // 当state.buyCount的值>0的话 直接返回
    getBuyCount(state){
        if(state.buycount>0){
            return state.buycount;
        }else{
            // 否则从localStorage中统计出总数据返回
            var obj = getItem();
            var tCount = 0;
            for(var key in obj){
                tCount += obj[key];
            }
            state.buycount = tCount;
            return tCount;
        }
    }
}

// 将上述四个对象利用 new vuex,Store()进行实例化
var store = new vuex.Store({
    state,mutations,actions,getters
})



// 3.0 实例化vue对象
new Vue({
    el:'#app',
    router,  //绑定路由对象使它生效
    store,
    // render:function(create){create(App)}
    // 将app组件编译将这个组件中的内容填充到 el:指向的app这个div中
    render:create=>create(App)
});