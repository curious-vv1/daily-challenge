import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchPosts, addPost, deletePost, updatePost } from './postAPI';

const initialState = {
  posts: [],
  status: 'idle',
};

export const fetchAsync = createAsyncThunk(
  'post/fetchposts',
  async () => {
    const response = await fetchPosts();
    return response.data;
  }
);

export const addPostAsync = createAsyncThunk(
  'post/addpost',
  async (newPostData) => { // Update function to receive an object containing both title and content
    const response = await addPost(newPostData);
    return response.data;
  }
);

export const deletePostAsync = createAsyncThunk(
  'post/deletepost',
  async (postId) => {
    await deletePost(postId);
    return postId;
  }
);

export const updatePostAsync = createAsyncThunk(
  'post/updatepost',
  async ({ postId, updatedPostData }) => { // Update function to receive an object containing both title and content
    await updatePost(postId, updatedPostData);
    return { postId, updatedPostData };
  }
);

export const postSlice = createSlice({
  name: 'posts',
  initialState,

  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.posts = action.payload;
      })
      .addCase(addPostAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addPostAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.posts.push(action.payload);
      })
      .addCase(deletePostAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(deletePostAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.posts = state.posts.filter((post) => post.id !== action.payload);
      })
      .addCase(updatePostAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(updatePostAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        const { postId, updatedPostData } = action.payload;
        state.posts = state.posts.map((post) =>
          post.id === postId ? { ...post, ...updatedPostData } : post // Merge existing post with updated title and content
        );
      });
  },
});

export default postSlice.reducer;
