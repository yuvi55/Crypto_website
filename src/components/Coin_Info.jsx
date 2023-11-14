import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const Coin_Info = () => {
  const [data, setData] = useState(null);
  const { symbol } = useParams();
  const url = `https://data-api.cryptocompare.com/asset/v1/data/by/symbol?asset_symbol=${symbol}`;
  const apiKey =
    "c42a9d023ca08af6d574a6c4a11ebb116d248b3ffb46048493db4c5c098f3d89";
  const finalUrl = `${url}&lang=EN&apikey=${apiKey}`;

  useEffect(() => {
    async function fetchIndData() {
      try {
        const response = await fetch(finalUrl);
        const data = await response.json();
        const data_req = data.Data;
        setData(data_req);
      } catch (e) {
        console.error("Error fetching individual data:", e);
      }
    }
    fetchIndData();
  }, [finalUrl]);

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-4">Individual Coin Info</h1>
      {data && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <img
            src={data.LOGO_URL}
            alt={`${data.NAME} Logo`}
            className="w-20 h-20 mb-4 rounded-full"
          />
          <p className="text-2xl font-semibold mb-2">Name: {data.NAME}</p>
          <p className="text-gray-600 mb-4">
            Description: {data.ASSET_DESCRIPTION_SUMMARY}
          </p>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="font-semibold">Launch Date:</p>
              <p>{new Date(data.LAUNCH_DATE * 1000).toLocaleDateString()}</p>
            </div>
            <div>
              <p className="font-semibold">Asset Type:</p>
              <p>{data.ASSET_TYPE}</p>
            </div>
            <div>
              <p className="font-semibold">Symbol:</p>
              <p>{data.SYMBOL}</p>
            </div>
            <div>
              <p className="font-semibold">Blockchain:</p>
              <p>{data.SUPPORTED_PLATFORMS[0]?.BLOCKCHAIN}</p>
            </div>
            <div>
              <p className="font-semibold">Token Standard:</p>
              <p>{data.SUPPORTED_PLATFORMS[0]?.TOKEN_STANDARD}</p>
            </div>
            <div>
              <p className="font-semibold">Explorer URL:</p>
              <p>
                <a
                  href={data.SUPPORTED_PLATFORMS[0]?.EXPLORER_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {data.SUPPORTED_PLATFORMS[0]?.EXPLORER_URL}
                </a>
              </p>
            </div>
            {/* Add more properties as needed */}
          </div>
        </div>
      )}
    </div>
  );
};

export default Coin_Info;
