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
                                <li class="active">
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
                    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                        <div class="cart-box">
                            <h2 class="slide-tit">
                                <span>1、收货地址</span>
                            </h2>
                            <form id="orderForm" name="orderForm" url="/tools/submit_ajax.ashx?action=order_save&amp;site_id=1">
                                <div class="form-box address-info">
                                    <dl class="form-group">
                                        <el-row>
                                            <el-col :span="10">
                                                <el-form-item label="收货人名称" prop="accept_name">
                                                    <el-input v-model="ruleForm.accept_name"></el-input>
                                                </el-form-item>
                                            </el-col>
                                        </el-row>
                                    </dl>
                                    <dl class="form-group">
                                        <el-row>
                                            <el-col :span="20">
                                                <el-form-item label="所属地区">
                                                    <v-distpicker @selected="onSelected"></v-distpicker>
                                                </el-form-item>
                                            </el-col>
                                        </el-row>
                                    </dl>
                                    <dl class="form-group">
                                        <el-row>
                                            <el-col :span="10">
                                                <el-form-item label="详细地址" prop="address">
                                                    <el-input v-model="ruleForm.address"></el-input>
                                                </el-form-item>
                                            </el-col>
                                        </el-row>
                                    </dl>
                                    <dl class="form-group">
                                        <el-row>
                                            <el-col :span="10">
                                                <el-form-item label="手机号码" prop="mobile">
                                                    <el-input v-model="ruleForm.mobile"></el-input>
                                                </el-form-item>
                                            </el-col>
                                        </el-row>
                                    </dl>
                                    <dl class="form-group">
                                        <el-row>
                                            <el-col :span="10">
                                                <el-form-item label="电子邮箱" prop="email">
                                                    <el-input v-model="ruleForm.email"></el-input>
                                                </el-form-item>
                                            </el-col>
                                        </el-row>
                                    </dl>
                                    <dl class="form-group">
                                        <el-row>
                                            <el-col :span="10">
                                                <el-form-item label="邮政编码" prop="post_code">
                                                    <el-input v-model="ruleForm.post_code"></el-input>
                                                </el-form-item>
                                            </el-col>
                                        </el-row>
                                    </dl>
                                </div>
                                <h2 class="slide-tit">
                                    <span>2、支付方式</span>
                                </h2>
                                <ul class="item-box clearfix">
                                    <!--取得一个DataTable-->
                                    <li>
                                        <el-radio label="6" class="radio" v-model="ruleForm.payment_id">在线支付</el-radio>
                                    </li>
                                </ul>
                                <h2 class="slide-tit">
                                    <span>3、配送方式</span>
                                </h2>
                                <ul class="item-box clearfix">
                                    <!--取得一个DataTable-->
                                    <li>
                                        <el-radio-group v-model="ruleForm.express_id" @change="expresschange">
                                            <el-radio label="1">顺丰(20)</el-radio>
                                            <el-radio label="2">圆通(10)</el-radio>
                                            <el-radio label="3">韵达(8)</el-radio>
                                        </el-radio-group>
                                    </li>
                                </ul>
                                <h2 class="slide-tit">
                                    <span>4、商品清单</span>
                                </h2>
                                <div class="line15"></div>
                                <table width="100%" border="0" align="center" cellpadding="8" cellspacing="0" class="cart-table">
                                    <tbody>
                                        <tr>
                                            <th colspan="2" align="left">商品信息</th>
                                            <th width="84" align="left">单价</th>
                                            <th width="84" align="center">购买数量</th>
                                            <th width="104" align="left">金额(元)</th>
                                        </tr>
                                        <tr v-for="(item,index) in buygoodslist" :key="item.id">
                                            <td width="68">
                                                <router-link class="shoppingimg" v-bind="{to:'/site/goodsinfo/'+item.id}">
                                                    <img :src="item.img_url" class="img">
                                                </router-link>
                                            </td>
                                            <td>
                                                <a target="_blank" href="javascript:void(0)">{{item.title}}</a>
                                            </td>
                                            <td>
                                                <span class="red">
                                                    ￥{{item.sell_price}}
                                                </span>
                                            </td>
                                            <td align="center">{{item.buycount}}</td>
                                            <td>
                                                <span class="red">
                                                    ￥{{item.sell_price * item.buycount }}
                                                </span>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <div class="line15"></div>
                                <h2 class="slide-tit">
                                    <span>5、结算信息</span>
                                </h2>
                                <div class="buy-foot clearfix">
                                    <div class="left-box">
                                        <dl>
                                            <el-form-item label="订单备注">
                                                <el-input type="textarea" v-model="ruleForm.message"></el-input>
                                            </el-form-item>
                                        </dl>
                                    </div>
                                    <div class="right-box">
                                        <p>
                                            商品
                                            <label class="price">{{buygoodslist.length}}</label> 件&nbsp;&nbsp;&nbsp;&nbsp; 商品金额：￥
                                            <label id="goodsAmount" class="price">{{goodsAmount}}</label> 元&nbsp;&nbsp;&nbsp;&nbsp;
                                        </p>
                                        <p>
                                            运费：￥
                                            <label id="expressFee" class="price">{{currentFree}}</label> 元
                                        </p>
                                        <p class="txt-box">
                                            应付总金额：￥
                                            <label id="totalAmount" class="price">{{goodsAmountEnd}}</label>
                                        </p>
                                        <p class="btn-box">
                                            <a class="btn button" href="/cart.html">返回购物车</a>
                                            <input id="btnSubmit" name="btnSubmit" type="button" @click="submitvalidate" value="确认提交" class="btn submit">
                                        </p>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </el-form>
                </div>
            </div>
        </div>
    </div>
    </div>
</template>
<script>
    import VDistpicker from 'v-distpicker';
    import { setItem, getItem } from "../kits/localStorageHelper.js";
    export default {
        components: { VDistpicker },
        computed:{
            goodsAmountEnd(){
                this.ruleForm.goodsAmount = this.currentFree + this.goodsAmount;
                return this.ruleForm.goodsAmount;
            }
        },
        data() {
            //form表单的自定义校验规则
            var checkPhone = (rule, value, callback) => {
                // 1.0 定义一个手机号码的正则表达式
                var reg = /^13[0-9]{9}|15[012356789][0-9]{8}|18[0256789][0-9]{8}|147[0-9]{8}$/;
                var regObj = new RegExp(reg);
                // 2.0利用value去匹配正则
                if (regObj.test(value) == false) {
                    callback(new Error("手机号码不合法"));
                } else {
                    callback();
                }
            };
            return {
                expressFee:{
                    "1":20,
                    "2":10,
                    "3":8
                },
                currentFree:20,
                goodsAmount:0, //没有加运费的商品金额
                gids: this.$route.params.ids,
                buygoodslist: [],
                ruleForm: {
                    "goodsAmount": 4099,
                    "expressMoment": 20,
                    "accept_name": "骁骁",
                    "area": {
                        "province": { "code": "140000", "value": "山西省" },
                        "city": { "code": "140100", "value": "太原市" },
                        "area": { "code": "140106", "value": "迎泽区" },
                    },
                    "address": "城区",
                    "mobile": "18667654355",
                    "email": "ivanyb@qq.com",
                    "post_code": "516000",
                    "payment_id": "6",
                    "express_id": "1",
                    "message": "4K,白色",
                    "goodsids": "97,102",
                    "cargoodsobj": { "97": 1, "102": 1, "103": 1 },
                },
                rules: {
                    accept_name: [
                        { required: true, message: '请输入收货人姓名', trigger: 'blur' },
                    ],
                    address: [
                        { required: true, message: '请输入收货人地址', trigger: 'blur' },
                    ],
                    mobile: [
                        // 自定义验证规则,指向checkPhone这个方法，而这个方法必须在data()的return之前定义好
                        { validator: checkPhone, trigger: 'blur' },
                    ],
                }
            }
        },
        methods: {
            onSelected(data) {
                console.log(data);
                // 得到下拉框的地区
                this.ruleForm.area = data;
            },
            getbuygoodslist() {
                var url = "/site/validate/order/getgoodslist/" + this.gids;
                this.$ajax.get(url).then(res => {
                    this.buygoodslist = res.data.message;

                    // 遍历this.buygoodslist去localStorage中同步商品的够买数量
                    var obj = getItem();
                    this.buygoodslist.forEach((item, index) => {
                        item.buycount = obj[item.id];
                        // console.log(obj[item.id]);
                        this.goodsAmount += (item.buycount * item.sell_price);
                        // console.log(this.goodsAmount);
                    });
                })
            },
            expresschange(valuechange){
                console.log(valuechange);
                this.currentFree = this.expressFee[valuechange];
                // 得到运费的价格
                this.ruleForm.expressMoment = this.currentFree;
            },
            submitvalidate(){
                this.$refs.ruleForm.validate((valid) => {
                    if (valid) {
                     this.submit();
                    } else {
                      console.log('提交失败!!');
                      return false;
                    }
                  });
            },
            submit(){
                // 补全goodsids和cargoodsobj
                this.ruleForm.goodsids = this.gids;
                // 2.0从localStorage中获取到的值赋值给cargoodsobj
                this.ruleForm.cargoodsobj = JSON.stringify(getItem());
                console.log(this.ruleForm);
                // 3.0执行下单操作
                var url = '/site/validate/order/setorder';
                this.$ajax.post(url,this.ruleForm).then(res=>{
                    if(res.data.status==1){
                        this.$message.error(res.data.message);
                        return;
                    }
                    this.$message({
                        type:"success",
                        message:"下单成功",
                        onClose:()=>{
                            // 跳转到支付页面
                            this.$router.push({name:"pay",params:{orderid:res.data.message.orderid}});
                        }
                    })
                })
            },
        },
        mounted() {
            this.getbuygoodslist();
        },

    }
</script>
<style>
    .shoppingimg {
        position: relative;
    }

    .cart-box .cart-table td .img {
        position: absolute;
        top: 0;
        height: 43px !important;
    }
</style>