import React from "react"
import { Container, Button } from "shards-react"
import { withRouter } from 'react-router-dom'



class ComingSoon extends React.PureComponent {

  goBack = () => {
    this.props.history.goBack()
  }

  render() {
    return (<Container fluid className="main-content-container px-4 pb-4">
      <div className="error">
        <div className="error__content">
          <h3>Coming Soon...</h3><br/>
          <p>We are working in this feature. Please visit later</p>
          <Button onClick={() => this.goBack()} pill>&larr; Go Back</Button>
        </div>
      </div>
    </Container>)
  }
}


export default withRouter(ComingSoon);
