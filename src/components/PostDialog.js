import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import MyButton from "../util/MyButton";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
// MUI Stuff
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import CircularProgress from "@material-ui/core/CircularProgress";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
// Icons
import CloseIcon from "@material-ui/icons/Close";
import UnfoldMore from "@material-ui/icons/UnfoldMore";
import ChatIcon from "@material-ui/icons/Chat";
// Redux stuff
import { connect } from "react-redux";
import { getPost, clearErrors } from "../redux/actions/dataActions";
import LikeButton from "./LikeButton";
import Comments from "./Comments";
import CommentFrom from "./CommentForm";

class PostDialog extends Component {
  state = {
    open: false,
    oldPath: "",
    newPath: ""
  };

  componentDidMount() {
    if (this.props.openDialog) {
      this.handleOpen();
    }
  }
  handleOpen = () => {
    let oldPath = window.location.pathname;

    const { user, postId } = this.props;
    const newPath = `/users/${user}/post/${postId}`;

    if (oldPath === newPath) oldPath = `/users/${user}`;

    window.history.pushState(null, null, newPath);

    this.setState({ open: true, oldPath, newPath });
    this.props.getPost(this.props.postId);
  };
  handleClose = () => {
    window.history.pushState(null, null, this.state.oldPath);
    this.setState({ open: false });
    this.props.clearErrors();
  };

  render() {
    const {
      post: {
        postId,
        body,
        createdAt,
        likeCount,
        commentCount,
        userImage,
        user,
        comments
      },
      UI: { loading }
    } = this.props;

    const dialogMarkup = loading ? (
      <div style={{ textAlign: "center", marginTop: 50, marginBottom: 50 }}>
        <CircularProgress size={200} thickness={2} />
      </div>
    ) : (
      <Grid container spacing={10}>
        <Grid item sm={5}>
          <img
            src={userImage}
            alt="Profile"
            style={{
              maxWidth: 200,
              height: 200,
              borderRadius: "50%",
              objectFit: "cover"
            }}
          />
        </Grid>
        <Grid item sm={7}>
          <Typography
            component={Link}
            color="secondary"
            variant="h5"
            to={`/users/${user}`}
          >
            @{user}
          </Typography>
          <hr style={{ border: "none", margin: "4" }} />
          <Typography variant="body2" color="inherit">
            {dayjs(createdAt).format("h:mm a, MMMM DD YYYY")}
          </Typography>
          <hr style={{ border: "none", margin: "4" }} />
          <Typography variant="body1">{body}</Typography>
          <LikeButton postId={postId} />
          <span>{likeCount} likes</span>
          <MyButton tip="comments">
            <ChatIcon color="primary" />
          </MyButton>
          <span>{commentCount} comments</span>
        </Grid>
        <hr
          style={{
            width: "100%",
            borderBottom: "1px solid rgba(0,0,0,1)",
            marginBottom: "20px"
          }}
        />
        <CommentFrom postId={postId} />
        <Comments comments={comments} />
      </Grid>
    );
    return (
      <Fragment>
        <MyButton onClick={this.handleOpen} tip="Expand post">
          <UnfoldMore color="secondary" />
        </MyButton>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm"
        >
          <div style={{ position: "relative" }}>
            <div style={{ position: "absolute", left: "90%" }}>
              <MyButton tip="Close" onClick={this.handleClose}>
                <CloseIcon />
              </MyButton>
            </div>
            <DialogContent style={{ padding: "50px" }}>
              {dialogMarkup}
            </DialogContent>
          </div>
        </Dialog>
      </Fragment>
    );
  }
}

PostDialog.propTypes = {
  clearErrors: PropTypes.func.isRequired,
  getPost: PropTypes.func.isRequired,
  postId: PropTypes.string.isRequired,
  user: PropTypes.string.isRequired,
  post: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  post: state.data.post,
  UI: state.UI
});

const mapActionsToProps = {
  getPost,
  clearErrors
};

export default connect(mapStateToProps, mapActionsToProps)(PostDialog);
