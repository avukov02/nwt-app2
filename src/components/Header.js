import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import Logo from "./logo";
import { connect } from "react-redux";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import PropTypes from "prop-types";
import MyButton from "../util/MyButton";
import PostPost from "./PostPost";
import Notifications from "./Notifications";
import KeyboardReturn from "@material-ui/icons/KeyboardReturn";
import { logoutUser } from "../redux/actions/userActions";
import useMediaQuery from "@material-ui/core/useMediaQuery";

function Header(props) {
  const isNotLarge = useMediaQuery("(max-width:700px)");
  const handleLogout = () => {
    props.logoutUser();
  };
  const { authenticated } = props;

  return (
    <AppBar color="secondary">
      <Toolbar
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginLeft: isNotLarge ? "20px" : "100px",
          marginRight: isNotLarge ? "20px" : "100px"
        }}
      >
        {authenticated ? (
          <Fragment>
            <div style={{ display: "flex" }}>
              <Button color="inherit" component={Link} to="/">
                <Logo />
              </Button>
            </div>
            <div style={{ color: "#fff" }}>
              <PostPost />
              <Notifications />
              <MyButton
                tip="Logout"
                onClick={handleLogout}
                style={{ display: "flex" }}
              >
                <KeyboardReturn style={{ color: "#fff" }} />
              </MyButton>
            </div>
          </Fragment>
        ) : (
          <Fragment>
            <div style={{ display: "flex" }}>
              <Button color="inherit" component={Link} to="/">
                <Logo />
              </Button>
            </div>
            <div>
              <Button color="inherit" component={Link} to="/login">
                Login
              </Button>
              <Button color="inherit" component={Link} to="/signup">
                Signup
              </Button>
            </div>
          </Fragment>
        )}
      </Toolbar>
    </AppBar>
  );
}

Header.propTypes = {
  authenticated: PropTypes.bool.isRequired
};
const mapActionsToProps = { logoutUser };

const mapStateToProps = state => ({
  authenticated: state.user.authenticated
});

export default connect(mapStateToProps, mapActionsToProps)(Header);
