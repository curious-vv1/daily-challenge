import axios from 'axios';

const BASE_URL = 'http://localhost:8080';

export function fetchPosts() {
  return axios.get(`${BASE_URL}/posts`);
}

export function addPost(newPostData) { // Update function to receive an object containing both title and content
  return axios.post(`${BASE_URL}/posts`, newPostData);
}

export function deletePost(postId) {
  return axios.delete(`${BASE_URL}/posts/${postId}`);
}

export function updatePost(postId, updatedPostData) { // Update function to receive an object containing both title and content
  return axios.put(`${BASE_URL}/posts/${postId}`, updatedPostData);
}
