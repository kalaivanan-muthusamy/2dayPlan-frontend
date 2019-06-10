import React from "react";
import {
  Container,
  Row,
  Col,
  ButtonToolbar,
  ButtonGroup,
  Button,
  InputGroup
} from "shards-react";
import PageTitle from "../../components/common/PageTitle";
import Task from './Task'
import EditTask from './EditTask'
import AddTask from './AddTask'
import axios from 'axios'
import moment from 'moment'
import endpoints from '../../endpoints'


class Tasks extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      allTasks: [],
      tasks: [],
      view: 'today',
      addTaskModalOpen: false,
      editTaskModelOpen: false,
      editTask: {}
    }

    this.onEditClick = this.onEditClick.bind(this)
    this.onNewTaskSubmit = this.onNewTaskSubmit.bind(this)
    this.onTaskUpdate = this.onTaskUpdate.bind(this)
    this.onDeleteTask = this.onDeleteTask.bind(this)

    axios.defaults.headers.common['Authorization'] = localStorage.getItem('access_token') || '';
  }

  async componentDidMount() {
    try {
        const access_token = localStorage.getItem('access_token') || '';
        const response = await axios.get(endpoints.allTask, { headers: { Authorization: access_token }})
        if(response.status === 200 && response.data.status) {
          const tasks = response.data.tasks
          const todayTasks = this.getTodayTask(tasks)
          this.setState({ allTasks: tasks, tasks: todayTasks })
        } else if(response.status === 401) {
          this.props.history.push('/login')
        } else {
          alert('Failed')
        }
    } catch (error) {
      const response = error.response || null
      if(response && response.status === 401) {
        this.props.history.push('/login')
      }
    }
  }

  onViewChange(view) {
    this.setState({ view: view })
    this.updateTasks(view, this.state.allTasks)
  }

  getTodayTask (allTasks) {
    return allTasks.filter(task => {
      const target_date = moment(task.target_date).format('DD-MM-YYYY')
      const sameDate = moment(target_date).isSame(moment().format('DD-MM-YYYY'))
      const expired = moment(target_date).isBefore(moment().format('DD-MM-YYYY'))
      return sameDate || (!task.status && expired)
    })
  }

  updateTasks(view, allTasks) {
    let tasks = []
    if(view === 'today') {
      tasks = this.getTodayTask(allTasks)
    }
    else if(view === 'tomorrow') {
      tasks = allTasks.filter(task => moment(task.target_date).format('DD-MM-YYYY') === moment().add(1, 'd').format('DD-MM-YYYY'))
    }
    else if(view === 'thisMonth') {
      tasks = allTasks.filter(task => moment(task.target_date).format('MM-YYYY') === moment().format('MM-YYYY'))
    }
    else {
      tasks = allTasks
    }
    this.setState({ tasks })
  }

  newTask() {
    this.setState({ addTaskModalOpen: true })
  }

  /**
  * Create new Task
  *
  */
  async onNewTaskSubmit(task) {
    try {
        const access_token = localStorage.getItem('access_token') || '';
        const response = await axios.post(endpoints.addTask, task, { headers: { Authorization: access_token }})
        if(response.status === 200 && response.data.status) {
          const task = response.data.task
          const allTasks = [ ...this.state.allTasks, task ]
          this.setState({ allTasks: allTasks, addTaskModalOpen: false })
          this.updateTasks(this.state.view, allTasks)
        } else if(response.status === 401) {
          this.props.history.push('/login')
        } else {
          alert('Failed')
        }
    } catch (error) {
      const response = error.response || null
      if(response && response.status === 401) {
        this.props.history.push('/login')
      }
    }
  }

  /**
  * Toggle the Add Task / Edit Task Model
  *
  */
  toggleModel(model) {
    this.setState({ [model]: !this.state[model] })
  }

  /**
  * Open the Edit Task model with required inputs
  *
  */
  onEditClick(task) {
    this.toggleModel('editTaskModelOpen')
    this.setState({ editTask: task })
  }

  /**
  * Update the Task
  *
  */
  async onTaskUpdate(task, onlyStatus = false) {
    try {
        const updatedTask = {
          task_details: task.task_details,
          target_date: moment(task.target_date).format(),
          task_id: task._id,
          status: task.status
        }
        const access_token = localStorage.getItem('access_token') || '';
        const response = await axios.put(endpoints.updateTask, updatedTask, { headers: { Authorization: access_token }})
        if(response.status === 200 && response.data.status) {
          !onlyStatus && this.toggleModel('editTaskModelOpen')
          // Replace this task in the allTask state object with updated value
          let allTasks = [ ...this.state.allTasks ]
          const index = allTasks.findIndex(t => t._id === task._id)
          allTasks[index] = task
          this.setState({ allTasks: allTasks })
          this.updateTasks(this.state.view, allTasks)
        } else if(response.status === 401) {
          this.props.history.push('/login')
        } else {
          alert('Failed')
        }
    } catch (error) {
      const response = error.response || null
      if(response && response.status === 401) {
        this.props.history.push('/login')
      }
    }
  }

  /**
  * Detelet the Tasks
  *
  */
  async onDeleteTask(task) {
    try {
        const response = await axios.delete(endpoints.deleteTask, { data: { task_id: task._id } })
        if(response.status === 200 && response.data.status) {
          // Replace this task in the allTask state object with updated value
          let allTasks = [ ...this.state.allTasks ]
          const index = allTasks.findIndex(t => t._id === task._id)
          allTasks.splice(index, 1)
          this.setState({ allTasks: allTasks })
          this.updateTasks(this.state.view, allTasks)
        } else if(response.status === 401) {
          this.props.history.push('/login')
        } else {
          alert('Failed')
        }
    } catch (error) {
      const response = error.response || null
      if(response && response.status === 401) {
        this.props.history.push('/login')
      }
    }
  }

  render() {
    const { tasks, view, addTaskModalOpen, editTaskModelOpen, editTask } = this.state
    return (
      <Container fluid className="main-content-container px-4 pb-4">

        <Row noGutters className="page-header py-4">
          <PageTitle sm="4" title="Tasks" className="text-sm-left" />
        </Row>

        <Row noGutters className="page-header py-4">
          <Col>
            <ButtonToolbar>
              <InputGroup size="sm" >
                <Button  onClick={() => this.newTask()} outline>New Task</Button>
              </InputGroup>
              <ButtonGroup size="sm" className="ml-auto mr-2">
                <Button onClick={() => this.onViewChange('all')} outline={view === 'all' ? null : true } > All</Button>
                <Button onClick={() => this.onViewChange('today')} outline={view === 'today' ? null : true }> Today</Button>
                <Button onClick={() => this.onViewChange('tomorrow')} outline={view === 'tomorrow' ? null : true }> Tomorrow</Button>
                <Button  onClick={() => this.onViewChange('thisMonth')} outline={view === 'thisMonth' ? null : true } >This Month</Button>
              </ButtonGroup>
            </ButtonToolbar>
          </Col>
        </Row>

        <Row>
          <Col>
            {tasks && tasks.map(task => {
              return (<Task
                key={task._id}
                task={task}
                onEditClick={this.onEditClick}
                onStatusChange={this.onStatusChange}
                onDeleteTask={this.onDeleteTask}
                onTaskUpdate={this.onTaskUpdate}
              />)
            })}
          </Col>
        </Row>

        { addTaskModalOpen && <AddTask onNewTaskSubmit={this.onNewTaskSubmit} toggle={() => this.toggleModel('addTaskModalOpen')} /> }
        { editTaskModelOpen && <EditTask  onTaskUpdate={this.onTaskUpdate} task={editTask} toggle={() => this.toggleModel('editTaskModelOpen')} /> }
      </Container>
    )
  }

}

export default Tasks;
