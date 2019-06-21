const server = process.env.REACT_APP_APIEndpoint || 'http://localhost:8001/api'
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
