const server = process.env.NODE_ENV === 'production' ? process.env.APIEndpoint : 'http://localhost:8001'
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
