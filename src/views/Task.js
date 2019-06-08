import React from "react";
import {
  Container,
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  FormCheckbox,
  Badge,
  ButtonToolbar,
  ButtonGroup,
  Button,
  InputGroup,
  Modal,
  ModalBody,
  ModalHeader,
  Form,
  FormGroup,
  FormInput,
  DatePicker
} from "shards-react";
import PageTitle from "../components/common/PageTitle";
import axios from 'axios'
import moment from 'moment'
import endpoints from '../endpoints'


class Task extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      allTasks: [],
      tasks: [],
      view: 'today',
      addTaskModalOpen: false,
      editTaskModelOpen: false,
      newTask: {
        task_details: '',
        target_date: moment().format('YYYY-MM-DD')
      },
      editTask: {
        task_details: '',
        target_date: ''
      }
    }
  }

  async componentDidMount() {
    try {
        const access_token = localStorage.getItem('access_token') || '';
        const response = await axios.get(endpoints.allTask, { headers: { Authorization: access_token }})
        if(response.status === 200 && response.data.status) {
          const tasks = response.data.tasks
          const todayTasks = tasks.filter(task => moment(task.target_date).format('DD-MM-YYYY') === moment().format('DD-MM-YYYY'))
          this.setState({ allTasks: tasks, tasks: todayTasks })
        } else if(response.status === 401) {
          this.props.history.push('/login')
        } else {
          alert('Failed')
        }
    } catch (error) {
      const response = error.response
      if(response.status === 401) {
        this.props.history.push('/login')
      }
    }
  }

  onViewChange(view) {
    this.setState({ view: view })
    this.updateTasks(view, this.state.allTasks)
  }

  updateTasks(view, allTasks) {
    let tasks = []
    if(view === 'today') {
      tasks = allTasks.filter(task => moment(task.target_date).format('DD-MM-YYYY') === moment().format('DD-MM-YYYY'))
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

  onInputChange(e, field) {
    let val = ''
    if(field === 'target_date'){
      val = e
    } else {
      val = e.target.value
    }
    this.setState({ newTask: { ...this.state.newTask, [field]: val }})
  }

  onEditInputChange(e, field) {
    let val = ''
    if(field === 'target_date'){
      val = e
    } else {
      val = e.target.value
    }
    this.setState({ editTask: { ...this.state.editTask, [field]: val }})
  }

  async handleStatusChange(e, task) {
    try {
      const update = {
        status: !task.status,
        task_id: task._id
      }
      const access_token = localStorage.getItem('access_token') || '';
      const response = await axios.put(endpoints.updateTask, update, { headers: { Authorization: access_token }})
      if(response.status === 200 && response.data.status) {
        this.props.history.push('/task')
      } else if(response.status === 401) {
        this.props.history.push('/login')
      } else {
        alert('Failed')
      }
    } catch (error) {
      const response = error.response || {}
      if(response.status === 401) {
        this.props.history.push('/login')
      }
    }
  }

  async onSubmit() {
    const { newTask } = this.state
    try {
        const access_token = localStorage.getItem('access_token') || '';
        const response = await axios.post(endpoints.addTask, newTask, { headers: { Authorization: access_token }})
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
      const response = error.response
      if(response.status === 401) {
        this.props.history.push('/login')
      }
    }
  }

  toggleModel(model) {
    console.log('model', model);
    this.setState({ [model]: !this.state[model] })
  }

  onEdit(task) {
    this.toggleModel('editTaskModelOpen')
    this.setState({ editTask: task })
    console.log(task);
  }

  async onTaskUpdate() {
    const { editTask } = this.state

    try {
        const newData = {
          task_details: editTask.task_details,
          target_date: moment(editTask.target_date).format(),
          task_id: editTask._id
        }
        console.log('newData',newData);
        const access_token = localStorage.getItem('access_token') || '';
        const response = await axios.put(endpoints.updateTask, newData, { headers: { Authorization: access_token }})
        if(response.status === 200 && response.data.status) {
          this.props.history.push('/task')
        } else if(response.status === 401) {
          this.props.history.push('/login')
        } else {
          alert('Failed')
        }
    } catch (error) {
      const response = error.response
      if(response.status === 401) {
        this.props.history.push('/login')
      }
    }
  }

  render() {
    const { tasks, view, addTaskModalOpen, editTaskModelOpen, newTask, editTask } = this.state
    return (
      <Container fluid className="main-content-container px-4 pb-4">
        {/* Page Header */}
        <Row noGutters className="page-header py-4">
          <PageTitle sm="4" title="Tasks" className="text-sm-left" />
        </Row>

        <Row noGutters className="page-header py-4">
          <Col>
            <ButtonToolbar>
              <InputGroup size="sm" >
                <Button  onClick={() => this.newTask()} outline={view === 'thisMonth' ? null : true } >New Task</Button>
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
          {/* Editor */}
          <Col>
            {tasks.map(task => (
              <Card key={task._id} small className="mb-3">
                <CardHeader className="border-bottom">
                  <h6 className="m-0 d-inline">{task.task_details} </h6>
                  <a className='ml-2 text-secondary' style={{ opacity: .5 }} href="#" onClick={() => this.onEdit(task)}><i className='material-icons'>edit</i></a>
                </CardHeader>
                <CardBody>
                  <Row>
                    <Col>
                      <FormCheckbox
                      checked={task.status}
                      onChange={e => this.handleStatusChange(e, task)}
                      >
                        Completed
                      </FormCheckbox>
                    </Col>
                    <Col className='text-right'>
                      <Badge theme="secondary">Target Date: {moment(task.target_date).format('DD-MM-YYYY')}</Badge>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            ))}
          </Col>
        </Row>
        <Modal open={addTaskModalOpen} toggle={() => this.toggleModel('addTaskModalOpen')}>
          <ModalHeader>Add New Task</ModalHeader>
          <ModalBody>
            <Form>
              <FormGroup>
                <label htmlFor="task">Task</label>
                <FormInput value={newTask.task_details} onChange={e => this.onInputChange(e, 'task_details')} id="task" placeholder="Task Details" />
              </FormGroup>
              <FormGroup>
                <label htmlFor="targetDate">Target Date</label>
                <DatePicker
                  className="form-control"
                  id="targetDate"
                  selected={moment(newTask.target_date).toDate()}
                  dateFormat="dd-MM-yyyy"
                  onChange={(e) => this.onInputChange(e, 'target_date')}
                  placeholderText="Target Date"
                  dropdownMode="select"
                />
              </FormGroup>
              <Button type='button' onClick={() => this.onSubmit()}>Submit</Button>
            </Form>
          </ModalBody>
        </Modal>
        <Modal open={editTaskModelOpen} toggle={() => this.toggleModel('editTaskModelOpen')}>
          <ModalHeader>Update Task</ModalHeader>
          <ModalBody>
            <Form>
              <FormGroup>
                <label htmlFor="task">Task</label>
                <FormInput value={editTask.task_details} onChange={e => this.onEditInputChange(e, 'task_details')} id="task" placeholder="Task Details" />
              </FormGroup>
              <FormGroup>
                <label htmlFor="targetDate">Target Date</label>
                <br/>
                <DatePicker
                  className="form-control"
                  id="targetDate"
                  selected={moment(editTask.target_date).toDate()}
                  dateFormat="dd-MM-yyyy"
                  onChange={(e) => this.onEditInputChange(e, 'target_date')}
                  placeholderText="Target Date"
                  dropdownMode="select"
                />
              </FormGroup>
              <Button type='button' onClick={() => this.onTaskUpdate()}>Submit</Button>
            </Form>
          </ModalBody>
        </Modal>
      </Container>
    )
  }

}

export default Task;
