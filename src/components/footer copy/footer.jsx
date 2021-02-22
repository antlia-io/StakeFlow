import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { withStyles } from '@material-ui/core/styles';
import { colors } from '../../theme/theme';
import logo from '../../assets/backwalls/antlia.png'
import BuiltWithModal from '../builtwith/builtwithModal.jsx';
import { Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';

const styles = theme => ({
  footer: {
    padding: '24px',
    display: 'flex',
    justifyContent: 'space-evenly',
    width: '100%',
    background: colors.white,
    borderRadius: '50px 50px 0px 0px',
    border: '1px solid ' + colors.borderBlue,
    borderBottom: 'none',
    marginTop: '48px',
    flexWrap: 'wrap',
    [theme.breakpoints.down('xs')]: {
      justifyContent: 'flex-start',
    }
  },
  heading: {
    marginBottom: '12px',
    paddingBottom: '9px',
    borderBottom: "3px solid " + colors.borderBlue,
    width: 'fit-content',
    marginLeft: '30px'
  },
  link: {
    paddingBottom: '12px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    '&:hover': {
      textDecoration: 'underline'
    }
  },
  icon: {
    fill: colors.borderBlue,
    marginRight: '6px'
  },
  yearnIcon: {
    minHeight: '100%',
    display: 'flex',
    alignItems: 'center'
  },
  builtWith: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    [theme.breakpoints.down('md')]: {
      display: 'none',
    }
  },
  builtWithLink: {
    paddingTop: '12px'
  },
  builtHeading: {
    marginBottom: '12px',
    paddingBottom: '9px',
    borderBottom: "3px solid " + colors.borderBlue,
    width: 'fit-content',
  },
  products: {
    padding: '0px 24px',
    [theme.breakpoints.down('xs')]: {
      paddingBottom: '24px'
    }
  },
  community: {
    padding: '0px 24px',
    [theme.breakpoints.down('xs')]: {
      paddingBottom: '24px'
    }
  },
  socials: {
    padding: '0px 24px'
  }
});


class Footer extends Component {
  constructor(props) {
    super()
    this.state = {
      modalBuiltWithOpen: false,
    }
  }

  render() {
    return (
      <div>
        <div id="footer">
          <div className="container">
            <Row>
              <Col lg={3} md={3} sm={12}>
                <div className="copyright">
                  <img src={logo} alt="Antlia" />
                  <p>
                    &copy; Copyright. All Rights Reserved. Powered by
                    <a
                      href="https://www.rnssol.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      RNS Solutions
                    </a>
                  </p>
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
                            >
                              <i className="fab fa-facebook"></i>
                            </a>
                            <a
                              href="/"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <i className="fab fa-twitter"></i>
                            </a>
                            <a
                              href="/"
                              target="_blank"
                              rel="noopener noreferrer"
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
