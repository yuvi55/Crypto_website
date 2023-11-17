import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import supabase from "../../supabase";
import Navbar from "./Navbar";

const Search = () => {
  const { search_param } = useParams();
  const [dbData, setDbData] = useState([]);
  const [searchData, setSearchData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getSearchDataDb = async () => {
      try {
        const { data, error } = await supabase
          .from("coin_data")
          .select("*")
          .eq("CoinName", search_param);

        if (error) {
          console.error("Error fetching data:", error.message);
          return;
        }

        setDbData(data || []);
      } catch (e) {
        console.error("Error:", e.message);
      }
    };

    const getSymbolData = async () => {
      try {
        const url = `https://data-api.cryptocompare.com/asset/v1/data/by/symbol?asset_symbol=${dbData[0]?.Symbol}`;
        const apiKey =
          "c42a9d023ca08af6d574a6c4a11ebb116d248b3ffb46048493db4c5c098f3d89";
        const finalUrl = `${url}&lang=EN&apikey=${apiKey}`;

        const response = await fetch(finalUrl);
        const data = await response.json();
        const data_req = data.Data;
        setSearchData(data_req);
        setLoading(false); // Set loading to false once data is fetched
      } catch (e) {
        console.error("Error fetching individual data:", e);
        setLoading(false); // Set loading to false in case of an error
      }
    };

    getSearchDataDb();
    getSymbolData();
  }, [search_param, dbData]);

  return (
    <div>
      <Navbar />
      <div className="container mx-auto mt-8">
        <h1 className="text-3xl font-bold mb-4">
          Asset found with the name {search_param}:
        </h1>
        {loading ? (
          // Loading skeleton
          <div className="bg-white rounded-lg shadow-md p-6 animate-pulse">
            <div className="mb-4">
              <div className="w-20 h-20 mb-4 rounded-full mx-auto bg-gray-300"></div>
            </div>
            <h2 className="text-2xl font-semibold mb-2 text-center bg-gray-300">
              Loading...
            </h2>
            <p className="text-gray-600 mb-4 text-center bg-gray-300"></p>
            {/* More loading skeleton elements as needed */}
          </div>
        ) : (
          // Render fetched data
          searchData && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="mb-4">
                <img
                  src={searchData.LOGO_URL}
                  alt={`${searchData.NAME} Logo`}
                  className="w-20 h-20 mb-4 rounded-full mx-auto"
                />
              </div>
              <h2 className="text-2xl font-semibold mb-2 text-center">
                {searchData.NAME} ({searchData.SYMBOL})
              </h2>
              <p className="text-gray-600 mb-4 text-center">
                {searchData.ASSET_DESCRIPTION_SUMMARY}
              </p>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="font-semibold">Launch Date:</p>
                  <p>
                    {new Date(
                      searchData.LAUNCH_DATE * 1000
                    ).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <p className="font-semibold">Asset Type:</p>
                  <p>{searchData.ASSET_TYPE}</p>
                </div>
                <div>
                  <p className="font-semibold">Symbol:</p>
                  <p>{searchData.SYMBOL}</p>
                </div>
                <div>
                  <p className="font-semibold">Consensus Mechanism:</p>
                  <p>
                    {searchData.CONSENSUS_MECHANISMS ? [0].NAME : "Not found"}
                  </p>
                </div>
                <div>
                  <p className="font-semibold">White Paper URL:</p>
                  <p>
                    <a
                      href={
                        searchData
                          ? searchData.WHITE_PAPER_URL
                          : "No resource found"
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:underline"
                    >
                      {searchData.WHITE_PAPER_URL}
                    </a>
                  </p>
                </div>
                <div>
                  <p className="font-semibold">Price USD:</p>
                  <p className="font-normal">
                    ${searchData.PRICE_USD?.toFixed(2)}
                  </p>
                </div>
                <div>
                  <p className="font-semibold">Total Market Cap USD:</p>
                  <p className="font-normal">
                    ${searchData.TOTAL_MKT_CAP_USD?.toFixed(2)}
                  </p>
                </div>
                {/* Add more properties as needed */}
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default Search;
