import axios from 'axios';
//한 페이지에 분리된 컴포넌트들이 여러개 인데
// 컴포넌트들 끼리 데이터(로그인정보) 공유=전달
// 하기위해 저장소임. 그래서 로그인 정보 같은것 들을 저장해둔다.
//벗 세션 에 저장하는게 안전하다.
import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useUserInfo = defineStore(
  'userInfo',
  () => {
    const user = ref();

    async function setUserData(loginInfo) {
      const param = new URLSearchParams(loginInfo);
      const result = await axios.post('/api/loginProc.do', param);
      user.value = result.data;
      return result.data.result;
    }

    return { user, setUserData };
  },
  { persist: { storage: sessionStorage } }
);
