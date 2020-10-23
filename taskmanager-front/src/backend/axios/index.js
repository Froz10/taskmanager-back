import Axios from 'axios'

Axios.interceptors.request.use(config => {
  if (localStorage.signedIn) {
    config.headers = { 'Authorization': 'Bearer ' + localStorage.access }
  }
  return config
})

Axios.interceptors.response.use(function (response) {
  return response
}, function (error) {
  if (error.response.status === 401) {
    delete localStorage.access
    delete localStorage.signedIn
    delete localStorage.csrf
    delete localStorage.refresh
    this.$router.go()
  }
  return Promise.reject(error)
})
