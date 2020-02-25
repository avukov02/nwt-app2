import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import EditDetails from "./EditDetails";
import MyButton from "../util/MyButton";
//MUI stuff
import Button from "@material-ui/core/Button";
import MuiLink from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";
import LocationOn from "@material-ui/icons/LocationOn";
import LinkIcon from "@material-ui/icons/Link";
import CalendarToday from "@material-ui/icons/CalendarToday";
import Paper from "@material-ui/core/Paper";
import EditIcon from "@material-ui/icons/Edit";
import KeyboardReturn from "@material-ui/icons/KeyboardReturn";

import { connect } from "react-redux";
import { logoutUser, uploadImage } from "../redux/actions/userActions";
import UserImage from "./UserImage";

class Profile extends Component {
  handleImageChange = event => {
    const image = event.target.files[0];
    //send to server
    const formData = new FormData();
    formData.append("image", image, image.name);
    this.props.uploadImage(formData);
  };
  handleEditPicture = () => {
    const fileInput = document.getElementById("imageInput");
    fileInput.click();
  };
  handleLogout = () => {
    this.props.logoutUser();
  };
  render() {
    const {
      user: {
        credentials: { handle, createdAt, imageUrl, bio, website, location },
        loading,
        authenticated
      }
    } = this.props;

    let profileMarkup = !loading ? (
      authenticated ? (
        <Paper style={{ marginTop: "20px", padding: "20px" }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <div
              style={{
                position: "relative"
              }}
            >
              <UserImage userImage={imageUrl} />
              <div style={{ position: "absolute", top: "80%", left: "80%" }}>
                <input
                  type="file"
                  id="imageInput"
                  hidden="hidden"
                  onChange={this.handleImageChange}
                />
                <MyButton
                  tip="Edit Profile picture"
                  onClick={this.handleEditPicture}
                >
                  <EditIcon color="secondary" />
                </MyButton>
              </div>
            </div>
            <br />
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <MuiLink
                component={Link}
                to={`/users/${handle}`}
                color="primary"
                variant="h5"
              >
                @{handle}
              </MuiLink>
              <br />
              {bio && <Typography variant="body2"> {bio}</Typography>}
              <br />
              {location && (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    marginBottom: "2px"
                  }}
                >
                  {" "}
                  <LocationOn color="secondary" /> <span> {location}</span>
                  <br />
                </div>
              )}

              {website && (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    marginBottom: "2px"
                  }}
                >
                  <LinkIcon color="secondary" />
                  <a href={website} target="_blank" rel="noopener noreferrer">
                    {" "}
                    {website}
                  </a>
                  <br />
                </div>
              )}
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center"
                }}
              >
                <CalendarToday color="secondary" />{" "}
                <span>Joined {dayjs(createdAt).format("MMM YYYY")}</span>
              </div>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between"
              }}
            >
              <MyButton
                tip="Logout"
                onClick={this.handleLogout}
                style={{ display: "flex" }}
              >
                <KeyboardReturn color="secondary" />
              </MyButton>
              <EditDetails style={{ display: "flex", alignSelf: "flex-end" }} />
            </div>
          </div>
        </Paper>
      ) : (
        <Paper
          style={{ marginTop: "20px", padding: "30px", textAlign: "center" }}
        >
          <Typography variant="body2" align="center">
            No profile found, please log in again
          </Typography>
          <div>
            <Button
              variant="contained"
              color="secondary"
              component={Link}
              to="/login"
              style={{ marginRight: "5px", marginTop: "10px" }}
            >
              Log in
            </Button>
            <Button
              variant="contained"
              color="primary"
              component={Link}
              to="/signup"
              style={{ marginTop: "10px" }}
            >
              Sign up
            </Button>
          </div>
        </Paper>
      )
    ) : (
      <p>loading...</p>
    );

    return profileMarkup;
  }
}

const mapStateToProps = state => ({
  user: state.user
});

const mapActionsToProps = { logoutUser, uploadImage };

Profile.propTypes = {
  user: PropTypes.object.isRequired,
  logoutUser: PropTypes.func.isRequired,
  uploadImage: PropTypes.func.isRequired
};

export default connect(mapStateToProps, mapActionsToProps)(Profile);

//svaki put kad odaberemo file onChange ce se desit
//kad minjamo sliku
