import React, { useState, useEffect } from "react";

const TopMovers = () => {
  const [topMovers, setTopMovers] = useState([]);

  useEffect(() => {
    const fetchTopMovers = async () => {
      try {
        const response = await fetch(
          "https://data-api.cryptocompare.com/asset/v1/top/list?page=1&page_size=10&sort_by=SPOT_MOVING_24_HOUR_CHANGE_PERCENTAGE_USD&sort_direction=DESC&apikey=c42a9d023ca08af6d574a6c4a11ebb116d248b3ffb46048493db4c5c098f3d89"
        );

        if (!response.ok) {
          throw new Error("Failed to fetch top movers");
        }

        const data = await response.json();
        setTopMovers(data.Data.LIST);
      } catch (error) {
        console.error("Error fetching top movers:", error);
      }
    };

    fetchTopMovers();
  }, []);

  return (
    <div>
      <h1>Top Movers of the Day</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4">
        {topMovers.map((item) => (
          <div key={item.ID} className="bg-white rounded-lg shadow-md p-4">
            <div className="flex justify-between items-center mb-4">
              <img
                src={item.LOGO_URL}
                alt={`${item.NAME} Logo`}
                className="h-8 w-8 mr-2"
              />
              <div>
                <h3 className="text-xl font-semibold">{item.NAME}</h3>
                <p className="text-gray-500">{item.SYMBOL}</p>
              </div>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-green-500">
                {Math.round(item.SPOT_MOVING_24_HOUR_CHANGE_PERCENTAGE_USD)}%
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopMovers;
