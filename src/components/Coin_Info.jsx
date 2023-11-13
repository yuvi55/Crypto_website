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

  console.log(data);

  return (
    <div>
      <h1>Individual Coin Info</h1>
      {data && (
        <div>
          {/* Display individual coin data here */}
          <img src={data.LOGO_URL}></img>
          <p>Name: {data.NAME}</p>
          <div>
            <p>Description: {data.ASSET_DESCRIPTION_SUMMARY}</p>
          </div>

          {/* Add other properties as needed */}
        </div>
      )}
    </div>
  );
};

export default Coin_Info;
