<template>
  <header class="bg-gray-600 py-4">
    <div class="container m-auto flex flex-wrap items-center justify-end">
      <div class="hidden md:flex items-center">
          <svg class="fill-current" viewBox="0 0 24 24" width="24" height="24"><path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z"></path>
          </svg>
        <a href="/" class="uppercase text-sm font-mono pl-4 font-semibold no-underline text-indigo-dark hover:text-gray-900">SIMPLE TODO LIST</a>
      </div>
      <div class="hidden md:flex items-center justify-end space-x-8 md:flex-1 lg:w-0">
        <router-link to="/" class="whitespace-no-wrap text-base leading-6 font-medium text-gray-500 hover:text-gray-900 focus:outline-none focus:text-gray-900" v-if="!signedIn()">Sign in</router-link>
        <router-link to="/signup" class="whitespace-no-wrap text-base leading-6 font-medium text-gray-500 hover:text-gray-900 focus:outline-none focus:text-gray-900" v-if="!signedIn()">Sign Up</router-link>
        <router-link to="/tasks" class="whitespace-no-wrap text-base leading-6 font-medium text-gray-500 hover:text-gray-900 focus:outline-none focus:text-gray-900" v-if="signedIn()">Tasks</router-link>
        <router-link to="/projects" class="whitespace-no-wrap text-base leading-6 font-medium text-gray-500 hover:text-gray-900 focus:outline-none focus:text-gray-900" v-if="signedIn()">Projects</router-link>
        <a href="#" @click.prevent="signOut" class="whitespace-no-wrap text-base leading-6 font-medium text-gray-500 hover:text-gray-900 focus:outline-none focus:text-gray-900" v-if="signedIn()">Sign out</a>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: 'Header',
  created () {
    this.signedIn()
  },
  methods: {
    setError (error, text) {
      this.error = (error.response && error.response.data && error.response.data.error) || text
    },
    signedIn () {
      return localStorage.signedIn
    },
    signOut: function () {
      this.$http({
        method: 'delete',
        url: '/signin'
      })
        .then(response => {
          delete localStorage.csrf
          delete localStorage.signedIn
          delete localStorage.access
          delete localStorage.refresh
          this.$router.replace('/')
        })
        .catch(error => this.setError(error, 'Cannot sign out'))
    }
  }
}
</script>
