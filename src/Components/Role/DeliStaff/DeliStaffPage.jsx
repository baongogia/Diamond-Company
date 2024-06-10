import React from "react";
import NavBar from "../Admin/NavBar";
import UserProfile from "../Admin/UserProfile";
import Welcome from "../Admin/Welcome";
import DeliFeatures from "./DeliFeatures";
import Money from "./Money";

export default function DeliStaffPage() {
  return (
    <div className="">
      <NavBar />
      <Welcome />
      <UserProfile role={"Delivery Staff"} />
      <DeliFeatures />
      <Money />
    </div>
  );
}
