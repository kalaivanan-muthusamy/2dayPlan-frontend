const server = 'https://milestone-tasker-api.herokuapp.com/'
const endpoints = {
  login: `${server}/users/login`,
  allTask: `${server}/tasks`,
  addTask: `${server}/tasks`,
  updateTask: `${server}/tasks`,
  deleteTask: `${server}/tasks`
}

export default endpoints
