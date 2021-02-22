import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1
  },
});

class Fees extends Component {
  constructor() {
    super()
    this.state = {}
  }

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
      </div>
    )
  };
}

export default withRouter(withStyles(styles)(Fees));
