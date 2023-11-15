import React, { useState, useEffect } from "react";
import { useAuth } from "@/context/appContext";
import supabase from "../../supabase";

const Comments = ({ question_id }) => {
  const { user } = useAuth();
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    async function getComments() {
      const { data, error } = await supabase
        .from("comments")
        .select()
        .eq("question_id", question_id);

      setComments(data);
    }
    getComments();
  }, [question_id]);

  const handleCommentSubmit = async () => {
    if (newComment.trim() === "") {
      return; // Prevent submitting empty comments
    }

    try {
      // Insert a new comment into the 'comments' table
      await supabase.from("comments").insert({
        question_id: question_id,
        user_id: user?.session.id,
        comments: newComment,
        user_name: user?.session.user_metadata.firstName,
      });

      // Clear the comment input
      setNewComment("");
      // Reload comments after submission
      getComments();
    } catch (error) {
      console.error("Error submitting comment:", error.message);
    }
  };

  return (
    <div className="mt-8">
      <div className="mb-4">
        <input
          type="text"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          className="w-full border-2 border-black/10 border-slate-400 rounded-lg p-2 placeholder:text-blue-400"
          placeholder="Enter your comment"
        />
      </div>
      <button
        onClick={handleCommentSubmit}
        className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
      >
        Comment
      </button>
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Posted Comments</h2>
        {comments.map((comment) => (
          <div key={comment.id} className="rounded-lg shadow-md p-4 mb-4">
            <h3 className="text-sm font-semibold mb-2">{comment.comments}</h3>
            <div className="flex justify-between items-center">
              <p className="text-blue-500 text-sm">By: {comment.user_name}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Comments;
