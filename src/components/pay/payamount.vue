<template>
    <div class="tmpl">
        {{orderid}}
        <input type="text" v-model="amount">
        <el-button type="success" size="small" @click="pay">支付</el-button>
    </div>
</template>
<script> 
    export default{
        data(){
            return{
                orderid:this.$route.params.orderid,
                amount:0
            }
        },
        methods:{
            getpayinfo(){
                this.$ajax.get("/site/validate/order/getorderdetial/"+this.orderid).then(res=>{
                    this.amount = res.data.message.orderinfo.order_amount;
                })
            },
            pay(){
                this.$ajax.get("/site/validate/order/pay/"+this.orderid).then(res=>{
                    if(res.data.status==1){
                        this.$message.error(res.data.message);
                        return;
                    }
                    // 支付成功跳转到成功页面 
                    this.$router.push({name:"paysuccess"});
                })
            }
        },
        mounted(){
           this.getpayinfo();
        }
    }
</script>
<style scope>

</style>