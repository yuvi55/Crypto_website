import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";

const NewsFeed = () => {
  const [news, setNews] = useState([]);

  let url = "https://min-api.cryptocompare.com/data/v2/news/";
  let apiKey =
    "c42a9d023ca08af6d574a6c4a11ebb116d248b3ffb46048493db4c5c098f3d89";
  let finalUrl = `${url}?lang=EN&apikey=${apiKey}`;

  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + "...";
    }
    return text;
  };

  useEffect(() => {
    async function fetchData() {
      try {
        let response = await fetch(finalUrl);
        let data = await response.json();

        setNews(data.Data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, [finalUrl]);

  return (
    <div>
      <Navbar />
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-6">Crypto News Feed</h1>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {news.map((item) => (
            <div key={item.id} className="bg-white p-4 rounded-lg shadow-md">
              <img src={item.imageurl}></img>
              <h2 className="text-xl font-semibold mb-2">{item.title}</h2>
              <p className="text-gray-600 mb-4">
                {truncateText(item.body, 200)}
              </p>
              <div className="flex justify-between items-center">
                <span className="text-gray-500">
                  Published on:{" "}
                  {new Date(item.published_on * 1000).toLocaleString()}
                </span>
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  Read More
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NewsFeed;
