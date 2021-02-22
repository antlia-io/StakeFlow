import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { } from '../../constants';
import AssetsDetails from '../assetsdetails';
import Ethereum from '../../assets/ETH-icon.png';
import BTC from '../../assets/BBTC-logo.png';
import BCH from '../../assets/renBTC-logo.png';
import SWAG from '../../assets/SWAG-logo.jpeg';
import USDT from '../../assets/USDT-icon.png';
import AutorenewIcon from '@material-ui/icons/Autorenew';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

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

class Cover extends Component {
  constructor() {
    super()
    this.state = {
      screen: 'existingCover',
      dropdownOpen: false,
      dropdownOpen1: false,
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
    }
  }
  toggle = () => {
    this.setState((prevState) => ({
      dropdownOpen: !prevState.dropdownOpen,
    }))
  }
  toggle1 = () => {
    this.setState((prevState) => ({
      dropdownOpen1: !prevState.dropdownOpen1,
    }))
  }
  addClicked = () => {
    this.setState({ screen: 'newCover' })
  }
  backClicked = () => {
    this.setState({ screen: 'existingCover' })
  }
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <div className="container-xl">
          <AssetsDetails />
          <div className="stake cardBg">
            <div className="cardHeader">
              <h4>Swap</h4>
            </div>
            <div className="selection">
              <label>From</label>
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
                  </div>
                </div>
                <input type="text" placeholder="Enter Amount" />
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
              <p>Balance: 250.00 </p>
            </div>
            <i className="fa fa-arrow-down" />
            <div className="selection">
              <label>To</label>
              <Dropdown
                isOpen={this.state.dropdownOpen1}
                toggle={() => this.toggle1()}
                right="true"
              >
                <div className="coin-selection">
                  <div className="icon-name">
                    <div className="iconDiv">
                      <img src={Ethereum} alt="ETH" />
                    </div>
                    <span className="symbol">ETH</span>
                  </div>
                </div>
                <input type="text" placeholder="Enter Amount" />
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
            <div className="range-limit">
              <div className="left">Balance: 250.00</div>
              <div className="right">
                Refresh:
                <AutorenewIcon className="icon-set" />
              </div>
            </div>
            <div className="return">
              <p>Price: 250.00 </p>
              <p>Max Slippage </p>
              <div className="radioBtn">
                <input type="radio" name="gender" id="val1" value="val1" />
                <label htmlFor="val1">0.5%</label>
              </div>
              <div className="radioBtn">
                <input type="radio" name="gender" id="val2" value="val2" />
                <label htmlFor="val2">0.01%</label>
              </div>
              <div className="input-container">
                <input
                  className="input-field"
                  type="text"
                  placeholder="Enter Amount"
                  name="usrnm"
                />
                <span className="icon">%</span>
              </div>
            </div>
            <div className="d-block m-auto">
              <button className="stake-btn">Swap</button>
            </div>
          </div>
          {/* <div className={classes.coverContainer}>
            <div className={classes.header}>
              {screen === 'newCover' && (
                <Button
                  onClick={this.backClicked}
                  variant="outlined"
                  color="primary"
                  className={classes.headerButton}
                >
                  Back
                </Button>
              )}
              {screen !== 'newCover' && (
                <div className={classes.headerButton}></div>
              )}
              <Typography variant={'h5'} className={classes.disclaimer}>
                This project is in beta. Use at your own risk.
              </Typography>
              {screen === 'existingCover' && (
                <Button
                  onClick={this.addClicked}
                  variant="contained"
                  color="primary"
                  className={classes.headerButton}
                >
                  Buy Coverage
                </Button>
              )}
              {screen !== 'existingCover' && (
                <div className={classes.headerButton}></div>
              )}
            </div>
            {screen === 'existingCover' && <ExistingCover />}
            {screen === 'newCover' && <NewCover />}
          </div> */}
        </div>
      </div>
    )
  }
}

export default withStyles(styles)(Cover)
