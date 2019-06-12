import React from "react";
import { Container, Row, Col, Card, CardBody, CardTitle, FormInput, Form, FormGroup, Button, Alert } from "shards-react";
import endpoints from '../endpoints'
import axios from 'axios'
import logo from '../images/logo.png'

class Login extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      email: '',
      password: '',
      error: false,
      errorMsg: '',
      loading: false
    }
    this.onLogin = this.onLogin.bind(this)
  }

  async onLogin() {
    const { email, password } = this.state

    const loginUrl = endpoints.login
    const postData = {
      email: email,
      password: password
    }
    const result = await axios.post(loginUrl, postData)
    if(result.status === 200 && result.data.status) {
      localStorage.setItem('access_token', result.data.access_token);
      localStorage.setItem('2dayPlan-luname', result.data.user.name || 'My Account');
      this.props.history.push(`/tasks`)
    } else {
      this.setState({
        error: true,
        errorMsg: result.data.message
      })
    }
  }

  onInputChange(e, field) {
    this.setState({ [field]: e.target.value })
  }

  render() {
    const { email, password, error, errorMsg } = this.state
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
                   <label htmlFor="username">Email</label>
                   <FormInput value={email} onChange={e => this.onInputChange(e, 'email')} id="email" placeholder="Email" />
                 </FormGroup>
                 <FormGroup>
                   <label htmlFor="password">Password</label>
                   <FormInput value={password} type="password" onChange={e => this.onInputChange(e, 'password')} id="password" placeholder="Password" />
                 </FormGroup>
                 <FormGroup>
                   <Button onClick={this.onLogin}>Login</Button>
                   <a href='/register' className='float-right btn btn-link'>Register</a>
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

export default Login;
