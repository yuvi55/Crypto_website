import supabase from "./supabase.js";

const url = "https://min-api.cryptocompare.com/data/all/coinlist";
const apiKey =
  "c42a9d023ca08af6d574a6c4a11ebb116d248b3ffb46048493db4c5c098f3d89";
const finalUrl = `${url}?lang=EN&apikey=${apiKey}`;

async function fetch_data() {
  try {
    const response = await fetch(finalUrl);
    const data = await response.json();
    const data_req = data.Data;
    const dataArray = Object.values(data_req);
    return dataArray;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}

async function insertDataIntoSupabase(data) {
  try {
    // Assuming 'your_table_name' is the name of your Supabase table
    const { data: insertedData, error } = await supabase
      .from("coin_data")
      .upsert(data);

    if (error) {
      console.error("Error inserting data into Supabase:", error.message);
    } else {
      console.log("Data inserted into Supabase successfully:", insertedData);
    }
  } catch (error) {
    console.error("Error:", error.message);
  }
}

async function processDataAndInsertIntoSupabase() {
  try {
    const data_req = await fetch_data();

    // Map over data_req and include only the desired properties
    const mappedData = data_req.map((item) => ({
      Id: item.Id,
      Url: item.Url,
      ImageUrl: item.ImageUrl,
      ContentCreatedOn: item.ContentCreatedOn,
      Name: item.Name,
      Symbol: item.Symbol,
      CoinName: item.CoinName,
      FullName: item.FullName,
      Description: item.Description,
      AssetTokenStatus: item.AssetTokenStatus,
      Algorithm: item.Algorithm,
      ProofType: item.ProofType,
      SortOrder: item.SortOrder,
      Sponsored: item.Sponsored,
    }));

    // Insert the modified data into Supabase
    await insertDataIntoSupabase(mappedData);
  } catch (error) {
    console.error("Error processing and inserting data into Supabase:", error);
  }
}

// Call the function to fetch data and insert into Supabase
processDataAndInsertIntoSupabase();
