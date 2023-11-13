import { createClient } from "@supabase/supabase-js";
let url = "https://idnzmqaqvgqpycmwogso.supabase.co";
let api_key =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlkbnptcWFxdmdxcHljbXdvZ3NvIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTk4OTY0MTUsImV4cCI6MjAxNTQ3MjQxNX0.XLslsH6XSuNmRrVliAUo5Ec0rmrUOdpjIF6BmCyXJ6E";

// Create a single supabase client for interacting with your database
const supabase = createClient(url, api_key);

export default supabase;
