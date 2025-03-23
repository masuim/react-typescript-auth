import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Top } from "~/Top/Top";

// TODO: ログイン画面を作成する, ルーティングは別ブランチで変更すr
const router = createBrowserRouter([
  {
    path: "/",
    element: <Top />,
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
