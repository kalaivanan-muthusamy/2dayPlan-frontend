import React from "react"
import { Container, Row, Col, Card, CardBody, CardTitle, FormInput, Form, FormGroup, Button, Alert } from "shards-react"
import { Link } from 'react-router-dom'
import endpoints from '../endpoints'
import axios from 'axios'
import logo from '../images/logo.png'
import { toast } from 'react-toastify'

class Register extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      name: '',
      email: '',
      password: '',
      error: false,
      errorMsg: '',
      loading: false
    }
    this.onRegister = this.onRegister.bind(this)
  }

  async onRegister() {
    const { name, email, password } = this.state

    const postData = {
      name: name,
      email: email,
      password: password
    }
    const result = await axios.post(endpoints.register, postData)
    if(result.status === 200 && result.data.status) {
      toast.success('Registration successful. Please login!');
      this.props.history.push(`/login`)
    } else {
      this.setState({
        error: true,
        errorMsg: result.data.message || 'Unable to handle the request now'
      })
    }
  }

  onInputChange(e, field) {
    this.setState({ [field]: e.target.value })
  }

  render() {
    const { name, email, password, error, errorMsg } = this.state
    return (
      <Container>
        <br/><br/><br/>
        <Row>
          <Col sm={{size: 5, offset: 3}}>
            <Card>
              <CardBody>
                <CardTitle className='text-center pb-4'>
                {<img
                  id="main-logo"
                  className="d-inline-block align-top mr-2"
                  style={{ maxWidth: "130px" }}
                  src={logo}
                  alt="2dayPlan"
                />}
                </CardTitle>
                <Form>
                  <FormGroup>
                    <label htmlFor="name">Name</label>
                    <FormInput value={name} onChange={e => this.onInputChange(e, 'name')} id="name" placeholder="Name" />
                  </FormGroup>
                 <FormGroup>
                   <label htmlFor="email">Email</label>
                   <FormInput value={email} onChange={e => this.onInputChange(e, 'email')} id="email" placeholder="Email" />
                 </FormGroup>
                 <FormGroup>
                   <label htmlFor="password">Password</label>
                   <FormInput value={password} type="password" onChange={e => this.onInputChange(e, 'password')} id="password" placeholder="Password" />
                 </FormGroup>
                 <FormGroup>
                   <Button onClick={this.onRegister}>Register</Button>
                   <Link to='/login' className='float-right btn btn-link'>Login</Link>
                 </FormGroup>
               </Form>
               { error && <Alert theme='danger'>
                  Error - {errorMsg}
                </Alert>
              }
              </CardBody>
            </Card>
            </Col>
        </Row>
      </Container>
    )
  }

}

export default Register;
