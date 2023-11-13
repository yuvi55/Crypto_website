import React from "react";
import supabase from "../../supabase";
const Login = () => {
  async function sign_in_oath() {
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "github",
      });
      const oAuthToken = data.session.provider_token; // use to access provider API
    } catch (e) {
      console.log(e);
    }
  }
  return (
    <div>
      <button onClick={sign_in_oath}>Sign In</button>
    </div>
  );
};

export default Login;
