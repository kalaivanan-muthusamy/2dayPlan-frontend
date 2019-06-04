const server = 'http://localhost:8001'

const endpoints = {
  login: `${server}/login`,
  allTask: `${server}/tasks/all`,
  addTask: `${server}/tasks/add`,
  updateTask: `${server}/tasks/update`
}

export default endpoints
