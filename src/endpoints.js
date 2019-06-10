const server = process.env.PROD_API || 'http://localhost:8001'

const endpoints = {
  login: `${server}/users/login`,
  allTask: `${server}/tasks`,
  addTask: `${server}/tasks`,
  updateTask: `${server}/tasks`,
  deleteTask: `${server}/tasks`
}

export default endpoints
