import React from "react";
import { Container, Row, Col, Card, CardBody, FormInput, Form, FormGroup, Button } from "shards-react";
import endpoints from '../endpoints'
import { toast } from 'react-toastify'
import axios from 'axios'
import PageTitle from "../components/common/PageTitle";
class Profile extends React.Component {

  constructor(props){
    super(props)
    this.state = {
      name: '',
      email: '',
      password: '',
      cpassword: '',
    }
    this.onUpdateProfile = this.onUpdateProfile.bind(this)
  }

  async onUpdateProfile() {
    const { name, password, cpassword } = this.state
    let updatedData = {
      name: name
    }
    if(password && password === cpassword) {
      updatedData.password = password
    }
    const access_token = localStorage.getItem('access_token') || '';
    try {
      const result = await axios.post(endpoints.updateUser, updatedData, { headers: { Authorization: access_token }})
      if(result.status === 200 && result.data.status) {
        localStorage.setItem('2dayPlan-luname', name|| 'My Account');
        toast.success('Profile updated successfully');
      } else {
        toast.error('Unable to update the profile');
      }
    } catch (e) {
      toast.error('Unable to update the profile');
    }
  }

  onInputChange(e, field) {
    this.setState({ [field]: e.target.value })
  }

  async componentDidMount() {
    const access_token = localStorage.getItem('access_token') || '';
    try {
        const response = await axios.get(endpoints.userDetails, { headers: { Authorization: access_token }} )
        if(response && response.data.status) {
          const user = response.data.user
          this.setState({ name: user.name, email: user.email, user })
        }

    }
    catch (error) {
      // If endpoint response error
      error.response.status === 401 && this.props.history.push('/login')
    }
  }

  render() {
    const { name, email, password, cpassword } = this.state
    return (
      <Container fluid className="main-content-container px-4 pb-4">
        <Row noGutters className="page-header py-4">
          <PageTitle sm="4" title="Profile" className="text-sm-left" />
        </Row>
        <Row noGutters className="page-header py-4">
          <Col>
            <Card>
              <CardBody>
                <Form>
                  <FormGroup>
                    <label htmlFor="name">Name</label>
                    <FormInput value={name} onChange={e => this.onInputChange(e, 'name')} id="name" placeholder="Name" />
                  </FormGroup>
                 <FormGroup>
                   <label htmlFor="username">Email</label>
                   <FormInput readOnly value={email} onChange={e => this.onInputChange(e, 'email')} id="email" placeholder="Email" />
                 </FormGroup>
                 <FormGroup>
                   <label htmlFor="password">New Password</label>
                   <FormInput value={password} type="password" onChange={e => this.onInputChange(e, 'password')} id="password" placeholder="Password" />
                 </FormGroup>
                 <FormGroup>
                   <label htmlFor="cpassword">Confirm Password</label>
                   <FormInput value={cpassword} type="password" onChange={e => this.onInputChange(e, 'cpassword')} id="cpassword" placeholder="Confirm Password" />
                 </FormGroup>
                 <FormGroup>
                    <br/>
                   <Button onClick={this.onUpdateProfile}>Update Profile</Button>
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

export default Profile;
