<template>
    <div class="subtmpl">
        <ul>
            <li @click="substract">-</li>
            <li>{{count}}</li>
            <li @click="add">+</li>
        </ul>
    </div>
</template>
<script>
    export default{
        data(){
            return{
                count:1,
            }
        },
        props:['obj'],
        mounted(){
            // console.log(this.obj);
            // 将传入的商品够买数量赋值
            this.count = this.obj.count;
        },
        methods:{
            add(){
                this.count++;
                // 将最新的数量传递回父组件
                this.newCount();
            },
            substract(){
                if(this.count<=1){
                    this.count=1;
                    return;
                }
                this.count--;
                // 将最新的数量传递回父组件
                this.newCount();
            },
            newCount(){
                this.$emit("msg",{gid:this.obj.gid,count:this.count});
            }
        }
    }
</script>
<style scope>
.subtmpl ul{
    width: 120px;
}
.subtmpl ul li{
    list-style: none;
    width: 30px;
    display: inline-block;
    cursor:pointer;
    text-align: center;
    border: 1px solid rgba(0, 0, 0, 0.4);
}
</style>
