import React from "react";
import { Container, Row, Col, Form, FormInput, FormGroup, FormTextarea, Button, Alert } from "shards-react";
import logo from '../images/logo.png'
import FooterLinks from '../components/common/FooterLinks'
import FormValidator from '../Utils/FormValidator'

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

    this.onFeedbackSubmit = this.onFeedbackSubmit.bind(this)
    this.handleInputChange = this.handleInputChange.bind(this)
  }

  onFeedbackSubmit(e) {
    e.preventDefault()
    const validation = this.validator.validate(this.state);
    if(!validation.isValid) {
      this.setState({ formNotification: { visible: true, error: true, messages: validation.errors } })
    } else {
      // Feedback API to be developed
      this.setState({ formNotification: { visible: true, error: false, messages: ['Feedback submitted successfully!'] } })
    }

  }

  handleInputChange(e) {
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  render() {
    const { formNotification } = this.state
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
          <Container>
            <Row>
              <Col className='pt-3'>
                <h1 className='h3'>Feedback</h1><br/>
                <Form>
                  <FormGroup>
                    <label htmlFor="name">Name <span aria-hidden='true'>*</span><span className='sr-only'>Required</span></label>
                    <FormInput id="name" name="name" onChange={this.handleInputChange} placeholder="Name" />
                  </FormGroup>
                  <FormGroup>
                    <label htmlFor="email">Email</label>
                    <FormInput type="email" name="email" onChange={this.handleInputChange}  id="email" placeholder="Email" />
                  </FormGroup>
                  <FormGroup>
                    <label htmlFor="feedback">Feedback <span aria-hidden='true'>*</span><span className='sr-only'>Required</span></label>
                    <FormTextarea name="feedback" onChange={this.handleInputChange}  placeholder='Enter your feedback here!'/>
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
        <footer>
          <Container>
            <ul className='links'>
              <FooterLinks/>
            </ul>
          </Container>
        </footer>
      </React.Fragment>
    )
  }

}

export default Feedback;
