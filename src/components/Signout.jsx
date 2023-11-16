import React from "react";
import { useAuth } from "@/context/appContext";
import supabase from "../../supabase"; // Assuming you have a supabase instance
import { useNavigate } from "react-router-dom";
const Signout = () => {
  const { user, setUser } = useAuth();
  const navigate = useNavigate();
  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
      setUser({ isUserLoggedIn: false, session: null });
      navigate("/login");
    } catch (error) {
      console.error("Error signing out:", error.message);
    }
  };

  return (
    <div>
      <button onClick={handleSignOut}>Sign Out</button>
    </div>
  );
};

export default Signout;
