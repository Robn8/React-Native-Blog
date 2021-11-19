import createDataContext from './createDataContext';
import jsonServer from '../api/jsonServer';

// Reducer
blogReducer = (state, action) => {
    switch(action.type) {
      case 'get_blogposts':
        return action.payload;
      case 'edit_blogpost':
        return state.map((blogPost) => {
          return blogPost.id === action.payload.id
            ? action.payload
            : blogPost;
          });
      case 'delete_Blogpost':
        return state.filter(blogPost => blogPost.id !== action.payload);
      default:
      return state;
    }
};

// Dispatch functions

const getBlogPosts = dispatch => {
  return async () => {
    const response = await jsonServer.get('/blogposts');
    // response.data === [{}, {}, {}]

    dispatch({ type: 'get_blogposts', payload: response.data });
  };
};

const addBlogPost = dispatch => {
  return async (title, content, callback) => {
    await jsonServer.post('/blogposts', { title, content })
    if (callback) {
      callback();
    }
  };
};

const deleteBlogPost = dispatch => {
  return async id => {
    await jsonServer.delete(`/blogposts/${id}`);

    dispatch({ type: 'delete_Blogpost', payload: id });
  };
};

const editBlogPost = dispatch => {
  return async (id, title, content, callback) => {
    await jsonServer.put(`/blogposts/${id}`, { title, content });

    dispatch({
       type: 'edit_blogpost',
       payload: { id, title, content }
     });
     if (callback) {
       callback();
     }
  };
};

// End of Dispatch functions


//  Export: The Reducer, The Dispatch Function, The State
export const { Context, Provider } = createDataContext(
  blogReducer,
  { addBlogPost, deleteBlogPost, editBlogPost, getBlogPosts },
  []
);
