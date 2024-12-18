import { useMutation, useQueryClient } from '@tanstack/vue-query';
import { useRouter } from 'vue-router';
import { noticeDetailInsertApi } from '../../api/notice/noticeDetailInsertApi';
export const useNoticeDetailInsertMutation = (detailValue, loginId) => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const title = detailValue.value.title;
  const context = detailValue.value.content;

  return useMutation({
    //필요한 파람
    // param1 title type: 반응객체.value  param2 context type: 반응객체.value  param3 loginId: type: userInofStore.user.loginId
    mutationFn: () => noticeDetailInsertApi(detailValue.value, loginId),
    mutationKey: ['noticeInsert'],
    onSuccess: () => {
      router.go(-1);
      queryClient.invalidateQueries({
        queryKey: ['noticeInsert'],
      });
    },
  });
};
