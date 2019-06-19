import React, { Fragment } from "react";
import {
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  FormCheckbox,
  ButtonGroup,
  Button
} from "shards-react";
import moment from 'moment'

class Task extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      status: this.props.task.status
    }
  }

  onStatusChange(e, task) {
    const updateTask = { ...task, status: !this.state.status }
    this.props.onTaskUpdate(updateTask, true)
    this.setState({
      status: !this.state.status
    })
  }

  isExpired(task) {
    const today = moment().format('DD-MM-YYYY')
    const target = moment(task.target_date).format('DD-MM-YYYY')
    const isExpired = today !== target && moment().isAfter(moment(task.target_date))
    return !task.status && isExpired
  }

  render() {
    const { task, onEditClick, onDeleteTask } = this.props
    const { status } = this.state
    return (
      <Fragment>
        <Card key={task._id} small className="mb-3">
          <CardHeader className="border-bottom">
            <Row>
              <Col>
                <h6 className="m-0 d-inline">{task.task_details} </h6>
              </Col>
              <Col className='text-right'>
                <small style={this.isExpired(task) ? {color: 'red'} : {}}>Target Date: {moment(task.target_date).format('DD-MM-YYYY')}</small>
              </Col>
            </Row>
          </CardHeader>
          <CardBody>
            <Row>
              <Col>
                <FormCheckbox
                  checked={status}
                  onChange={e => this.onStatusChange(e, task)}
                >
                  Completed
                </FormCheckbox>
              </Col>
              <Col className='text-right'>
                <ButtonGroup size="sm">
                  <Button onClick={() => onEditClick(task)} className='text-light' outline theme="light">Edit</Button>
                  <Button onClick={() => onDeleteTask(task)} className='text-light' outline theme="light">Delete</Button>
                </ButtonGroup>
              </Col>
            </Row>
          </CardBody>
        </Card>
      </Fragment>
    )
  }
}

export default Task
