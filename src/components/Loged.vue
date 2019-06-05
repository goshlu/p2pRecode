<template>
    <div class="Loged">
        <NavLeft/>
        <Content/>
    </div>
</template>

<script>

  import NavLeft from "./Nav/NavLeft.vue"
  import Content from "./Content.vue"

export default {
    name: 'Loged',
    components:{
        NavLeft,
        Content
    },

    data () {
        return {
            
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
    /* @import "./../assets/css/content.css"; */
    .Loged{
        width:100%;
        display: flex;
        flex-flow: row nowrap;
    }
</style>
