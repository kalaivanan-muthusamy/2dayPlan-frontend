import React from "react";
import { Container, Row, Col, Card, CardBody, CardTitle, FormInput, Form, FormGroup, Button } from "shards-react";
class Login extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      allTasks: [],
      tasks: [],
      view: 'today'
    }
  }

  render() {
    return (
      <Container>
        <br/><br/><br/>
        <br/><br/><br/>
        <Row>
          <Col sm={{size: 5, offset: 3}}>
            <Card>
              <CardBody>
                <CardTitle className='text-center pb-4'>mileStone Login</CardTitle>
                <Form>
                 <FormGroup>
                   <label htmlFor="username">Username</label>
                   <FormInput id="username" placeholder="Username" />
                 </FormGroup>
                 <FormGroup>
                   <label htmlFor="password">Password</label>
                   <FormInput type="password" id="#password" placeholder="Password" />
                 </FormGroup>
                 <FormGroup>
                   <Button>Login</Button>
                 </FormGroup>
               </Form>
              </CardBody>
            </Card>
            </Col>
        </Row>
      </Container>
    )
  }

}

export default Login;
