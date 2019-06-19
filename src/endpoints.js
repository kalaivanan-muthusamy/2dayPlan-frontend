const server = 'http://localhost:8001' || 'https://milestone-tasker-api.herokuapp.com'
const endpoints = {
  register: `${server}/users/register`,
  login: `${server}/users/login`,
  userDetails: `${server}/users`,
  updateUser: `${server}/users`,
  allTask: `${server}/tasks`,
  addTask: `${server}/tasks`,
  updateTask: `${server}/tasks`,
  deleteTask: `${server}/tasks`,
  addFeedback: `${server}/feedback`,
}

export default endpoints
