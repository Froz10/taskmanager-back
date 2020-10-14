export default function (instance) {
  return {
    signIn (payload) {
      return instance.post('/signin', payload)
    },
    signUp (payload) {
      return instance.post('/signup', payload)
    }
  }
}
