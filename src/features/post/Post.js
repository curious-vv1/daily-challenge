import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchAsync,
  addPostAsync,
  deletePostAsync,
  updatePostAsync,
} from "./postSlice";

export function Post() {
  const posts = useSelector((state) => state.post.posts);
  const dispatch = useDispatch();
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [editPostId, setEditPostId] = useState("");
  const [editedTitle, setEditedTitle] = useState("");
  const [editedContent, setEditedContent] = useState("");

  useEffect(() => {
    dispatch(fetchAsync());
  }, [dispatch]);

  const handleAddPost = () => {
    if (newTitle.trim() !== "" && newContent.trim() !== "") {
      dispatch(addPostAsync({ title: newTitle, content: newContent }));
      setNewTitle("");
      setNewContent("");
    }
  };

  const handleDeletePost = (postId) => {
    dispatch(deletePostAsync(postId));
  };

  const handleEditPost = (postId) => {
    setEditMode(true);
    setEditPostId(postId);
    const postToEdit = posts.find((post) => post.id === postId);
    setEditedTitle(postToEdit.title);
    setEditedContent(postToEdit.content);
  };

  const handleUpdatePost = () => {
    if (editedTitle.trim() !== "" && editedContent.trim() !== "") {
      dispatch(
        updatePostAsync({
          postId: editPostId,
          updatedPostData: { title: editedTitle, content: editedContent },
        })
      );
      setEditMode(false);
      setEditPostId("");
      setEditedTitle("");
      setEditedContent("");
    }
  };

  return (
    <div className="bg-gradient-to-r from-gray-300 to-gray-500 min-h-screen py-8">
      <div className="container mx-auto p-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <div className="md:col-span-2 lg:col-span-3 xl:col-span-4">
          <div className="flex items-center justify-center">
          
            {/* Center the content */}
            <div className="w-full max-w-md">
             
              {/* Set a max width to control the size */}
              <div className="bg-white rounded-lg shadow-md p-4">
                <input
                  className="w-full border rounded py-2 px-4 mb-2"
                  placeholder="Title"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                />
                <textarea
                  className="w-full border rounded py-2 px-4 mb-2"
                  placeholder="Content"
                  rows="4"
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                />

                <button
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"
                  onClick={handleAddPost}
                >
                  Add Post
                </button>
              </div>
            </div>
          </div>
        </div>
        {posts.map((post) => (
          <div
            key={post.id}
            className="bg-white rounded-lg shadow-md p-4 transition-transform duration-300 ease-in-out transform hover:scale-105"
          >
            {editMode && editPostId === post.id ? (
              <>
                <input
                  className="w-full border rounded py-2 px-4 mb-2"
                  value={editedTitle}
                  onChange={(e) => setEditedTitle(e.target.value)}
                />
                <textarea
                  className="w-full border rounded py-2 px-4 mb-2"
                  value={editedContent}
                  onChange={(e) => setEditedContent(e.target.value)}
                  rows="4"
                />
                <div className="flex justify-end">
                  <button
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2"
                    onClick={handleUpdatePost}
                  >
                    Save
                  </button>
                  <button
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => {
                      setEditMode(false);
                      setEditPostId("");
                      setEditedTitle("");
                      setEditedContent("");
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </>
            ) : (
              <>
                <h3 className="text-lg font-bold mb-2">{post.title}</h3>
                <p>{post.content}</p>
                <div className="flex justify-end">
                  <button
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-2"
                    onClick={() => handleDeletePost(post.id)}
                  >
                    Delete
                  </button>
                  <button
                    className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => handleEditPost(post.id)}
                  >
                    Edit
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
