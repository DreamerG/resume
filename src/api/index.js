// import { apiHost } from 'CONFIG'
const apiHost = process.env.VUE_APP_BASE_API

const API = {
  // 获取候选人职位选项
  getPositionOptions: {
    host: apiHost,
    path: '/resume/listAllPosition',
    method: 'get'
  },
  // 获取简历列表
  getResumeList: {
    host: apiHost,
    path: '/resume/list',
    method: 'post'
  },
  // 新增简历
  createResume: {
    host: apiHost,
    path: '/resume/create',
    method: 'post'
  },
  // 录入事项
  createEvent: {
    host: apiHost,
    path: '/resume/createNotes',
    method: 'post'
  },
  // 关闭简历
  closeEvent: {
    host: apiHost,
    path: '/resume/close',
    method: 'post'
  }
}
export default API
