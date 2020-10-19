import Axios from 'axios'

Axios.interceptors.request.use(config => {
  if (localStorage.signedIn) {
    config.headers = { 'Authorization': 'Bearer ' + localStorage.access }
  } else {
    config.headers = { 'X-Refresh-Token': localStorage.refresh }
  }
  return config
})

Axios.interceptors.response.use(function (response) {
  return response
}, function (error) {
  if (error.response.status === 401) {
    delete localStorage.access
    delete localStorage.signedIn
    Axios({
      method: 'post',
      url: '/refresh'
    })
      .then(response => {
        localStorage.access = response.data.access
        localStorage.signedIn = true
      })
  } else {
    return Promise.reject(error)
  }
})
