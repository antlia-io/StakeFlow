import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Typography, Menu } from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import ENS from 'ethjs-ens';
import { animateScroll as scroll } from 'react-scroll';
import { CONNECTION_CONNECTED, CONNECTION_DISCONNECTED } from '../../constants';
import UnlockModal from '../unlock/unlockModal.jsx';
import Store from '../../stores';
import logo from '../../assets/backwalls/antlia.png';
import { Link } from 'react-router-dom';

const emitter = Store.emitter;
const store = Store.store;

const styles = (theme) => ({
  root: {
    verticalAlign: 'top',
    width: '100%',
    display: 'flex',
  },
})

class Header extends Component {
  constructor(props) {
    super()
    this.state = {
      account: store.getStore('account'),
      modalOpen: false,
      anchorEl: null,
    }
  }

  componentWillMount() {
    emitter.on(CONNECTION_CONNECTED, this.connectionConnected)
    emitter.on(CONNECTION_DISCONNECTED, this.connectionDisconnected)
  }

  componentWillUnmount() {
    emitter.removeListener(CONNECTION_CONNECTED, this.connectionConnected)
    emitter.removeListener(CONNECTION_DISCONNECTED, this.connectionDisconnected)
  }

  connectionConnected = () => {
    this.setState({ account: store.getStore('account') })
    this.setAddressEnsName()
  }

  connectionDisconnected = () => {
    this.setState({ account: store.getStore('account') })
  }

  setAddressEnsName = async () => {
    const context = store.getStore('web3context')
    if (context && context.library && context.library.provider) {
      const provider = context.library.provider
      const account = store.getStore('account')
      const { address } = account
      const chainId = parseInt(provider.chainId, 16)
      const network = chainId || provider.networkVersion
      const ens = new ENS({ provider, network })
      const addressEnsName = await ens.reverse(address).catch(() => { })
      if (addressEnsName) {
        this.setState({ addressEnsName })
      }
    }
  }

  render() {
    const scrollToTop = () => {
      scroll.scrollToTop()
    }
    const { classes } = this.props;
    const { modalOpen } = this.state;
    return (
      <div className={classes.root}>
        <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
          <div className="container-xl">
            <Link className="navbar-brand" to="/" onClick={scrollToTop}>
              <img src={logo} alt="Antlia" />
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
              onClick={this.toggle}
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav">
                <li className="nav-item">
                  <Link
                    className="nav-link"
                    to="/dashboard"
                    onClick={scrollToTop}
                  >
                    Stake
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/lending" onClick={scrollToTop}>
                    Invest
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/cover" onClick={scrollToTop}>
                    Swap
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/experimental" onClick={scrollToTop}>
                    Pools
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/rewards" onClick={scrollToTop}>
                    Rewards
                  </Link>
                </li>
                <li className="nav-item">
                  <button className="connectBtn" onClick={this.addressClicked}>
                    Connect Wallet
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        {modalOpen && this.renderModal()}
      </div>
    )
  }

  handleClick = (event) => {
    this.setState({ anchorEl: event.currentTarget })
  }

  handleClose = () => {
    this.setState({ anchorEl: null })
  }

  renderMenuLinks = (menu) => {
    const { classes } = this.props;
    const currentScreen = window.location.pathname.substring(1);
    const menuSelected = menu.screens.includes(currentScreen);
    return (
      <React.Fragment>
        <div
          className={menuSelected ? classes.linkActive : classes.link}
          onClick={this.handleClick}
        >
          <Typography variant={'h4'} className={`title`}>
            {menu.label}
          </Typography>
        </div>
        <Menu
          id="simple-menu"
          anchorEl={this.state.anchorEl}
          keepMounted
          open={Boolean(this.state.anchorEl)}
          onClose={this.handleClose}
        >
          {menu.screens.map((screen) => {
            return this.renderLink(screen)
          })}
        </Menu>
      </React.Fragment>
    )
  }

  renderLink = (screen) => {
    const { classes } = this.props;
    return (
      <div
        className={
          window.location.pathname === '/' + screen
            ? classes.linkActive
            : classes.link
        }
        onClick={() => {
          this.nav(screen)
        }}
      >
        <Typography variant={'h4'} className={`title`}>
          {screen}
        </Typography>
      </div>
    )
  }

  nav = (screen) => {
    this.handleClose()
    this.props.history.push('/' + screen)
  }

  addressClicked = () => {
    this.setState({ modalOpen: true })
  }

  closeModal = () => {
    this.setState({ modalOpen: false })
  }

  renderModal = () => {
    return (
      <UnlockModal
        closeModal={this.closeModal}
        modalOpen={this.state.modalOpen}
      />
    )
  }
}

export default withRouter(withStyles(styles)(Header))
