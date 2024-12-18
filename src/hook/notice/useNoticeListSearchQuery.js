import { useQuery } from '@tanstack/vue-query';
import { noticeListSearchApi } from '../../api/notice/noticeListSearchApi';

export const useNoticeListSearchQuery = (injectedValue, cPage) => {
  return useQuery({
    queryKey: ['noticeList', injectedValue, cPage],
    queryFn: () => noticeListSearchApi(injectedValue.value, cPage.value),
    //언디파인을 예상한 강제 펄스 로 하려고 !! 두개
    staleTime: 1000 * 60,
  });
};
