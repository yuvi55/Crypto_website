import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Landing from "@/components/Landing";
import Signup from "@/components/Signup";
import Login from "@/components/Login";
import Dashboard from "@/components/Dashboard";
import NewsFeed from "./components/NewsFeed";
import Coin_Info from "./components/Coin_Info";
import Forum from "./components/Forum";
import QuestionForm from "./components/QuestionForm";
import Comments from "./components/Comments";
import Search from "./components/Search";
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
      {
        path: "/coin_info/:symbol",
        element: <Coin_Info />,
      },
      {
        path: "/forum",
        element: <Forum />,
      },
      {
        path: "/questions",
        element: <QuestionForm />,
      },
      {
        path: "forum/:id/comments",
        element: <Comments />,
      },
      {
        path: "search/:search_param",
        element: <Search />,
      },
      ,
    ],
  },
]);
