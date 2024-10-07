import { createClient } from "@supabase/supabase-js";

// Create a single supabase client for interacting with your database
const supabase = createClient(
  import.meta.env.VITE_PROJECT_URL,
  import.meta.env.VITE_SUPABASE_API_KEY
);

export const getCurrentUserSession = async () => {
  try {
    const { data: session, error } = await supabase.auth.getSession();

    if (error) {
      console.error("Error getting user session:", error.message);
      return null;
    }
    return session;
  } catch (error) {
    console.error("Error:", error.message);
    return null;
  }
};

export default supabase;
