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
import { signupUser } from "../redux/actions/userActions";

export class signup extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      confirmPassword: "",
      handle: "",
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
    this.setState({
      loading: true
    });
    const newUserData = {
      email: this.state.email,
      password: this.state.password,
      confirmPassword: this.state.confirmPassword,
      handle: this.state.handle
    };
    this.props.signupUser(newUserData, this.props.history);
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
            Sign up
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
            <TextField
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              label="Confirm password"
              helperText={errors.confirmpassword}
              error={errors.confirmPassword ? true : false}
              value={this.state.confirmPassword}
              onChange={this.handleChange}
              fullWidth
              style={{
                margin: "5px auto 0px auto"
              }}
            />
            <TextField
              id="handle"
              name="handle"
              type="text"
              label="User name"
              helperText={errors.handle}
              error={errors.handle ? true : false}
              value={this.state.handle}
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
                position: "relative",
                marginTop: "20px",
                marginBottom: "8px"
              }}
            >
              Sign up
              {loading && (
                <CircularProgress size={30} tyle={{ position: "absolute" }} />
              )}
            </Button>
            <small>
              Already have an account?{" "}
              <Link to="/login" style={{ color: "#dc004e" }}>
                {" "}
                Log in
              </Link>
            </small>
          </form>
        </Grid>
        <Grid item sm></Grid>
      </Grid>
    );
  }
}

signup.propTypes = {
  user: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired,
  signupUser: PropTypes.func.isRequired
};

export const mapStateToProps = state => ({
  user: state.user,
  UI: state.UI
});

export default connect(mapStateToProps, { signupUser })(signup);
