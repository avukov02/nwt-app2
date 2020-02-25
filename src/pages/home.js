import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Post from "../components/Post";
import Profile from "../components/Profile";
import PostPost2 from "../components/PostPost2";
import PropTypes from "prop-types";

import { connect } from "react-redux";
import { getPosts } from "../redux/actions/dataActions";

class home extends Component {
  componentDidMount() {
    this.props.getPosts();
  }
  render() {
    const { posts, loading } = this.props.data;
    const {
      user: { authenticated }
    } = this.props;
    let recentPostsMarkup = !loading ? (
      posts.map(post => <Post key={post.postId} post={post} />)
    ) : (
      <p>Loading...</p>
    );
    let addpost = authenticated ? <PostPost2 /> : <div></div>;
    return (
      <Grid container spacing={10}>
        <Grid item sm={8} xs={12}>
          {addpost}
          {recentPostsMarkup}
        </Grid>
        <Grid item sm={4} xs={12}>
          <Profile />
        </Grid>
      </Grid>
    );
  }
}

home.propTypes = {
  getPosts: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  data: state.data,
  user: state.user
});

export default connect(mapStateToProps, { getPosts })(home);
