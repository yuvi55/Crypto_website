import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import supabase from "../../supabase";
import Navbar from "./Navbar";
import { useAuth } from "@/context/appContext";
import TopMovers from "./TopMovers";
import TopmarketCap from "./TopmarketCap";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [dbData, setDbData] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchDbData() {
      try {
        const { data, error } = await supabase
          .from("coin_data")
          .select("Symbol");

        if (error) {
          console.error("Error fetching data:", error.message);
          return;
        }

        setDbData(data || []);
      } catch (e) {
        console.error("Error:", e.message);
      }
    }

    fetchDbData();
  }, []);

  const handleSearch = () => {
    // Redirect to the search page with the entered input
    navigate(`/search/${searchInput}`);
  };

  return (
    <div className="w-full">
      <Navbar />
      <h1 className="text-4xl font-bold mb-4 text-center my-10">
        Welcome to Coin Info
      </h1>
      <div className="flex items-center justify-center mb-4">
        <label className="mr-2">Search for an asset</label>
        <input
          type="text"
          placeholder="Type asset name (e.g., Bitcoin)"
          className="border p-2 rounded-md w-64"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
        <button
          onClick={handleSearch}
          className="ml-2 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
        >
          Search
        </button>
      </div>
      <TopMovers />
      <TopmarketCap />
    </div>
  );
};

export default Dashboard;
