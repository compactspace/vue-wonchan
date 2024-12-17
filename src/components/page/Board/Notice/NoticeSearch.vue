<template>
  <div class="search-box">
    <!-- v-modle 값을 바인딩 한다( 또한 가져오기도 하니
        양방향 이라고도 하며 혹자는 get set 모델이라고도 한다.
        ) .lazy 는 포커스가 제외되어야 와치 함수가 실행된다. 즉 리랜더링을 막자. -->
    <input v-model.lazy="keyword" />
    {{ keyword }}
    <input type="date" v-model="searchStartDate" />
    <input type="date" v-model="searchEndDate" />
    <button @click="handlerSearch">검색</button>
    <button @click="handlerModal">신규등록</button>
  </div>
</template>
<script setup>
import axios from 'axios';
import { watchEffect } from 'vue';
import router from '../../../../router';
import { useModalStore } from '../../../../stores/modalState';
//값변경 저장 + 및 +리랜더린 유발
const keyword = ref('');
const searchStartDate = ref('');
const searchEndDate = ref('');
const 다른거 = 1;

const handlerSearch = () => {
  //1. url 파라미터 쿼리
  const query = [];
  !keyword.value || query.push(`searchTitle=${keyword.value}`);
  !searchStartDate.value || query.push(`searchStDate=${searchStartDate.value}`);
  !searchEndDate.value || query.push(`searchEdDate=${searchEndDate.value}`);
  const queryString = query.length > 0 ? `?${query.join('&')}` : '';
  console.log(queryString);

  //라우터 파일로 가보면 무슨 함수인줄 안다.
  router.push(queryString);
};
const modalState = useModalStore();
const handlerModal = () => {
  modalState.setModalState();
  // console.log(modalState.modalState);
};

//인자로 받은 함수안에 반응형 객체 (ref) 같은게 있으면
// 그 객체가 변경될때마다 해당 함수를 실행한다.
//근데 밑에 watchEffect 는  새로고침 누르면 최초의 한번 실행된다.
watchEffect(
  () =>
    window.location.search &&
    router.push(window.location.pathname, { replce: true })
);

// 단순 자바스크립트 값인 경우는
//watch(()=>일반변수,콜백함수)
// watch(()=>다른거,()=>{
//     console.log(keyword)
// })
// 반응형 객체 를 사용하는 경우 의 watch 형식 상태가 변경시 실행된다. 콜백부분이
//watch(반응형객체,실행될 콜백함수)
// watch(keyword, () => {
//   console.log(keyword.value);
// });
</script>

<style lang="scss" scoped>
.search-box {
  margin-bottom: 10px;
  display: block;
  float: inline-end;
}

input {
  padding: 8px;
  margin-top: 5px;
  margin-bottom: 5px;
  margin-right: 5px;
  border-radius: 4px;
  border: 1px solid #ccc;
}

button {
  text-align: center;
  text-decoration: none;
  display: inline-block;
  border: none;
  color: white;
  width: 70px;
  padding-top: 8px;
  padding-bottom: 8px;
  font-size: 12px;
  margin: 4px 2px;
  cursor: pointer;
  border-radius: 12px;
  box-shadow: 0 4px #999;
  background-color: #3bb2ea;

  &:hover {
    background-color: #45a049;
  }

  &:active {
    background-color: #3e8e41;
    box-shadow: 0 2px #666;
    transform: translateY(2px);
  }
}
</style>
