import { useState } from "react";
import reactLogo from "./assets/react.svg";
import { AuthProvider } from "@/context/AppContext";
import viteLogo from "/vite.svg";
import "./App.css";
import { Outlet } from "react-router-dom";
function App() {
  return (
    <AuthProvider>
      <div className="flex flex-col h-full">
        <div className="h-full">
          <Outlet />
        </div>
      </div>
    </AuthProvider>
  );
}

export default App;
