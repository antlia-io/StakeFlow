import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import { withNamespaces } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Row, Col } from 'reactstrap';
import { animateScroll as scroll } from 'react-scroll';
import stakingflow from '../../assets/backwalls/stakingflow.png';
import video from '../../assets/backwalls/video.mp4';
import multitier from '../../assets/backwalls/multitier.png';
import crosschain from '../../assets/backwalls/crosschain.png';
import lendborrow from '../../assets/backwalls/lendborrow.png';
import defiecosystem from '../../assets/backwalls/defiecosystem.png';
import ethereum from '../../assets/backwalls/ethereum.png';
import antlia from '../../assets/backwalls/antlia.png';
import binance from '../../assets/backwalls/binance.png';
import cosmos from '../../assets/backwalls/cosmos.png';
import avalanche from '../../assets/backwalls/avalanche.png';
import polkadot from '../../assets/backwalls/polkadot.png';

const styles = (theme) => ({
  root: {
    flex: 1,
    display: 'flex',
    width: '100%',
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'column',
    [theme.breakpoints.up('sm')]: {
      flexDirection: 'row',
    },
  },
})

class Home extends Component {
  constructor(props) {
    super()
    this.state = {
      StakeFlow: [
        {
          icon: multitier,
          desc: 'Earn multi tier reward on locked Assets',
        },
        {
          icon: crosschain,
          desc: 'Cross chain assets DeFi ecosystem with Staking',
        },
        {
          icon: lendborrow,
          desc: 'Greater utility, speed & flexibility in lending/borrowing',
        },
        {
          icon: defiecosystem,
          desc: 'Easier access to DeFi ecosystem',
        },
      ],
      Networks: [
        {
          icon: ethereum,
          name: 'Ethereum',
          total: '0.23213',
          usd: '12323213',
          apy: '4',
          address: 'qwertyuioplkjghfsdfvxcbvrtyhrthrweytwertfgwetwefwerwe',
        },
        {
          icon: antlia,
          name: 'Antlia',
          total: '0.12434324',
          usd: '12345678903232',
          apy: '15',
          address: 'qwertyuioplkjghfsdfvxcbvrtyhrthrweytwertfgwetwefwerwe',
        },
        {
          icon: binance,
          name: 'Binance Smart Chain',
          total: '0.123',
          usd: '1230',
          apy: '6',
          address: 'qwertyuioplkjghfsdfvxcbvrtyhrthrweytwertfgwetwefwerwe',
        },
        {
          icon: cosmos,
          name: 'Cosmos',
          total: '0.1234',
          usd: '123456',
          apy: '4',
          address: 'qwertyuioplkjghfsdfvxcbvrtyhrthrweytwertfgwetwefwerwe',
        },
        {
          icon: avalanche,
          name: 'Avalanche',
          total: '0.87654543',
          usd: '67890',
          apy: '12',
          address: 'qwertyuioplkjghfsdfvxcbvrtyhrthrweytwertfgwetwefwerwe',
        },
        {
          icon: polkadot,
          name: 'Polkadot',
          total: '0.8787',
          usd: '123456789065655557',
          apy: '8',
          address: 'qwertyuioplkjghfsdfvxcbvrtyhrthrweytwertfgwetwefwerwe',
        },
      ],
    }
  }

  render() {
    const scrollToTop = () => {
      scroll.scrollToTop()
    }
    return (
      <div>
        <div className="mainbanner">
          <div className="video-container">
            <video autoPlay muted loop className="video">
              <source src={video} type="video/mp4" />
            </video>
          </div>
          <div className="container">
            <Row>
              <Col lg={6} md={6} sm={12}>
                <div className="banner-content">
                  <div>
                    <h1>
                      Antlia
                      <br />
                      StakeFlow
                    </h1>
                    <p>
                      Antlia StakeFlow, is an incentivized multi tier reward
                      DeFi staking application. StakeFlow uses goverance token
                      ANAGOV and multi synthetic tokens such as ANAETH2 ,
                      ANAAtom and ANADOT etc.
                    </p>
                    <Link to="/dashboard">Read More</Link>
                  </div>
                </div>
              </Col>
              <Col lg={6} md={6}>
                <div className="staking-img">
                  <img src={stakingflow} alt="staking flow" />
                </div>
              </Col>
            </Row>
          </div>
        </div>
        <div className="stakeflow">
          <div className="container">
            <Row>
              <Col lg={12} md={12}>
                <h1>Why Antlia StakeFlow?</h1>
              </Col>
            </Row>
            <Row className="stakeflow-list">
              {this.state.StakeFlow.map((items, index) => (
                <Col lg={3} md={3} sm={6} xs={12} key={index}>
                  <div className="stakingflow-box">
                    <img src={items.icon} alt="staking flow" />
                    <p className="mb-0">{items.desc}</p>
                  </div>
                </Col>
              ))}
            </Row>
          </div>
        </div>
        <div className="networks">
          <div className="container">
            <Row>
              <Col lg={12} md={12}>
                <h1>Networks</h1>
              </Col>
            </Row>
            <Row className="networks-list">
              {this.state.Networks.map((items, index) => (
                <Col lg={4} md={6} sm={12} xs={12} key={index}>
                  <figure className="imghvr-shutter-out-horiz">
                    <div className="network-box">
                      <div className="network-icon">
                        <img src={items.icon} alt="network" />
                      </div>
                      <h4>{items.name}</h4>
                      <div className="apy">APY/APR {items.apy}%</div>
                      <Link
                        to="/dashboard"
                        className="stake-link bgBlue"
                        onClick={scrollToTop}
                      >
                        Stake
                      </Link>
                      <Link to="/" className="readmore">
                        Read more
                      </Link>
                    </div>
                    <figcaption>
                      <div className="total-stake">
                        <h4>Total Stake</h4>
                        <h2>{items.total} ATOM</h2>
                        <p>(${items.usd} USD)</p>
                      </div>
                      <div className="delegation">
                        <h4>Delegation Address</h4>
                        <div className="delegate-address">
                          <div className="fileName">
                            <span>{items.address}</span>
                            <span>{items.address}</span>
                          </div>
                          <i className="fa fa-clone"></i>
                        </div>
                      </div>
                      <Link
                        to="/dashboard"
                        className="stake-link bgWhite"
                        onClick={scrollToTop}
                      >
                        Stake
                      </Link>
                      <Link to="#" className="learnmore">
                        Learn to Delegate
                      </Link>
                    </figcaption>
                  </figure>
                </Col>
              ))}
            </Row>
          </div>
        </div>
        <div className="subscribe">
          <div className="container">
            <Row>
              <Col lg={3} md={3} sm={2} />
              <Col lg={6} md={6} sm={8} xs={12}>
                <h1>Stay in Touch</h1>
                <p>Subscribe to receive Antlia and protocol updates</p>
                <button>Get Updates</button>
              </Col>
              <Col lg={3} md={3} sm={2} />
            </Row>
          </div>
        </div>
      </div>
    )
  }
}

export default withNamespaces()(withRouter(withStyles(styles)(Home)))
