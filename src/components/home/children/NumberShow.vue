<template>
    <div class="NumberShow">
        <div class="icon">
            <span :class="iconName"></span>
        </div>
        <div class="title">
            <p>{{title}}</p>
            <h1>{{number}}</h1>
        </div>
        <!-- <div class="bottom">昨日新增：{{newNumber}}</div> -->
    </div>
</template>

<script>

export default {
    name: 'NumberShow',
    components:{
    },
    props:{
        title:String,
        number:Number,
        newNumber:Number,
        iconName:String
    },
    data () {
        return {
            
        }
    },
    created() {
    //   console.log(this.$props);
        
    },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    @import "./../../../assets/css/home/numberShow.css";
</style>
