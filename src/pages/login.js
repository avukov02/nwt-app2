import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import { Typography } from "@material-ui/core";
import tigar from "../content/tigar1.png";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import CircularProgress from "@material-ui/core/CircularProgress";
//Redux stuff
import { connect } from "react-redux";
import { loginUser } from "../redux/actions/userActions";

class login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      errors: {}
    };
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.UI.errors) {
      this.setState({ errors: nextProps.UI.errors });
    }
  }
  handleSumbit = event => {
    event.preventDefault();
    const userData = {
      email: this.state.email,
      password: this.state.password
    };
    this.props.loginUser(userData, this.props.history);
  };

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };
  render() {
    const {
      UI: { loading }
    } = this.props;
    const { errors } = this.state;
    return (
      <Grid container style={{ textAlign: "center" }}>
        <Grid item sm />
        <Grid item sm>
          <img
            src={tigar}
            alt="logo"
            style={{ marginTop: "20px", maxWidth: "200px" }}
          />
          <Typography variant="h3" color="secondary">
            Log in
          </Typography>
          <form noValidate onSubmit={this.handleSumbit}>
            <TextField
              id="email"
              name="email"
              type="email"
              label="Email"
              helperText={errors.email}
              error={errors.email ? true : false}
              value={this.state.email}
              onChange={this.handleChange}
              fullWidth
              style={{
                margin: "5px auto 0px auto"
              }}
            />
            <TextField
              id="password"
              name="password"
              type="password"
              label="Password"
              helperText={errors.password}
              error={errors.password ? true : false}
              value={this.state.password}
              onChange={this.handleChange}
              fullWidth
              style={{
                margin: "5px auto 0px auto"
              }}
            />
            {errors.general && (
              <Typography
                variant="body2"
                style={{ marginTop: "20px", color: "red" }}
              >
                {errors.general}
              </Typography>
            )}
            <Button
              type="submit"
              variant="contained"
              color="secondary"
              fullWidth
              disabled={loading}
              style={{
                marginTop: "20px",
                marginBottom: "8px"
              }}
            >
              Log in
              {loading && (
                <CircularProgress size={30} tyle={{ position: "absolute" }} />
              )}
            </Button>
            <small>
              Don't have an account?{" "}
              <Link to="/signup" style={{ color: "#dc004e" }}>
                {" "}
                Sign up
              </Link>
            </small>
          </form>
        </Grid>
        <Grid item sm></Grid>
      </Grid>
    );
  }
}

login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired
};

//za login nam ne triba data jer necemo prikazivat
//postove pa nam samo triba user i ui
const mapStateToProps = state => ({
  user: state.user,
  UI: state.UI
});

const mapActionsToProps = {
  loginUser
};

export default connect(mapStateToProps, mapActionsToProps)(login);
