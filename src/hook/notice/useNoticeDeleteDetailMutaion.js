import { noticeDetailDeleteApi } from '../../api/notice/noticeDetailDeleteApi';

import { useQueryClient, useMutation } from '@tanstack/vue-query';
import { useRouter } from 'vue-router';

export const useNoticeDeleteDetailMutaion = (noticeSeq) => {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: () => noticeDetailDeleteApi(noticeSeq),

    mutationKey: ['noticeDelete'],
    onSuccess: () => {
      router.go(-1);
      queryClient.invalidateQueries({
        queryKey: ['noticeList'],
      });
    },
  });
};
