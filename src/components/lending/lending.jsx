import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';
// import { Typography, Slider } from '@material-ui/core';
import Snackbar from '../snackbar';
import SupplyAsset from './supplyAsset';
import BorrowAsset from './borrowAsset';
// import Loader from '../loader';
import AssetsDetails from '../assetsdetails';
import Ethereum from '../../assets/ETH-icon.png';
import { Row, Col } from 'reactstrap';
import { ERROR, CONFIGURE_LENDING, CONFIGURE_LENDING_RETURNED, CONNECTION_CONNECTED, CONNECTION_DISCONNECTED, LENDING_SUPPLY_RETURNED, LENDING_WITHDRAW_RETURNED, LENDING_BORROW_RETURNED, LENDING_REPAY_RETURNED, LENDING_ENABLE_COLLATERAL_RETURNED, LENDING_DISABLE_COLLATERAL_RETURNED, LENDING_BALANCES_RETURNED } from '../../constants';
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

class Lending extends Component {
  constructor(props) {
    super()
    const account = store.getStore('account')
    this.state = {
      assets: store.getStore('lendingAssets'),
      lendingSupply: store.getStore('lendingSupply'),
      lendingBorrow: store.getStore('lendingBorrow'),
      lendingBorrowLimit: store.getStore('lendingBorrowLimit'),
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
      loading: true,
      AssetsList: [
        {
          symbol: 'ETH',
          name: 'Ethereum',
          supply: '20.92%',
          borrow: '20.92%',
          wallet: '12345678.0000',
          enable: '',
        },
        {
          symbol: ' BTC',
          name: 'Bitcoin',
          supply: '21.92%',
          borrow: '20.92%',
          wallet: '12345678.0000',
          enable: 'Enable',
        },
        {
          symbol: 'ANA',
          name: 'Antlia',
          supply: '20.92%',
          borrow: '20.92%',
          wallet: '12345678.0000',
          enable: 'Enable',
        },
        {
          symbol: 'BNB',
          name: 'Binance',
          supply: '20.92%',
          borrow: '20.92%',
          wallet: '12345678.0000',
          enable: 'Enable',
        },
        {
          symbol: 'LTC',
          name: 'Litecoin',
          supply: '20.92%',
          borrow: '20.92%',
          wallet: '12345678.0000',
          enable: 'Enable',
        },
      ],
      SupplyList: [
        {
          symbol: 'ETH',
          return: '20%',
          balance: '10.9',
          amount: '10.9',
          collateral: '',
        },
        {
          symbol: 'ETH',
          return: '20%',
          balance: '10.9',
          amount: '10.9',
          collateral: '',
        },
        {
          symbol: 'ETH',
          return: '20%',
          balance: '10.9',
          amount: '10.9',
          collateral: '',
        },
        {
          symbol: 'ETH',
          return: '20%',
          balance: '10.9',
          amount: '10.9',
          collateral: '',
        },
      ],
      BorrowList: [
        {
          symbol: 'ETH',
          return: '20%',
          wallet: '10.9',
          amount: '10.9',
          liquidity: '36.24',
        },
        {
          symbol: 'ETH',
          return: '20%',
          balance: '10.9',
          amount: '10.9',
          liquidity: '36.24',
        },
        {
          symbol: 'ETH',
          return: '20%',
          wallet: '10.9',
          amount: '10.9',
          liquidity: '36.24',
        },
        {
          symbol: 'ETH',
          return: '20%',
          balance: '10.9',
          amount: '10.9',
          liquidity: '36.24',
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
      ],
    }
    if (account && account.address) {
      dispatcher.dispatch({ type: CONFIGURE_LENDING, content: {} })
    }
  }
  componentWillMount() {
    emitter.on(ERROR, this.errorReturned)
    emitter.on(CONFIGURE_LENDING_RETURNED, this.configureLendingReturned)
    emitter.on(LENDING_BALANCES_RETURNED, this.configureLendingReturned)
    emitter.on(CONNECTION_CONNECTED, this.connectionConnected)
    emitter.on(CONNECTION_DISCONNECTED, this.connectionDisconnected)
    emitter.on(LENDING_WITHDRAW_RETURNED, this.showHash)
    emitter.on(LENDING_SUPPLY_RETURNED, this.showHash)
    emitter.on(LENDING_BORROW_RETURNED, this.showHash)
    emitter.on(LENDING_REPAY_RETURNED, this.showHash)
    emitter.on(LENDING_ENABLE_COLLATERAL_RETURNED, this.showHash)
    emitter.on(LENDING_DISABLE_COLLATERAL_RETURNED, this.showHash)
  }

  componentWillUnmount() {
    emitter.removeListener(ERROR, this.errorReturned)
    emitter.removeListener(CONNECTION_CONNECTED, this.connectionConnected)
    emitter.removeListener(CONNECTION_DISCONNECTED, this.connectionDisconnected)
    emitter.removeListener(
      CONFIGURE_LENDING_RETURNED,
      this.configureLendingReturned,
    )
    emitter.removeListener(
      LENDING_BALANCES_RETURNED,
      this.configureLendingReturned,
    )
    emitter.removeListener(LENDING_WITHDRAW_RETURNED, this.showHash)
    emitter.removeListener(LENDING_SUPPLY_RETURNED, this.showHash)
    emitter.removeListener(LENDING_BORROW_RETURNED, this.showHash)
    emitter.removeListener(LENDING_REPAY_RETURNED, this.showHash)
    emitter.removeListener(LENDING_ENABLE_COLLATERAL_RETURNED, this.showHash)
    emitter.removeListener(LENDING_DISABLE_COLLATERAL_RETURNED, this.showHash)
  }

  configureLendingReturned = (balances) => {
    this.setState({
      assets: store.getStore('lendingAssets'),
      lendingSupply: store.getStore('lendingSupply'),
      lendingBorrow: store.getStore('lendingBorrow'),
      lendingBorrowLimit: store.getStore('lendingBorrowLimit'),
      loading: false,
    })
  }

  connectionConnected = () => {
    const account = store.getStore('account');
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
    dispatcher.dispatch({ type: CONFIGURE_LENDING, content: {} })
    const that = this;
    setTimeout(() => {
      const snackbarObj = {
        snackbarMessage: 'Wallet successfully connected',
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
    const { snackbarMessage } = this.state;
    // const { loading, account, snackbarMessage, lendingSupply, lendingBorrow, lendingBorrowLimit } = this.state;
    // if (!account || !account.address) {
    return (
      <div className={classes.root}>
        <div
          className="modal fade myModal"
          id="assetModal"
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
                  <h2 className="modalTitle">Add Asset</h2>
                  <p className="modalDesc">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                    sed do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua.
                    </p>
                  <p className="balanceText">
                    <strong>Balance: 1.234 ETH</strong>
                  </p>
                  <button type="button" className="btn btn-default enableBtn">
                    Enable
                    </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          className="modal fade myModal"
          id="enableModal"
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
                  <h2 className="modalTitle">Enable as Collateral</h2>
                  <div className="errorBox">
                    <p>
                      Each asset used as collateral increase your borrowing
                        limit. Be careful, <span className="br-block"></span>
                        this can subject the asset to being seized in
                        liquidation.
                      </p>
                  </div>
                  <button type="button" className="btn btn-default enableBtn">
                    Use Creth 2 as collateral
                    </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          className="modal fade SupplyModal"
          id="BorrowModal"
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
                  <h2 className="modalTitle">Borrow</h2>
                  <div className="ModalContent">
                    <div className="icon-name enterAmount">
                      <div className="iconDiv">
                        <img src={Ethereum} alt="Ethereum" />
                      </div>
                      <div className="input-group">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter Amount"
                        />
                        <div className="input-group-append">
                          <button
                            className="btn btn-default inputBtn"
                            type="submit"
                          >
                            max
                            </button>
                        </div>
                      </div>
                    </div>
                    <p className="balanceText text-left">
                      <strong>Wallet Balance: 55452315454121554 ETH</strong>
                    </p>
                    <ul
                      className="nav nav-tabs ModalTabs"
                      id="myTab"
                      role="tablist"
                    >
                      <li className="nav-item" role="presentation">
                        <a
                          className="nav-link active"
                          id="supply-tab"
                          data-toggle="tab"
                          href="#supply"
                          role="tab"
                          aria-controls="supply"
                          aria-selected="true"
                        >
                          Supply
                          </a>
                      </li>
                      <li className="nav-item" role="presentation">
                        <a
                          className="nav-link"
                          id="withdraw-tab"
                          data-toggle="tab"
                          href="#withdraw"
                          role="tab"
                          aria-controls="withdraw"
                          aria-selected="false"
                        >
                          Withdraw
                          </a>
                      </li>
                    </ul>
                    <div
                      className="tab-content modalTabsCont"
                      id="myTabContent"
                    >
                      <div
                        className="tab-pane fade show active"
                        id="supply"
                        role="tabpanel"
                        aria-labelledby="supply-tab"
                      >
                        <div className="table-responsive mt-3">
                          <table className="table supply-table">
                            <thead>
                              <tr>
                                <th className="border-0">Supply Rates</th>
                                <th className="border-0">Borrow Limit</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td>
                                  <div className="icon-name">
                                    <div className="iconDiv">
                                      <img src={Ethereum} alt="Ethereum" />
                                    </div>
                                    <div className="tableinnerSec">
                                      <div>Supply Return</div>
                                      <div>1.81%</div>
                                    </div>
                                  </div>
                                </td>
                                <td>
                                  <div className="tableinnerSec">
                                    <div>Borrow Limit</div>
                                    <div>$2991.63</div>
                                  </div>
                                </td>
                              </tr>
                              <tr>
                                <td>
                                  <div className="icon-name">
                                    <div className="iconDiv">
                                      <img src={Ethereum} alt="Ethereum" />
                                    </div>
                                    <div className="tableinnerSec">
                                      <div>Supply Return</div>
                                      <div>1.81%</div>
                                    </div>
                                  </div>
                                </td>
                                <td>
                                  <div className="tableinnerSec">
                                    <div>Borrow Limit</div>
                                    <div>$2991.63</div>
                                  </div>
                                </td>
                              </tr>
                              <tr>
                                <td>
                                  <div className="icon-name">
                                    <div className="iconDiv">
                                      <img src={Ethereum} alt="Ethereum" />
                                    </div>
                                    <div className="tableinnerSec">
                                      <div>Supply Return</div>
                                      <div>1.81%</div>
                                    </div>
                                  </div>
                                </td>
                                <td>
                                  <div className="tableinnerSec">
                                    <div>Borrow Limit</div>
                                    <div>$2991.63</div>
                                  </div>
                                </td>
                              </tr>
                              <tr>
                                <td>
                                  <div className="icon-name">
                                    <div className="iconDiv">
                                      <img src={Ethereum} alt="Ethereum" />
                                    </div>
                                    <div className="tableinnerSec">
                                      <div>Supply Return</div>
                                      <div>1.81%</div>
                                    </div>
                                  </div>
                                </td>
                                <td>
                                  <div className="tableinnerSec">
                                    <div>Borrow Limit</div>
                                    <div>$2991.63</div>
                                  </div>
                                </td>
                              </tr>
                              <tr>
                                <td>
                                  <div className="icon-name">
                                    <div className="iconDiv">
                                      <img src={Ethereum} alt="Ethereum" />
                                    </div>
                                    <div className="tableinnerSec">
                                      <div>Supply Return</div>
                                      <div>1.81%</div>
                                    </div>
                                  </div>
                                </td>
                                <td>
                                  <div className="tableinnerSec">
                                    <div>Borrow Limit</div>
                                    <div>$2991.63</div>
                                  </div>
                                </td>
                              </tr>
                              <tr>
                                <td>
                                  <div className="icon-name">
                                    <div className="iconDiv">
                                      <img src={Ethereum} alt="Ethereum" />
                                    </div>
                                    <div className="tableinnerSec">
                                      <div>Distribution Return</div>
                                      <div>1.81%</div>
                                    </div>
                                  </div>
                                </td>
                                <td>
                                  <div className="tableinnerSec">
                                    <div>Borrow Limit Used</div>
                                    <div>$44.64</div>
                                  </div>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                      <div
                        className="tab-pane fade"
                        id="withdraw"
                        role="tabpanel"
                        aria-labelledby="withdraw-tab"
                      >
                        <div className="table-responsive mt-3">
                          <table className="table supply-table">
                            <thead className="theadBg">
                              <tr>
                                <th className="border-0">Supply Rates</th>
                                <th className="border-0">Borrow Limit</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td>
                                  <div className="icon-name">
                                    <div className="iconDiv">
                                      <img src={Ethereum} alt="Ethereum" />
                                    </div>
                                    <div className="tableinnerSec">
                                      <div>Supply Return</div>
                                      <div>1.81%</div>
                                    </div>
                                  </div>
                                </td>
                                <td>
                                  <div className="tableinnerSec">
                                    <div>Borrow Limit</div>
                                    <div>$2991.63</div>
                                  </div>
                                </td>
                              </tr>
                              <tr>
                                <td>
                                  <div className="icon-name">
                                    <div className="iconDiv">
                                      <img src={Ethereum} alt="Ethereum" />
                                    </div>
                                    <div className="tableinnerSec">
                                      <div>Distribution Return</div>
                                      <div>1.81%</div>
                                    </div>
                                  </div>
                                </td>
                                <td>
                                  <div className="tableinnerSec">
                                    <div>Borrow Limit Used</div>
                                    <div>$44.64</div>
                                  </div>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                  <button type="button" className="btn btn-default enableBtn">
                    Borrow
                    </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          className="modal fade SupplyModal"
          id="supplyModal"
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
                  <h2 className="modalTitle">Supply</h2>
                  <div className="ModalContent">
                    <div className="icon-name enterAmount">
                      <div className="iconDiv">
                        <img src={Ethereum} alt="Ethereum" />
                      </div>
                      <div className="input-group">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter Amount"
                        />
                        <div className="input-group-append">
                          <button
                            className="btn btn-default inputBtn"
                            type="submit"
                          >
                            max
                            </button>
                        </div>
                      </div>
                    </div>
                    <p className="balanceText text-left">
                      <strong>Wallet Balance: 55452315454121554 ETH</strong>
                    </p>
                    <ul
                      className="nav nav-tabs ModalTabs"
                      id="myTab"
                      role="tablist"
                    >
                      <li className="nav-item" role="presentation">
                        <a
                          className="nav-link active"
                          id="supply-tab"
                          data-toggle="tab"
                          href="#supply"
                          role="tab"
                          aria-controls="supply"
                          aria-selected="true"
                        >
                          Supply
                          </a>
                      </li>
                      <li className="nav-item" role="presentation">
                        <a
                          className="nav-link"
                          id="withdraw-tab"
                          data-toggle="tab"
                          href="#withdraw"
                          role="tab"
                          aria-controls="withdraw"
                          aria-selected="false"
                        >
                          Withdraw
                          </a>
                      </li>
                    </ul>
                    <div
                      className="tab-content modalTabsCont"
                      id="myTabContent"
                    >
                      <div
                        className="tab-pane fade show active"
                        id="supply"
                        role="tabpanel"
                        aria-labelledby="supply-tab"
                      >
                        <div className="table-responsive mt-3">
                          <table className="table supply-table">
                            <thead className="theadBg">
                              <tr>
                                <th className="border-0">Supply Rates</th>
                                <th className="border-0">Supply Limit</th>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td>
                                  <div className="icon-name">
                                    <div className="iconDiv">
                                      <img src={Ethereum} alt="Ethereum" />
                                    </div>
                                    <div className="tableinnerSec">
                                      <div>Supply Return</div>
                                      <div>1.81%</div>
                                    </div>
                                  </div>
                                </td>
                                <td>
                                  <div className="tableinnerSec">
                                    <div>Borrow Limit</div>
                                    <div>$2991.63</div>
                                  </div>
                                </td>
                              </tr>
                              <tr>
                                <td>
                                  <div className="icon-name">
                                    <div className="iconDiv">
                                      <img src={Ethereum} alt="Ethereum" />
                                    </div>
                                    <div className="tableinnerSec">
                                      <div>Distribution Return</div>
                                      <div>1.81%</div>
                                    </div>
                                  </div>
                                </td>
                                <td>
                                  <div className="tableinnerSec">
                                    <div>Borrow Limit Used</div>
                                    <div>$44.64</div>
                                  </div>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                      <div
                        className="tab-pane fade"
                        id="withdraw"
                        role="tabpanel"
                        aria-labelledby="withdraw-tab"
                      >
                        ...
                        </div>
                    </div>
                  </div>
                  <button type="button" className="btn btn-default enableBtn">
                    Supply
                    </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container-xl">
          <AssetsDetails />
          <div className="assets-tables">
            <div className="table-box  cardBg">
              <div className="topper">
                <Row>
                  <Col lg={4} md={4} sm={6} xs={12}>
                    <div className="valueBox">
                      <p>Net Returns</p>
                      <h1>0000.075%</h1>
                    </div>
                  </Col>
                  <Col lg={4} md={4} sm={6} xs={12} />
                  <Col lg={4} md={4} sm={6} xs={12} />
                </Row>
              </div>
              <h4>Assets</h4>
              <div className="table-responsive assets-table">
                <table>
                  <thead>
                    <tr>
                      <th>Asset</th>
                      <th>Return on Supply</th>
                      <th>Return on Borrow</th>
                      <th>Wallet</th>
                      <th>Enable</th>
                    </tr>
                  </thead>
                  <tbody className="assets-table">
                    {this.state.AssetsList.map((item, index) => (
                      <tr key={index}>
                        <td>
                          {item.symbol} {item.name}
                        </td>
                        <td>{item.supply}</td>
                        <td>{item.borrow}</td>
                        <td>
                          {item.wallet} {item.symbol}
                        </td>
                        <td>
                          <div>
                            <label className="switch">
                              <input type="checkbox" />
                              <span
                                data-toggle="modal"
                                data-target="#assetModal"
                                className="slider round"
                              ></span>
                            </label>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="tables">
              <Row>
                <Col lg={6}>
                  <div className="table-box  cardBg mb">
                    <div className="theader">
                      <h4>Supply</h4>
                      <i className="fa fa-angle-right"></i>
                    </div>
                    <div className="table-responsive sb-table">
                      <table>
                        <thead>
                          <tr>
                            <th>Asset</th>
                            <th>Return</th>
                            <th>Balance</th>
                            <th>Amount</th>
                            <th>Collaterol</th>
                          </tr>
                        </thead>
                        <tbody>
                          {this.state.SupplyList.map((item, index) => (
                            <tr key={index}>
                              <td>
                                <span
                                  data-toggle="modal"
                                  data-target="#supplyModal"
                                >
                                  {item.symbol}
                                </span>
                              </td>
                              <td>
                                <span
                                  data-toggle="modal"
                                  data-target="#supplyModal"
                                >
                                  {item.return}
                                </span>
                              </td>
                              <td>
                                <span
                                  data-toggle="modal"
                                  data-target="#supplyModal"
                                >
                                  {item.balance} {item.symbol}
                                </span>
                              </td>
                              <td>
                                <span
                                  data-toggle="modal"
                                  data-target="#supplyModal"
                                >
                                  {item.amount} {item.symbol}
                                </span>
                              </td>
                              <td>
                                <div>
                                  <label className="switch">
                                    <input type="checkbox" />
                                    <span
                                      data-toggle="modal"
                                      data-target="#enableModal"
                                      className="slider round"
                                    ></span>
                                  </label>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </Col>
                <Col lg={6}>
                  <div className="table-box  cardBg mb">
                    <div className="theader">
                      <h4>Borrow</h4>
                      <i className="fa fa-angle-right"></i>
                    </div>
                    <div className="table-responsive sb-table">
                      <table>
                        <thead>
                          <tr>
                            <th>Asset</th>
                            <th>Return</th>
                            <th>Wallet</th>
                            <th>Amount</th>
                            <th>Liquidity</th>
                          </tr>
                        </thead>
                        <tbody>
                          {this.state.BorrowList.map((item, index) => (
                            <tr key={index}>
                              <td>
                                <span
                                  data-toggle="modal"
                                  data-target="#BorrowModal"
                                >
                                  {item.symbol}
                                </span>
                              </td>
                              <td>
                                <span
                                  data-toggle="modal"
                                  data-target="#BorrowModal"
                                >
                                  {item.return}
                                </span>
                              </td>
                              <td>
                                <span
                                  data-toggle="modal"
                                  data-target="#BorrowModal"
                                >
                                  {item.wallet} {item.symbol}
                                </span>
                              </td>
                              <td>
                                <span
                                  data-toggle="modal"
                                  data-target="#BorrowModal"
                                >
                                  {item.amount} {item.symbol}
                                </span>
                              </td>
                              <td>
                                <span
                                  data-toggle="modal"
                                  data-target="#BorrowModal"
                                >
                                  {item.liquidity} {item.symbol}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </Col>
              </Row>
            </div>
          </div>
        </div>
        {snackbarMessage && this.renderSnackbar()}
      </div>
    )
    // }
    // return (
    //   <div className={classes.root}>
    //     <div className={classes.investedContainer}>
    //       <Typography variant={'h5'} className={classes.disaclaimer}>
    //         This project is in beta. Use at your own risk.
    //       </Typography>
    //       <div className={classes.lendingContainer}>
    //         <div className={classes.supplyContainer}>
    //           <div className={classes.title}>
    //             <Typography variant="h3">Supply Balance</Typography>
    //             <Typography variant="h1">
    //               ${lendingSupply ? lendingSupply.toFixed(2) : '0.00'}
    //             </Typography>
    //           </div>
    //           {this.renderSupplyHeaders()}
    //           {this.renderSupplyAssets()}
    //         </div>
    //         <div className={classes.supplyContainer}>
    //           <div className={classes.title}>
    //             <Typography variant="h3">Borrow Balance</Typography>
    //             <Typography variant="h1">
    //               ${lendingBorrow ? lendingBorrow.toFixed(2) : '0.00'}
    //             </Typography>
    //             <div className={classes.limitContainer}>
    //               <Typography variant="h4" className={classes.limitHeading}>
    //                 Limit
    //               </Typography>
    //               <div className={classes.limit}>
    //                 <Slider
    //                   className={classes.slider}
    //                   disabled={true}
    //                   marks={[
    //                     {
    //                       value: 0,
    //                       label: '0%',
    //                     },
    //                     {
    //                       value: 25,
    //                     },
    //                     {
    //                       value: 50,
    //                       label: '50%',
    //                     },
    //                     {
    //                       value: 75,
    //                     },
    //                     {
    //                       value: 100,
    //                       label: '100%',
    //                     },
    //                   ]}
    //                   defaultValue={0}
    //                   value={(lendingBorrow * 100) / lendingBorrowLimit}
    //                 />
    //               </div>
    //             </div>
    //           </div>
    //           {this.renderBorrowHeaders()}
    //           {this.renderBorrowAssets()}
    //         </div>
    //       </div>
    //     </div>
    //     {loading && <Loader />}
    //     {snackbarMessage && this.renderSnackbar()}
    //   </div>
    // )
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

  renderSupplyHeaders = () => {
    const { classes } = this.props;
    return (
      <div className={classes.headers}>
        <div className={classes.assetSummary}>
          <div className={classes.headingName}>
            <Typography variant={'h4'} className={classes.assetName}>
              Asset
            </Typography>
          </div>
          <div className={classes.headingAPY}>
            <Typography variant={'h4'} noWrap align="right">
              APY
            </Typography>
          </div>
          <div className={classes.heading}>
            <Typography variant={'h4'} noWrap align="right">
              Wallet
            </Typography>
          </div>
          <div className={classes.heading}>
            <Typography variant={'h4'} noWrap align="right">
              Supplied
            </Typography>
          </div>
        </div>
      </div>
    )
  }

  renderBorrowHeaders = () => {
    const { classes } = this.props;
    return (
      <div className={classes.headers}>
        <div className={classes.assetSummary}>
          <div className={classes.headingName}>
            <Typography variant={'h4'} className={classes.assetName}>
              Asset
            </Typography>
          </div>
          <div className={classes.headingAPY}>
            <Typography variant={'h4'} noWrap align="right">
              APY
            </Typography>
          </div>
          <div className={classes.heading}>
            <Typography variant={'h4'} noWrap align="right">
              Wallet
            </Typography>
          </div>
          <div className={classes.heading}>
            <Typography variant={'h4'} noWrap align="right">
              Borrowed
            </Typography>
          </div>
          <div className={classes.heading}>
            <Typography variant={'h4'} noWrap align="right">
              liquidity
            </Typography>
          </div>
        </div>
      </div>
    )
  }

  sortSupply = (a, b) => {
    if (a.supplyBalance > b.supplyBalance) {
      return -1
    } else if (a.supplyBalance < b.supplyBalance) {
      return 1
    } else if (a.balance > b.balance) {
      return -1
    } else if (a.balance < b.balance) {
      return 1
    } else {
      return 0
    }
  }

  sortBorrow = (a, b) => {
    if (a.borrowBalance > b.borrowBalance) {
      return -1
    } else if (a.borrowBalance < b.borrowBalance) {
      return 1
    } else if (a.balance > b.balance) {
      return -1
    } else if (a.balance < b.balance) {
      return 1
    } else {
      return 0
    }
  }

  renderSupplyAssets = () => {
    const { assets, lendingBorrowLimit, lendingBorrow } = this.state;
    return assets.sort(this.sortSupply).map((asset) => {
      return (
        <SupplyAsset
          key={'supply_' + asset.address}
          asset={asset}
          startLoading={this.startLoading}
          limit={lendingBorrowLimit}
          limitUsed={lendingBorrow}
        />
      )
    })
  }

  renderBorrowAssets = () => {
    const { assets, lendingBorrowLimit, lendingBorrow } = this.state;
    return assets.sort(this.sortBorrow).map((asset) => {
      return (
        <BorrowAsset
          key={'borrow_' + asset.address}
          asset={asset}
          startLoading={this.startLoading}
          limit={lendingBorrowLimit}
          limitUsed={lendingBorrow}
        />
      )
    })
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
}

export default withRouter(withStyles(styles)(Lending))
