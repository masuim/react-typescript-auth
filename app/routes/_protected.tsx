import { redirect } from "react-router-dom";
import { Outlet } from "react-router-dom";
import { isAuthenticated } from "../lib/auth";

export async function loader() {
  if (!isAuthenticated()) {
    return redirect("/login");
  }
  return null;
}

export default function ProtectedLayout() {
  return <Outlet />;
}
