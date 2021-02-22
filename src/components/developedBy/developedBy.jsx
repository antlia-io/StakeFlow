import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { withStyles } from '@material-ui/core/styles';
import { Row, Col } from 'reactstrap';

const styles = theme => ({});

class DevelopedBy extends Component {
  constructor(props) {
    super()
    this.state = {}
  }
  render() {
    return (
      <div>
        <div id="dev-by">
          <div className="container-xl">
            <Row>
              <Col lg={3} md={3} sm={12} />
              <Col lg={6} md={9} sm={12}>
                <div className="footer-item">
                  <ul>
                    <li>
                      <p>Developed by <a href="https://www.rnssol.com/" target="_blank" rel="noopener noreferrer">
                        RNS Solutions Labs.</a> All Rights Reserved. </p>
                    </li>
                    <li>
                      <div className="social-links">
                        <a
                          href="/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="isDisabled"
                        >
                          <i className="fab fa-facebook"></i>
                        </a>
                        <a
                          href="/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="isDisabled"
                        >
                          <i className="fab fa-twitter"></i>
                        </a>
                        <a
                          href="/"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="isDisabled"
                        >
                          <i className="fab fa-linkedin"></i>
                        </a>
                      </div>
                    </li>
                  </ul>
                </div>
              </Col>
              <Col lg={3} md={3} sm={12} />
            </Row>
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(withStyles(styles)(DevelopedBy));
