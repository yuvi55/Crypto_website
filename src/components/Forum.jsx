import React from "react";
import { Link } from "react-router-dom";
import QuestionCards from "./QuestionCards";
//users would be able to post, update and delete their own questions
// Any other user can answer the questions
const Forum = () => {
  return (
    <div>
      <h1>Forum for what's buzzing in the crypto space</h1>
      <Link to="/questions">
        <button>Post a Question</button>
      </Link>
      <QuestionCards />
    </div>
  );
};

export default Forum;
