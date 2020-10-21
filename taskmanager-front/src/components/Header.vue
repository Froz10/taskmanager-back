<template>
  <header class="bg-gray-600 py-4">
    <div class="container m-auto flex flex-wrap items-center justify-end">
      <div class="flex-1 flex items-center">
        <svg class="fill-current " viewBox="0 0 24 24" width="24" height="24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
        </svg>
        <a href="/" class="uppercase text-sm font-mono pl-4 font-semibold no-underline text-indigo-dark hover:text-gray-900">SIMPLE TODO LIST</a>
      </div>
      <div class="hidden md:flex items-center justify-end space-x-8 md:flex-1 lg:w-0">
        <router-link to="/" class="whitespace-no-wrap text-base leading-6 font-medium text-gray-500 hover:text-gray-900 focus:outline-none focus:text-gray-900" v-if="!signedIn()">Sign in</router-link>
        <router-link to="/signup" class="whitespace-no-wrap text-base leading-6 font-medium text-gray-500 hover:text-gray-900 focus:outline-none focus:text-gray-900" v-if="!signedIn()">Sign Up</router-link>
        <router-link to="/tasks" class="link-grey px-2 no-underline" v-if="signedIn()">Tasks</router-link>
        <router-link to="/projects" class="link-grey px-2 no-underline" v-if="signedIn()">Projects</router-link>
        <a href="#" @click.prevent="signOut" class="link-grey px-2 no-underline" v-if="signedIn()">Sign out</a>
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
