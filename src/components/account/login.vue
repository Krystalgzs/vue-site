<template>
    <div class="tmpl">
        <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <a href="/index.html">首页</a> &gt;
                <a href="/login.html">会员登录</a>
            </div>
        </div>
        <div class="section">
            <div class="wrapper">
                <div class="bg-wrap">
                    <div class="nav-tit">
                        <a class="selected" href="javascript:;">账户登录</a>
                        <i>|</i>
                        <a href="/register.html">免费注册</a>
                    </div>
                    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                        <form id="loginform" name="loginform" class="login-box">

                            <el-form-item label="用户名" prop="user_name">
                                <el-input v-model="ruleForm.user_name"></el-input>
                            </el-form-item>
                            <el-form-item label="密码" prop="password">
                                <el-input v-model="ruleForm.password"></el-input>
                            </el-form-item>
                            <div class="btn-box">
                                <input id="btnSubmit" name="btnSubmit" type="button" @click="submitvaluedate" value="立即登录">
                            </div>
                            <div id="msgtips" class="tip-box"></div>
                            <input id="turl" name="turl" type="hidden" value="http://localhost:8020/cart.html">
                            <!--记住上一页网址-->
                        </form>
                    </el-form>
                </div>
            </div>
        </div>
    </div>
    </div>
</template>
<script>
    import {vm} from "../kits/buy.js";
    export default {
        data() {
            return {
                ruleForm: {
                    user_name: "ivanyb",
                    password: "123",
                },
                rules: {
                    user_name: [
                        { required: true, message: "请输入用户名", trigger: "blur" },
                    ],
                    password: [
                        { required: true, message: "请输入密码", trigger: "blur" },
                    ]
                }
            }
        },
        methods: {
            submitvaluedate() {
                this.$refs.ruleForm.validate((valid) => {
                    if (valid) {
                        var url = '/site/account/login';
                        this.$ajax.post(url,this.ruleForm).then(res=>{
                            if(res.data.status==1){
                                this.$message.error(res.data.message);
                                return;
                            }else{
                                // 回到上次进来登录页面之前的页面
                                var path = localStorage.getItem("currentpath");
                                this.$router.push({path:path});

                                // 在localStorage中存储一个logined
                                localStorage.setItem("logined","true");
                                vm.$emit("changelogin",true);
                            }
                        })
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            }
        },
        mounted() {

        }
    }
</script>
<style>
</style>