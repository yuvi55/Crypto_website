import React, { useEffect, useState } from "react";

const NewsFeed = () => {
  const [news, setNews] = useState([]);

  let url = "https://min-api.cryptocompare.com/data/v2/news/";
  let apiKey =
    "c42a9d023ca08af6d574a6c4a11ebb116d248b3ffb46048493db4c5c098f3d89";
  let finalUrl = `${url}?lang=EN&apikey=${apiKey}`;

  useEffect(() => {
    async function fetchData() {
      try {
        let response = await fetch(finalUrl);
        let data = await response.json();

        setNews(data.Data); // Adjust this based on how you want to display the news
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, [finalUrl]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">News Feed</h1>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {news.map((item) => (
          <div key={item.id} className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-2">{item.title}</h2>
            <p className="text-gray-600">{item.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewsFeed;
