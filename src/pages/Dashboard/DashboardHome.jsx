import React from "react";
import MyMarathonList from "./MyMarathonList";
import MyApplyList from "./MyApplyList";
import AddMarathons from "../marathons/AddMarathons";

function DashboardHome() {
  return (
    <div>
      <AddMarathons></AddMarathons>
      <MyMarathonList></MyMarathonList>
      <MyApplyList></MyApplyList>
    </div>
  );
}

export default DashboardHome;
