<template>
    <div class="tmpl">
        <!-- 导航栏 -->
        <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <a href="/index.html">首页</a> &gt;
                <a href="/goods.html">购物商城</a>
                <a href="/goods/42/1.html">商品详情</a>

            </div>
        </div>
        <!-- 商品详情 -->
        <div class="section" v-if="goodsinfo.goodsinfo">
            <div class="wrapper clearfix">
                <div class="wrap-box">
                    <!--页面左边-->
                    <div class="left-925">
                        <div class="goods-box clearfix">
                            <!--/商品图片-->
                            <div class="pic-box">
                                <div class="magnifier" id="magnifier1">
                                    <div class="magnifier-container">
                                        <div class="images-cover"></div>
                                        <!--当前图片显示容器-->
                                        <div class="move-view"></div>
                                        <!--跟随鼠标移动的盒子-->
                                    </div>
                                    <div class="magnifier-assembly">
                                        <div class="magnifier-btn">
                                            <span class="magnifier-btn-left">&lt;</span>
                                            <span class="magnifier-btn-right">&gt;</span>
                                        </div>
                                        <!--按钮组-->
                                        <div class="magnifier-line">
                                            <ul class="clearfix animation03">
                                                <li v-for="item in goodsinfo.imglist" :key="item.id">
                                                    <div class="small-img">
                                                        <img :src="item.original_path" />
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                        <!--缩略图-->
                                    </div>
                                    <div class="magnifier-view"></div>
                                    <!--经过放大的图片显示容器-->
                                </div>
                            </div>
                            <!--商品信息-->
                            <div class="goods-spec">
                                <h1>{{goodsinfo.goodsinfo.title}}</h1>
                                <p class="subtitle">{{goodsinfo.goodsinfo.sub_title}}</p>
                                <div class="spec-box">
                                    <dl>
                                        <dt>货号</dt>
                                        <dd id="commodityGoodsNo">{{goodsinfo.goodsinfo.goods_no}}</dd>
                                    </dl>
                                    <dl>
                                        <dt>市场价</dt>
                                        <dd>
                                            <s id="commodityMarketPrice">¥{{goodsinfo.goodsinfo.market_price}}</s>
                                        </dd>
                                    </dl>
                                    <dl>
                                        <dt>销售价</dt>
                                        <dd>
                                            <em class="price" id="commoditySellPrice">¥{{goodsinfo.goodsinfo.sell_price}}</em>
                                        </dd>
                                    </dl>
                                </div>

                                <div class="spec-box">
                                    <dl>
                                        <dt>购买数量</dt>
                                        <dd>
                                            <div class="stock-box">
                                                <template>
                                                    <el-input-number v-model="num1" @change="buycount" :min="1" :max="goodsinfo.goodsinfo.stock_quantity"></el-input-number>
                                                </template>
                                            </div>
                                            <span class="stock-txt">
                                                库存
                                                <em id="commodityStockNum">{{goodsinfo.goodsinfo.stock_quantity}}</em>件
                                            </span>
                                        </dd>
                                    </dl>
                                    <dl>
                                        <dd>
                                            <div class="btn-buy" id="buyButton">
                                                <button class="buy" @click="buyNow">立即购买</button>
                                                <button class="add" ref="addcartbtn" @click="addCart">加入购物车</button>
                                            </div>
                                        </dd>
                                    </dl>
                                </div>

                            </div>
                            <!--/商品信息-->
                        </div>

                        <div id="goodsTabs" class="goods-tab bg-wrap">
                            <!--选项卡-->
                            <Affix>
                                <div id="tabHead" class="tab-head" style="position: static; top: 517px; width: 925px;">
                                    <ul>
                                        <li @click="istableShow=true">
                                            <a v-bind="{class:(istableShow?'selected':'')}" href="javascript:;">商品介绍</a>
                                        </li>
                                        <li @click="istableShow=false">
                                            <a v-bind="{class:(!istableShow?'selected':'')}" href="javascript:;" class="">商品评论</a>
                                        </li>
                                    </ul>
                                </div>
                            </Affix>
                            <!--/选项卡-->

                            <!--选项内容-->
                            <div class="tab-content entry" v-show="istableShow">
                                <div v-html="goodsinfo.goodsinfo.content"></div>
                            </div>
                            <!--网友评论-->
                            <div class="tab-content" v-show="!istableShow">
                                <div class="comment-box">
                                    <!--取得评论总数-->
                                    <form id="commentForm" name="commentForm" class="form-box" url="/tools/submit_ajax.ashx?action=comment_add&amp;channel_id=2&amp;article_id=98">
                                        <div class="avatar-box">
                                            <i class="iconfont icon-user-full"></i>
                                        </div>
                                        <div class="conn-box">
                                            <div class="editor">
                                                <textarea id="txtContent" name="txtContent" v-model="commentTxt" sucmsg=" " datatype="*10-1000" nullmsg="请填写评论内容！"></textarea>
                                                <span class="Validform_checktip"></span>
                                            </div>
                                            <div class="subcon">
                                                <input id="btnSubmit" name="submit" type="submit" value="提交评论" class="submit" @click="postcomment">
                                                <span class="Validform_checktip"></span>
                                            </div>
                                        </div>
                                    </form>
                                    <ul id="commentList" class="list-box">
                                        <span v-if="commentlist.length<=0">
                                            <p style="margin:5px 0 15px 69px;line-height:42px;text-align:center;border:1px solid #f7f7f7;">暂无评论，快来抢沙发吧！</p>
                                        </span>
                                        <li v-for="item in commentlist" :key="item.id">
                                            <div class="avatar-box">
                                                <i class="iconfont icon-user-full"></i>
                                            </div>
                                            <div class="inner-box">
                                                <div class="info">
                                                    <span>{{item.user_name}}</span>
                                                    <span>{{item.add_time}}</span>
                                                </div>
                                                <p>{{item.content}}</p>
                                            </div>
                                        </li>
                                    </ul>
                                    <!--放置页码-->
                                    <div class="page-box" style="margin:5px 0 0 62px">
                                        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageIndex" :page-sizes="[1, 5, 10, 15]"
                                            :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="commentCount">
                                        </el-pagination>
                                    </div>
                                    <!--/放置页码-->
                                </div>

                                <!--/网友评论-->
                            </div>

                        </div>

                    </div>
                    <!--/页面左边-->

                    <!--页面右边-->
                    <div class="left-220">
                        <div class="bg-wrap nobg">
                            <div class="sidebar-box">
                                <h4>推荐商品</h4>
                                <ul class="side-img-list">
                                    <li v-for="item in goodsinfo.hotgoodslist" :key="item.id">
                                        <div class="img-box">
                                            <router-link v-bind="{to:'/site/goodsinfo/'+item.id}">

                                                <img :src="item.img_url">

                                            </router-link>
                                        </div>
                                        <div class="txt-box">
                                            <router-link v-bind="{to:'/site/goodsinfo/'+item.id}">
                                                {{item.title}}
                                            </router-link>
                                            <span>{{item.add_time|datafmt}}</span>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <!--/页面右边-->
                </div>
            </div>
        </div>
        <transition @before-enter="benter" @enter="enter" @after-enter="aenter">
            <div class="img" ref="img" v-if='thumb_path' v-show="isshow">
                <img width="50px" height='40px' :src="thumb_path" alt="">
            </div>
        </transition>
    </div>
</template>
<script>
    import "../../../statics/jqplugins/jqimgzoom/js/magnifier.js";
    import { vm, KEY } from "../../components/kits/buy.js";
    import { setItem,getItem } from "../../components/kits/localStorageHelper.js";
    export default {
        data() {
            return {
                id: this.$route.params.id,
                pageIndex: 1,
                pageSize: 10,
                commentCount: 0,
                num1: 1,
                goodsinfo: {},
                istableShow: true,
                commentlist: [],
                commentTxt: "",
                currentBuyCount: 1,
                isshow: false,
                thumb_path: '',
                offseobj:{},
                layoutcartbtn:{},
            }
        },
        watch: {
            '$route': function () {
                this.getgoodsinfo();
            }
        },
        methods: {
            // 钩子函数 
            // 设置动画开始的位置
            benter(el){
                el.style.left = this.offseobj.left+50+"px";
                el.style.top = this.offseobj.top+10 +"px";
            },
            enter(el,done){
                el.offsetWidth;
                el.style.left=this.layoutcartbtn.left+10+"px";
                el.style.top=this.layoutcartbtn.top+"px";
                done();
            },
            aenter(el){
                // 隐藏图片
                this.isshow = false;
            },
            // 页面渲染
            getgoodsinfo() {
                var self = this;
                var url = "/site/goods/getgoodsinfo/" + this.$route.params.id;
                this.$ajax.get(url).then(res => {
                    this.goodsinfo = res.data.message;
                    this.thumb_path = res.data.message.imglist[0].thumb_path;
                    // console.log(this.thumb_path);
                    // console.log(this.goodsinfo);
                    //  应该是等待整个数据回来以后，才进行相册图片的渲染 延迟200毫秒
                    setTimeout(function () {
                        $('#magnifier1').imgzoon({ magnifier: '#magnifier1' });
                        self.getcommentlist();

                    }, 200)
                })
            },
            // 得到评论分页数据
            getcommentlist() {
                var url = `/site/comment/getbypage/goods/${this.$route.params.id}?pageIndex=${this.pageIndex}&pageSize=${this.pageSize}`;
                this.$ajax.get(url).then(res => {
                    this.commentlist = res.data.message;
                    this.commentCount = res.data.totalcount;
                })
            },
            // 提交评论
            postcomment() {
                var url = "/site/validate/comment/post/goods/" + this.$route.params.id;
                this.$ajax.post(url, { "commenttxt": this.commentTxt }).then(res => {
                    if (res.data.status == 1) {
                        this.message.error(res.data.message);
                        return;
                    } else {
                        // 刷新页面
                        this.getgoodsinfo();
                        this.commentTxt = "";
                    }
                })
            },
            // 够买数量
            buycount(value) {
                // console.log(value);
                this.currentBuyCount = value;
                // console.log(this.currentBuyCount);
            },
            // 分页
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
                this.pageSize = val;
                this.getcommentlist();
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
                this.pageIndex = val;
                this.getcommentlist();
            },
            // 加入购物车
            addCart() {
                // 1.0 利用vm.$emit() 触发事件,将购买数量传入layout.vue组件
                // 使用vuex中的 this.$store.dispatch
                // 获取当前商品的id和够买的数量 调用localStorageHelper.js中的setItem方法来存储
                var goodslist = { gid: this.$route.params.id, count: this.currentBuyCount };
                // 使用vuex
                this.$store.dispatch("changeCount",goodslist);

                this.isshow = true;

                // // 不使用vuex
                // var buyObj = getItem();
                // var valuess = 0;
                // for(var key in buyObj){
                //     valuess += buyObj[key];
                // }
                // console.log(buyObj)
                // console.log(valuess)
                // // localStorage.setItem('buyTotalCount',valuess);
                // vm.$emit(KEY,valuess);
            },
            // 立即够买
            buyNow() {

            },
        },
        mounted() {
            this.getgoodsinfo();
            this.getcommentlist();
            // 利用jq获取这个对象offset
            setTimeout(()=>{
                // 加入购物车的offset
                var offseobj = $(this.$refs.addcartbtn).offset();
                // console.log(offseobj);
                this.offseobj = offseobj;
                $(this.$refs.img).css("left",offseobj.left).css("top",offseobj.top);
                var layoutcartbtn = $("#layoutcartbtn").offset();
                // console.log(layoutcartbtn);
                this.layoutcartbtn = layoutcartbtn;
            })
        }
    }
</script>
<style scope>
    @import url("../../../statics/jqplugins/jqimgzoom/css/magnifier.css");
    .img {
        height: 40px;
        width: 50px;
        position: absolute;
        transition:all 1s;
    }
</style>