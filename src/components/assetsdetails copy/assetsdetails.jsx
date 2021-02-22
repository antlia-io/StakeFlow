import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import { Row, Col } from 'reactstrap';

const styles = (theme) => ({})

class AssetsDetails extends Component {
  constructor(props) {
    super()
    this.state = {
      modalBuiltWithOpen: false,
    }
  }

  render() {
    return (
      <div className="asset-details">
        <div className="container">
          <div className="box-container">
            <Row>
              <Col lg={12}>
                <h2 className="mb-5">Assets Details</h2>
              </Col>
              <Col lg={3} md={3} sm={6}>
                <p>Total Asset in USD</p>
                <h4>$0.00</h4>
              </Col>
              <Col lg={3} md={3} sm={6}>
                <p>Net Return(%)</p>
                <h4>15%</h4>
              </Col>
              <Col lg={6} md={6} sm={12}>
                <p>Wallet Address</p>
                <h4>uvh847yt3hf934yt580247rt89465345y</h4>
              </Col>
            </Row>
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(withStyles(styles)(AssetsDetails))
