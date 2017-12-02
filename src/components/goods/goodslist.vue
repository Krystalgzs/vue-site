<template>
    <div class="tmpl">
        <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <a href="/index.html">首页</a> &gt;
                <a href="/goods.html">购物商城</a>
            </div>
        </div>
        <div class="section">
            <div class="wrapper">
                <div class="wrap-box">
                    <!--类别菜单-->
                    <div class="left-220" style="margin:0;">
                        <div class="banner-nav">
                            <ul>
                                <!--此处声明下面可重复循环-->
                                <li v-for="item in topinfo.catelist" :key="item.id">
                                    <h3>
                                        <i class="iconfont icon-arrow-right"></i>
                                        <span v-text="item.title"></span>
                                        <p>
                                            <span v-for="subitem in item.subcates" :key="subitem.id">
                                                {{subitem.title}}
                                            </span>
                                        </p>
                                    </h3>
                                    <div class="item-box">
                                        <!--如有三级分类，此处可循环-->
                                        <dl>
                                            <dt>
                                                <a :href="'/goods/'+item.id+'.html'">{{item.title}}</a>
                                            </dt>
                                            <dd>
                                                <a v-for="subitem1 in item.subcates" :key="subitem1.id" :href="'/goods/'+subitem1.id+'.html'">
                                                    {{subitem1.title}}
                                                </a>
                                            </dd>
                                        </dl>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <!--/类别菜单-->

                    <!--幻灯片-->
                    <div class="left-705">
                        <div class="banner-img">
                            <div id="focus-box" class="focus-box">
                                <!--使用elementUI组件-->
                                <el-carousel :interval="5000" arrow="always">
                                    <el-carousel-item v-for="item in topinfo.sliderlist" :key="item.id">
                                     <router-link v-bind="{to:'/site/goodsinfo/'+item.id}">
                                        <img height="368" width="368" :src="item.img_url" alt="">
                                     </router-link>
                                        <h3>{{ item.title }}</h3>
                                    </el-carousel-item>
                                </el-carousel>
                            </div>
                        </div>
                    </div>
                    <!--/幻灯片-->

                    <!--推荐商品-->
                    <div class="left-220">
                        <ul class="side-img-list">
                            <li v-for="(item,index) in topinfo.toplist" :key="item.id">
                                <div class="img-box">
                                    <label>{{index+1}}</label>
                                    <img :src="item.img_url">
                                </div>
                                <div class="txt-box">
                                    <a href="/goods/show-98.html">{{item.title}}</a>
                                    <span>{{item.add_time|datafmt}}</span>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <!--/推荐商品-->
                </div>
            </div>
        </div>
        <div class="section" v-for="item in grouplist" :key="item.level1cateid">
            <!--子类 -->
            <div class="main-tit">
                <h2>{{item.catetitle}}</h2>
                <p>
                    <a v-for="subitem in item.level2catelist" :key="subitem.subcateid" :href="'/goods/'+subitem.subcateid+'.html'">
                        {{subitem.subcatetitle}}
                    </a>
                    <a href="/goods/40.html">更多
                        <i>+</i>
                    </a>
                </p>
            </div>
            <!--/子类-->
            <div class="wrapper clearfix">
                <div class="wrap-box">
                    <ul class="img-list">
                        <li v-for="dataList in item.datas">
                            <router-link v-bind="{to:'/site/goodsinfo/'+dataList.artID}">
                            <a :href="'/goods/show-'+dataList.artID+'.html'">
                                <div class="img-box">
                                    <img :src="dataList.img_url">
                                </div>
                                <div class="info">
                                    <h3>{{dataList.artTitle}}</h3>
                                    <p class="price">
                                        <b>¥{{dataList.sell_price}}</b>元</p>
                                    <p>
                                        <strong>库存 {{dataList.sell_price}}</strong>
                                        <span>市场价：
                                            <s>{{dataList.market_price}}</s>
                                        </span>
                                    </p>
                                </div>
                            </a>
                            </router-link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>

    </div>
</template>
<script>
    export default {
        data() {
            return {
                topinfo: {},
                grouplist: [],
            }
        },
        methods: {
            gettoplist() {
                var url = "/site/goods/gettopdata/goods";
                this.$ajax.get(url).then(res => {
                    this.topinfo = res.data.message;
                })
            },
            getgrouplist() {
                var url = "/site/goods/getgoodsgroup";
                this.$ajax.get(url).then(res => {
                    this.grouplist = res.data.message;
                })
            },

        },
        mounted() {
            this.gettoplist();
            this.getgrouplist();
        },
    }
</script>
<style>
    .el-carousel__container {
        height: 368px !important;
    }

    .el-carousel__item h3 {
        color: red;
        font-size: 18px;
        opacity: 0.75;
        line-height: 50px;
        margin: 0;
    }

    .banner-img h3 {
        color: deepskyblue !important;
    }

    .el-carousel__item:nth-child(2n) {
        background-color: #99a9bf;
    }

    .el-carousel__item:nth-child(2n+1) {
        background-color: #d3dce6;
    }
</style>