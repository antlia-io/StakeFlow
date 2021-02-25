import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import { Typography, TextField, MenuItem } from '@material-ui/core';
// import Loader from '../loader';
import InfoIcon from '@material-ui/icons/Info';
import AssetsDetails from '../assetsdetails';
import { ERROR, CONNECTION_CONNECTED, CONNECTION_DISCONNECTED, GET_DASHBOARD_SNAPSHOT, DASHBOARD_SNAPSHOT_RETURNED } from '../../constants';
import Store from '../../stores';
import Ethereum from '../../assets/ETH-icon.png';
import BTC from '../../assets/BBTC-logo.png';
import BCH from '../../assets/renBTC-logo.png';
import SWAG from '../../assets/SWAG-logo.jpeg';
import USDT from '../../assets/USDT-icon.png';
import { Row, Col, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import Slider from 'react-rangeslider';

const emitter = Store.emitter;
const dispatcher = Store.dispatcher;
const store = Store.store;

const styles = (theme) => ({
  root: {
    width: '100%',
  },
})

class Dashboard extends Component {
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
      CoinList: [
        {
          icon: BTC,
          symbol: 'BTC',
          name: 'Bitcoin',
        },
        {
          icon: Ethereum,
          symbol: 'ETH',
          name: 'Ethereum',
        },
        {
          icon: BCH,
          symbol: 'BCH',
          name: 'Bitcoin Cash',
        },
        {
          icon: USDT,
          symbol: 'USDT',
          name: 'Tether',
        },
        {
          icon: SWAG,
          symbol: 'SWAG',
          name: 'SWAG',
        },
        {
          icon: BTC,
          symbol: 'BTC',
          name: 'Bitcoin',
        },
        {
          icon: Ethereum,
          symbol: 'ETH',
          name: 'Ethereum',
        },
        {
          icon: BCH,
          symbol: 'BCH',
          name: 'Bitcoin Cash',
        },
        {
          icon: USDT,
          symbol: 'USDT',
          name: 'Tether',
        },
        {
          icon: SWAG,
          symbol: 'SWAG',
          name: 'SWAG',
        },
      ],
      dropdownOpen: false,
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

  handleChangeStart = () => { }

  handleChange = (value) => {
    this.setState({
      value: value,
    })
  }

  handleChangeComplete = () => { }

  render() {
    const { classes } = this.props;
    const { value } = this.state;
    // const { loading, dashboard, growth, currency, account, value } = this.state;
    // if (!account || !account.address) {
    return (
      <div className={classes.root}>
        <div
          className="modal fade myModal"
          id="StakeModal"
          tabIndex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-container">
            <div className="modal-dialog">
              <div className="modal-content">
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
                <div className="modal-body">
                  <h2 className="modalTitle">Confirm Deposit</h2>
                  <p className="modalDesc">
                    Be aware! You will NOT be able to withdraw you deposits
                      unit Ethereum <span className="br-block"></span>
                      Foundation finishes Ethereum 2.0 migration, which is
                      Estimated to deliver in 2021.
                    </p>
                  <p className="modalDesc">
                    This is a custoiol service and it will incur potential
                    fees. You should do your
                      <span className="br-block"></span> own research and use at
                      your own risk.
                    </p>
                  <button
                    type="button"
                    className="btn btn-default enableBtn"
                    data-toggle="modal"
                    data-dismiss="modal"
                    data-target="#ConfirmModal"
                  >
                    Stake
                    </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          className="modal fade myModal"
          id="ConfirmModal"
          tabIndex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-container">
            <div className="modal-dialog">
              <div className="modal-content">
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
                <div className="modal-body">
                  <h2 className="modalTitle">Confirm Transaction</h2>
                  <div
                    className="spinner-border text-primary custom-spinner"
                    role="status"
                  >
                    <span className="sr-only">Loading...</span>
                  </div>
                  <p className="mt-3">Confirm the Transacion</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container-xl">
          <AssetsDetails />
          <div className="stake cardBg">
            <div className="topper">
              <Row>
                <Col lg={4} md={5} sm={12} xs={12}>
                  <div className="valueBox">
                    <p>Staked Funds</p>
                    <h1>0000.075%</h1>
                  </div>
                </Col>
                <Col md={2} sm={12} xs={12} className="d-md-block">
                  <span className="vl" />
                </Col>
                <Col lg={4} md={5} sm={12} xs={12}>
                  <div className="valueBox">
                    <p>Token Rewards</p>
                    <h1>0000.075%</h1>
                  </div>
                </Col>
                <Col lg={4} sm={6} xs={12} className="d-md-none" />
              </Row>
            </div>
            <div className="cardHeader">
              <h4>Stake</h4>
            </div>
            <div className="selection">
              <label>Stake</label>
              <Dropdown
                isOpen={this.state.dropdownOpen}
                toggle={() => this.toggle()}
                right="true"
              >
                <div className="coin-selection">
                  <div className="icon-name">
                    <div className="iconDiv">
                      <img src={BTC} alt="BTC" />
                    </div>
                    <span className="symbol">BTC</span>
                    <span className="name">Bitcoin</span>
                  </div>
                </div>
                <DropdownToggle caret></DropdownToggle>
                <DropdownMenu right={true}>
                  {this.state.CoinList.map((item, index) => (
                    <DropdownItem key={index}>
                      <div className="icon-name">
                        <div className="iconDiv">
                          <img src={item.icon} alt="logo" />
                        </div>
                        <span className="symbol">{item.symbol}</span>
                        <span className="name">{item.name}</span>
                      </div>
                    </DropdownItem>
                  ))}
                </DropdownMenu>
              </Dropdown>
            </div>
            <div className="return">
              <p>Return 5.3 % </p> <span className="vl" />
              <p>1 ETH = 1.234 ANAETH</p>
            </div>
            <Slider
              min={0}
              max={100}
              value={value}
              onChangeStart={this.handleChangeStart}
              onChange={this.handleChange}
              onChangeComplete={this.handleChangeComplete}
            />
            <div className="range-limit">
              <div className="left">0</div>
              <div className="right">ANA ETH MAX</div>
            </div>
            <div className="selection">
              <label>You have 2.34 ETH</label>
              <div className="icon-name enterAmount">
                <div className="iconDiv">
                  <img src={Ethereum} alt="ETH" />
                </div>
                <span className="symbol">ETH</span>
                <input type="text" placeholder="Amount" />
              </div>
            </div>
            <div className="network-fee">
              <p>Network Fee:</p>
              <p className="colored">Why Stake with StakeFlow</p>
            </div>
            <div className="d-block m-auto">
              <button
                className="stake-btn isDisabled"
                type="button"
                data-toggle="modal"
                data-target="#StakeModal"
              >
                Stake
                </button>
            </div>
          </div>
        </div>
      </div>
    )
    // }
    // return (
    //   <div className={classes.root}>
    //     <div className={classes.investedContainer}>
    //       <div className={classes.portfolioContainer}>
    //         <div className={classes.titleBalance} onClick={this.balanceClicked}>
    //           {currency === 'USD' && (
    //             <Typography variant={'h2'}>
    //               $
    //               {parseFloat(
    //                 dashboard.portfolio_balance_usd.toFixed(2),
    //               ).toLocaleString()}
    //             </Typography>
    //           )}
    //           {currency === 'ETH' && (
    //             <div className={classes.inline}>
    //               <Typography variant={'h2'} noWrap>
    //                 {parseFloat(
    //                   dashboard.portfolio_balance_eth.toFixed(2),
    //                 ).toLocaleString()}
    //               </Typography>
    //               <Typography className={classes.symbol} variant={'h3'}>
    //                 ETH
    //               </Typography>
    //             </div>
    //           )}
    //           <Typography variant={'h4'} className={classes.gray}>
    //             Portfolio Balance
    //           </Typography>
    //         </div>
    //         <div className={classes.between}></div>
    //         {growth === 0 && (
    //           <div
    //             className={classes.titleBalance}
    //             onClick={this.growthClicked}
    //           >
    //             {currency === 'USD' && (
    //               <Typography variant={'h2'}>
    //                 $
    //                 {parseFloat(
    //                   dashboard.portfolio_growth_usd_daily.toFixed(2),
    //                 ).toLocaleString()}
    //               </Typography>
    //             )}
    //             {currency === 'ETH' && (
    //               <div className={classes.inline}>
    //                 <Typography variant={'h2'} noWrap>
    //                   {parseFloat(
    //                     dashboard.portfolio_growth_eth_daily.toFixed(2),
    //                   ).toLocaleString()}
    //                 </Typography>
    //                 <Typography className={classes.symbol} variant={'h3'}>
    //                   ETH
    //                 </Typography>
    //               </div>
    //             )}
    //             <Typography
    //               variant={'h4'}
    //               className={`${classes.gray} ${classes.prettyAlign}`}
    //             >
    //               Daily Growth
    //             </Typography>
    //           </div>
    //         )}
    //         {growth === 1 && (
    //           <div
    //             className={classes.titleBalance}
    //             onClick={this.growthClicked}
    //           >
    //             {currency === 'USD' && (
    //               <Typography variant={'h2'}>
    //                 $
    //                 {parseFloat(
    //                   dashboard.portfolio_growth_usd_weekly.toFixed(2),
    //                 ).toLocaleString()}
    //               </Typography>
    //             )}
    //             {currency === 'ETH' && (
    //               <div className={classes.inline}>
    //                 <Typography variant={'h2'} noWrap>
    //                   {parseFloat(
    //                     dashboard.portfolio_growth_eth_weekly.toFixed(2),
    //                   ).toLocaleString()}
    //                 </Typography>
    //                 <Typography className={classes.symbol} variant={'h3'}>
    //                   ETH
    //                 </Typography>
    //               </div>
    //             )}
    //             <Typography
    //               variant={'h4'}
    //               className={`${classes.gray} ${classes.prettyAlign}`}
    //             >
    //               Weekly Growth
    //             </Typography>
    //           </div>
    //         )}
    //         {growth === 2 && (
    //           <div
    //             className={classes.titleBalance}
    //             onClick={this.growthClicked}
    //           >
    //             {currency === 'USD' && (
    //               <Typography variant={'h2'}>
    //                 $
    //                 {parseFloat(
    //                   dashboard.portfolio_growth_usd_yearly.toFixed(2),
    //                 ).toLocaleString()}
    //               </Typography>
    //             )}
    //             {currency === 'ETH' && (
    //               <div className={classes.inline}>
    //                 <Typography variant={'h2'} noWrap>
    //                   {parseFloat(
    //                     dashboard.portfolio_growth_eth_yearly.toFixed(2),
    //                   ).toLocaleString()}
    //                 </Typography>
    //                 <Typography className={classes.symbol} variant={'h3'}>
    //                   ETH
    //                 </Typography>
    //               </div>
    //             )}
    //             <Typography
    //               variant={'h4'}
    //               className={`${classes.gray} ${classes.prettyAlign}`}
    //             >
    //               Yearly Growth
    //             </Typography>
    //           </div>
    //         )}
    //       </div>
    //       {this.renderBasedOn()}
    //       {dashboard.vaults && dashboard.vaults.length > 0 && (
    //         <div className={classes.vaultContainer}>
    //           <Typography variant={'h3'} className={classes.sectionHeading}>
    //             Vaults Overview
    //           </Typography>
    //           {this.renderVaults()}
    //         </div>
    //       )}
    //       {dashboard.assets && dashboard.assets.length > 0 && (
    //         <div className={classes.earnContainer}>
    //           <Typography variant={'h3'} className={classes.sectionHeading}>
    //             Earn Overview
    //           </Typography>
    //           {this.renderEarn()}
    //         </div>
    //       )}
    //     </div>
    //     {loading && <Loader />}
    //   </div>
    // )
  }

  renderBasedOn = () => {
    const { classes } = this.props;
    const { basedOn, loading } = this.state;
    const options = [
      {
        value: 1,
        description: '1 week',
      },
      {
        value: 2,
        description: '1 month',
      },
      {
        value: 3,
        description: 'inception',
      },
    ]
    return (
      <div className={classes.basedOnContainer}>
        <InfoIcon className={classes.infoIcon} />
        <Typography>
          Growth is based on the vault's performance
          {basedOn === 3 ? 'since' : 'for the past'}
        </Typography>
        <TextField
          id={'basedOn'}
          name={'basedOn'}
          select
          value={basedOn}
          onChange={this.onSelectChange}
          SelectProps={{
            native: false,
          }}
          disabled={loading}
          className={classes.assetSelectRoot}
        >
          {options &&
            options.map((option) => {
              return (
                <MenuItem key={option.value} value={option.value}>
                  <Typography variant="h4">{option.description}</Typography>
                </MenuItem>
              )
            })}
        </TextField>
      </div>
    )
  }

  onSelectChange = (event) => {
    let val = []
    val[event.target.name] = event.target.value
    this.setState(val)
    localStorage.setItem('yearn.finance-dashboard-basedon', event.target.value)
    this.setState({ loading: true })
    dispatcher.dispatch({ type: GET_DASHBOARD_SNAPSHOT, content: {} })
  }

  growthClicked = () => {
    const { growth } = this.state;
    let newGrowth = 0
    switch (growth) {
      case 0:
        newGrowth = 1
        break
      case 1:
        newGrowth = 2
        break
      case 2:
        newGrowth = 0
        break
      default:
        newGrowth = 0
    }
    this.setState({ growth: newGrowth })
    localStorage.setItem('yearn.finance-dashboard-growth', newGrowth.toString())
  }

  balanceClicked = () => {
    const { currency } = this.state
    this.setState({ currency: currency === 'USD' ? 'ETH' : 'USD' })
    localStorage.setItem(
      'yearn.finance-dashboard-currency',
      currency === 'USD' ? 'ETH' : 'USD',
    )
  }

  renderVaults = () => {
    const { growth, currency } = this.state;
    const { vaults } = this.state.dashboard;
    const { classes } = this.props;
    if (!vaults || vaults.length === 0) {
      return null
    }
    return vaults.map((asset) => {
      return (
        <div className={classes.vault} key={asset.id}>
          <div className={classes.assetSummary}>
            <div className={classes.headingName}>
              <div className={classes.assetIcon}>
                <img
                  alt="logo"
                  src={require('../../assets/' +
                    asset.symbol.replace(/\+/g, '') +
                    '-logo.png')}
                  height={'30px'}
                />
              </div>
              <div>
                <Typography variant={'h3'} noWrap>
                  {asset.name}
                </Typography>
                <Typography variant={'h5'} noWrap className={classes.gray}>
                  {asset.description}
                </Typography>
              </div>
            </div>
            {growth === 0 && (
              <div className={classes.heading}>
                <Typography variant={'h5'} className={classes.gray}>
                  Daily Growth
                </Typography>
                {currency === 'USD' && (
                  <div className={classes.inline}>
                    <Typography variant={'h3'} noWrap>
                      $
                      {parseFloat(
                      asset.vaultGrowth_daily_usd.toFixed(2),
                    ).toLocaleString()}
                    </Typography>
                    <Typography className={classes.symbolAt} variant={'h4'}>
                      @
                    </Typography>
                    <Typography className={classes.symbol} variant={'h4'}>
                      {(this._getAPY(asset) / 365).toFixed(2)}%
                    </Typography>
                  </div>
                )}
                {currency === 'ETH' && (
                  <div className={classes.inline}>
                    <Typography variant={'h3'} noWrap>
                      {parseFloat(
                        asset.vaultGrowth_daily_eth.toFixed(2),
                      ).toLocaleString()}
                    </Typography>
                    <Typography className={classes.symbol} variant={'h4'}>
                      ETH
                    </Typography>
                    <Typography className={classes.symbolAt} variant={'h4'}>
                      @
                    </Typography>
                    <Typography className={classes.symbol} variant={'h4'}>
                      {(this._getAPY(asset) / 365).toFixed(2)}%
                    </Typography>
                  </div>
                )}
              </div>
            )}
            {growth === 1 && (
              <div className={classes.heading}>
                <Typography variant={'h5'} className={classes.gray}>
                  Weekly Growth
                </Typography>
                {currency === 'USD' && (
                  <div className={classes.inline}>
                    <Typography variant={'h3'} noWrap>
                      $
                      {parseFloat(
                      asset.vaultGrowth_weekly_usd.toFixed(2),
                    ).toLocaleString()}
                    </Typography>
                    <Typography className={classes.symbolAt} variant={'h4'}>
                      @
                    </Typography>
                    <Typography className={classes.symbol} variant={'h4'}>
                      {(this._getAPY(asset) / 52).toFixed(2)}%
                    </Typography>
                  </div>
                )}
                {currency === 'ETH' && (
                  <div className={classes.inline}>
                    <Typography variant={'h3'} noWrap>
                      {parseFloat(
                        asset.vaultGrowth_weekly_eth.toFixed(2),
                      ).toLocaleString()}
                    </Typography>
                    <Typography className={classes.symbol} variant={'h4'}>
                      ETH
                    </Typography>
                    <Typography className={classes.symbolAt} variant={'h4'}>
                      @
                    </Typography>
                    <Typography className={classes.symbol} variant={'h4'}>
                      {(this._getAPY(asset) / 52).toFixed(2)}%
                    </Typography>
                  </div>
                )}
              </div>
            )}
            {growth === 2 && (
              <div className={classes.heading}>
                <Typography variant={'h5'} className={classes.gray}>
                  Yearly Growth
                </Typography>
                {currency === 'USD' && (
                  <div className={classes.inline}>
                    <Typography variant={'h3'} noWrap>
                      $
                      {parseFloat(
                      asset.vaultGrowth_yearly_usd.toFixed(2),
                    ).toLocaleString()}
                    </Typography>
                    <Typography className={classes.symbolAt} variant={'h4'}>
                      @
                    </Typography>
                    <Typography className={classes.symbol} variant={'h4'}>
                      {(this._getAPY(asset) / 1).toFixed(2)}%
                    </Typography>
                  </div>
                )}
                {currency === 'ETH' && (
                  <div className={classes.inline}>
                    <Typography variant={'h3'} noWrap>
                      {parseFloat(
                        asset.vaultGrowth_yearly_eth.toFixed(2),
                      ).toLocaleString()}
                    </Typography>
                    <Typography className={classes.symbol} variant={'h4'}>
                      ETH
                    </Typography>
                    <Typography className={classes.symbolAt} variant={'h4'}>
                      @
                    </Typography>
                    <Typography className={classes.symbol} variant={'h4'}>
                      {(this._getAPY(asset) / 1).toFixed(2)}%
                    </Typography>
                  </div>
                )}
              </div>
            )}
            <div className={classes.heading}>
              <Typography variant={'h5'} className={classes.gray}>
                Net worth
              </Typography>
              {currency === 'USD' && (
                <Typography variant={'h3'} noWrap>
                  $
                  {parseFloat(
                    asset.usdBalance ? asset.usdBalance.toFixed(2) : '0.00',
                  ).toLocaleString()}
                </Typography>
              )}
              {currency === 'ETH' && (
                <div className={classes.inline}>
                  <Typography variant={'h3'} noWrap>
                    {parseFloat(
                      asset.ethBalance ? asset.ethBalance.toFixed(2) : '0.00',
                    ).toLocaleString()}
                  </Typography>
                  <Typography className={classes.symbol} variant={'h4'}>
                    ETH
                  </Typography>
                </div>
              )}
            </div>
          </div>
        </div>
      )
    })
  }

  renderEarn = () => {
    const { growth, currency } = this.state;
    const { assets } = this.state.dashboard;
    const { classes } = this.props;
    if (!assets || assets.length === 0) {
      return null
    }
    return assets.map((asset) => {
      return (
        <div className={classes.vault} key={asset.id}>
          <div className={classes.assetSummary}>
            <div className={classes.headingName}>
              <div className={classes.assetIcon}>
                <img
                  alt="logo"
                  src={require('../../assets/' +
                    asset.symbol.replace(/\+/g, '') +
                    '-logo.png')}
                  height={'30px'}
                />
              </div>
              <div>
                <Typography variant={'h3'} noWrap>
                  {asset.name}
                </Typography>
                <Typography variant={'h5'} noWrap className={classes.gray}>
                  {asset.description}
                </Typography>
              </div>
            </div>
            {growth === 0 && (
              <div className={classes.heading}>
                <Typography variant={'h5'} className={classes.gray}>
                  Daily Growth
                </Typography>
                {currency === 'USD' && (
                  <div className={classes.inline}>
                    <Typography variant={'h3'} noWrap>
                      $
                      {parseFloat(
                      asset.earnGrowth_daily_usd.toFixed(2),
                    ).toLocaleString()}
                    </Typography>
                    <Typography className={classes.symbolAt} variant={'h4'}>
                      @
                    </Typography>
                    <Typography className={classes.symbol} variant={'h4'}>
                      {asset.maxApr
                        ? ((asset.maxApr * 100) / 365).toFixed(2)
                        : '0.00'}
                      %
                    </Typography>
                  </div>
                )}
                {currency === 'ETH' && (
                  <div className={classes.inline}>
                    <Typography variant={'h3'} noWrap>
                      {parseFloat(
                        asset.earnGrowth_daily_eth.toFixed(2),
                      ).toLocaleString()}
                    </Typography>
                    <Typography className={classes.symbol} variant={'h4'}>
                      ETH
                    </Typography>
                    <Typography className={classes.symbolAt} variant={'h4'}>
                      @
                    </Typography>
                    <Typography className={classes.symbol} variant={'h4'}>
                      {asset.maxApr
                        ? ((asset.maxApr * 100) / 365).toFixed(2)
                        : '0.00'}
                      %
                    </Typography>
                  </div>
                )}
              </div>
            )}
            {growth === 1 && (
              <div className={classes.heading}>
                <Typography variant={'h5'} className={classes.gray}>
                  Weekly Growth
                </Typography>
                {currency === 'USD' && (
                  <div className={classes.inline}>
                    <Typography variant={'h3'} noWrap>
                      $
                      {parseFloat(
                      asset.earnGrowth_weekly_usd.toFixed(2),
                    ).toLocaleString()}
                    </Typography>
                    <Typography className={classes.symbolAt} variant={'h4'}>
                      @
                    </Typography>
                    <Typography className={classes.symbol} variant={'h4'}>
                      {asset.maxApr
                        ? ((asset.maxApr * 100) / 52).toFixed(2)
                        : '0.00'}
                      %
                    </Typography>
                  </div>
                )}
                {currency === 'ETH' && (
                  <div className={classes.inline}>
                    <Typography variant={'h3'} noWrap>
                      {parseFloat(
                        asset.earnGrowth_weekly_eth.toFixed(2),
                      ).toLocaleString()}
                    </Typography>
                    <Typography className={classes.symbol} variant={'h4'}>
                      ETH
                    </Typography>
                    <Typography className={classes.symbolAt} variant={'h4'}>
                      @
                    </Typography>
                    <Typography className={classes.symbol} variant={'h4'}>
                      {asset.maxApr
                        ? ((asset.maxApr * 100) / 52).toFixed(2)
                        : '0.00'}
                      %
                    </Typography>
                  </div>
                )}
              </div>
            )}
            {growth === 2 && (
              <div className={classes.heading}>
                <Typography variant={'h5'} className={classes.gray}>
                  Yearly Growth
                </Typography>
                {currency === 'USD' && (
                  <div className={classes.inline}>
                    <Typography variant={'h3'} noWrap>
                      $
                      {parseFloat(
                      asset.earnGrowth_yearly_usd.toFixed(2),
                    ).toLocaleString()}
                    </Typography>
                    <Typography className={classes.symbolAt} variant={'h4'}>
                      @
                    </Typography>
                    <Typography className={classes.symbol} variant={'h4'}>
                      {asset.maxApr ? (asset.maxApr * 100).toFixed(2) : '0.00'}%
                    </Typography>
                  </div>
                )}
                {currency === 'ETH' && (
                  <div className={classes.inline}>
                    <Typography variant={'h3'} noWrap>
                      {parseFloat(
                        asset.earnGrowth_yearly_eth.toFixed(2),
                      ).toLocaleString()}
                    </Typography>
                    <Typography className={classes.symbol} variant={'h4'}>
                      ETH
                    </Typography>
                    <Typography className={classes.symbolAt} variant={'h4'}>
                      @
                    </Typography>
                    <Typography className={classes.symbol} variant={'h4'}>
                      {asset.maxApr ? (asset.maxApr * 100).toFixed(2) : '0.00'}%
                    </Typography>
                  </div>
                )}
              </div>
            )}
            <div className={classes.heading}>
              <Typography variant={'h5'} className={classes.gray}>
                Net worth
              </Typography>
              {currency === 'USD' && (
                <Typography variant={'h3'} noWrap>
                  $
                  {parseFloat(
                    asset.usdBalance ? asset.usdBalance.toFixed(2) : '0.00',
                  ).toLocaleString()}
                </Typography>
              )}
              {currency === 'ETH' && (
                <div className={classes.inline}>
                  <Typography variant={'h3'} noWrap>
                    {parseFloat(
                      asset.ethBalance ? asset.ethBalance.toFixed(2) : '0.00',
                    ).toLocaleString()}
                  </Typography>
                  <Typography className={classes.symbol} variant={'h4'}>
                    ETH
                  </Typography>
                </div>
              )}
            </div>
          </div>
        </div>
      )
    })
  }

  _getAPY = (asset) => {
    const { basedOn } = this.state;
    if (asset && asset.stats) {
      switch (basedOn) {
        case 1:
          return asset.stats.apyOneWeekSample
        case 2:
          return asset.stats.apyOneMonthSample
        case 3:
          return asset.stats.apyInceptionSample
        default:
          return asset.apy
      }
    } else if (asset.apy) {
      return asset.apy
    } else {
      return '0.00'
    }
  }
}

export default withRouter(withStyles(styles)(Dashboard))
