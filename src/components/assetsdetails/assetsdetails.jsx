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
        <div className="box-container">
          <Row>
            <Col lg={12}>
              <h2 className="mb-5">Assets Details</h2>
            </Col>
          </Row>
          <div className="item-list">
            <div className="item">
              <p>Total Assets</p>
              <div className="value">$515151</div>
            </div>
            <div className="item">
              <p>Total Supply</p>
              <div className="value">22.25</div>
            </div>
            <div className="item">
              <p>Total Borrow</p>
              <div className="value">22.25</div>
            </div>
            <div className="item">
              <p>Staked ETH</p>
              <div className="value">2500</div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(withStyles(styles)(AssetsDetails))
