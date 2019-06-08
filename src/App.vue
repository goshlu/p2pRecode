<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
}
</script>

<style lang="stylus">
  @import './assets/stylus/init.styl';
  @font-face {
  font-family: iconfont;
  src: url("./assets/font/iconfont.ttf");
}

/* ICONFONT */
.fullScreen::before {
  font-family: iconfont;
  content: "\e620";
  color: #fff;
  font-size: 17px;
}

.skin::before {
  font-family: iconfont;
  content: "\e7e8";
  color: #fff;
  font-size: 17px;
}

.search::before {
  font-family: iconfont;
  content: "\e678";
  color: #fff;
  font-size: 17px;
}

.message::before {
  font-family: iconfont;
  content: "\e60e";
  color: #fff;
  font-size: 17px;
}

.personal::before {
  font-family: iconfont;
  content: "\e638";
  color: #fff;
  font-size: 17px;
}

.lock::before {
  font-family: iconfont;
  content: "\e62b";
  color: #fff;
  font-size: 17px;
}

.line::before {
  font-family: iconfont;
  content: "\e680";
  color: #fff;
  font-size: 17px;
}

.setIcon::before {
  font-family: iconfont;
  content: "\e608";
  color: #fff;
  font-size: 17px;
}

.home::before {
  font-family: iconfont;
  content: "\e609";
  color: #fff;
  font-size: 17px;
}

.jiedai::before {
  font-family: iconfont;
  content: "\e914";
  color: #fff;
  font-size: 17px;
}

.huankuan::before {
  font-family: iconfont;
  content: "\e913";
  color: #fff;
  font-size: 17px;
}

.vip::before {
  font-family: iconfont;
  content: "\e629";
  color: #fff;
  font-size: 17px;
}

.money::before {
  font-family: iconfont;
  content: "\e661";
  color: #fff;
  font-size: 17px;
}

.people::before {
  font-family: iconfont;
  content: "\e611";
  color: #fff;
  font-size: 17px;
}

.daikuanNumber::before {
  font-family: iconfont;
  content: "\e61a";
  color: #fff;
  font-size: 17px;
}

.touziNumber::before {
  font-family: iconfont;
  content: "\e616";
  color: #fff;
  font-size: 17px;
}

.shouyi::before {
  font-family: iconfont;
  content: "\e60c";
  color: #fff;
  font-size: 17px;
}

.things::before {
  font-family: iconfont;
  content: "\e66f";
  color: #fff;
  font-size: 17px;
}

.quanxian::before {
  font-family: iconfont;
  content: "\e657";
  color: #fff;
  font-size: 17px;
}

.logIcon::before{
  font-family: iconfont;
  content: '\e641';
  color: #fff;
  font-size: 17px;
}

.out::before{
  font-family: iconfont;
  content: '\e66a';
  color: #fff;
  font-size: 17px;
}
</style>