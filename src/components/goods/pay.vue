<template>
    <div class="tmpl">
        {{this.$route.params.orderid}}
        <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <a href="/index.html">首页</a> &gt;
                <a href="javascript:;">支付中心</a>
            </div>
        </div>

        <div class="section">
            <div class="wrapper">
                <div class="bg-wrap">
                    <div class="nav-tit pay">
                        <a href="javascript:;" class="selected">支付中心</a>
                    </div>
                    <div class="form-box payment">
                        <div class="el-row">
                            <div class="el-col el-col-16">
                                <div class="el-row">
                                    <div class="el-col el-col-12">
                                        <dl class="form-group">
                                            <dt>订 单 号：</dt>
                                            <dd>{{getinfo.order_no}}</dd>
                                        </dl>
                                    </div>
                                    <div class="el-col el-col-12">
                                        <dl class="form-group">
                                            <dt>收货人姓名：</dt>
                                            <dd>{{getinfo.accept_name}}</dd>
                                        </dl>
                                    </div>
                                </div>
                                <div class="el-row">
                                    <div class="el-col el-col-12">
                                        <dl class="form-group">
                                            <dt>送货地址：</dt>
                                            <dd>{{getinfo.area}}
                                            </dd>
                                        </dl>
                                    </div>
                                    <div class="el-col el-col-12">
                                        <dl class="form-group">
                                            <dt>手机号码：</dt>
                                            <dd>{{getinfo.mobile}}</dd>
                                        </dl>
                                    </div>
                                </div>
                                <div class="el-row">
                                    <div class="el-col el-col-12">
                                        <dl class="form-group">
                                            <dt>支付金额：</dt>
                                            <dd>{{getinfo.order_amount}} 元</dd>
                                        </dl>
                                    </div>
                                    <div class="el-col el-col-12">
                                        <dl class="form-group">
                                            <dt>支付方式：</dt>
                                            <dd>在线支付</dd>
                                        </dl>
                                    </div>
                                </div>
                                <div class="message">
                                    <span>备&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;注：</span>
                                    <span>{{getinfo.message}}</span>
                                </div>
                            </div>
                            <div class="el-col el-col-8">
                                <div id="container">
                                    <div id="container">
                                        <canvas width="400" height="400"></canvas>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
    </div>
</template>
<script>
    import "../../../statics/jqplugins/qr/jqueryqr.js";
    export default {
        data() {
            return {
                getid: this.$route.params.orderid,
                getinfo: {},
                intervalObj: null,
            }
        },
        methods: {
            getpayinfo() {
                var url = "/site/validate/order/getorder/" + this.getid;
                this.$ajax.get(url).then(res => {
                    this.getinfo = res.data.message[0];
                    // console.log(this.getinfo);
                })
            }
        },
        mounted() {
            this.getpayinfo();

            //文字logo
            $("#container").erweima({
                label: 'TOP'
            });
            this.intervalObj = setInterval(() => {
                // console.log(this.getid);
                var url = "/site/validate/order/getorderdetial/" + this.getid;
                this.$ajax.get(url).then(res => {
                    // console.log(res.data.message.orderinfo.status);
                    if (res.data.message.orderinfo.status == 2) {
                        // 关闭定时器
                        if (this.intervalObj) {
                            clearInterval(this.intervalObj);
                        }
                        // 如果判断为2的时候 表示已经支付成功了 跳转到支付成功的页面
                        this.$router.push({ name: "pcpaysuccess" });
                    }
                })
            }, 3000);
            // 表示当准备组件的时候被触发执行 (离开这个组件页面的时候会被触发)
        },
        beforeDestroy() {
            clearInterval(this.intervalObj);
        }
    }
</script>
<style>
</style>