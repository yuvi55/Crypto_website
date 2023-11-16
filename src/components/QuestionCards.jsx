import React, { useState } from "react";
import supabase from "../../supabase";
import { useEffect } from "react";
import Comments from "./Comments";
import { Link } from "react-router-dom";
import { useAuth } from "@/context/appContext";

const QuestionCards = () => {
  const user_data = useAuth();
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    async function getQuestions() {
      const { data, error } = await supabase.from("questions").select();

      setQuestions(data);
    }
    getQuestions();
  }, []);

  async function handleDelete(id) {
    try {
      const { error } = await supabase.from("questions").delete().eq("id", id);
      if (error) {
        console.log(error);
      } else {
        // Update state after deletion
        setQuestions((prevQuestions) =>
          prevQuestions.filter((q) => q.id !== id)
        );
      }
    } catch (error) {
      console.error("Error deleting question:", error.message);
    }
  }
  return (
    <div className="grid grid-cols-1 gap-4 p-4">
      {questions.map((question) => (
        <div key={question.id} className="rounded-lg shadow-md p-4">
          <h2 className="text-xl font-semibold mb-2">
            Title: {question.title}
          </h2>
          <p className="text-gray-600 mb-4">{question.question}</p>
          <div className="flex justify-between items-center">
            <p className="text-blue-500">By: {question.username}</p>
            <p className="text-gray-500">{question.email}</p>
          </div>
          {/* CommentsList Component questionId=question.id */}
          <Comments question_id={question.id} />
          <div>
            {question?.user_id === user_data?.user.session.id && (
              <button
                onClick={() => handleDelete(question.id)}
                className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition duration-300"
              >
                Delete Post
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default QuestionCards;
