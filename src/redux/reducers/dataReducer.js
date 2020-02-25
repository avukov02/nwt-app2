import {
  SET_POSTS,
  LIKE_POST,
  UNLIKE_POST,
  LOADING_DATA,
  DELETE_POST,
  POST_POST,
  SET_POST,
  SUBMIT_COMMENT
} from "../types";

const initialState = {
  posts: [],
  post: {},
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case LOADING_DATA:
      return {
        ...state,
        loading: true
      };
    case SET_POSTS:
      return {
        ...state,
        posts: action.payload,
        loading: false
      };
    case SET_POST:
      return {
        ...state,
        post: action.payload
      };
    case LIKE_POST:
    case UNLIKE_POST:
      //nademo taj post i povecamo broj lajkova, zaminimo s novim br
      let index = state.posts.findIndex(
        post => post.postId === action.payload.postId
      );
      state.posts[index] = action.payload;
      if (state.post.postId === action.payload.postId) {
        state.post = action.payload;
      }
      return {
        ...state
      };
    case DELETE_POST:
      let index1 = state.posts.findIndex(
        post => post.postId === action.payload
      );
      state.posts.splice(index1, 1);
      return {
        ...state
      };
    //maknemo od pozicije index samo jedan post jer je br 1
    case POST_POST:
      return {
        ...state,
        posts: [action.payload, ...state.posts]
      };
    case SUBMIT_COMMENT:
      return {
        ...state,
        post: {
          ...state.post,
          comments: [action.payload, ...state.post.comments]
        }
      };
    default:
      return state;
  }
}
