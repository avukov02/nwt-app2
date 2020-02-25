import React, { Component } from "react";
import { Link } from "react-router-dom";
//Material UI imports
import Avatar from "@material-ui/core/Avatar";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import PropTypes from "prop-types";
import MyButton from "../util/MyButton";
import ChatIcon from "@material-ui/icons/Chat";

import { connect } from "react-redux";
import DeletePost from "./DeletePost";
import PostDialog from "./PostDialog";
import LikeButton from "./LikeButton";

class Post extends Component {
  render() {
    dayjs.extend(relativeTime);
    const {
      post: {
        body,
        createdAt,
        userImage,
        user,
        postId,
        likeCount,
        commentCount
      },
      user: {
        authenticated,
        credentials: { handle }
      }
    } = this.props;
    const deleteButton =
      authenticated && user === handle ? <DeletePost postId={postId} /> : null;
    return (
      <Card
        style={{
          display: "flex",
          flexDirection: "column",
          marginTop: "20px",
          maxWidth: 750
        }}
      >
        <CardContent
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignContent: "center"
          }}
        >
          <CardContent
            style={{
              alignContent: "center",
              display: "flex",
              justifyContent: "flex-start"
            }}
          >
            <Avatar alt="Profile Image" src={userImage} />
            <CardContent
              style={{
                marginTop: "-23px",
                display: "flex",
                flexDirection: "column",
                marginBottom: "-23px"
              }}
            >
              <Typography
                variant="h6"
                color="secondary"
                component={Link}
                to={`/users/${user}`}
              >
                {user}
              </Typography>
              <Typography variant="body2" color="inherit">
                {dayjs(createdAt).fromNow()}
              </Typography>
            </CardContent>
          </CardContent>
          <CardContent>{deleteButton}</CardContent>
        </CardContent>
        <CardContent style={{ marginTop: "-30px" }}>
          <Typography variant="body1" style={{ marginLeft: "15px" }}>
            {body}
          </Typography>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div style={{ display: "flex" }}>
              <div>
                <LikeButton postId={postId} />
                <span>{likeCount} likes</span>
              </div>
              <div>
                <MyButton tip="comments">
                  <ChatIcon color="primary" />
                </MyButton>
                <span>{commentCount} comments</span>
              </div>
            </div>
            <PostDialog
              postId={postId}
              user={user}
              openDialog={this.props.openDialog}
            />
          </div>
        </CardContent>
      </Card>
    );
  }
}

Post.propTypes = {
  user: PropTypes.object.isRequired,
  post: PropTypes.object.isRequired,
  openDialog: PropTypes.bool
};

const mapStateToProps = state => ({
  user: state.user
});

export default connect(mapStateToProps)(Post);

//typography za tekst koji imamo
