import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import { Grid, Typography, Accordion, AccordionDetails, AccordionSummary, TextField, InputAdornment, FormControlLabel, Checkbox, Tooltip } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import SearchIcon from '@material-ui/icons/Search';
import TimelineIcon from '@material-ui/icons/Timeline';
import HelpIcon from '@material-ui/icons/Help';
import { withNamespaces } from 'react-i18next';
import Snackbar from '../snackbar';
import Asset from './asset';
import Loader from '../loader';
import AssetsDetails from '../assetsdetails';
import Ethereum from '../../assets/ETH-icon.png';
import { ERROR, GET_EXPERIMENTAL_VAULT_BALANCES_FULL, EXPERIMENTAL_VAULT_BALANCES_FULL_RETURNED, DEPOSIT_EXPERIMENTAL_VAULT_RETURNED, DEPOSIT_ALL_EXPERIMENTAL_VAULT_RETURNED, CLAIM_EXPERIMENTAL_VAULT_RETURNED, ZAP_EXPERIMENTAL_VAULT_RETURNED, CONNECTION_CONNECTED, CONNECTION_DISCONNECTED } from '../../constants';
import Store from '../../stores';

const emitter = Store.emitter;
const dispatcher = Store.dispatcher;
const store = Store.store;

const styles = (theme) => ({
  root: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
})

class Experimental extends Component {
  constructor(props) {
    super()
    const account = store.getStore('account')
    this.state = {
      assets: store.getStore('experimentalVaultAssets'),
      usdPrices: store.getStore('usdPrices'),
      account: account,
      address: account.address
        ? account.address.substring(0, 6) +
        '...' +
        account.address.substring(
          account.address.length - 4,
          account.address.length,
        )
        : null,
      snackbarType: null,
      snackbarMessage: null,
      search: '',
      searchError: false,
      hideZero:
        localStorage.getItem('yearn.finance-hideZero') === '1' ? true : false,
      loading: true,
      PoolsList: [
        {
          symbol: 'ETH',
          address: 'qweqwrytuyoiououiopuipuiouyiuy',
          assets: '50.00',
          swapFee: '20.92%',
          marketCap: '20.92',
          myLiquidity: '12345678.0000',
          volume: '1234567890',
        },
        {
          symbol: 'ETH',
          address: 'qweqwrytuyoiououiopuipuiouyiuy',
          assets: '50.00',
          swapFee: '20.92%',
          marketCap: '20.92',
          myLiquidity: '12345678.0000',
          volume: '1234567890',
        },
        {
          symbol: 'ETH',
          address: 'qweqwrytuyoiououiopuipuiouyiuy',
          assets: '50.00',
          swapFee: '20.92%',
          marketCap: '20.92',
          myLiquidity: '12345678.0000',
          volume: '1234567890',
        },
        {
          symbol: 'ETH',
          address: 'qweqwrytuyoiououiopuipuiouyiuy',
          assets: '50.00',
          swapFee: '20.92%',
          marketCap: '20.92',
          myLiquidity: '12345678.0000',
          volume: '1234567890',
        },
        {
          symbol: 'ETH',
          address: 'qweqwrytuyoiououiopuipuiouyiuy',
          assets: '50.00',
          swapFee: '20.92%',
          marketCap: '20.92',
          myLiquidity: '12345678.0000',
          volume: '1234567890',
        },
      ],
      BalanceList: [
        {
          icon: Ethereum,
          symbol: 'ETH',
          weight: '20',
          poolBalance: '10.9',
          myBalance: '10.9',
          assetValue: '36.24',
        },
        {
          icon: Ethereum,
          symbol: 'ETH',
          weight: '20',
          poolBalance: '10.9',
          myBalance: '10.9',
          assetValue: '36.24',
        },
        {
          icon: Ethereum,
          symbol: 'ETH',
          weight: '20',
          poolBalance: '10.9',
          myBalance: '10.9',
          assetValue: '36.24',
        },
        {
          icon: Ethereum,
          symbol: 'ETH',
          weight: '20',
          poolBalance: '10.9',
          myBalance: '10.9',
          assetValue: '36.24',
        },
        {
          icon: Ethereum,
          symbol: 'ETH',
          weight: '20',
          poolBalance: '10.9',
          myBalance: '10.9',
          assetValue: '36.24',
        },
        {
          icon: Ethereum,
          symbol: 'ETH',
          weight: '20',
          poolBalance: '10.9',
          myBalance: '10.9',
          assetValue: '36.24',
        },
      ],
      SwapsList: [
        {
          icon: Ethereum,
          symbol: 'ETH',
          tradeIn: '12345678',
          tradeOut: '12345678',
          transaction: 'qwertyuiopasdfghjklmbnbnzvxcb',
          swapFee: '10.9',
          time: 'January 21, 2020 | 12:00:00',
        },
        {
          icon: Ethereum,
          symbol: 'ETH',
          tradeIn: '12345678',
          tradeOut: '12345678',
          transaction: 'qwertyuiopasdfghjklmbnbnzvxcb',
          swapFee: '10.9',
          time: 'January 21, 2020 | 12:00:00',
        },
        {
          icon: Ethereum,
          symbol: 'ETH',
          tradeIn: '12345678',
          tradeOut: '12345678',
          transaction: 'qwertyuiopasdfghjklmbnbnzvxcb',
          swapFee: '10.9',
          time: 'January 21, 2020 | 12:00:00',
        },
        {
          icon: Ethereum,
          symbol: 'ETH',
          tradeIn: '12345678',
          tradeOut: '12345678',
          transaction: 'qwertyuiopasdfghjklmbnbnzvxcb',
          swapFee: '10.9',
          time: 'January 21, 2020 | 12:00:00',
        },
        {
          icon: Ethereum,
          symbol: 'ETH',
          tradeIn: '12345678',
          tradeOut: '12345678',
          transaction: 'qwertyuiopasdfghjklmbnbnzvxcb',
          swapFee: '10.9',
          time: 'January 21, 2020 | 12:00:00',
        },
      ],
      HoldersList: [
        {
          symbol: 'ETH',
          holder: '12345678.0000',
          balance: '12345678',
          value: '12345678',
          shares: '12345678',
        },
        {
          symbol: 'ETH',
          holder: '12345678.0000',
          balance: '12345678',
          value: '12345678',
          shares: '12345678',
        },
        {
          symbol: 'ETH',
          holder: '12345678.0000',
          balance: '12345678',
          value: '12345678',
          shares: '12345678',
        },
        {
          symbol: 'ETH',
          holder: '12345678.0000',
          balance: '12345678',
          value: '12345678',
          shares: '12345678',
        },
        {
          symbol: 'ETH',
          holder: '12345678.0000',
          balance: '12345678',
          value: '12345678',
          shares: '12345678',
        },
        {
          symbol: 'ETH',
          holder: '12345678.0000',
          balance: '12345678',
          value: '12345678',
          shares: '12345678',
        },
      ],
    }
    if (account && account.address) {
      dispatcher.dispatch({
        type: GET_EXPERIMENTAL_VAULT_BALANCES_FULL,
        content: {},
      })
    }
  }
  componentWillMount() {
    emitter.on(DEPOSIT_EXPERIMENTAL_VAULT_RETURNED, this.showHash)
    emitter.on(CLAIM_EXPERIMENTAL_VAULT_RETURNED, this.showHash)
    emitter.on(ZAP_EXPERIMENTAL_VAULT_RETURNED, this.showHash)
    emitter.on(DEPOSIT_ALL_EXPERIMENTAL_VAULT_RETURNED, this.showHash)
    emitter.on(ERROR, this.errorReturned)
    emitter.on(EXPERIMENTAL_VAULT_BALANCES_FULL_RETURNED, this.balancesReturned)
    emitter.on(CONNECTION_CONNECTED, this.connectionConnected)
    emitter.on(CONNECTION_DISCONNECTED, this.connectionDisconnected)
  }

  componentWillUnmount() {
    emitter.removeListener(DEPOSIT_EXPERIMENTAL_VAULT_RETURNED, this.showHash)
    emitter.removeListener(CLAIM_EXPERIMENTAL_VAULT_RETURNED, this.showHash)
    emitter.removeListener(ZAP_EXPERIMENTAL_VAULT_RETURNED, this.showHash)
    emitter.removeListener(
      DEPOSIT_ALL_EXPERIMENTAL_VAULT_RETURNED,
      this.showHash,
    )
    emitter.removeListener(ERROR, this.errorReturned)
    emitter.removeListener(CONNECTION_CONNECTED, this.connectionConnected)
    emitter.removeListener(CONNECTION_DISCONNECTED, this.connectionDisconnected)
    emitter.removeListener(
      EXPERIMENTAL_VAULT_BALANCES_FULL_RETURNED,
      this.balancesReturned,
    )
  }

  balancesReturned = (balances) => {
    this.setState({
      assets: store.getStore('experimentalVaultAssets'),
      loading: false,
    })
  }

  connectionConnected = () => {
    const { t } = this.props
    const account = store.getStore('account')
    this.setState({
      loading: true,
      account: account,
      address: account.address
        ? account.address.substring(0, 6) +
        '...' +
        account.address.substring(
          account.address.length - 4,
          account.address.length,
        )
        : null,
    })

    dispatcher.dispatch({
      type: GET_EXPERIMENTAL_VAULT_BALANCES_FULL,
      content: {},
    })

    const that = this
    setTimeout(() => {
      const snackbarObj = {
        snackbarMessage: t('Unlock.WalletConnected'),
        snackbarType: 'Info',
      }
      that.setState(snackbarObj)
    })
  }

  connectionDisconnected = () => {
    this.setState({
      account: null,
      address: null,
    })
  }

  errorReturned = (error) => {
    const snackbarObj = { snackbarMessage: null, snackbarType: null }
    this.setState(snackbarObj)
    this.setState({ loading: false })
    const that = this
    setTimeout(() => {
      const snackbarObj = {
        snackbarMessage: error.toString(),
        snackbarType: 'Error',
      }
      that.setState(snackbarObj)
    })
  }

  showHash = (txHash) => {
    const snackbarObj = { snackbarMessage: null, snackbarType: null }
    this.setState(snackbarObj)
    this.setState({ loading: false })
    const that = this
    setTimeout(() => {
      const snackbarObj = { snackbarMessage: txHash, snackbarType: 'Hash' }
      that.setState(snackbarObj)
    })
  }

  render() {
    const { classes } = this.props;
    const { loading, account, snackbarMessage } = this.state;
    if (!account || !account.address) {
      return (
        <div className={classes.root}>
          <div className="container-xl">
            <AssetsDetails />
            <div className="table-box cardBg mb">
              <h4>Pools</h4>
              <div className="table-responsive pools-table">
                <table>
                  <thead>
                    <tr>
                      <th>Pool Address</th>
                      <th>Assets</th>
                      <th>Swap Fee</th>
                      <th>Market Cap</th>
                      <th>My Liquidity</th>
                      <th>Volume (24)</th>
                    </tr>
                  </thead>
                  <tbody className="pools-table">
                    {this.state.PoolsList.map((item, index) => (
                      <tr key={index}>
                        <td>
                          <div className="addressFormat">{item.address}</div>
                        </td>
                        <td>
                          <div className="icon-name">
                            <span>
                              {item.assets}% {item.symbol}
                            </span>
                            <span>
                              {item.assets}% {item.symbol}
                            </span>
                          </div>
                        </td>
                        <td>{item.swapFee}</td>
                        <td>{item.marketCap}</td>
                        <td>{item.myLiquidity}</td>
                        <td>{item.volume}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="Widget mb">
              <div className="widgetHeader">
                <div className="address">
                  <i className="fa fa-arrow-left"></i>
                  <p className="mr-3">Pool</p>
                  <p>GCUJF.....YXAHI</p>
                </div>
                <div className="widgetButtons">
                  <button
                    className="btn btn-default add-btn"
                    type="button"
                    data-toggle="modal"
                    data-target="#LiquidityModal"
                  >
                    Add Liquidity
                  </button>
                  <button
                    className="btn btn-default remove-btn"
                    type="button"
                    data-toggle="modal"
                    data-target="#RemoveLiquidityModal"
                  >
                    Remove
                  </button>
                </div>
              </div>
              <div className="greyBox">
                <div className="row">
                  <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12">
                    <div className="AmountBox text-center">
                      <h1 className="Amount">$844.15</h1>
                      <p>Liquidity</p>
                    </div>
                  </div>
                  <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12">
                    <div className="AmountBox text-center">
                      <h1 className="Amount">$844.15</h1>
                      <p>Volume (24hr)</p>
                    </div>
                  </div>
                  <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12">
                    <div className="AmountBox text-center">
                      <h1 className="Amount">0.25%</h1>
                      <p>Swap Fee</p>
                    </div>
                  </div>
                  <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12">
                    <div className="AmountBox text-center">
                      <h1 className="Amount">0.00%</h1>
                      <p>My Pool Share</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="tabs">
                <ul
                  className="nav nav-tabs customTabs"
                  id="myTab"
                  role="tablist"
                >
                  <li className="nav-item" role="presentation">
                    <a
                      className="nav-link active"
                      id="home-tab"
                      data-toggle="tab"
                      href="#home"
                      role="tab"
                      aria-controls="home"
                      aria-selected="true"
                    >
                      Balances
                      <p>1</p>
                    </a>
                  </li>
                  <li className="nav-item" role="presentation">
                    <a
                      className="nav-link"
                      id="profile-tab"
                      data-toggle="tab"
                      href="#profile"
                      role="tab"
                      aria-controls="profile"
                      aria-selected="false"
                    >
                      Swaps
                      <p>22</p>
                    </a>
                  </li>
                  <li className="nav-item" role="presentation">
                    <a
                      className="nav-link"
                      id="contact-tab"
                      data-toggle="tab"
                      href="#contact"
                      role="tab"
                      aria-controls="contact"
                      aria-selected="false"
                    >
                      Holders
                      <p>1234</p>
                    </a>
                  </li>
                  <li className="nav-item d-flex" role="presentation">
                    <a
                      className="nav-link w-100 d-flex justify-content-center"
                      id="about-tab"
                      data-toggle="tab"
                      href="#about"
                      role="tab"
                      aria-controls="about"
                      aria-selected="false"
                    >
                      About
                    </a>
                  </li>
                </ul>
                <div className="tab-content" id="myTabContent">
                  <div
                    className="tab-pane fade show active"
                    id="home"
                    role="tabpanel"
                    aria-labelledby="home-tab"
                  >
                    <div className="table-responsive mt-3 balance-table">
                      <table>
                        <thead>
                          <tr>
                            <th className="border-0">Token</th>
                            <th className="border-0">Weight</th>
                            <th className="border-0">Pool Balance</th>
                            <th className="border-0">My Balance</th>
                            <th className="border-0">My Asset Value</th>
                          </tr>
                        </thead>
                        <tbody>
                          {this.state.BalanceList.map((item, index) => (
                            <tr key={index}>
                              <td>
                                <div className="icon-name">
                                  <div className="iconDiv">
                                    <img src={item.icon} alt="logo" />
                                  </div>
                                  <span>{item.symbol}</span>
                                </div>
                              </td>
                              <td>{item.weight}%</td>
                              <td>{item.poolBalance}K</td>
                              <td>{item.myBalance}</td>
                              <td>${item.assetValue}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <div
                    className="tab-pane fade"
                    id="profile"
                    role="tabpanel"
                    aria-labelledby="profile-tab"
                  >
                    <div className="table-responsive mt-3 swaps-table">
                      <table>
                        <thead>
                          <tr>
                            <th className="border-0">Trade In</th>
                            <th className="border-0">Trade Out</th>
                            <th className="border-0">Transaction</th>
                            <th className="border-0">Swap Fee</th>
                            <th className="border-0">Time</th>
                          </tr>
                        </thead>
                        <tbody>
                          {this.state.SwapsList.map((item, index) => (
                            <tr key={index}>
                              <td>
                                <div className="icon-name">
                                  <div className="iconDiv">
                                    <img src={item.icon} alt="logo" />
                                  </div>
                                  <span>{item.tradeIn}</span>
                                  <span>{item.symbol}</span>
                                </div>
                              </td>
                              <td>
                                <div className="icon-name">
                                  <div className="iconDiv">
                                    <img src={item.icon} alt="logo" />
                                  </div>
                                  <span>{item.tradeOut}</span>
                                  <span>{item.symbol}</span>
                                </div>
                              </td>
                              <td>
                                <div className="addressFormat">
                                  {item.transaction}
                                </div>
                              </td>
                              <td>{item.swapFee}</td>
                              <td>{item.time}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <div
                    className="tab-pane fade"
                    id="contact"
                    role="tabpanel"
                    aria-labelledby="contact-tab"
                  >
                    <div className="table-responsive mt-3 holders-table">
                      <table>
                        <thead>
                          <tr>
                            <th className="border-0">Holder</th>
                            <th className="border-0">Balance</th>
                            <th className="border-0">Value</th>
                            <th className="border-0">Shares</th>
                          </tr>
                        </thead>
                        <tbody>
                          {this.state.HoldersList.map((item, index) => (
                            <tr key={index}>
                              <td className="border-0">
                                {item.holder} {item.symbol}
                              </td>
                              <td className="border-0">{item.balance} CRPT</td>
                              <td className="border-0">${item.value}</td>
                              <td className="border-0">${item.shares}%</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <div
                    className="tab-pane fade"
                    id="about"
                    role="tabpanel"
                    aria-labelledby="about-tab"
                  >
                    <div className="about-content">
                      <div className="item-list">
                        <div className="item">
                          <div className="property">Pool Type</div>
                          <div className="value">Shared Pool</div>
                        </div>
                        <div className="item">
                          <div className="property">Creator</div>
                          <div className="value addressFormat">
                            0x3ierebufbwiefsdffosdvfuvfweofydfsd
                          </div>
                        </div>
                        <div className="item">
                          <div className="property">Creation date</div>
                          <div className="value">
                            October 14, 2020, 12:00:00 PM
                          </div>
                        </div>
                        <div className="item">
                          <div className="property">CRPT asset</div>
                          <div className="value addressFormat">
                            0x3ierebufbwiefsdffosdvfuvfweofydfsd
                          </div>
                        </div>
                        <div className="item">
                          <div className="property">CRPT total supply</div>
                          <div className="value">0.12345678901234567890</div>
                        </div>
                        <div className="item">
                          <div className="property">Public swap</div>
                          <div className="value">Enabled</div>
                        </div>
                        <div className="item">
                          <div className="property">Swap fee</div>
                          <div className="value">0.25%</div>
                        </div>
                        <div className="item">
                          <div className="property">Total swap volume</div>
                          <div className="value">$3.97M</div>
                        </div>
                        <div className="item">
                          <div className="property">Total swap fee</div>
                          <div className="value">$9.93K</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className="modal fade SupplyModal"
                  id="LiquidityModal"
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
                          <h2 className="modalTitle">Add Liquidity</h2>
                          <div className="ModalContent">
                            <ul
                              className="nav nav-tabs ModalTabs"
                              id="myTab"
                              role="tablist"
                            >
                              <li className="nav-item" role="presentation">
                                <a
                                  className="nav-link active"
                                  id="supply1-tab"
                                  data-toggle="tab"
                                  href="#supply1"
                                  role="tab"
                                  aria-controls="supply1"
                                  aria-selected="true"
                                >
                                  Multi Assets
                                </a>
                              </li>
                              <li className="nav-item" role="presentation">
                                <a
                                  className="nav-link"
                                  id="withdraw1-tab"
                                  data-toggle="tab"
                                  href="#withdraw1"
                                  role="tab"
                                  aria-controls="withdraw1"
                                  aria-selected="false"
                                >
                                  Single Asset
                                </a>
                              </li>
                            </ul>
                            <div
                              className="tab-content modalTabsCont"
                              id="myTabContent"
                            >
                              <div
                                className="tab-pane fade show active"
                                id="supply1"
                                role="tabpanel"
                                aria-labelledby="supply1-tab"
                              >
                                <div className="grey-box">
                                  <p>
                                    <strong>Pool Overview</strong>
                                  </p>
                                  <div className="overview-box">
                                    <div>
                                      <p>0x69c2...ada20</p>
                                      <p className="mb-0">
                                        My Share: 0.00% | Swap Fee 0.25%
                                      </p>
                                    </div>
                                    <div>
                                      <p>ETH 50%</p>
                                      <p className="mb-0">USDC 50%</p>
                                    </div>
                                  </div>
                                </div>
                                <div className="table-responsive mt-3">
                                  <table className="liquidity-table">
                                    <thead className="theadBg">
                                      <tr>
                                        <th className="border-0">Asset</th>
                                        <th className="border-0">Balance</th>
                                        <th className="border-0">
                                          Deposit Amount
                                        </th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      <tr>
                                        <td>
                                          <div className="icon-name">
                                            <div className="iconDiv">
                                              <img
                                                src={Ethereum}
                                                alt="Ethereum"
                                              />
                                            </div>
                                            <div className="tableinnerSec">
                                              <div>ETH</div>
                                            </div>
                                          </div>
                                        </td>
                                        <td>0.02</td>
                                        <td>
                                          <div className="input-group">
                                            <input
                                              className="form-control"
                                              type="text"
                                              placeholder="0.00"
                                            />
                                            <div className="input-group-append">
                                              <button
                                                className="btn btn-default maxBtn"
                                                type="submit"
                                              >
                                                max
                                              </button>
                                            </div>
                                          </div>
                                        </td>
                                      </tr>
                                      <tr>
                                        <td>
                                          <div className="icon-name">
                                            <div className="iconDiv">
                                              <img
                                                src={Ethereum}
                                                alt="Ethereum"
                                              />
                                            </div>
                                            <div className="tableinnerSec">
                                              <div>ETH</div>
                                            </div>
                                          </div>
                                        </td>
                                        <td>0.02</td>
                                        <td>
                                          <div className="input-group">
                                            <input
                                              className="form-control"
                                              type="text"
                                              placeholder="0.00"
                                            />
                                            <div className="input-group-append">
                                              <button
                                                className="btn btn-default maxBtn"
                                                type="submit"
                                              >
                                                max
                                                </button>
                                            </div>
                                          </div>
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </div>
                                <div className="totalAmount">
                                  <div>
                                    <span>CRPT Amount</span>
                                  </div>
                                  <div>
                                    <span>0.0000</span>
                                  </div>
                                </div>
                              </div>
                              <div
                                className="tab-pane fade"
                                id="withdraw1"
                                role="tabpanel"
                                aria-labelledby="withdraw1-tab"
                              >
                                <div className="grey-box">
                                  <p>
                                    <strong>Pool Overview</strong>
                                  </p>
                                  <div className="overview-box">
                                    <div>
                                      <p>0x69c2...ada20</p>
                                      <p className="mb-0">
                                        My Share: 0.00% | Swap Fee 0.25%
                                      </p>
                                    </div>
                                    <div>
                                      <p>100% Cream</p>
                                    </div>
                                  </div>
                                </div>
                                <div className="table-responsive mt-3">
                                  <table className="liquidity-table">
                                    <thead className="theadBg">
                                      <tr>
                                        <th className="border-0">Asset</th>
                                        <th className="border-0">Balance</th>
                                        <th className="border-0">
                                          Deposit Amount
                                        </th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      <tr>
                                        <td>
                                          <div className="icon-name">
                                            <div className="iconDiv">
                                              <img
                                                src={Ethereum}
                                                alt="Ethereum"
                                              />
                                            </div>
                                            <div className="tableinnerSec">
                                              <div>ETH</div>
                                            </div>
                                          </div>
                                        </td>
                                        <td>0.02</td>
                                        <td>
                                          <div className="input-group">
                                            <input
                                              className="form-control"
                                              type="text"
                                              placeholder="0.00"
                                            />
                                            <div className="input-group-append">
                                              <button
                                                className="btn btn-default maxBtn"
                                                type="submit"
                                              >
                                                max
                                              </button>
                                            </div>
                                          </div>
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </div>
                                <div className="totalAmount">
                                  <div>
                                    <span>CRPT Amount</span>
                                  </div>
                                  <div>
                                    <span>0.0000</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <button
                            type="button"
                            className="btn btn-default enableBtn"
                          >
                            Add Liquidity
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className="modal fade SupplyModal"
                  id="RemoveLiquidityModal"
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
                          <h2 className="modalTitle"> Remove Liquidity</h2>
                          <div className="ModalContent">
                            <ul
                              className="nav nav-tabs ModalTabs"
                              id="myTab"
                              role="tablist"
                            >
                              <li className="nav-item" role="presentation">
                                <a
                                  className="nav-link active"
                                  id="supply1-tab"
                                  data-toggle="tab"
                                  href="#supply1"
                                  role="tab"
                                  aria-controls="supply1"
                                  aria-selected="true"
                                >
                                  Multi Assets
                                </a>
                              </li>
                              <li className="nav-item" role="presentation">
                                <a
                                  className="nav-link"
                                  id="withdraw1-tab"
                                  data-toggle="tab"
                                  href="#withdraw1"
                                  role="tab"
                                  aria-controls="withdraw1"
                                  aria-selected="false"
                                >
                                  Single Asset
                                </a>
                              </li>
                            </ul>
                            <div
                              className="tab-content modalTabsCont"
                              id="myTabContent"
                            >
                              <div
                                className="tab-pane fade show active"
                                id="supply1"
                                role="tabpanel"
                                aria-labelledby="supply1-tab"
                              >
                                <div className="grey-box">
                                  <p>
                                    <strong>Pool Overview</strong>
                                  </p>
                                  <div className="overview-box">
                                    <div>
                                      <p>0x69c2...ada20</p>
                                      <p className="mb-0">
                                        My Share: 0.00% | Swap Fee 0.25%
                                      </p>
                                    </div>
                                    <div>
                                      <p>ETH 50%</p>
                                      <p className="mb-0">USDC 50%</p>
                                    </div>
                                  </div>
                                </div>
                                <div className="table-responsive mt-3">
                                  <table className="liquidity-table">
                                    <thead className="theadBg">
                                      <tr>
                                        <th className="border-0">Asset</th>
                                        <th className="border-0">
                                          My Pool Balance
                                        </th>
                                        <th className="border-0">Withdraw</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      <tr>
                                        <td>
                                          <div className="icon-name">
                                            <div className="iconDiv">
                                              <img
                                                src={Ethereum}
                                                alt="Ethereum"
                                              />
                                            </div>
                                            <div className="tableinnerSec">
                                              <div>ETH</div>
                                            </div>
                                          </div>
                                        </td>
                                        <td>0.02</td>
                                        <td>0.00000</td>
                                      </tr>
                                      <tr>
                                        <td>
                                          <div className="icon-name">
                                            <div className="iconDiv">
                                              <img
                                                src={Ethereum}
                                                alt="Ethereum"
                                              />
                                            </div>
                                            <div className="tableinnerSec">
                                              <div>ETH</div>
                                            </div>
                                          </div>
                                        </td>
                                        <td>0.02</td>
                                        <td>0.00000</td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </div>
                                <div className="totalAmount">
                                  <div>
                                    <span>CRPT Amount</span>
                                  </div>
                                  <div className="input-group Cr-Input">
                                    <input
                                      className="form-control"
                                      type="text"
                                      placeholder="0.00"
                                    />
                                    <div className="input-group-append">
                                      <button
                                        className="btn btn-default maxBtn"
                                        type="submit"
                                      >
                                        max
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div
                                className="tab-pane fade"
                                id="withdraw1"
                                role="tabpanel"
                                aria-labelledby="withdraw1-tab"
                              >
                                <div className="grey-box">
                                  <p>
                                    <strong>Pool Overview</strong>
                                  </p>
                                  <div className="overview-box">
                                    <div>
                                      <p>0x69c2...ada20</p>
                                      <p className="mb-0">
                                        My Share: 0.00% | Swap Fee 0.25%
                                      </p>
                                    </div>
                                    <div>
                                      <p>100% Cream</p>
                                    </div>
                                  </div>
                                </div>
                                <div className="table-responsive mt-3">
                                  <table className="liquidity-table">
                                    <thead className="theadBg">
                                      <tr>
                                        <th className="border-0">Asset</th>
                                        <th className="border-0">Balance</th>
                                        <th className="border-0">
                                          Deposit Amount
                                        </th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      <tr>
                                        <td>
                                          <div className="icon-name">
                                            <div className="iconDiv">
                                              <img
                                                src={Ethereum}
                                                alt="Ethereum"
                                              />
                                            </div>
                                            <div className="tableinnerSec">
                                              <div>ETH</div>
                                            </div>
                                          </div>
                                        </td>
                                        <td>0.02</td>
                                        <td>
                                          <div className="input-group">
                                            <input
                                              className="form-control"
                                              type="text"
                                              placeholder="0.00"
                                            />
                                            <div className="input-group-append">
                                              <button
                                                className="btn btn-default maxBtn"
                                                type="submit"
                                              >
                                                max
                                              </button>
                                            </div>
                                          </div>
                                        </td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </div>
                                <div className="totalAmount">
                                  <div>
                                    <span>CRPT Amount</span>
                                  </div>
                                  <div>
                                    <span>0.0000</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <button
                            type="button"
                            className="btn btn-default enableBtn"
                          >
                            Remove Liquidity
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {snackbarMessage && this.renderSnackbar()}
          </div>
        </div>
      )
    }
    return (
      <div className={classes.root}>
        <div className={classes.investedContainer}>
          <Typography variant={'h5'} className={classes.disaclaimer}>
            This project is in beta. Use at your own risk.
          </Typography>
          {this.renderFilters()}
          {this.renderAssetBlocks()}
          {this.renderStrategyRewards()}
        </div>
        {loading && <Loader />}
        {snackbarMessage && this.renderSnackbar()}
      </div>
    )
  }

  onSearchChanged = (event) => {
    let val = []
    val[event.target.id] = event.target.value
    this.setState(val)
  }

  onChange = (event) => {
    let val = []
    val[event.target.id] = event.target.checked
    this.setState(val)
  }

  renderAssetBlocks = () => {
    const { assets, expanded, search, hideZero } = this.state;
    const { classes } = this.props;
    const width = window.innerWidth;
    return assets
      .filter((asset) => {
        if (hideZero && asset.balance === 0 && asset.vaultBalance === 0) {
          return false
        }
        if (search && search !== '') {
          return (
            asset.id.toLowerCase().includes(search.toLowerCase()) ||
            asset.name.toLowerCase().includes(search.toLowerCase()) ||
            asset.symbol.toLowerCase().includes(search.toLowerCase()) ||
            asset.description.toLowerCase().includes(search.toLowerCase()) ||
            asset.vaultSymbol.toLowerCase().includes(search.toLowerCase())
          )
          // asset.erc20address.toLowerCase().includes(search.toLowerCase()) ||
          // asset.vaultContractAddress.toLowerCase().includes(search.toLowerCase())
        } else {
          return true
        }
      })
      .map((asset) => {
        return (
          <Accordion
            className={classes.expansionPanel}
            square
            key={asset.id + '_expand'}
            expanded={expanded === asset.id}
            onChange={() => {
              this.handleChange(asset.id)
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1bh-content"
              id="panel1bh-header"
            >
              <div className={classes.assetSummary}>
                <div className={classes.headingName}>
                  <div className={classes.assetIcon}>
                    <img
                      alt="logo"
                      src={require('../../assets/' +
                        asset.symbol.replace(/\+/g, '') +
                        '-logo.png')}
                      height={width > 600 ? '40px' : '30px'}
                      style={
                        asset.disabled ? { filter: 'grayscale(100%)' } : {}
                      }
                    />
                  </div>
                  <div>
                    <Typography
                      variant={'h3'}
                      className={classes.assetName}
                      noWrap
                    >
                      {asset.name}
                    </Typography>
                    <Typography variant={'h5'} className={classes.grey}>
                      {asset.description}
                    </Typography>
                  </div>
                </div>
                <div className={classes.heading}>
                  <Typography variant={'h5'} className={classes.grey}>
                    Deposited:
                  </Typography>
                  <Typography variant={'h3'} noWrap>
                    {(asset.vaultBalance
                      ? asset.vaultBalance.toFixed(2)
                      : '0.00') +
                      ' ' +
                      asset.symbol}
                  </Typography>
                </div>
                <div className={classes.heading}>
                  <Typography variant={'h5'} className={classes.grey}>
                    Available to deposit:
                  </Typography>
                  <Typography variant={'h3'} noWrap>
                    {(asset.balance ? asset.balance.toFixed(2) : '0.00') +
                      ' ' +
                      asset.symbol}
                  </Typography>
                </div>
                {asset.depositDisabled === true && (
                  <div className={classes.heading}>
                    <Tooltip
                      title={
                        <React.Fragment>
                          <Typography variant={'h5'} className={classes.fees}>
                            This vault is currently inactive and is not taking
                            deposits.
                          </Typography>
                        </React.Fragment>
                      }
                      arrow
                    >
                      <Grid
                        container
                        spacing={1}
                        direction="row"
                        alignItems="center"
                      >
                        <Grid item>
                          <HelpIcon
                            fontSize="small"
                            className={classes.grey}
                            style={{ marginBottom: '-5px' }}
                          />
                        </Grid>
                        <Grid item xs>
                          <Typography variant="h5" className={classes.grey}>
                            Inactive
                          </Typography>
                        </Grid>
                      </Grid>
                    </Tooltip>
                  </div>
                )}
              </div>
            </AccordionSummary>
            <AccordionDetails className={classes.removePadding}>
              <Asset asset={asset} startLoading={this.startLoading} />
            </AccordionDetails>
          </Accordion>
        )
      })
  }

  renderFilters = () => {
    const { loading, search, searchError, hideZero } = this.state;
    const { classes } = this.props;
    return (
      <div className={classes.filters}>
        <FormControlLabel
          className={classes.checkbox}
          control={
            <Checkbox
              checked={hideZero}
              onChange={this.handleChecked}
              color="primary"
            />
          }
          label="Hide zero balances"
        />
        <div className={classes.between}></div>
        <TextField
          fullWidth
          disabled={loading}
          className={classes.searchField}
          id={'search'}
          value={search}
          error={searchError}
          onChange={this.onSearchChanged}
          placeholder="ETH, CRV, ..."
          variant="outlined"
          InputProps={{
            startAdornment: (
              <InputAdornment position="end" className={classes.inputAdornment}>
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </div>
    )
  }

  handleChecked = (event) => {
    this.setState({ hideZero: event.target.checked })
    localStorage.setItem(
      'yearn.finance-hideZero',
      event.target.checked ? '1' : '0',
    )
  }

  handleChange = (id) => {
    this.setState({ expanded: this.state.expanded === id ? null : id })
  }

  startLoading = () => {
    this.setState({ loading: true })
  }

  renderSnackbar = () => {
    var { snackbarType, snackbarMessage } = this.state;
    return (
      <Snackbar type={snackbarType} message={snackbarMessage} open={true} />
    )
  }

  _getAPY = (asset) => {
    const initialApy = '0.00'
    if (asset.apy) {
      return asset.apy
    } else {
      return initialApy
    }
  }

  renderStrategyRewards = () => {
    const { classes } = this.props;
    return (
      <div
        className={classes.disaclaimer}
        style={{ marginTop: '25px', maxWidth: '500px' }}
      >
        <Grid container spacing={1}>
          <Grid item>
            <TimelineIcon fontSize="small" />
          </Grid>
          <Grid item xs>
            <Typography
              variant="h4"
              style={{ display: 'inline', fontWeight: 'bold' }}
            >
              Strategy Rewards
            </Typography>
          </Grid>
        </Grid>
        <Typography variant="body1">
          Yearn is only possible due to community contributions. Vault strategy
          contributors are rewarded with <b>0.5%</b> of yield generated by the
          vault.
          <a
            href="https://docs.yearn.finance/faq#what-are-the-fees"
            rel="noopener noreferrer"
            target="_blank"
          >
            Learn more &rarr;
          </a>
        </Typography>
      </div>
    )
  }
}

export default withNamespaces()(withRouter(withStyles(styles)(Experimental)))
