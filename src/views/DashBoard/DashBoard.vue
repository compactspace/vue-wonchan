<template>
  <ul class="dashboard-ul">
    <li class="menu-bar">
      <LeftManuBar></LeftManuBar>
    </li>
    <li class="content">
      <!-- keep-alive: 열때 로딩 시간 잡아줌 중요하진 않다 당장응 -->
      <!-- router-view: 가 중요: 또한 index.js 에서 children 속성 명으로 들어와있어야함 보면암
             url 변경에 따른 원하는 부분만 변경하는 기능이다.   
            -->
      <keep-alive><router-view></router-view></keep-alive>
    </li>
  </ul>
</template>

<script setup>
import LeftManuBar from '../../components/layout/LeftManuBar.vue';
</script>

<style scoped>
.dashboard-ul {
  list-style-type: none;
  display: flex;
  overflow: hidden;
}

.menu-bar {
  float: left;
}

.content {
  float: left;
  padding-left: 50px;
  padding-right: 10%;
  width: 77%;
  flex: 1;
}
</style>
