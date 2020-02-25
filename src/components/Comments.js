import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
// MUI
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

class Comments extends Component {
  render() {
    const { comments } = this.props;
    return (
      <Grid container>
        {comments.map((comment, index) => {
          const { body, createdAt, userImage, user } = comment;
          return (
            <Fragment key={createdAt}>
              <Grid item sm={12}>
                <Grid container>
                  <Grid item sm={2}>
                    <img
                      src={userImage}
                      alt="comment"
                      style={{
                        maxWidth: "100%",
                        height: 100,
                        objectFit: "cover",
                        borderRadius: "50%"
                      }}
                    />
                  </Grid>
                  <Grid item sm={9}>
                    <div style={{ marginLeft: 20 }}>
                      <Typography
                        variant="h5"
                        component={Link}
                        to={`/users/${user}`}
                        color="secondary"
                      >
                        {user}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        {dayjs(createdAt).format("h:mm a, MMMM DD YYYY")}
                      </Typography>
                      <hr style={{ border: "none", margin: "4" }} />
                      <Typography variant="body1">{body}</Typography>
                    </div>
                  </Grid>
                </Grid>
              </Grid>
              {index !== comments.length - 1 && (
                <hr
                  style={{
                    width: "100%",
                    borderBottom: "1px solid rgba(0,0,0,1)",
                    marginBottom: "20px"
                  }}
                />
              )}
            </Fragment>
          );
        })}
      </Grid>
    );
  }
}

Comments.propTypes = {
  comments: PropTypes.array
};

export default Comments;
