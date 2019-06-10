import React from 'react'
import {
  Button,
  Modal,
  ModalBody,
  ModalHeader,
  Form,
  FormGroup,
  FormInput,
  DatePicker
} from "shards-react";
import moment from 'moment'

class AddTask extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      task: {
        task_details: '',
        target_date: moment().format('YYYY-MM-DD')
      }
    }
  }

  onInputChange(e, field) {
    let val = ''
    if(field === 'target_date'){
      val = e
    } else {
      val = e.target.value
    }
    this.setState({ task: { ...this.state.task, [field]: val }})
  }

  render() {
    const { task } = this.state
    const { toggle, onNewTaskSubmit } = this.props
    return (
      <Modal open toggle={toggle}>
        <ModalHeader>Add New Task</ModalHeader>
        <ModalBody>
          <Form>
            <FormGroup>
              <label htmlFor="task">Task</label>
              <FormInput value={task.task_details} onChange={e => this.onInputChange(e, 'task_details')} id="task" placeholder="Task Details" />
            </FormGroup>
            <FormGroup>
              <label htmlFor="targetDate">Target Date</label>
              <DatePicker
                className="form-control"
                id="targetDate"
                selected={moment(task.target_date).toDate()}
                dateFormat="dd-MM-yyyy"
                onChange={(e) => this.onInputChange(e, 'target_date')}
                placeholderText="Target Date"
                dropdownMode="select"
              />
            </FormGroup>
            <Button type='button' onClick={() => onNewTaskSubmit(task)}>Submit</Button>
          </Form>
        </ModalBody>
      </Modal>
    )
  }
}

export default AddTask
