import React from "react";
import { Container, Row, Col, Card, CardHeader, CardBody, FormCheckbox, Badge, ButtonToolbar, ButtonGroup, Button } from "shards-react";
import PageTitle from "../components/common/PageTitle";
import UsersByDevice from "./../components/task/UsersByDevice";
import axios from 'axios'
import moment from 'moment'

const handleChange = (e, task) => {

}

class Task extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      allTasks: [],
      tasks: [],
      view: 'today'
    }
  }

  async componentDidMount() {
    const response = await axios.get('http://localhost:8001/tasks/all')
    if(response.status === 200) {
      const tasks = response.data
      const todayTasks = tasks.filter(task => moment(task.target_date).format('DD-MM-YYYY') === moment().format('DD-MM-YYYY'))
      this.setState({ allTasks: tasks, tasks: todayTasks })
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

  render() {
    const { tasks, view } = this.state
    console.log('view', view);
    return (
      <Container fluid className="main-content-container px-4 pb-4">
        {/* Page Header */}
        <Row noGutters className="page-header py-4">
          <PageTitle sm="4" title="Tasks" className="text-sm-left" />
        </Row>

        <Row noGutters className="page-header py-4">
          <ButtonToolbar>
            <ButtonGroup size="sm">
              <Button onClick={() => this.onViewChange('all')} outline={view === 'all' ? null : true } > All</Button>
              <Button onClick={() => this.onViewChange('today')} outline={view === 'today' ? null : true }> Today</Button>
              <Button onClick={() => this.onViewChange('tomorrow')} outline={view === 'tomorrow' ? null : true }> Tomorrow</Button>
              <Button  onClick={() => this.onViewChange('thisMonth')} outline={view === 'thisMonth' ? null : true } >This Month</Button>
            </ButtonGroup>
            </ButtonToolbar>
        </Row>

        <Row>
          {/* Editor */}
          <Col lg="9" md="12">
            {tasks.map(task => (
              <Card key={task._id} small className="mb-3">
                <CardHeader className="border-bottom">
                  <h6 className="m-0">{task.task_details}</h6>
                </CardHeader>
                <CardBody>
                  <Row>
                    <Col>
                      <FormCheckbox
                      checked={task.status}
                      onChange={e => handleChange(e, task)}
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
            {/*<Editor />*/}
          </Col>

          {/* Sidebar Widgets */}
          <Col lg="3" md="12">
            <UsersByDevice />
          </Col>
        </Row>
      </Container>
    )
  }

}

export default Task;
