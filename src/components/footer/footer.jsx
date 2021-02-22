import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { withStyles } from '@material-ui/core/styles';
import logo from '../../assets/backwalls/antlia.png';
import BuiltWithModal from '../builtwith/builtwithModal.jsx';
import { Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';

const styles = theme => ({});

class Footer extends Component {
  constructor(props) {
    super()
    this.state = {
      modalBuiltWithOpen: false,
    }
  }

  render() {
    const { location } = this.props;
    if (location.pathname !== '/') {
      return null
    }
    return (
      <div>
        <div id="footer">
          <div className="container-xl">
            <Row>
              <Col lg={3} md={3} sm={12}>
                <div className="copyright">
                  <img src={logo} alt="Antlia" />
                </div>
              </Col>
              <Col lg={9} md={9} sm={12}>
                <Row>
                  <Col lg={3} md={3} sm={4}>
                    <div className="footer-item">
                      <ul>
                        <li>
                          <Link to="/" className="isDisabled">
                            Ethereum
                          </Link>
                        </li>
                        <li>
                          <Link to="/" className="isDisabled">
                            Cosmos
                          </Link>
                        </li>
                        <li>
                          <Link to="/" className="isDisabled">
                            Polkadot
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </Col>
                  <Col lg={3} md={3} sm={4}>
                    <div className="footer-item">
                      <ul>
                        <li>
                          <Link to="/" className="isDisabled">
                            Protocol Supported
                          </Link>
                        </li>
                        <li>
                          <Link to="/" className="isDisabled">
                            Resources
                          </Link>
                        </li>
                        <li>
                          <Link to="/" className="isDisabled">
                            Blog
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </Col>
                  <Col lg={3} md={3} sm={4}>
                    <div className="footer-item">
                      <ul>
                        <li>
                          <Link to="/" className="isDisabled">
                            About
                          </Link>
                        </li>
                        <li>
                          <Link to="/" className="isDisabled">
                            FAQ's
                          </Link>
                        </li>
                        <li>
                          <Link to="/" className="isDisabled">
                            Contact
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </Col>
                  <Col lg={3} md={3} sm={4}>
                    <div className="footer-item">
                      <ul>
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
                        <li>
                          <Link to="/" className="isDisabled">
                            Pricing
                          </Link>
                        </li>
                        <li>
                          <Link to="/" className="isDisabled">
                            Contact
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </Col>
                </Row>
              </Col>
            </Row>
          </div>
        </div>
      </div>
    )
  }

  renderBuiltWithModal = () => {
    return (
      <BuiltWithModal closeModal={this.closeBuiltWithModal} modalOpen={this.state.modalBuiltWithOpen} />
    )
  }

  builtWithOverlayClicked = () => {
    this.setState({ modalBuiltWithOpen: true })
  }

  closeBuiltWithModal = () => {
    this.setState({ modalBuiltWithOpen: false })
  }
}

export default withRouter(withStyles(styles)(Footer));
