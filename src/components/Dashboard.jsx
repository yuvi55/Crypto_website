import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import supabase from "../../supabase";
import Navbar from "./Navbar";
import { useAuth } from "@/context/appContext";
import TopMovers from "./TopMovers";

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

      <h2>Cryptocurrencies Listed</h2>
      <div className="grid grid-cols-1 gap-4">
        {dbData.map((item) => (
          <div
            key={item.Symbol}
            className="p-4 bg-white shadow-md rounded-md mb-4"
          >
            <Link
              to={`/coin_Info/${item.Symbol}`}
              className="text-blue-500 hover:underline"
            >
              {item.Symbol}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
