<template>
  <div class="max-w-sm m-auto my-8">
    <div class="border p-10 border-grey-light shadow rounded">
      <h3 class="text-2xl mb-6 text-gray-700">Sign Up</h3>
      <form @submit.prevent="signup">
        <div class="text-red" v-if="error">{{ error }}</div>

        <div class="mb-6">
          <label for="email" class="block text-gray-700 text-sm font-bold mb-2">E-mail Address</label>
          <input type="email" v-model="email" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" placeholder="E-mail Address">
        </div>

        <div class="mb-6">
          <label for="password" class="block text-gray-700 text-sm font-bold mb-2">Password</label>
          <input type="password" v-model="password" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="password" placeholder="Password">
        </div>

        <div class="mb-6">
          <label for="password_confirmation" class="block text-gray-700 text-sm font-bold mb-2">Password Confirmation</label>
          <input type="password" v-model="password_confirmation" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="password_confirmation" placeholder="Password Confirmation">
        </div>
        <button type="submit" class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-green-600 hover:bg-green-400 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out">Sign Up</button>

        <div class="my-4"><router-link to="/" class="bg-transparent hover:bg-blue-500 text-sm text-green-700 font-semibold hover:text-white py-2 px-3 border border-green-500 hover:border-transparent rounded">Sign In</router-link></div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      email: '',
      password: '',
      password_confirmation: '',
      error: ''
    }
  },
  methods: {
    signup: function () {
      this.$http({
        method: 'post',
        url: '/signup',
        data: {
          email: this.email,
          password: this.password,
          password_confirmation: this.password_confirmation
        }
      })
        .then(response => this.signupSuccessful(response))
        .catch(error => this.siginFailed(error))
    },
    signupSuccessful (response) {
      if (!response.data.csrf) {
        this.signupFailed(response)
        return
      }
      localStorage.csrf = response.data.csrf
      localStorage.access = response.data.access
      localStorage.refresh = response.data.refresh
      localStorage.signedIn = true
      this.error = ''
      this.$router.replace('/tasks')
    },
    signupFailed (error) {
      this.error = (error.response && error.response.data && error.response.data.error) || 'Something went wrong'
      delete localStorage.csrf
      delete localStorage.access
      delete localStorage.signedIn
    },
    checkSignedIn () {
      if (localStorage.signedIn) {
        this.$router.replace('/tasks')
      }
    }
  }
}
</script>
