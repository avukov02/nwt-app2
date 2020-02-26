import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";

import { connect } from "react-redux";
import { postPost, clearErrors } from "../redux/actions/dataActions";

import MyButton from "../util/MyButton";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import CloseIcon from "@material-ui/icons/Close";
import CircularProgress from "@material-ui/core/CircularProgress";

class PostPost extends Component {
  state = {
    open: false,
    body: "",
    errors: {}
  };
  componentWillReceiveProps(nextProps) {
    if (nextProps.UI.errors) {
      this.setState({
        errors: nextProps.UI.errors
      });
    }
    if (!nextProps.UI.errors && !nextProps.UI.loading) {
      this.setState({ body: "", open: false, errors: {} });
    }
  }
  handleOpen = () => {
    this.setState({ open: true });
  };
  handleClose = () => {
    this.props.clearErrors();
    this.setState({ open: false, errors: {} });
  };
  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
  handleSubmit = event => {
    event.preventDefault();
    this.props.postPost({ body: this.state.body });
  };
  render() {
    const { errors } = this.state;
    const {
      UI: { loading }
    } = this.props;
    return (
      <Fragment>
        <Card
          style={{
            display: "flex",
            position: "relative",
            flexDirection: "column",
            marginTop: "30px",
            marginBottom: "30px",
            maxWidth: 750,
            textAlign: "center",
            backgroundColor: "#fff"
          }}
        >
          <Button
            style={{
              color: "#dc004e",
              textAlign: "center"
            }}
            onClick={this.handleOpen}
            tip="Post a Post!"
          >
            <CardContent
              style={{
                fontWeight: "bold",
                fontSize: "15px",
                paddingTop: "24px"
              }}
            >
              Add new Post
            </CardContent>
          </Button>
        </Card>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm"
        >
          <div
            style={{
              display: "flex",
              flexDirection: "row-reverse",
              justifyContent: "space-between",
              alignItems: "center"
            }}
          >
            <MyButton tip="Close" onClick={this.handleClose}>
              <CloseIcon />
            </MyButton>
            <DialogTitle>Post a new post</DialogTitle>
          </div>
          <DialogContent>
            <form onSubmit={this.handleSubmit}>
              <TextField
                name="body"
                type="text"
                label="POST!"
                multiline
                rows="3"
                placeholder="Post at your fellow apes"
                error={errors.body ? true : false}
                helperText={errors.body}
                onChange={this.handleChange}
                fullWidth
              />
              <Button
                type="submit"
                variant="contained"
                color="secondary"
                disabled={loading}
                style={{
                  position: "relative",
                  marginTop: "20px",
                  float: "right"
                }}
              >
                Submit
                {loading && (
                  <CircularProgress
                    size={30}
                    style={{ position: "absolute" }}
                  />
                )}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </Fragment>
    );
  }
}

PostPost.propTypes = {
  postPost: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired,
  UI: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  UI: state.UI
});

export default connect(mapStateToProps, { postPost, clearErrors })(PostPost);
