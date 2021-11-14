import createDataContext from './createDataContext';

// Reducer
blogReducer = (state, action) => {
    switch(action.type) {
      case 'edit_blogpost':
        return state.map((blogPost) => {
          return blogPost.id === action.payload.id
            ? action.payload
            : blogPost;
          });
      case 'delete_Blogpost':
        return state.filter(blogPost => blogPost.id !== action.payload);
      case 'add_Blogpost':
        return [
          ...state,
          {
             id: Math.floor(Math.random() * 99999),
             title: action.payload.title,
             content: action.payload.content,
           }
         ];
      default:
      return state;
    }
};

// Dispatch functions

const addBlogPost = dispatch => {
  return (title, content, callback) => {
    dispatch({ type: 'add_Blogpost', payload: { title, content } });
    if (callback) {
      callback();
    }
  };
};

const deleteBlogPost = dispatch => {
  return id => {
    dispatch({ type: 'delete_Blogpost', payload: id });
  };
};

const editBlogPost = dispatch => {
  return (id, title, content, callback) => {
    dispatch({
       type: 'edit_blogpost',
       payload: { id, title, content }
     });
     if (callback) {
       callback();
     }
  };
};

// End of functions


//  Export: The Reducer, The Dispatch Function, The State
export const { Context, Provider } = createDataContext(
  blogReducer,
  { addBlogPost, deleteBlogPost, editBlogPost },
  [{ title: 'Test Post', content: 'Test Content', id: 1 }]
);
