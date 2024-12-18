import { createRouter, createWebHistory } from 'vue-router';
//뷰파일을 가져온다.
import Login from '../views/Login/Login.vue';
import DashBoard from '../views/DashBoard/DashBoard.vue';
import Notice from '../views/Board/Notice.vue';
import NoticeDetail from '../components/page/Board/Notice/NoticeDetail.vue';

const routes = [
  {
    path: '/',
    name: 'login',
    component: Login,
  },

  {
    path: '/vue',
    name: 'vue',
    component: DashBoard,
    children: [
      {
        path: 'board',
        name: 'board',
        children: [
          {
            // 자동 / 가 붙는다.!! localhost:5173/board/notice.do 처럼
            //만약 /를 붙이면 localhost:5173/notice.do가 되어 버린다.
            path: 'notice.do',
            name: 'notice',
            component: Notice,
          },
          //단일 라우터이다. 이는 즉 부모 자식 관계가 아니다.
          {
            path: 'notice.do/:idx',
            name: 'noticeDetail',
            component: NoticeDetail,
          },

          {
            path: 'notice.do/insert',
            name: 'noticeInsert',
            component: NoticeDetail,
          },
        ],
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory('/'),
  routes,
});

export default router;
