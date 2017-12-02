<template>
    <div class="tmpl">
        <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <a href="/index.html">首页</a> &gt;
                <a href="/cart.html">购物车</a>
            </div>
        </div>

        <div class="section">
            <div class="wrapper">
                <div class="bg-wrap">
                    <!--购物车头部-->
                    <div class="cart-head clearfix">
                        <h2>
                            <i class="iconfont icon-cart"></i>我的购物车</h2>
                        <div class="cart-setp">
                            <ul>
                                <li class="first active">
                                    <div class="progress">
                                        <span>1</span>
                                        放进购物车
                                    </div>
                                </li>
                                <li>
                                    <div class="progress">
                                        <span>2</span>
                                        填写订单信息
                                    </div>
                                </li>
                                <li class="last">
                                    <div class="progress">
                                        <span>3</span>
                                        支付/确认订单
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <!--购物车头部-->
                    {{values}}
                    <!--商品列表-->
                    <div class="cart-box">
                        <input id="jsondata" name="jsondata" type="hidden">
                        <table width="100%" align="center" class="cart-table" border="0" cellspacing="0" cellpadding="8">
                            <tbody>
                                <tr>
                                    <th width="48" align="center">
                                        <el-button type='success' @click="selectAll">{{issecetedTxt}}</el-button>
                                    </th>
                                    <th align="left" colspan="2">商品信息</th>
                                    <th width="84" align="left">单价</th>
                                    <th width="104" align="center">数量</th>
                                    <th width="104" align="left">金额(元)</th>
                                    <th width="54" align="center">操作</th>
                                </tr>
                                <tr v-if="goodslist.length<=0">
                                    <td colspan="10">
                                        <div class="msg-tips">
                                            <div class="icon warning">
                                                <i class="iconfont icon-tip"></i>
                                            </div>
                                            <div class="info">
                                                <strong>购物车没有商品！</strong>
                                                <p>您的购物车为空，
                                                    <a href="/index.html">马上去购物</a>吧！</p>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                                <tr v-for="(item,index) in goodslist" :key="item.id">
                                    <th width="48" align="center">
                                        <el-switch v-model="values[index]" on-text="已选" off-text="未选" on-color="#13ce66" off-color="#ff4949">
                                        </el-switch>
                                    </th>
                                    <th align="left" colspan="2">
                                        <img width="50" height="50" :src="item.img_url" alt=""> {{item.title}}
                                    </th>
                                    <th width="84" align="left">{{item.sell_price}}</th>
                                    <th width="200" align="center">
                                        <!-- 使用自己封装的组件 -->
                                        <inputnumber v-bind:obj="{gid:item.id,count:item.buycount}" @msg="getinputnumber">
                                        </inputnumber>
                                    </th>
                                    <th width="104" align="left">{{item.sell_price * item.buycount}}</th>
                                    <th width="54" align="center">
                                        <a href="javascript:void(0)" @click="deleteData(item.id)">
                                            <el-button>删除</el-button>
                                        </a>
                                    </th>
                                </tr>
                                <tr>
                                    <th align="right" colspan="8">
                                        已选择商品
                                        <b class="red" id="totalQuantity">{{selectCount}}</b> 件 &nbsp;&nbsp;&nbsp; 商品总金额（不含运费）：
                                        <span class="red">￥</span>
                                        <b class="red" id="totalAmount">{{getAmountMoney}}</b>元
                                    </th>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <!--/商品列表-->
                    <!--购物车底部-->
                    <div class="cart-foot clearfix">
                        <div class="right-box">
                            <button class="button" onclick="javascript:location.href='/index.html';">继续购物</button>
                            <button class="submit" @click="shopping">立即结算</button>
                        </div>
                    </div>
                    <!--购物车底部-->
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import { getItem, setItemReplace, delItem } from "../kits/localStorageHelper.js";
    import inputnumber from "../subcom/inputnumer.vue";
    import { vm, KEY } from '../kits/buy.js'
    export default {
        data() {
            return {
                goodslist: [],
                values: [],// 控制每行数据的选择状态的
                issecetedTxt: "全选",
                isseceted: false,
                selectCount: 0,
            }
        },
        // 注册子组件
        components: {
            inputnumber
        },
        methods: {
            getgoodslist() {
                // 1.0从localStorage中获取用户购买的商品的id
                var goodsobj = getItem();
                // console.log(goodsobj);
                var idArr = [];
                for (var key in goodsobj) {
                    idArr.push(key);
                }
                var ids = idArr.join(",");
                // console.log(ids);

                var url = "/site/comment/getshopcargoods/" + ids;
                this.$ajax.get(url).then(res => {
                    res.data.message.forEach((item, index) => {
                        // console.log(1111);
                        item.buycount = goodsobj[item.id];
                        // 初始化每一个按钮为false未选
                        this.values[index] = false;
                    })
                    this.goodslist = res.data.message;
                })
            },
            // 全选/反选操作
            selectAll() {
                this.isseceted = !this.isseceted;
                if (this.isseceted) {
                    this.issecetedTxt = "反选";
                } else {
                    this.issecetedTxt = "全选";
                }
                for (var i = 0; i < this.values.length; i++) {
                    this.values[i] = this.isseceted;
                }
                // 下面两段代码就是用来爱触发vue中视图刷新的
                // this.values.push(false);
                // this.value.pop();
            },
            // 接受子组件传递回来的值
            getinputnumber(obj) {
                var index = this.goodslist.findIndex((item) => {
                    return item.id == obj.gid;
                });
                // 根据这个索引修改这个对象中的buycount
                this.goodslist[index].buycount = obj.count;
                // console.log(obj);
                // 修改localStorage中当前商品的够买数量
                setItemReplace(obj);
                var buyObj = getItem();
                var valuess = 0;
                for (var key in buyObj) {
                    valuess += buyObj[key];
                }
                // console.log(valuess)
                // localStorage.setItem('buyTotalCount',valuess);
                vm.$emit(KEY, valuess);
            },
            // 删除数据
            deleteData(goodsid) {
                // 1根据传入的商品id从this.goodslist中查找出索引
                var index = this.goodslist.findIndex(item => item.id == goodsid);
                // 2 删除goodslist中当前索引的数据
                this.goodslist.splice(index, 1);
                // 3 删除this.value中当前索引的数据
                this.values.splice(index, 1);
                // 4 删除localStorage中的数据
                delItem(goodsid);
                // 5 触发vuex的changCount重新重置layout.vue上面购物车数量的更新
                // 使用vuex
                this.$store.dispatch("changeCount", {});

                // 不用vuex的话就要遍历两遍
                // var buyObj = getItem();
                // var valuess = 0;
                // for(var key in buyObj){
                //     valuess += buyObj[key];
                // }
                // console.log(buyObj)
                // console.log(valuess)
                // localStorage.setItem('buyTotalCount',valuess);
                // vm.$emit(KEY,valuess);
            },
            shopping() {
                // 1.0获取到car.vue中选择的商品id
                var goodsids = [];
                // 遍历values中的true所在的索引
                this.values.forEach((item, index) => {
                    if (item) {
                        goodsids.push(this.goodslist[index].id);
                    }
                })
                // 判断用户是否至少选择一种商品
                if (goodsids.length <= 0) {
                    this.$message.error("请至少选择一种商品");
                    return;
                }
                // 2.0跳转到shopping.vue组件同时将商品id传入
                this.$router.push({ name: "shopping", params: { ids: goodsids.join(",") } });
            }
        },
        mounted() {
            this.getgoodslist();
        },
        computed: {
            getAmountMoney() {
                // 计算出当前选中的商品总件数
                // 特点：计算属性所依赖的this.values数组中的值发生改变就会自动重新执行
                var trueArr = this.values.filter(item => item);
                this.selectCount = trueArr.length;
                // 计算出商品的总金额
                var totalMoney = 0;
                //  重新便利this.value中副哦呦为true的索引 然后相加
                this.values.forEach((item, index) => {
                    if (item) {
                        totalMoney += (this.goodslist[index].buycount * this.goodslist[index].sell_price);
                    }
                })
                return totalMoney;
            }
        }
    }
</script>
<style scope>
</style>