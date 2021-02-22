import React, { useState, useEffect, Component } from 'react';
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import { Typography, Button, CircularProgress } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { withNamespaces } from 'react-i18next';
import { Web3ReactProvider, useWeb3React } from '@web3-react/core';
import { Web3Provider } from '@ethersproject/providers';
import { ERROR, CONNECTION_DISCONNECTED, CONNECTION_CONNECTED } from '../../constants';
import Store from '../../stores';

const emitter = Store.emitter;
const store = Store.store;

const styles = (theme) => ({
  root: {
    flex: 1,
    height: 'auto',
    display: 'flex',
    position: 'relative',
    margin: '3rem 0 0',
  },
  contentContainer: {
    margin: 'auto',
    textAlign: 'center',
    padding: '12px',
    display: 'flex',
    flexWrap: 'wrap',
  },
  cardContainer: {
    marginTop: '60px',
    minHeight: '260px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  unlockCard: {
    padding: '24px',
  },
  buttonText: {
    marginLeft: '12px',
    fontWeight: '700',
  },
  instruction: {
    maxWidth: '400px',
    marginBottom: '32px',
    marginTop: '32px',
  },
  actionButton: {
    padding: '12px',
    backgroundColor: 'white',
    borderRadius: '3rem',
    border: '1px solid #E1E1E1',
    fontWeight: 500,
    [theme.breakpoints.up('md')]: {
      padding: '15px',
    },
  },
  connect: {
    width: '100%',
  },
  closeIcon: {
    display: 'flex',
    justifyContent: 'space-between',
    position: 'absolute',
    right: '0px',
    top: '-3rem',
    cursor: 'pointer',
    width: '100%',
  },
  title: {
    textAlign: 'center',
    width: '100%',
  }
})

class Unlock extends Component {
  constructor(props) {
    super()
    this.state = {
      error: null,
      metamaskLoading: false,
      ledgerLoading: false,
    }
  }

  componentWillMount() {
    emitter.on(CONNECTION_CONNECTED, this.connectionConnected)
    emitter.on(CONNECTION_DISCONNECTED, this.connectionDisconnected)
    emitter.on(ERROR, this.error)
  }

  componentWillUnmount() {
    emitter.removeListener(CONNECTION_CONNECTED, this.connectionConnected)
    emitter.removeListener(CONNECTION_DISCONNECTED, this.connectionDisconnected)
    emitter.removeListener(ERROR, this.error)
  }

  navigateInvest = () => {
    this.props.history.push('/invest')
  }

  error = (err) => {
    this.setState({
      loading: false,
      error: err,
      metamaskLoading: false,
      ledgerLoading: false,
    })
  }

  connectionConnected = () => {
    if (this.props.closeModal != null) {
      this.props.closeModal()
    }
  }

  connectionDisconnected = () => {
    if (this.props.closeModal != null) {
      this.props.closeModal()
    }
  }

  metamaskUnlocked = () => {
    this.setState({ metamaskLoading: false })
    if (this.props.closeModal != null) {
      this.props.closeModal()
    }
  }

  ledgerUnlocked = () => {
    this.setState({ ledgerLoading: false })
    if (this.props.closeModal != null) {
      this.props.closeModal()
    }
  }

  cancelLedger = () => {
    this.setState({ ledgerLoading: false })
  }

  cancelMetamask = () => {
    this.setState({ metamaskLoading: false })
  }

  render() {
    const { classes, closeModal, t } = this.props;
    return (
      <div className={classes.root}>
        <div className={classes.closeIcon}>
          <h2 className={classes.title}>Connect to Wallet</h2>
          <div onClick={closeModal}>
            <CloseIcon />
          </div>
        </div>
        <div className={classes.contentContainer}>
          <Web3ReactProvider getLibrary={getLibrary}>
            <MyComponent closeModal={closeModal} t={t} />
          </Web3ReactProvider>
        </div>
      </div>
    )
  }
}

const getLibrary = (provider) => {
  const library = new Web3Provider(provider)
  library.pollingInterval = 8000
  return library
}

const onConnectionClicked = (
  currentConnector,
  name,
  setActivatingConnector,
  activate,
) => {
  const connectorsByName = store.getStore('connectorsByName')
  setActivatingConnector(currentConnector)
  activate(connectorsByName[name])
}

const onDeactivateClicked = (deactivate, connector) => {
  if (deactivate) {
    deactivate()
  }
  if (connector && connector.close) {
    connector.close()
  }
  store.setStore({ account: {}, web3context: null })
  emitter.emit(CONNECTION_DISCONNECTED)
}

const MyComponent = (props) => {
  const context = useWeb3React()
  const localContext = store.getStore('web3context')
  var localConnector = null
  if (localContext) {
    localConnector = localContext.connector
  }
  const {
    connector,
    library,
    account,
    activate,
    deactivate,
    active,
    error,
  } = context;
  var connectorsByName = store.getStore('connectorsByName')
  const { closeModal, t } = props;
  const [activatingConnector, setActivatingConnector] = useState()
  useEffect(() => {
    if (activatingConnector && activatingConnector === connector) {
      setActivatingConnector(undefined)
    }
  }, [activatingConnector, connector])

  useEffect(() => {
    if (account && active && library) {
      store.setStore({ account: { address: account }, web3context: context })
      emitter.emit(CONNECTION_CONNECTED)
    }
  }, [account, active, closeModal, context, library])

  // useEffect(() => {
  //   if (storeContext && storeContext.active && !active) {
  //     console.log("we are deactive: "+storeContext.account)
  //     store.setStore({ account: {}, web3context: null })
  //   }
  // }, [active, storeContext]);

  // handle logic to eagerly connect to the injected ethereum provider, if it exists and has granted access already
  // const triedEager = useEagerConnect();

  // handle logic to connect in reaction to certain events on the injected ethereum provider, if it exists
  // useInactiveListener(!triedEager || !!activatingConnector);
  const width = window.innerWidth;
  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: width > 650 ? 'space-between' : 'center',
        alignItems: 'center',
        overflowY: 'auto',
        height: '320px',
        margin: '1rem 0',
      }}
    >
      {Object.keys(connectorsByName).map((name) => {
        const currentConnector = connectorsByName[name]
        const activating = currentConnector === activatingConnector
        const connected =
          currentConnector === connector || currentConnector === localConnector
        const disabled = !!activatingConnector || !!error
        var url
        var display = name
        if (name === 'MetaMask') {
          url = require('../../assets/icn-metamask.svg')
        } else if (name === 'WalletConnect') {
          url = require('../../assets/walletConnectIcon.svg')
        } else if (name === 'TrustWallet') {
          url = require('../../assets/trustWallet.png')
        } else if (name === 'Portis') {
          url = require('../../assets/portisIcon.png')
        } else if (name === 'Fortmatic') {
          url = require('../../assets/fortmaticIcon.png')
        } else if (name === 'Ledger') {
          url = require('../../assets/icn-ledger.svg')
        } else if (name === 'Squarelink') {
          url = require('../../assets/squarelink.png')
        } else if (name === 'Trezor') {
          url = require('../../assets/trezor.png')
        } else if (name === 'Torus') {
          url = require('../../assets/torus.jpg')
        } else if (name === 'Authereum') {
          url = require('../../assets/icn-aethereum.svg')
        } else if (name === 'WalletLink') {
          display = 'Coinbase Wallet'
          url = require('../../assets/coinbaseWalletIcon.svg')
        } else if (name === 'Frame') {
          return ''
        }
        return (
          <div
            key={name}
            style={{
              padding: '12px 0px',
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
              width: '100%',
            }}
          >
            <Button
              style={{
                padding: '16px',
                backgroundColor: 'white',
                borderRadius: '0.5rem',
                border: '1px solid #E1E1E1',
                fontWeight: 500,
                display: 'flex',
                justifyContent: 'space-between',
                // minWidth: '250px',
                width: '100%',
              }}
              variant="outlined"
              color="primary"
              onClick={() => {
                onConnectionClicked(
                  currentConnector,
                  name,
                  setActivatingConnector,
                  activate,
                )
              }}
              disabled={disabled}
            >
              <Typography
                style={{
                  margin: '0px 12px',
                  color: 'rgb(1, 1, 1)',
                  fontWeight: 500,
                  fontSize: '1rem',
                }}
                variant={'h3'}
              >
                {display}
              </Typography>
              {!activating && !connected && (
                <img
                  style={{
                    position: 'absolute',
                    right: '20px',

                    width: '30px',
                    height: '30px',
                  }}
                  src={url}
                  alt="logo"
                />
              )}
              {activating && (
                <CircularProgress size={15} style={{ marginRight: '10px' }} />
              )}
              {!activating && connected && (
                <div
                  style={{
                    background: '#4caf50',
                    borderRadius: '10px',
                    width: '10px',
                    height: '10px',
                    marginRight: '10px',
                  }}
                ></div>
              )}
            </Button>
          </div>
        )
      })}
      <div style={{ width: '252px', margin: '12px 0px' }}>
        <Button
          style={{
            padding: '12px',
            backgroundColor: 'white',
            borderRadius: '20px',
            border: '1px solid #E1E1E1',
            fontWeight: 500,
            minWidth: '250px',
          }}
          variant="outlined"
          color="primary"
          onClick={() => {
            onDeactivateClicked(deactivate, connector)
          }}
        >
          <Typography
            style={{
              marginLeft: '12px',
              fontWeight: '700',
              color: '#DC6BE5',
            }}
            variant={'h5'}
            color="primary"
          >
            {t('Unlock.Deactivate')}
          </Typography>
        </Button>
      </div>
    </div>
  )
}

export default withNamespaces()(withRouter(withStyles(styles)(Unlock)))
