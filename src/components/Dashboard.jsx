import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import supabase from "../../supabase";
import Navbar from "./Navbar";
import { useAuth } from "@/context/appContext";
import TopMovers from "./TopMovers";
import TopmarketCap from "./TopmarketCap";

const Dashboard = () => {
  const [dbData, setDbData] = useState([]);

  const { user } = useAuth();
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
  console.log(user);
  return (
    <div className="w-full">
      <Navbar />
      <h1 className="text-2xl font-bold mb-4">Welcome to Crypto Info</h1>
      <TopMovers />

      <TopmarketCap />
    </div>
  );
};

export default Dashboard;
