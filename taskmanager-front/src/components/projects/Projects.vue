<template>
  <div class="max-w-md m-auto py-10">
    <div class="text-red-500 text-xs italic" v-if="error">{{ error }}</div>
    <h3 class="font-mono font-regular text-3xl mb-4">Add a new project</h3>

    <form action="" @submit.prevent="addProject">
      <div class="md:flex md:items-center mb-6">
        <input class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
          placeholder="Type an project name"
          v-model="newProject.name" />
      </div>
      <input type="submit" value="Add Project" class="group relative w-full flex justify-center py-4 px-4 border border-transparent text-sm leading-50 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out" />
    </form>

    <hr class="border border-grey-light my-6" />

    <ul class="list-reset mt-4">
      <li class="py-4" v-for="project in projects" :key="project.id" :project="project">

        <div class="flex items-center justify-between flex-wrap">
          <p class="block flex-1 font-mono font-semibold flex items-center ">
            <svg class="fill-current text-indigo w-6 h-6 mr-2" viewBox="0 0 20 20" width="20" height="20"><title> project</title><path d="M15.75 8l-3.74-3.75a3.99 3.99 0 0 1 6.82-3.08A4 4 0 0 1 15.75 8zm-13.9 7.3l9.2-9.19 2.83 2.83-9.2 9.2-2.82-2.84zm-1.4 2.83l2.11-2.12 1.42 1.42-2.12 2.12-1.42-1.42zM10 15l2-2v7h-2v-5z"></path></svg>
            {{ project.name }}
          </p>
          <button class="bg-tranparent text-sm hover:bg-green-500 text-white text-green-700 border border-green-500 hover:text-white font-bold py-2 px-4 mr-2 rounded"
          @click.prevent="editProject(project)">Edit</button>

          <button class="bg-transparent hover:bg-red-600 text-sm text-red-700 font-semibold hover:text-white py-2 px-3 border border-red-500 hover:border-transparent rounded"
         @click.prevent="removeProject(project)">Delete</button>
        </div>

        <div v-if="project == editedProject">
          <form action="" @submit.prevent="updateProject(project)">
            <div class="mb-6 p-4 bg-white rounded border border-grey-light mt-4">
              <input class="input" v-model="project.name" />
              <input type="submit" value="Update" class=" my-2 bg-transparent text-sm hover:bg-blue hover:text-white text-blue border border-blue no-underline font-bold py-2 px-4 rounded cursor-pointer">
            </div>
          </form>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Projects',
  data () {
    return {
      projects: [],
      newProject: [],
      error: '',
      editedProject: ''
    }
  },
  created () {
    if (!localStorage.signedIn) {
      this.$router.replace('/')
    } else {
      this.$http
        .get('/api/v1/projects')
        .then(response => { this.projects = response.data })
        .catch(error => this.setError(error, 'Something went wrong'))
    }
  },
  methods: {
    setError (error, text) {
      this.error = (error.response && error.response.data && error.response.data.error) || text
    },
    addProject () {
      const value = this.newProject
      if (!value) {
        return
      }
      this.$http
        .post('/api/v1/projects', {
          project: { name: this.newProject.name } })
        .then(response => {
          this.projects.push(response.data)
          this.newProject = ''
        })
        .catch(error => this.setError(error, 'Cannot create project'))
    },
    removeProject (project) {
      this.$http
        .delete(`/api/v1/projects/${project.id}`)
        .then(response => {
          this.projects.splice(this.projects.indexOf(project), 1)
        })
        .catch(error => this.setError(error, 'Cannot delete project'))
    },
    editProject (project) {
      this.editedProject = project
    },
    updateProject (project) {
      this.editedProject = ''
      this.$http
        .patch(`/api/v1/projects/${project.id}`, { project: { name: project.name } })
        .catch(error => this.setError(error, 'Cannot update project'))
    }
  }
}
</script>
