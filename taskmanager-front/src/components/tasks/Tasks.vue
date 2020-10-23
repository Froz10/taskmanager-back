<template>
  <div class="max-w-lg m-auto py-10">
    <div class="text-red-500 text-xs italic" v-if="error">{{ error }}</div>
    <h3 class="font-mono font-regular text-3xl mb-4">Add a new task</h3>

    <form @submit.prevent="addTask">
      <div class="md:flex md:items-center mb-6">
        <label for="task_name" class="block text-dark-1500 font-bold md:text-right mb-1 md:mb-0 pr-4">Name</label>
        <input
          type="text"
          id="task_name"
          class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
          placeholder="Type a task name"
          v-model="newTask.name">
      </div>

      <div class="md:flex md:items-center mb-6">
        <label for="task_status" class="block text-dark-1500 font-bold md:text-right mb-1 md:mb-0 pr-3">Status</label>
           <div class="inline-block relative w-64">
            <select id="task_status" class="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Status"
            v-model="newTask.status">
              <option disabled value="">Select status</option>
              <option>Completed</option>
              <option>Uncompleted</option>
            </select>
              <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
            </div>
        </div>
      </div>

      <div class="md:flex md:items-center mb-6">
        <label for="project" class="block text-dark-1500 font-bold md:text-right mb-1 md:mb-0 pr-1">Project</label>
          <div class="inline-block relative w-64">
            <select id="project"  class="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline" v-model="newTask.project">
              <option disabled value="">Select an project</option>
              <option :value="project.id" v-for="project in projects" :key="project.id">{{ project.name }}</option>
            </select>
             <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
            </div>
          </div>
      </div>

      <p class="block text-dark-1500 font-bold md:text-left mb-1 md:mb-4 pr-3">Don't see an project? <router-link to="/projects" class="whitespace-no-wrap text-base leading-6 font-medium text-gray-500 hover:text-gray-900 focus:outline-none focus:text-gray-900">Create one</router-link></p>

      <input type="submit" value="Add Task" class="group relative w-full flex justify-center py-4 px-4 border border-transparent text-sm leading-50 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out">
    </form>

    <hr class="border border-grey-light my-6" />

    <ul class="list-reset mt-4">
      <li class="py-4" v-for="task in tasks" :key="task.id" :task="task">
        <div class="flex items-center justify-between flex-wrap">
          <div class="flex-1 flex justify-between flex-wrap pr-3">
          <p class="block flex font-mono font-semibold flex items-center">
            <svg class="fill-current text-indigo w-6 h-6 mr-2" viewBox="0 0 24 24" width="24" height="24"><path fill-rule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clip-rule="evenodd"></path></svg>
            {{ task.name }} &mdash; {{ task.status }}
          </p>
          <p class="block font-mono font-semibold">{{ getProject(task) }}</p>
        </div>

        <button class="bg-transparent hover:bg-green-500 text-sm text-green-700 font-semibold hover:text-white py-2 px-4 mr-2 border border-green-500 hover:border-transparent rounded"
          @click.prevent="editTask(task)">Edit</button>

        <button class="bg-transparent hover:bg-red-600 text-sm text-red-700 font-semibold hover:text-white py-2 px-3 border border-red-500 hover:border-transparent rounded"
         @click.prevent="removeTask(task)">Delete</button>
        </div>

        <div v-if="task == editedTask">
          <form action="" @submit.prevent="updateTask(task)">
            <div class="mb-6 p-4 bg-white rounded border border-grey-light mt-4">

              <div class="md:flex md:items-center mb-6">
                <label class="block text-dark-1500 font-bold md:text-right mb-1 md:mb-0 pr-4">Name</label>
                <input class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500" v-model="task.name">
              </div>

              <div class="md:flex md:items-center mb-6">
                <label class="block text-dark-1500 font-bold md:text-right mb-1 md:mb-0 pr-3">Status</label>
                <div class="inline-block relative w-64">
                <select
                  id="task_status"
                  class="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline" v-model="task.status">
                    <option>Completed</option>
                    <option>Uncompleted</option>
                  </select>
                  <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                  </div>
                </div>
              </div>

              <div class="md:flex md:items-center mb-6">
                <label class="block text-dark-1500 font-bold md:text-right mb-1 md:mb-0 pr-1">Project</label>
                <div class="inline-block relative w-64">
                 <select id="project_update"
                 class="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline" v-model="task.project">
                    <option disabled value="">Select an project</option>
                  <option :value="project.id" v-for="project in projects" :key="project.id">{{ project.name }}</option>
                  </select>
                  <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/></svg>
                  </div>
                </div>
              </div>

              <input type="submit" value="Update" class="py-2 px-2 border border-transparent text-sm leading-50 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo active:bg-indigo-700 transition duration-150 ease-in-out">
            </div>
          </form>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Tasks',
  data () {
    return {
      projects: [],
      tasks: [],
      newTask: [],
      error: '',
      editedTask: ''
    }
  },
  created () {
    if (!localStorage.signedIn) {
      this.$router.replace('/')
    } else {
      this.$http
        .get('/api/v1/tasks')
        .then(response => { this.tasks = response.data })
        .catch(error => this.setError(error, 'Something went wrong'))
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
    getProject (task) {
      const taskProjectValues = this.projects.filter(project => project.id === task.project_id)
      let project
      taskProjectValues.forEach(function (element) {
        project = element.name
      })
      return project
    },
    addTask () {
      const value = this.newTask
      if (!value) {
        return
      }
      this.$http
        .post('/api/v1/tasks', {
          task: { name: this.newTask.name, status: this.newTask.status, project_id: this.newTask.project }
        })
        .then(response => {
          this.tasks.push(response.data)
          this.newTask = ''
        })
        .catch(error => this.setError(error, 'Cannot create task'))
    },
    removeTask (task) {
      this.$http
        .delete(`/api/v1/tasks/${task.id}`)
        .then(response => {
          this.tasks.splice(this.tasks.indexOf(task), 1)
        })
        .catch(error => this.setError(error, 'Cannot delete task'))
    },
    editTask (task) {
      this.editedTask = task
    },
    updateTask (task) {
      this.editedTask = ''
      this.$http
        .patch(`/api/v1/tasks/${task.id}`, { task: { name: task.name, status: task.status, project_id: task.project } })
        .then(response => {
          this.$router.go()
        })
        .catch(error => this.setError(error, 'Cannot update task'))
    }
  }
}
</script>
