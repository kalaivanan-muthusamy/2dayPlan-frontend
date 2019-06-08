const server = 'http://localhost:8001'

const endpoints = {
  login: `${server}/users/login`,
  allTask: `${server}/tasks`,
  addTask: `${server}/tasks`,
  updateTask: `${server}/tasks`
}

export default endpoints
