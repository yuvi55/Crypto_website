import React, { useState } from "react";
import supabase from "../../supabase";
import { useAuth } from "@/context/appContext";
import { redirect } from "react-router-dom";
import { Link } from "react-router-dom";
const QuestionForm = () => {
  const { user } = useAuth();
  const [title, setTitle] = useState("");
  const [question, setQuestion] = useState("");
  const [data, setData] = useState("");
  async function handleSubmit(e) {
    e.preventDefault();

    const { data, error } = await supabase
      .from("questions")
      .insert({
        user_id: user.session.id,
        username: user.session.user_metadata.firstName,
        question: question,
        title: title,
        user_email: user.session.email,
      })
      .select();
    setData(data);
    // Reset the form fields after submission
    setTitle("");
    setQuestion("");

    if (data) {
      redirect("/forum");
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label htmlFor="title" className="block text-gray-600">
          Title:
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
          required
        />
      </div>
      <div className="mb-4">
        <label htmlFor="question" className="block text-gray-600">
          Question:
        </label>
        <textarea
          id="question"
          name="question"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
          rows="4"
          required
        ></textarea>
      </div>
      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
      >
        Ask Question
      </button>
    </form>
  );
};

export default QuestionForm;
