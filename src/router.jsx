import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Landing from "@/components/Landing";
import Signup from "@/components/Signup";
import Login from "@/components/Login";
import Dashboard from "@/components/Dashboard";
import NewsFeed from "./components/NewsFeed";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
    errorElement: <div>Not Found</div>,
    children: [
      {
        path: "/",
        element: <Landing />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/news",
        element: <NewsFeed />,
      },
      ,
    ],
  },
]);
