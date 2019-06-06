<template>
  <el-button :type="btnType" :size="size?size:'small'" :class="iconClass" @click="fun">{{btnText}}</el-button>
</template>

<script>
  export default {
    name: "Button",
    props: ["btnType", "btnText", "funName", "iconClass", "size"],
    methods: {
      fun() {
        if (this.funName != undefined) {
          this.$emit(this.funName);
        }
      }
    },
    data() {
      return {}
    }
  }
</script>

<style scoped>
</style>
