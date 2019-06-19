import React from "react";
import { Container, Row, Col, Form, FormInput, FormGroup, FormTextarea, Button, Alert } from "shards-react";
import logo from '../images/logo.png'
import Footer from '../components/common/Footer'
import FormValidator from '../Utils/FormValidator'
import FrontTitle from "../components/common/FrontTitle";
import axios from 'axios'
import endpoints from '../endpoints'

class Feedback extends React.Component {

  constructor(props){
    super(props)

    this.state = {
      name: '',
      email: '',
      feedback: '',
      formNotification: {
        visible: false,
        error: true,
        messages: []
      }
    }

    this.validator = new FormValidator([
      {
        field: 'name',
        method: 'isEmpty',
        validWhen: false,
        message: 'Name value is required.'
      },
      {
        field: 'email',
        method: 'isEmail',
        validWhen: true,
        message: 'Email value must be an valid email',
        optional: true
      },
      {
        field: 'feedback',
        method: 'isEmpty',
        validWhen: false,
        message: 'Feedback value is required'
      }
    ]);

    axios.defaults.headers.common['Authorization'] = localStorage.getItem('access_token') || '';
    this.onFeedbackSubmit = this.onFeedbackSubmit.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
  }

  async onFeedbackSubmit(e) {
    e.preventDefault()
    const validation = this.validator.validate(this.state);
    if(!validation.isValid) {
      this.setState({ formNotification: { visible: true, error: true, messages: validation.errors } })
    } else {
      const postData = {
        email: this.state.email,
        name: this.state.name,
        feedback: this.state.feedback
      }
      const result = await axios.post(endpoints.addFeedback, postData)
      if(result.status === 200 && result.data.status) {
        this.setState({ name: '', email: '', feedback: '', formNotification: { visible: true, error: false, messages: ['Feedback submitted successfully!'] }})
      } else {
        this.setState({ formNotification: { visible: true, error: true, messages: ['Unable to submit the feedback now'] }})
      }
    }
  }

  handleInputChange(e) {
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  render() {
    const { formNotification, name, email, feedback } = this.state
    return (
      <React.Fragment>
        <header>
          <Container>
            <Row>
              <Col>
                <div className='brand'>
                  {<img
                    id="main-logo"
                    className="d-inline-block align-top mr-2"
                    style={{ maxWidth: "180px" }}
                    src={logo}
                    alt="2dayPlan"
                  />}
                </div>
              </Col>
            </Row>
          </Container>
        </header>
        <main>
          <FrontTitle title='Feedback'/>
          <Container>
            <Row>
              <Col className='pt-3'>

                <Form>
                  <FormGroup>
                    <label htmlFor="name">Name <span aria-hidden='true'>*</span><span className='sr-only'>Required</span></label>
                    <FormInput id="name" name="name" value={name} onChange={this.handleInputChange} placeholder="Name" />
                  </FormGroup>
                  <FormGroup>
                    <label htmlFor="email">Email</label>
                    <FormInput type="email" name="email" value={email} onChange={this.handleInputChange}  id="email" placeholder="Email" />
                  </FormGroup>
                  <FormGroup>
                    <label htmlFor="feedback">Feedback <span aria-hidden='true'>*</span><span className='sr-only'>Required</span></label>
                    <FormTextarea name="feedback" value={feedback} onChange={this.handleInputChange}  placeholder='Enter your feedback here!'/>
                  </FormGroup>
                  { formNotification.visible &&
                    <Alert theme={formNotification.error ? 'danger' : 'success'}>
                      {formNotification.messages.map(msg => <li key={msg}>{msg}</li>)}
                    </Alert>
                  }
                  <FormGroup>
                    <Button onClick={this.onFeedbackSubmit}>Submit</Button>
                  </FormGroup>
                </Form>
              </Col>
            </Row>
          </Container>
        </main>
        <Footer/>
      </React.Fragment>
    )
  }

}

export default Feedback;
