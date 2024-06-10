import React from "react";
import NavBar from "../Admin/NavBar";
import Welcome from "../Admin/Welcome";
import UserProfile from "../Admin/UserProfile";
import ManagerFeatures from "./ManagerFeatures";
import Overview from "./Overview";

export default function ManagerPage() {
  return (
    <div className="">
      <NavBar />
      <Welcome />
      <UserProfile role={"Manager"} />
      <ManagerFeatures />
      <Overview />
    </div>
  );
}
