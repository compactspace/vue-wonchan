<template>
  <div class="divNoticeList">
    <!-- 그냥 속성을 보내는 거다 -->
    <NoticeModal
      v-if="modalState.modalState"
      @postSuccess="searchList"
      @modalClose="() => (noticeIdx = 0)"
      :idx="noticeIdx"
    />
    <!--  if(noticeList !=undifined) 랑 같은 의미 이다.-->
    현재 페이지: 0 총 개수: {{ noticeList?.noticeCnt }}
    <table>
      <colgroup>
        <col width="10%" />
        <col width="50%" />
        <col width="30%" />
        <col width="10%" />
      </colgroup>

      <thead>
        <tr>
          <th scope="col">번호</th>
          <th scope="col">제목</th>
          <th scope="col">작성일</th>
          <th scope="col">작성자</th>
        </tr>
      </thead>
      <tbody>
        <!-- template 공 태그로 그냥 형식적인 태그이다.  -->
        <template v-if="isLoading">....로딩중</template>
        <template v-if="isSuccess">
          <template v-if="noticeList?.noticeCnt > 0">
            <!-- 랜더링시 포문 전체 재랜더링 방지로 key 속성을 이용한다. 고유한 이름을 만들어서, 고유한 것만 참조하여 랜더링한다. 
            백단에서 받은 pk로 추천
            -->
            <tr
              v-for="notice in noticeList.notice"
              :key="notice.noticeIdx"
              @click="handlerDetail(notice.noticeIdx)"
            >
              <td>{{ notice.noticeIdx }}</td>
              <td>{{ notice.title }}</td>
              <td>{{ notice.createdDate.substr(0, 10) }}</td>
              <td>{{ notice.author }}</td>
            </tr>
          </template>
          <template v-else>
            <tr>
              <td colspan="7">일치하는 검색 결과가 없습니다</td>
            </tr>
          </template>
        </template>
        <template v-if="isError">에러발생!!!!!!</template>
      </tbody>
    </table>
    <!--
       풀네임은 v-bind 로 속성을 부여한다 의미임 그러나 문법이 바뀌며 자꾸 생략되는듯
       아무튼 쉽게 생각하면 속성을 부여한 것에 불과하다 아래 컴포넌트에 적힌 것들은
       v-model은 값을 바인딩 콜론 쓰면 에러!!
    -->
    <Pagination
      :totalItems="noticeList?.noticeCnt || 0"
      :items-per-page="5"
      :max-pages-shown="5"
      :onClick="searchList"
      v-model="cPage"
    />
  </div>
</template>

<script setup>
import axios from 'axios';
import { useRoute, useRouter } from 'vue-router';
import Pagination from '../../../common/Pagination.vue';
import { onMounted, onUnmounted, watchEffect } from 'vue';
import { useModalStore } from '../../../../stores/modalState';
import { useQuery } from '@tanstack/vue-query';
import { useNoticeListSearchQuery } from '../../../../hook/notice/useNoticeListSearchQuery.js';
const route = useRoute();
const router = useRouter();
// const noticeList = ref();
const cPage = ref(1);
const modalState = useModalStore();

const noticeIdx = ref(0);

const injectedValue = inject('providedValue');

// watch(injectedValue, () => {
//   console.log(injectedValue.value);
// });

// const searchList = async () => {
//   const param = new URLSearchParams({
//     ...injectedValue.value,
//     currentPage: cPage.value,
//     pageSize: 5,
//   });

//   // vite.config.js  api는 프록시 세팅을 보아라..

//   const result = await axios.post('/api/board/noticeListJson.do', param);

//   return result.data;
// };

const {
  data: noticeList,
  //팬딘: 대기중 확인
  isLoading,
  refetch,
  isSuccess,
} = useNoticeListSearchQuery(injectedValue, cPage);

//사실 필요없다..! refetch가 있다 정도 확인을 위해 사용 위 쿼리키에 추가해도 기능은 동일하다.
//watch([injectedValue, cPage], refetch);

const handlerDetail = (param) => {
  console.log(param);
  //url는 스트링 타입으로!! push 해야함
  router.push({
    //이는 등록한 이름으로 찾아가.ㅁ
    name: 'noticeDetail',
    params: { idx: param },
  });
};
</script>

<style lang="scss" scoped>
table {
  width: 100%;
  border-collapse: collapse;
  margin: 20px 0px 0px 0px;
  font-size: 18px;
  text-align: left;

  th,
  td {
    padding: 8px;
    text-align: left;
    border-bottom: 1px solid #ddd;
    text-align: center;
  }

  th {
    background-color: #2676bf;
    color: #ddd;
  }

  /* 테이블 올렸을 때 */
  tbody tr:hover {
    background-color: #d3d3d3;
    opacity: 0.9;
    cursor: pointer;
  }
}
</style>
