import axios from 'axios';
import { Notice } from '../api';
export const noticeDetailDeleteApi = async (noticeSeq) => {
  const DataToServer = { noticeSeq: noticeSeq };
  await axios.post(Notice.DeleteNoticeDetail, DataToServer);
};
