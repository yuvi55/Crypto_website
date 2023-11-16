import { createContext, useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "../../supabase";
import { getCurrentUserSession } from "../../supabase";
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // TODO: Add logic to check if user is logged in
  const navigate = useNavigate();
  const [user, setUser] = useState({ isUserLoggedIn: false, session: null });
  useEffect(() => {
    async function get_session() {
      const data = await getCurrentUserSession();
      if (data) {
        const data_req = data.session.user;
        setUser({ isUserLoggedIn: true, session: data_req });
      } else {
        setUser({ isUserLoggedIn: false, session: null });
        navigate("/login");
      }
    }
    get_session();
  }, [user.isUserLoggedIn]);

  const [loading, setLoading] = useState(false);

  const contextData = {
    user,
    setUser,
  };

  return (
    <AuthContext.Provider value={contextData}>
      {loading ? <p>Loading...</p> : <>{children}</>}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthContext;
