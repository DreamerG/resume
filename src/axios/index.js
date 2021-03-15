import HTTP from './http'
import API from '@/api'

const install = function(Vue) {
  /* istanbul ignore if */
  if (install.installed) return

  Vue.prototype.$get = (apiName, data, options) => {
    return new Promise((resolve, reject) => {
      const _api = API[apiName]
      HTTP[_api.method.toLowerCase()](`${_api.host}${_api.path}`, data, options)
        .then(res => {
          resolve(res.data)
        })
        .catch(async err => {
          reject(err)
        })
    })
  }

  Vue.prototype.$post = (apiName, data, params, options) => {
    return new Promise((resolve, reject) => {
      const _api = API[apiName]
      HTTP[_api.method.toLowerCase()](`${_api.host}${_api.path}`, data, params, options)
        .then(res => {
          if (res.resultCode === 500) {
            reject(res)
          } else {
            resolve(res.data)
          }
        })
        .catch(async err => {
          reject(err)
        })
    })
  }
}
export default { install }
