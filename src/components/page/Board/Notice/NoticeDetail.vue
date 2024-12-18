<template>
  <!-- teleport 바디로 보내주세요 의미로 to 속성을 가짐 -->

  <div>
    <div>
      <!-- <input v-model="number1" />
      <input v-model="number2" />
      {{ fullNum }} -->
    </div>
    <div v-if="isLoading">기다려주세요</div>
    <div v-else>
      <div>
        <ContextBox>공지사항 상제조회</ContextBox>
        <label> 제목 :<input type="text" v-model="detailValue.title" /> </label>
        <label>
          내용 :
          <input type="text" v-model="detailValue.content" />
        </label>
        파일 :<input
          type="file"
          style="display: none"
          id="fileInput"
          @change=""
        />
        <label class="img-label" htmlFor="fileInput"> 파일 첨부하기 </label>
        <div>
          <div v-if="imageUrl">
            <label>파일 미리보기</label>
            <img :src="imageUrl" />
          </div>
          <div v-else>
            <label>파일명</label>
          </div>
        </div>
        <div class="button-box">
          <button @click="params.idx ? handlerUpdateBtn() : handlerInsertBtn()">
            {{ params.idx ? '수정' : '작성' }}
          </button>

          <button v-if="params.idx" @click="handlerDeleteBtn">삭제</button>
          <button @click="$router.go(-1)">뒤로가기</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query';
import { useRoute, useRouter } from 'vue-router';
import { useUserInfo } from '../../../../stores/userInfo';
import axios from 'axios';
import { watchEffect } from 'vue';

import { useNoticeDetailUpdateMutation } from '../../../../hook/notice/useNoticeUpdateDetailMutation';

import { useNoticeDetailInsertMutation } from '../../../../hook/notice/useNoticeInsertDetailMutaion';

import { useNoticeDeleteDetailMutaion } from '../../../../hook/notice/useNoticeDeleteDetailMutaion';

const { params } = useRoute();

const userinfo = useUserInfo();
// const number1 = ref(0);
// const number2 = ref(0);

// // 값을 내보내기 복잡한 것을 계산해둔다.
// // 그것을 매번 할수 없으니
// // 또한 후속처리등 을 할때
// //같은 로직을 매번 사용하는 수고를 덜어주는데
// // 계산된 속성이기 때문에 computed를 사용하여 최초에 한번반 로직을 수행하고 그 이후에는
// //computed에 저장된 값만 사용한다.
// const fullNum = computed(() => {
//   return `${number1.value} +${number2.value}`;
// });

// useQuery로  백단 요청 noticeDetailBody.do 에서
// data를 담아와 초기화됨 다음 데이터를 담고 있음

// title , content ,author , file_name , phsycal_path	, logical_path, file_size , file_ext
const detailValue = ref({});

const searchDetail = async () => {
  const result = await axios.post('/api/board/noticeDetailBody.do', {
    noticeSeq: params.idx,
  });
  return result.data;
};

const {
  data: noticeDetail,
  isLoading,
  isSuccess,
} = useQuery({
  queryKey: ['noticeDetail'],
  queryFn: searchDetail,
  //언디파인을 예상한 강제 펄스 로 하려고 !! 두개
  enabled: !!params.idx,
});

const router = useRouter();
//서버에서 데이터 캐싱 상태를 관리 해준다.
const queryCient = useQueryClient();
const apiSuccess = () => {
  alert('POST 성공');
  // 그러면 캐싱된게 나와서 뒤로가기시 업데이트 전 내용이 나오나.
  router.go(-1);
  // 쿼리클라이언트를 이용하면 된다잉
  queryCient.invalidateQueries({
    //기존에 있는 쿼리키 를 다시 실행한다. 의미
    queryKey: ['noticeList'],
  });
};

watchEffect(() => {
  if (isSuccess.value && noticeDetail.value) {
    //혹은 toRaw로 해도 된다. 혹은 {...} 연산을 사용해도 된다.
    detailValue.value = toRaw(noticeDetail.value.detail);
    console.log(detailValue.value);
  }
});

// const updateNoticeDetail = async () => {
//   //유즈쿼리로 가져온건 기본적으로 리드온이라 다음 textData를 찍으면 언디파인이 나온다.
//   const textData = {
//     ...detailValue.value,
//     noticeSeq: params.idx,
//     context: detailValue.value.content,
//   };

//   await axios.post('/api/board/noticeUpdateBody.do', textData);
// };

// const insertNoticeDetail = async () => {
//   const textData = {
//     title: detailValue.value.title,
//     context: detailValue.value.content,
//     loginId: userinfo.user.loginId,
//   };

//   console.log(detailValue.value);
//   await axios.post('/api/board/noticeSaveBody.do', textData);
// };

// const deleteNoticeDetail = async () => {
//   //유즈쿼리로 가져온건 기본적으로 리드온이라 다음 textData를 찍으면 언디파인이 나온다.
//   const textData = {
//     noticeSeq: params.idx,
//   };

//   await axios.post('/api/board/noticeDeleteBody.do', textData);
// };

// 이것도 옵션이 참 많다.
const { mutate: handlerUpdateBtn } = useNoticeDetailUpdateMutation(
  detailValue,
  params.idx
);

const { mutate: handlerInsertBtn } = useNoticeDetailInsertMutation(
  detailValue,
  userinfo.user.loginId
);

// const { mutate: handlerInsertBtn } = useMutation({
//   mutationFn: insertNoticeDetail,
//   onSuccess: apiSuccess,
//   mutationKey: ['noticeInsert'],
// });

const { mutate: handlerDeleteBtn } = useNoticeDeleteDetailMutaion(params.idx);

const computedValue = computed({});
</script>
<style lang="scss" scoped>
.backdrop {
  top: 0%;
  left: 0%;
  width: 100%;
  height: 100%;
  position: fixed;
  display: flex;
  flex-flow: row wrep;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1;
  font-weight: bold;
}

label {
  display: flex;
  flex-direction: column;
}

input[type='text'] {
  padding: 8px;
  margin-top: 5px;
  margin-bottom: 5px;
  border-radius: 4px;
  border: 1px solid #ccc;
}

.container {
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.25);
  position: relative;
  width: 400px;
}

img {
  width: 100px;
  height: 100px;
}

.img-label {
  margin-top: 10px;
  padding: 6px 25px;
  background-color: #ccc;
  border-radius: 4px;
  color: rgba(0, 0, 0, 0.9);
  cursor: pointer;

  &:hover {
    background-color: #45a049;
    color: white;
  }

  &:active {
    background-color: #3e8e41;
    box-shadow: 0 2px #666;
    transform: translateY(2px);
  }
}

.button-box {
  text-align: right;
  margin-top: 10px;
}
button {
  background-color: #3bb2ea;
  border: none;
  color: white;
  padding: 10px 22px;
  text-align: right;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
  border-radius: 12px;
  box-shadow: 0 4px #999;
  transition: 0.3s;

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
