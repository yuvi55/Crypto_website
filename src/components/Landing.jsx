import React from "react";
import { Link } from "react-router-dom";
const Landing = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800">Crypto Tracker</h1>
        <p className="text-lg text-gray-600">
          Your simple platform for tracking cryptocurrencies.
        </p>
      </header>

      <main className="text-center">
        <p className="text-lg text-gray-800 mb-4">
          Welcome to Crypto Tracker. Stay informed and explore the world of
          cryptocurrencies.
        </p>
        <p className="text-gray-600 mb-8">
          Track prices, discover new coins, and enhance your knowledge.
        </p>

        <div className="space-x-4">
          <Link
            to="/login"
            className="bg-blue-500 text-white py-2 px-4 rounded-full hover:bg-blue-600 transition duration-300"
          >
            Log In
          </Link>
          <Link
            to="/signup"
            className="bg-white text-blue-500 py-2 px-4 rounded-full border border-blue-500 hover:bg-blue-100 transition duration-300"
          >
            Sign Up
          </Link>
        </div>
      </main>

      <footer className="mt-8 text-gray-600">
        <p>&copy; 2023 Crypto Tracker. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Landing;
