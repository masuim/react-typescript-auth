import type { Route } from "./+types/home";
import { Top } from "../Top/Top";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "react-typescript-auth-template" },
    { name: "description", content: "react-typescript-auth-template" },
  ];
}

export default function Home() {
  return <Top />;
}
