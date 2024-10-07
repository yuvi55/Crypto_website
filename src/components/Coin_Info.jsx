import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import CandleStick from "./CandleStick";
import Navbar from "./Navbar";
import axios from "axios";

const Coin_Info = () => {
  const [data, setData] = useState(null);
  const [chart, setChart] = useState([]);
  const { symbol } = useParams();

  // API URLs
  const url_charts = `https://min-api.cryptocompare.com/data/v2/histoday?fsym=${symbol}&tsym=USD&limit=100`;
  const url = `https://data-api.cryptocompare.com/asset/v1/data/by/symbol?asset_symbol=${symbol}`;

  // API key from environment variables
  const apiKey = import.meta.env.VITE_CRYPTO_API_KEY;

  const finalUrl = `${url}&lang=EN&api_key=${apiKey}`;
  const finalUrl_charts = `${url_charts}&lang=EN&api_key=${apiKey}`;

  useEffect(() => {
    async function fetchIndData() {
      try {
        // Fetch individual coin data
        const response = await axios.get(finalUrl);
        const data_req = response.data.Data; // Get the specific data from the response
        setData(data_req);

        // Fetch chart data
        const response_charts = await axios.get(finalUrl_charts);
        const chart_data_req = response_charts.data.Data;
        setChart(chart_data_req.Data); // Set chart data
      } catch (e) {
        console.error("Error fetching data:", e);
      }
    }

    fetchIndData();
  }, [finalUrl, finalUrl_charts]);

  return (
    <div>
      <Navbar />
      <div className="mb-8">
        <CandleStick data={chart} />
      </div>
      <div className="max-w-4xl mx-auto p-8 bg-white rounded-lg shadow-md">
        <h1 className="text-3xl font-bold mb-4">Individual Coin Info</h1>
        {data && (
          <div className="grid grid-cols-2 gap-4">
            <div className="items-center">
              <img
                src={data?.LOGO_URL}
                alt={`${data?.NAME} Logo`}
                className="w-32 h-32 mb-4 rounded-full"
              />
              <p className="text-2xl font-semibold mb-2">{data?.NAME}</p>
            </div>
            <div>
              <p className="text-gray-600 mb-4">
                Description: {data?.ASSET_DESCRIPTION_SUMMARY}
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="font-semibold">Launch Date:</p>
                  <p>
                    {new Date(data?.LAUNCH_DATE * 1000).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <p className="font-semibold">Asset Type:</p>
                  <p>{data?.ASSET_TYPE}</p>
                </div>
                <div>
                  <p className="font-semibold">Symbol:</p>
                  <p>{data?.SYMBOL}</p>
                </div>
                <div>
                  <p className="font-semibold">Blockchain:</p>
                  <p>{data?.SUPPORTED_PLATFORMS[0]?.BLOCKCHAIN}</p>
                </div>
                <div>
                  <p className="font-semibold">Token Standard:</p>
                  <p>{data?.SUPPORTED_PLATFORMS[0]?.TOKEN_STANDARD}</p>
                </div>
                <div>
                  <p className="font-semibold">Explorer URL:</p>
                  <p>
                    <a
                      href={data?.SUPPORTED_PLATFORMS[0]?.EXPLORER_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 text-base break-words"
                    >
                      {data?.SUPPORTED_PLATFORMS[0]?.EXPLORER_URL}
                    </a>
                  </p>
                </div>
                {/* Add more properties as needed */}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Coin_Info;
