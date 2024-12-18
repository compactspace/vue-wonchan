import axios from 'axios';
import { Notice } from '../api';

//필요한 파람
// param1 title type: 반응객체.value
// param2 context type: 반응객체.value
// param3 loginId: type: userInofStore.user.loginId
export const noticeDetailInsertApi = async (detailValue, loginId) => {
  const DataToServer = {
    title: detailValue.title,
    context: detailValue.content,
    loginId: loginId,
  };

  const result = await axios.post(Notice.InsertNoticeDetail, DataToServer);
};
