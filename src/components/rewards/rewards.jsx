import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import { ERROR, CONNECTION_CONNECTED, CONNECTION_DISCONNECTED, GET_DASHBOARD_SNAPSHOT, DASHBOARD_SNAPSHOT_RETURNED } from '../../constants/constants';
import Store from '../../stores/store';

const emitter = Store.emitter;
const dispatcher = Store.dispatcher;
const store = Store.store;

const styles = (theme) => ({
  root: {
    // flex: 1,
    // display: 'flex',
    // flexDirection: 'column',
    // maxWidth: '1200px',
    margin: '6rem 0 0',
    width: '100%',
    // justifyContent: 'flex-start',
    // alignItems: 'center'
  },
})

class Rewards extends Component {
  constructor(props) {
    super()
    const dashboard = store.getStore('dashboard')
    const account = store.getStore('account')
    const growth = localStorage.getItem('yearn.finance-dashboard-growth')
    const currency = localStorage.getItem('yearn.finance-dashboard-currency')
    const basedOn = localStorage.getItem('yearn.finance-dashboard-basedon')
    this.state = {
      dashboard: dashboard,
      account: account,
      loading: true,
      growth: growth ? parseInt(growth) : 1, // 0=daily 1=weekly 2=yearly
      currency: currency ? currency : 'USD', // USD / ETH,
      basedOn: basedOn ? parseInt(basedOn > 3 ? 3 : basedOn) : 1, // 1=apyThreeDaySample  2=apyOneWeekSample  3= apyInceptionSample  4=apyInceptionSample (old)
    }
    if (account && account.address) {
      dispatcher.dispatch({ type: GET_DASHBOARD_SNAPSHOT, content: {} })
    }
  }

  componentWillMount() {
    emitter.on(ERROR, this.errorReturned)
    emitter.on(CONNECTION_CONNECTED, this.connectionConnected)
    emitter.on(CONNECTION_DISCONNECTED, this.connectionDisconnected)
    emitter.on(DASHBOARD_SNAPSHOT_RETURNED, this.dashboardSnapshotReturned)
  }

  componentWillUnmount() {
    emitter.removeListener(ERROR, this.errorReturned)
    emitter.removeListener(CONNECTION_CONNECTED, this.connectionConnected)
    emitter.removeListener(CONNECTION_DISCONNECTED, this.connectionDisconnected)
    emitter.removeListener(
      DASHBOARD_SNAPSHOT_RETURNED,
      this.dashboardSnapshotReturned,
    )
  }

  dashboardSnapshotReturned = () => {
    this.setState({
      loading: false,
      dashboard: store.getStore('dashboard'),
    })
  }

  connectionConnected = () => {
    const account = store.getStore('account')
    this.setState({ loading: true, account: account })
    dispatcher.dispatch({ type: GET_DASHBOARD_SNAPSHOT, content: {} })
  }

  connectionDisconnected = () => {
    this.setState({ account: null })
  }

  errorReturned = (error) => {
    this.setState({ loading: false })
  }

  toggle = () => {
    this.setState((prevState) => ({
      dropdownOpen: !prevState.dropdownOpen,
    }))
  }

  handleChange = (value) => {
    this.setState({
      value: value,
    })
  }

  render() {
    const { classes } = this.props;
    // const { account } = this.state;
    // if (!account || !account.address) {
    return (
      <div className={classes.root}>
        <div className="container-xl">
          <div className="stake cardBg mh">
            <div className="cardHeader">
              <h4>Rewards</h4>
            </div>
            <p>Coming soon</p>
          </div>
        </div>
      </div>
    )
    // }
  }
}

export default withRouter(withStyles(styles)(Rewards))