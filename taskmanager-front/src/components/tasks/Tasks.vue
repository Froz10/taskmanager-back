<template>
  <div class="max-w-md m-auto py-10">
    <div class="text-red" v-if="error">{{ error }}</div>
    <h3 class="font-mono font-regular text-3xl mb-4">Add a new task</h3>

    <form @submit.prevent="addTask">
      <div class="mb-6">
        <label for="task_name" class="label">Name</label>
        <input
          type="text"
          id="task_name"
          class="input"
          autofocus
          autocomplete="off"
          placeholder="Type a task name"
          v-model="newTask.name">
      </div>

      <div class="mb-6">
        <label for="task_status" class="label">Status</label>
        <input
          type="text"
          id="task_status"
          class="input"
          autofocus
          autocomplete="off"
          placeholder="status"
          v-model="newTask.status">
      </div>

      <div class="mb-6">
        <label for="project" class="label">Project</label>
        <select id="project" class="select" v-model="newTask.project">
          <option disabled value="">Select an project</option>
          <option :value="project.id" v-for="project in projects" :key="project.id">{{ project.name }}</option>
        </select>
        <p class="pt-4">Don't see an project? <router-link to="/projects" class="link-grey">Create one</router-link></p>
      </div>

      <input type="submit" value="Add Task" class="font-sans font-bold px-4 rounded cursor-pointer no-underline bg-green hover:bg-green-dark block w-full py-4 text-white items-center justify-center">
    </form>

    <hr class="border border-grey-light my-6" />

    <ul class="list-reset mt-4">
      <li class="py-4" v-for="task in tasks" :key="task.id" :task="task">
        <div class="flex items-center justify-between flex-wrap">
          <div class="flex-1 flex justify-between flex-wrap pr-4">
          <p class="block flex font-mono font-semibold flex items-center">
            <svg class="fill-current text-indigo w-6 h-6 mr-2" viewBox="0 0 24 24" width="24" height="24"><title>Task</title><path d="M23.938 10.773a11.915 11.915 0 0 0-2.333-5.944 12.118 12.118 0 0 0-1.12-1.314A11.962 11.962 0 0 0 12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12c0-.414-.021-.823-.062-1.227zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm0-5a1 1 0 1 0 0 2 1 1 0 0 0 0-2z" ></path></svg>
            {{ task.name }} &mdash; {{ task.status }}
          </p>
          <p class="block font-mono font-semibold">{{ getProject(task) }}</p>
        </div>

        <button class="bg-transparent text-sm hover:bg-blue hover:text-white text-blue border border-blue no-underline font-bold py-2 px-4 mr-2 rounded"
          @click.prevent="edittask(task)">Edit</button>

        <button class="bg-transparent text-sm hover:bg-red text-red hover:text-white no-underline font-bold py-2 px-4 rounded border border-red"
         @click.prevent="removetask(task)">Delete</button>
        </div>

        <div v-if="task == editedTask">
          <form action="" @submit.prevent="updateTask(task)">
            <div class="mb-6 p-4 bg-white rounded border border-grey-light mt-4">

              <div class="mb-6">
                <label class="label">Name</label>
                <input class="input" v-model="task.name">
              </div>

              <div class="mb-6">
                <label class="label">Status</label>
                <input class="input" v-model="task.status">
              </div>

              <div class="mb-6">
                 <select id="project_update" class="select" v-model="task.project">
                    <option disabled value="">Select an project</option>
                  <option :value="project.id" v-for="project in projects" :key="project.id">{{ project.name }}</option>
                  </select>
              </div>

              <input type="submit" value="Update" class="bg-transparent text-sm hover:bg-blue hover:text-white text-blue border border-blue no-underline font-bold py-2 px-4 mr-2 rounded">
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
      this.$http.secured.get('/api/v1/tasks')
        .then(response => { this.tasks = response.data })
        .catch(error => this.setError(error, 'Something went wrong'))
      this.$http.secured.get('/api/v1/projects')
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
      this.$http.secured.post('/api/v1/tasks/', { task: { name: this.newTask.title, status: this.newTask.status, project_id: this.newTask.project } })
        .then(response => {
          this.tasks.push(response.data)
          this.newTask = ''
        })
        .catch(error => this.setError(error, 'Cannot create task'))
    },
    removeTask (task) {
      this.$http.secured.delete(`/api/v1/tasks/${task.id}`)
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
      this.$http.secured.patch(`/api/v1/tasks/${task.id}`, { task: { name: task.name, status: task.status, project_id: task.project } })
        .catch(error => this.setError(error, 'Cannot update task'))
    }
  }
}
</script>
