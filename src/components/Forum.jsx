import React from "react";
import { Link } from "react-router-dom";
import QuestionCards from "./QuestionCards";
import Navbar from "./Navbar";
const Forum = () => {
  return (
    <div>
      <Navbar />
      <div className="max-w-4xl mx-auto p-8">
        <h1 className="text-3xl font-bold mb-6">
          Forum - What's Buzzing in the Crypto Space
        </h1>
        <div className="mb-6">
          <Link to="/dashboard">
            <button className="bg-blue-500 text-white py-2 px-4 rounded-md mr-4 hover:bg-blue-600 transition duration-300">
              Back to Dashboard
            </button>
          </Link>
          <Link to="/questions">
            <button className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition duration-300">
              Post a Question
            </button>
          </Link>
        </div>
        <QuestionCards />
      </div>
    </div>
  );
};

export default Forum;
