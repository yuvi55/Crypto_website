import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
const TopmarketCap = () => {
  const [topMarket, setTopMarket] = useState([]);

  useEffect(() => {
    const fetchTopMovers = async () => {
      try {
        const response = await fetch(
          "https://data-api.cryptocompare.com/asset/v1/top/list?page=1&page_size=100&sort_by=TOTAL_MKT_CAP_USD&sort_direction=DESC&apikey=c42a9d023ca08af6d574a6c4a11ebb116d248b3ffb46048493db4c5c098f3d89"
        );

        if (!response.ok) {
          throw new Error("Failed to fetch top assets by market cap");
        }

        const data = await response.json();
        setTopMarket(data.Data.LIST);
      } catch (error) {
        console.error("Error fetching top assets by market cap:", error);
      }
    };

    fetchTopMovers();
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Top Assets by Market Cap</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4">
        {topMarket.map((item) => (
          <div
            key={item.ID}
            className="bg-white rounded-lg shadow-md p-4 border border-gray-200"
          >
            <div className="flex justify-between items-center mb-4">
              <img
                src={item.LOGO_URL}
                alt={`${item.NAME} Logo`}
                className="h-8 w-8 mr-2 rounded-full"
              />
              <div>
                <Link to={`/coin_info/${item.SYMBOL}`}>
                  <h3 className="text-xl font-semibold">{item.NAME}</h3>
                  <p className="text-gray-500">{item.SYMBOL}</p>
                </Link>
              </div>
            </div>
            <div className="text-center">
              <p
                className={`text-2xl font-bold ${
                  item.SPOT_MOVING_24_HOUR_CHANGE_PERCENTAGE_USD < 0
                    ? "text-red-500"
                    : "text-green-500"
                }`}
              >
                {Math.round(
                  item.SPOT_MOVING_24_HOUR_CHANGE_PERCENTAGE_USD * 100
                ) / 100}
                %
              </p>
              <p className="text-gray-500">
                Price: ${Math.round(item.PRICE_USD * 100) / 100}
              </p>
              <p className="text-gray-500">
                Market Cap: ${Math.round(item.TOTAL_MKT_CAP_USD * 100) / 100}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopmarketCap;
